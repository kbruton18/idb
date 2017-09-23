from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/form')
def form():
  return render_template('form.html')

@app.route('/submitted', methods=['POST'])
def submitted_form():
  name = request.form['name']
  email = request.form['email']
  return render_template(
    'submitted_form.html',
    name=name,
    email=email)
