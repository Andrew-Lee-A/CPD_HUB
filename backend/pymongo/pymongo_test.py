import pymongo
from pymongo import MongoClient
import certifi
ca = certifi.where()

# Provide the mongodb atlas url to connect python to mongodb using pymongo
cluster = MongoClient("mongodb+srv://gjs5758:guardianangel1@cluster0.p2ion.mongodb.net/?retryWrites=true&w=majority", tlsCAFile=ca)
#setting cluster test
db = cluster["test"]

collection = db["test"]

post = {"_id": 1, "title": "CPD Title Two", "CPD_Points": 5 }

collection.insert_one(post)