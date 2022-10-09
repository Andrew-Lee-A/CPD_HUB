from bs4 import BeautifulSoup
from time import sleep
from numpy import dtype
import requests
import pandas as pd
from pandas import DataFrame
import pymongo_connect

# created funtion that convert a list into string that is sperated by a comma 
def CPD_Convert(str):
    li = list(str.split(","))
    return li

 # created funtion that convert a list into string that is sperated by a colon
def date_timeConvert(string):
    li = list(string.split(":"))
    return li   

def prepend(str, list):
    str +='{0}'
    list = [str.format(i) for i in list]
    return (list)

## creating variables in order to store the scraped data 
title = []
date_time = []
price = []
CPD_Hours= []
reg=[]

## provides the domain for the scraper to scrape in order to retrive it's content which is done using the BeautifulSoup's text-based html parser
n_page = 17
url_reg = "https://www.engineeringnz.org/courses-events/"
base_link = "https://www.engineeringnz.org/courses-events/?p="
for i in range (1, n_page+1):
    url = base_link+str(i)
    #print(url)
    response = requests.get(url)
    soup = BeautifulSoup(response.content,'html.parser')

    ## i have created a variable that defines where to begin the scrape
    course_data = soup.findAll('div',attrs={'class':'width-1/2@xsmall width-1/3@medium'})

    ## this how the scraper retrives the data from the website.
    # I have done this by creating for loop that search the html tags which contained the course_data variable 
    # which collects the title of the webinar, the price of the webinar and the CPD points which is equivalent to the CPD Hours
    
    for store in course_data:
        titles  = store.h5.text.replace('\n','').strip()  ## this looking through the h5 tag finds the text inside the h5 tags cleans
    # the data by removing all newlines and remove all the html tags 
        title.append(titles) # this stores the cleaned and appends it the original variable that used to store the scraped data 

        cost = store.a.p.text.replace('\n','').strip()
        price.append(cost)

        Hours_elems=store.a.find_all('p', class_= 'u-text-xs u-text-medium u-text-right') 
        Hours =[elem.get_text() for elem in Hours_elems]
    
        CPD_Hours.append(Hours)  
    
    # # searching for the registration link
    reg_link = soup.findAll('a',class_='link-complex link--no-style',href=True)
    for links in reg_link:
        reg.append(links.get('href'))
          
    url_reg = url_reg.replace("/courses-events/","")

    ## collecting the date and time for the webinars
    calender = soup.findAll('p',attrs={'class':'t-color-light-grey u-text-uppercase u-space-xs'})
    for store in calender:
        date_elems = store
        date =[elem.get_text() for elem in date_elems]
        date_time.append(date)



CPD_Hours =" ".join([str(item) for item in CPD_Hours])
CPD_Hours = CPD_Hours.replace("\\n","")
CPD_Hours = CPD_Hours.replace("  ","")
CPD_Hours = CPD_Hours.replace("[","")
CPD_Hours = CPD_Hours.replace("]",",")
CPD_Hours = CPD_Hours.replace("hrs",".")
CPD_Hours = CPD_Hours.replace("hr",".")
CPD_Hours = CPD_Hours.replace("mins","")
CPD_Hours = CPD_Hours.replace("'","")
CPD_Hours = CPD_Hours.replace(" ","")
CPD_Hours = CPD_Hours.replace("CPD","")

#using the convert funtion to convert the list variable into a strings
CPD_Hours = CPD_Convert(CPD_Hours)

# sperating the each of the dates and times and cleaning the data 
date_time =" ".join([str(item) for item in date_time])
date_time = date_time.replace("[","")
date_time = date_time.replace("]",":")
date_time = date_time.replace("'","")

#converting the list variable into string
date_time =date_timeConvert(date_time)

# sperating the each of the registration links with a comma
reg =",".join([str(item) for item in reg])

#converting the list variable into string
reg = CPD_Convert(reg)
reg = prepend(url_reg,reg)

# creating a Pandas Dataframe 
# creating pandas dictionary with the scraped data and contents
result = list(zip(title,price,CPD_Hours,date_time,reg))


df= pd.set_option('display.max_colwidth', None)
# naming all the columns of the pandas dataframe 
df = pd.DataFrame(result, columns=['Webinar Title','Price','CPD Points','Date/Time','Registration'])

result_dict =df.to_dict('index')
print("\n",result_dict,"\n")

#pymongo_connect.push_to_db(result_dict)