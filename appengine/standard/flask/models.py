from flask_sqlalchemy import SQLAlchemy
from main import app

database = SQLAlchemy(app)

class Park(database.Model):
	__tablename__ = 'parks'
	parkCode = database.Column(database.String, primary_key = True)
	fullName = database.Column(database.String)
	description = database.Column(database.String)
	designation = database.Column(database.String)
	directionsInfo = database.Column(database.String)
	directionsUrl = database.Column(database.String)
	latLong = database.Column(database.String)
	url = database.Column(database.String)
	weatherInfo = database.Column(database.String)
	states = database.Column(database.String)
	imageUrl = database.Column(database.String)

	def __repr__(self):
		return '<Park %s>' % self.fullName


class State(database.Model):
	__tablename__ = 'states'
	name = database.Column(database.String, primary_key = True)
	abbreviations = database.Column(database.String)
	nicknames = database.Column(database.String)
	timeZone = database.Column(database.String)
	governor = database.Column(database.String)
	capital = database.Column(database.String)
	largestCity = database.Column(database.String)
	totalPopulation = database.Column(database.String)
	medianIncome = database.Column(database.String)
	nationalParks = database.Column(database.String)
	campgrounds = database.Column(database.String)
	url = database.Column(database.String)

	def __repr__(self):
		return '<State %s>' % self.name


class Campground(database.Model):
	__tablename__ = 'campgrounds'
	name = database.Column(database.String, primary_key = True)
	park = database.Column(database.String)
	states = database.Column(database.String)
	description = database.Column(database.String)
	regulations = database.Column(database.String)
	wheelchairAccess = database.Column(database.String)
	internetInfo = database.Column(database.String)
	weatherInfo = database.Column(database.String)
	regulationsUrl = database.Column(database.String)
	totalSites = database.Column(database.Integer)
	directionsInfo = database.Column(database.String)
	directionsUrl = database.Column(database.String)
	imageUrl = database.Column(database.String)

	def __repr__(self):
		return '<Campground %s>' % self.name


class VisitorCenter(database.Model):
	__tablename__ = 'visitor_centers'
	name = database.Column(database.String, primary_key = True)
	park = database.Column(database.String)
	states = database.Column(database.String)
	description = database.Column(database.String)
	address = database.Column(database.String)
	phone_number = database.Column(database.String)
	latLong = database.Column(database.String)
	directionsUrl = database.Column(database.String)
	directionsInfo = database.Column(database.String)
	website = database.Column(database.String)

	def __repr__(self):
		return '<Visitor Center %s>' % self.fullName