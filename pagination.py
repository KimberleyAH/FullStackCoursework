# from flask import Flask, request, jsonify, make_response
# from pymongo import MongoClient
# from bson import ObjectId
# import jwt
# import datetime
# from functools import wraps
# import bcrypt
# import string
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# app.config['SECRET_KEY'] = 'mysecret'

# client = MongoClient("mongodb://127.0.0.1:27017")
# db = client.fortniteDB  # update the database
# characters = db.fortnite  # update the collection name
# personnel = db.personnel #define handle to use list of personnel collection
# blacklist = db.blacklist #define handle to use blacklist token collection

# # application functionality will go here
# @app.route("/api/v1.0/characters", methods=["GET"])
# def show_all_characters():
#     page_num, page_size = 1, 10
#     if request.args.get('pn'):
#         page_num = int(request.args.get('pn'))
#     if request.args.get('ps'):
#         page_size = int(request.args.get('ps'))
#     page_start = (page_size * (page_num - 1))

#     data_to_return = []
#     for character in characters.find().skip(page_start).limit(page_size):
#         character['_id'] = str(character['_id'])
#         for rank in character['rank']:
#             rank['_id'] = str(rank['_id'])
#         data_to_return.append(character)
#     return make_response(jsonify(data_to_return), 200)

#     if __name__ == "__main__":
#         app.run(debug=True)