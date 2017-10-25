from flask_sqlalchemy import SQLAlchemy
from main import app

database = SQLAlchemy(app)

class Park(database.Model):
	__tablename__ = 'parks'
	parkCode = database.Column(database.String(50), primary_key = True)
	fullName = database.Column(database.Text)
	description = database.Column(database.Text)
	designation = database.Column(database.Text)
	directionsInfo = database.Column(database.Text)
	directionsUrl = database.Column(database.Text)
	latLong = database.Column(database.Text)
	url = database.Column(database.Text)
	weatherInfo = database.Column(database.Text)
	states = database.Column(database.Text)
	imageUrl = database.Column(database.Text)
	ID = database.Column(database.Integer, autoincrement = True)

	def __init__(self, parkCode, fullName, description, designation,
		directionsInfo, directionsUrl, latLong, url, weatherInfo,
		states, imageUrl):
		self.parkCode = parkCode
		self.fullName = fullName
		self.description = description
		self.designation = designation
		self.directionsInfo = directionsInfo
		self.directionsUrl = directionsUrl
		self.latLong = latLong
		self.url = url
		self.weatherInfo = weatherInfo
		self.states = states
		self.imageUrl = imageUrl

	def __repr__(self):
		return '<Park %s: ParkCode=%s>' % self.fullName, self.parkCode


class State(database.Model):
	__tablename__ = 'states'
	name = database.Column(database.String(200), primary_key = True)
	abbreviations = database.Column(database.Text)
	nicknames = database.Column(database.Text)
	timeZone = database.Column(database.Text)
	governor = database.Column(database.Text)
	capital = database.Column(database.Text)
	largestCity = database.Column(database.Text)
	totalPopulation = database.Column(database.Text)
	totalArea = database.Column(database.Text)
	medianIncome = database.Column(database.Text)
	nationalParks = database.Column(database.Text)
	campgrounds = database.Column(database.Text)
	url = database.Column(database.Text)
	ID = database.Column(database.Integer, autoincrement = True)

	def __repr__(self):
		return '<State %s>' % self.name


class Campground(database.Model):
	__tablename__ = 'campgrounds'
	name = database.Column(database.String(200), primary_key = True)
	parkCode = database.Column(database.Text)
	states = database.Column(database.Text)
	description = database.Column(database.Text)
	regulationsOverview = database.Column(database.Text)
	wheelchairAccess = database.Column(database.Text)
	internetInfo = database.Column(database.Text)
	weatherInfo = database.Column(database.Text)
	regulationsUrl = database.Column(database.Text)
	totalSites = database.Column(database.Integer, autoincrement = False)
	directionsInfo = database.Column(database.Text)
	directionsUrl = database.Column(database.Text)
	imageUrl = database.Column(database.Text)
	ID = database.Column(database.Integer, autoincrement = True)

	def __repr__(self):
		return '<Campground %s: parkCode=%s>' % self.name, self.parkCode


class VisitorCenter(database.Model):
	__tablename__ = 'visitor_centers'
	name = database.Column(database.String(200), primary_key = True)
	parkCode = database.Column(database.Text)
	states = database.Column(database.Text)
	description = database.Column(database.Text)
	latLong = database.Column(database.Text)
	directionsUrl = database.Column(database.Text)
	directionsInfo = database.Column(database.Text)
	website = database.Column(database.Text)
	imageUrl = database.Column(database.Text)
	ID = database.Column(database.Integer, autoincrement = True)

	def __repr__(self):
		return '<Visitor Center %s: parkCode =%s>' % self.fullName, self.parkCode