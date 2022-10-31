from xml.dom.expatbuilder import parseString
import pymongo
from pymongo import MongoClient
import certifi
ca = certifi.where()
client = MongoClient('mongodb+srv://gjs5758:guardianangel1@cluster0.p2ion.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)

userDB = client['CPD']
userData = userDB['users']
cpdData = userDB['cpdevents']
i = 0


for user in userData.find({}):
    userKeywords = user['keywords']
    userID = user["_id"]
    matchedArray = []

    for word in userKeywords:
       
        matches = list(cpdData.find({"keywords": word}))

        for match in matches:
            
            if len(matchedArray) < 5:
                splitMatch = str(match['_id'])
                matchedArray.append(splitMatch)
                i = i+1
    
    
    print(matchedArray)
    
    i =0   
    userData.update_one({"_id": userID}, {"$set": {"cpdPushed": matchedArray}})       
    del(matchedArray)