from pymongo import MongoClient

client = MongoClient("mongodb://127.0.0.1:27017")
db = client.fortniteDB  # update the database
characters = db.fortnite  # update the collection name
personnel = db.personnel #define handle to use list of personnel collection
blacklist = db.blacklist #define handle to use blacklist token collection

all_characters = db.AZCharacters
# characters_by_age = db.charactersByAge

#sort characters by alphabetically by name
pipeline = [{'$sort' : {"name" : + 1}}]
# db.fornite.aggregate([ { $sort : { 'name' : +1 }}, { $out : 'AZCharacters' } ]).pretty() 
for character in characters.aggregate(pipeline):
    print(str(character))

#sort characters by age
pipeline = [{'$sort' : {"age" : + 1}}]
# db.fornite.aggregate([ { $sort : { 'age' : +1 }}, { $out : 'CharacterAgeAscending' } ]).pretty() 
for character in characters.aggregate(pipeline):
    print(str(character))

#sort characters by 
pipeline = [{'$sort' : {"age" : + 1}}]
# db.fornite.aggregate([ { $sort : { 'age' : +1 }}, { $out : 'CharacterAgeAscending' } ]).pretty() 
for character in characters.aggregate(pipeline):
    print(str(character))

#Sorting characters by victories in mongodb
# db.fortnite.aggregate([ { $project : { _id : 0, "name" : 1, "age" : 1, 
# "weapon" : 1, "victories" : 1 }}, { $sort : { 'victories' : +1 }} ]).pretty()