from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
@app.route('/index.html')
def index():
  return render_template('index.html')

@app.route('/about.html')
def about():
  return render_template('about.html')

