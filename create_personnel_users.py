from pymongo import MongoClient
import bcrypt

client = MongoClient("mongodb://127.0.0.1:27017")
db = client.fortniteDB      # select the database
personnel = db.personnel        # select the collection name

personnel_list = [
          { 
            "name" : "Kimberley Hewitt",
            "username" : "kimberley",  
            "password" : b"kimberley_h",
            "email" : "kimberley0993@live.co.uk",
            "admin" : False
          },
          { 
            "name" : "Bob Brown",
            "username" : "bob",  
            "password" : b"bob_b",
            "email" : "bob@fortniteadmin.net",
            "admin" : False
          },
          { 
            "name" : "Jane Grey",
            "username" : "jane",  
            "password" : b"jane_g",
            "email" : "jane@fortniteadmin.net",
            "admin" : False
          },        
          { 
            "name" : "Thomas Green",
            "username" : "thomas",  
            "password" : b"thomas_g",
            "email" : "thomas@fortniteadmin.net",
            "admin" : True
          },
          { 
            "name" : "Leo Wilson",
            "username" : "leo",  
            "password" : b"leo_w",
            "email" : "leo@fortniteadmin.net",
            "admin" : False
          }
       ]

for new_personnel_user in personnel_list:
      new_personnel_user["password"] = bcrypt.hashpw(new_personnel_user["password"], bcrypt.gensalt())
      personnel.insert_one(new_personnel_user)
