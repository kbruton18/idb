from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
@app.route('/index.html')
def index():
  return render_template('index.html')

@app.route('/about.html')
def about():
  return render_template('about.html')
  
@app.route('/countries.html')
def countries():
  return render_template('countries.html')
  
@app.route('/cities.html')
def cities():
  return render_template('cities.html')
  
@app.route('/placesofinterest.html')
def placesofinterest():
  return render_template('placesofinterest.html')
  
@app.route('/states.html')
def states():
  return render_template('states.html')
