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

	def __init__(self, name, abbreviations, nicknames, timeZone, governor,
		capital, largestCity, totalPopulation, totalArea, medianIncome,
		nationalParks, campgrounds, url):
		self.name = name
		self.abbreviations = abbreviations
		self.nicknames = nicknames
		self.timeZone = timeZone
		self.governor = governor
		self.capital = capital
		self.largestCity = largestCity
		self.totalPopulation = totalPopulation
		self.totalArea = totalArea
		self.medianIncome = medianIncome
		self.nationalParks = nationalParks
		self.campgrounds = campgrounds
		self.url = url

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

	def __init__(self, name, parkCode, states, description,
		regulationsOverview, wheelchairAccess, internetInfo,
		weatherInfo, regulationsUrl, totalSites, directionsInfo,
		directionsUrl, imageUrl):
		self.name = name
		self.parkCode = parkCode
		self.states = states
		self.description = description
		self.regulationsOverview = regulationsOverview
		self.wheelchairAccess = wheelchairAccess
		self.internetInfo = internetInfo
		self.weatherInfo = weatherInfo
		self.regulationsUrl = regulationsUrl
		self.totalSites = totalSites
		self.directionsInfo = directionsInfo
		self.directionsUrl = directionsUrl
		self.imageUrl = imageUrl

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

	def __init__(self, name, parkCode, states, description, latLong,
		directionsUrl, directionsInfo, website, imageUrl):
		self.name = name
		self.parkCode = parkCode
		self.states = states
		self.description = description
		self.latLong = latLong
		self.directionsUrl = directionsUrl
		self.directionsInfo = directionsInfo
		self.website = website
		self.imageUrl = imageUrl

	def __repr__(self):
		return '<Visitor Center %s: parkCode =%s>' % self.fullName, self.parkCode