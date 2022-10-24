#Author: SamGilch
#Updated: 14/10/2022 
from bs4 import BeautifulSoup
from urllib.request import Request, urlopen
from random import seed
import requests
import pymongo
from pymongo import MongoClient
import re
from datetime import datetime
import certifi
ca = certifi.where()

#set variable to track page number
page = 0

keywords = ["construction", "bearing", "hello", "beanie"]


#connect to Mongo
client = MongoClient('mongodb+srv://gjs5758:guardianangel1@cluster0.p2ion.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
#Connect to DB in Mongo
db = client["CPD"]
#connect to collection in DB
collection = db["cpdevents"]




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
        print(linkStep)
        #sets a new scrape for the CPD event page using link
        newR = requests.get(linkStep)
        stepSoup = BeautifulSoup(newR.content, 'html5lib')
        #retrieves the title
        stepTitle = stepSoup.find('h2')
        try:
            realStepTitle = stepTitle.text.strip()
        except:
            break
        #retrieves the price
        stepPrice = stepSoup.find_all(text=re.compile('Member'))
        memberPrice = [stepPrice.split()[-1] for stepPrice in stepPrice]
        #retrieves the date, strip the text, split it into time and date, split start and end times, combine start time and date to make start date and end time with date to make end date
        stepDate = stepSoup.find('div', class_='event__datetime')
        try:
            realStepDate = stepDate.text.strip()
        except: 
            startDate = "TBC"
            endDate = "TBC"

        dateSplit = realStepDate.split(",")
        try:
            multiDate = dateSplit[1].split('—')
            newDate = multiDate[1]
        except:
            newDate = dateSplit[1]

        time = dateSplit[0]
        newTime = time.split('—')
        startTime = newTime[0].strip(" ")

        
        endTime = newTime[1].strip(" ")
        endTime = endTime.split(" ", 1)[0]
        startDate = newDate + startTime
        endDate = newDate + endTime
        startDate = datetime.strptime(startDate, ' %d %B %Y%I.%M%p')
        endDate = datetime.strptime(endDate, ' %d %B %Y%I.%M%p')
      
        #retirives the CPD points ensuring anything without CPD points is set at 0
        stepPoints = stepSoup.find(text=re.compile('Maximum CPD Hours'))
        try:
            realStepPoints = stepPoints.next_element.text.strip()
        except:
            realStepPoints = '0'

        #LOCATION STEP - DETAILS NEEDED TO IMPLEMENT *Inconsistent naming and html location on website
        #stepLocation = stepSoup.find('div', class_='event__location')
        #print(stepLocation)

        #Keyword Step
        stepKeywords = stepSoup.find_all('div', class_='col-12 col-lg-7 order-1 order-lg-0 event__content')
        for word in keywords:
            score = stepKeywords.count(word)
        

        #checking if the title is already in the DB
        x = collection.find_one({"title": realStepTitle})
        print(x)
        #if title already exists in DB skip to next event else post it in the DB
        if x != None:
            continue;
        else:
            #posts all scraped elements into the DB
            post = {"title": realStepTitle, "cpd_points": realStepPoints, "start_date": startDate, "end_date": endDate, "price": memberPrice[0], "booking_Url": linkStep }
            collection.insert_one(post)
    #increaing page number to scrape the next page
    page = page + 1

    
    print(page)


