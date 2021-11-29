from flask import Flask, request, jsonify, make_response
from pymongo import MongoClient
from bson import ObjectId
import jwt
import datetime
from functools import wraps
import bcrypt
import string
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'mysecret'

client = MongoClient("mongodb://127.0.0.1:27017")
db = client.fortniteDB  # update the database
characters = db.fortnite  # update the collection name
personnel = db.personnel #define handle to use list of personnel collection
blacklist = db.blacklist #define handle to use blacklist token collection

def jwt_required(func):
    @wraps(func)
    def jwt_required_wrapper(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
        except:
            return jsonify({'message': 'Token is invalid'}), 401

#Verify that a valid token is present and token hasn't been used in logout request
        bl_token = blacklist.find_one({"token": token})
        if bl_token is not None:
            return make_response(jsonify({'message': 'Token has been cancelled'}), 401)

        return func(*args, **kwargs)

    return jwt_required_wrapper

def admin_required(func):
    @wraps(func)
    def admin_required_wrapper(*args, **kwargs):
        token = request.headers['x-access-token']
        data = jwt.decode(token, app.config['SECRET_KEY'])
        if data["admin"]:
            return func(*args, **kwargs)
        else:
            return make_response(jsonify({'message': 'Admin access required'}), 401)

    return admin_required_wrapper

# application functionality will go here
@app.route("/api/v1.0/characters", methods=["GET"])
def show_all_characters():
    page_num, page_size = 1, 10
    if request.args.get('pn'):
        page_num = int(request.args.get('pn'))
    if request.args.get('ps'):
        page_size = int(request.args.get('ps'))
    page_start = (page_size * (page_num - 1))

    data_to_return = []
    for character in characters.find().skip(page_start).limit(page_size):
        character['_id'] = str(character['_id'])
        for rank in character['rank']:
            rank['_id'] = str(rank['_id'])
        data_to_return.append(character)
    return make_response(jsonify(data_to_return), 200)

@app.route("/api/v1.0/characters/<string:id>", methods=["GET"])
#@jwt_required
def show_one_character(id):
    if len(id) != 24 or not all(c in string.hexdigits for c in id):
        return make_response(jsonify({"error": "Invalid Character ID"}), 404)
    character = characters.find_one({'_id': ObjectId(id)})
    if character is not None:
        character['_id'] = str(character['_id'])
        for rank in character['rank']:
            rank['_id'] = str(rank['_id'])
        return make_response(jsonify( [character] ), 200)
    else:
        return make_response(jsonify({"error": "Invalid character ID"}), 404)

@app.route("/api/v1.0/characters", methods=["POST"])
def add_a_character():
    if "name" in request.form and "age" in request.form and "weapon" in request.form and "victories" in request.form:
        new_character = {
            "name": request.form["name"],
            "age": request.form["age"],
            "weapon": request.form["weapon"],
            "victories": request.form["victories"],
            "rank": []
        }
        new_character_id = characters.insert_one(new_character)
        new_character_link = "http://localhost:5000/api/v1.0/characters/" + str(new_character_id.inserted_id)
        return make_response(jsonify({"url": new_character_link}), 201)
    else:
        return make_response(jsonify({"error": "Missing form data"}), 404)

@app.route("/api/v1.0/characters/<string:id>", methods=["PUT"])
def edit_character(id):
    if len(id) != 24 or not all(c in string.hexdigits for c in id):
        return make_response(jsonify({"error": "Invalid Character ID"}), 404)

    if "name" in request.form and "age" in request.form and "weapon" in request.form and "victories" in request.form:
        result = characters.update_one({"_id": ObjectId(id)}, {
            "$set": {"name": request.form["name"], "age": request.form["age"], "weapon": request.form["weapon"], "victories": request.form["victories"]}})

        if result.matched_count == 1:
            edited_character_link = "http://localhost:5000/api/v1.0/characters/" + id
            return make_response(jsonify({"url": edited_character_link}), 200)
        else:
            return make_response(jsonify({"error": "Invalid character ID"}), 404)
    else:
        return make_response(jsonify({"error": "Missing form data"}), 404)

@app.route("/api/v1.0/characters/<string:id>", methods=["DELETE"])
#@jwt_required
#@admin_required
def delete_character(id):
    if len(id) != 24 or not all(c in string.hexdigits for c in id):
        return make_response(jsonify({"error": "Invalid Character ID"}), 404)
   
    result = characters.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 1:
        return make_response(jsonify({}), 204)
    else:
        return make_response(jsonify({"error": "Invalid character ID"}), 404)

@app.route("/api/v1.0/characters/<string:id>/rank", methods=["POST"])
#@jwt_required
def add_new_rank(id):
    if len(id) != 24 or not all(c in string.hexdigits for c in id):
        return make_response(jsonify({"error": "Invalid Character ID"}), 404)
    new_rank = {
        "_id": ObjectId(),
        "user_id": "618c4b9db971d3f980a3bd32", 
        "username": request.form["username"],
        "comment": request.form["comment"],
        "rank": int(request.form["rank"])
    }
    characters.update_one({"_id": ObjectId(id)}, {"$push": {"rank": new_rank}})
    new_rank_link = "http://localhost:5000/api/v1.0/characters/" + id + "/rank/" + str(new_rank['_id'])
    return make_response(jsonify({"url": new_rank_link}), 201)

@app.route("/api/v1.0/characters/<string:id>/rank", methods=["GET"])
#@jwt_required
def fetch_all_ranks(id):
    if len(id) != 24 or not all(c in string.hexdigits for c in id):
        return make_response(jsonify({"error": "Invalid Character ID"}), 404)
    data_to_return = []
    character = characters.find_one( { "_id" : ObjectId(id) }, 
    {"rank" : 1, "_id" : 0 } )
    for rank in character["rank"]:
        rank["_id"] = str(rank["_id"])
        data_to_return.append(rank)
    return make_response( jsonify ( data_to_return ), 200)


@app.route("/api/v1.0/characters/<cid>/rank/<rid>", methods=["GET"])
#@jwt_required
def fetch_one_rank(cid, rid):
    if len(cid) != 24 or not all(c in string.hexdigits for c in cid):
        return make_response(jsonify({"error": "Invalid Character ID"}), 404)
    elif len(rid) != 24 or not all(c in string.hexdigits for c in rid):
        return make_response(jsonify({"error": "Invalid Rank ID"}), 404)

    character = characters.find_one({"rank._id": ObjectId(rid)}, {"_id": 0, "rank.$": 1})
    if character is None:
        return make_response(jsonify({"error": "Invalid character ID or rank ID"}), 404)
    character['rank'][0]['_id'] = str( character['rank'][0]['_id'])

    return make_response(jsonify(character['rank'][0]), 200)


@app.route("/api/v1.0/characters/<cid>/rank/<rid>", methods=["PUT"])
#@jwt_required
def edit_rank(cid, rid):
    if len(cid) != 24 or not all(c in string.hexdigits for c in cid):
        return make_response(jsonify({"error": "Invalid Character ID"}), 404)
    elif len(rid) != 24 or not all(c in string.hexdigits for c in rid):
        return make_response(jsonify({"error": "Invalid Rank ID"}), 404)

    edited_rank = {
        "rank.$.username": request.form["username"],
        "rank.$.comment": request.form["comment"],
        "rank.$.rank": int(request.form['rank'])
    }
    characters.update_one({"rank._id": ObjectId(rid)}, {"$set": edited_rank})
    edit_rank_url = "http://localhost:5000/api/v1.0/characters/" + cid + "/rank/" + rid
    return make_response(jsonify({"url": edit_rank_url}), 200)


@app.route("/api/v1.0/characters/<cid>/rank/<rid>", methods=["DELETE"])
#@jwt_required
#@admin_required
def delete_rank(cid, rid):
    if len(cid) != 24 or not all(c in string.hexdigits for c in cid):
        return make_response(jsonify({"error": "Invalid Character ID"}), 404)
    elif len(rid) != 24 or not all(c in string.hexdigits for c in rid):
        return make_response(jsonify({"error": "Invalid Rank ID"}), 404)

    characters.update_one({"_id": ObjectId(cid)}, {"$pull": {"rank": {"_id": ObjectId(rid)}}})
    return make_response(jsonify({}), 204)

@app.route("/api/v1.0/login", methods=["GET"])
def login():
    auth = request.authorization
    if auth:
        user = personnel.find_one({'username': auth.username})
        if user is not None:
            if bcrypt.checkpw(bytes(auth.password, 'UTF-8'), user["password"]):
                token = jwt.encode(
                    {
                        'user': auth.username,
                        'admin': user["admin"],
                        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
                    }, app.config['SECRET_KEY'])
                return make_response(jsonify({'token': token.decode('UTF-8')}), 200)
            else:
                return make_response(jsonify({'message': 'Bad password'}), 401)
        else:
            return make_response(jsonify({'message': 'Bad username'}), 401)
    return make_response(jsonify({'message': 'Authentication required'}), 401)

#define route to logout endpoint and a get request. Jwt required checking for presence
#of an x-access token needed to access function
@app.route('/api/v1.0/logout', methods=["GET"])
#@jwt_required
def logout():
    token = request.headers['x-access-token']
    blacklist.insert_one({"token": token})
    return make_response(jsonify({'message': 'Logout successful'}), 200)

if __name__ == "__main__":
    app.run(debug=True)