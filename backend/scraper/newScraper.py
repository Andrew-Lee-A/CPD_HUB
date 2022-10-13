#Author: SamGilch
#Updated: 14/10/2022 
from bs4 import BeautifulSoup
from urllib.request import Request, urlopen
from random import seed
import requests
import pymongo
from pymongo import MongoClient
import re

#set variable to track page number
page = 0

#connect to Mongo
client = MongoClient('mongodb+srv://User:Password@cluster0.a9jy9oq.mongodb.net/?retryWrites=true&w=majority')
#Connect to DB in Mongo
db = client["test"]
#connect to collection in DB
collection = db["test"]




#while loop iterates through each page, increasing the page number each time to scrape all pages of content
while page != 18:
    #setting page URL with all CPD event boxes
    URL = "https://www.engineersaustralia.org.au/learning-and-events/events-webinars-and-courses?keywords=&sort_by=field_event_sort_date_1&page="
    r = requests.get(URL + str(page) + '/')
    #scraping page
    soup = BeautifulSoup(r.content, 'html5lib')
    #scraping all individual tiles
    cards = soup.find_all('div', class_= 'ea__card ea__card--listing col-12 col-md-6 col-lg-4')
    #for loop iterates through each box item
    for links in cards:
        #retrieves the link for the CPD event page off the tile
        step = links.a['href']
        linkStep = "https://www.engineersaustralia.org.au/" + step
        #sets a new scrape for the CPD event page using link
        newR = requests.get(linkStep)
        stepSoup = BeautifulSoup(newR.content, 'html5lib')
        #retrieves the title
        stepTitle = stepSoup.find('h2')
        realStepTitle = stepTitle.text.strip()
        #retrieves the price
        stepPrice = stepSoup.find_all(text=re.compile('Member'))
        memberPrice = [stepPrice.split()[-1] for stepPrice in stepPrice]
        #retrieves the date
        stepDate = stepSoup.find('div', class_='event__datetime')
        try:
            realStepDate = stepDate.text.strip()
        except: 
            realStepDate = "TBC"
        #retirives the CPD points ensuring anything without CPD points is set at 0
        stepPoints = stepSoup.find(text=re.compile('Maximum CPD Hours'))
        try:
            realStepPoints = stepPoints.next_element.text.strip()
        except:
            realStepPoints = '0'

        #LOCATION STEP - DETAILS NEEDED TO IMPLEMENT *Inconsistent naming and html location on website
        #stepLocation = stepSoup.find('div', class_='event__location')
        #print(stepLocation)

        #checking if the title is already in the DB
        x = collection.find_one({"Title": realStepTitle})
        
        #if title already exists in DB skip to next event else post it in the DB
        if x == "":
            break;
        else:
            #posts all scraped elements into the DB
            post = {"Title": realStepTitle, "CPD_Points": realStepPoints, "Date": realStepDate, "Price": memberPrice[0], "Book_URL": linkStep }
            collection.insert_one(post)
    #increaing page number to scrape the next page
    page = page + 1



