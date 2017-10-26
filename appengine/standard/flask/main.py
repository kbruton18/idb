from flask import Flask, render_template, request
from api import get_parks_dict

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:swetravels@104.198.224.97/swe_travels'

@app.route('/')

@app.route('swetravels/api/v1.0/parks', methods=['GET'])
def get_parks():
    return jsonify(get_parks_dict())