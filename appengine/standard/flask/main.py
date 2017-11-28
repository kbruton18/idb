from flask import Flask, render_template, request, jsonify, make_response
from api import *
from models import database
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
# from google.appengine.api import urlfetch
from google.appengine.api import memcache

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:swetravels@104.198.224.97/swe_travels'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    database.init_app(app)

    return app

app = create_app()
CORS(app)

@app.route('/api/search/<string:term>', methods=['GET'])
def search_site(term):
    return jsonify(search_instances(term))

@app.route('/api/parks', methods=['GET'])
def get_parks():
  return jsonify(get_parks_list(request.args))

@app.route('/api/parks/<string:park_code>', methods=['GET'])
def get_park(park_code):
  return jsonify(get_park_info(park_code, request.args))

@app.route('/api/states', methods=['GET'])
def get_states():
    return jsonify(get_states_list(request.args))

@app.route('/api/states/<string:abbreviation>', methods=['GET'])
def get_state(abbreviation):
  return jsonify(get_state_info(abbreviation, request.args))

@app.route('/api/campgrounds', methods=['GET'])
def get_campgrounds():
  return jsonify(get_campgrounds_list(request.args))

@app.route('/api/campgrounds/<string:name>', methods=['GET'])
def get_campground(name):
  return jsonify(get_campground_info(name, request.args))

@app.route('/api/visitorcenters', methods=['GET'])
def get_visitor_centers():
  return jsonify(get_visitor_centers_list(request.args))

@app.route('/api/visitorcenters/<string:name>', methods=['GET'])
def get_visitor_center(name):
  return jsonify(get_visitor_center_info(name, request.args))

# @app.route('/api/proxy/<string:name>')
# def get_proxy_models(name):
#     data = memcache_get(name)
#     if data is not None:
#         resp = make_response(data)
#         resp.mimetype = 'application/json'
#         return resp
#     url = 'https://phonedb.info/' + name
#     result = urlfetch.fetch(url, deadline=600)
#     if result.status_code == 200:
#         memcache_store(result.content, name)
#         return result.content, 200
#     else:
#         return result.status_code


def memcache_get(key):
    data = ''
    if memcache.get(key) != "good":
        return None
    for i in range(5):
        cached = memcache.get(key + str(i))
        data = data + cached
    return data

def memcache_store(data, key):
    datalen = len(data)
    step = datalen / 4
    last = 0
    index = 0
    for i in range(step, datalen, step):
        memcache.add(key + str(index), data[last:i], time=86400)
        last = i
        index = index + 1
    memcache.add(key + str(index), data[last:], time=86400)
    memcache.add(key, "good", time=86400)

if __name__ == "__main__":
  app.run(host="0.0.0.0")
