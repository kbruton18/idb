from flask_sqlalchemy import SQLAlchemy

database = SQLAlchemy()

class Park(database.model):
	__tablename__ = 'parks'
	parkCode = Column(database.String, primary_key = True)
	fullName = Column(database.String)
	description = Column(database.String)
	designation = Column(database.String)
	directionsInfo = Column(database.String)
	directionsUrl = Column(database.String)
	latLong = Column(database.String)
	url = Column(database.String)
	weatherInfo = Column(database.String)
	states = Column(database.String)
	imageUrl = Column(database.String)

	def __repr__(self):
		return '<Park %r>' % self.fullName


class State(database.model):
	__tablename__ = 'states'
	name = Column(database.String, primary_key = True)
	abbreviations = Column(database.String)
	nicknames = Column(database.String)
	timeZone = Column(database.String)
	governor = Column(database.String)
	capital = Column(database.String)
	largestCity = Column(database.String)
	totalPopulation = Column(database.String)
	medianIncome = Column(database.String)
	nationalParks = Column(database.String)
	campgrounds = Column(database.String)
	url = Column(database.String)

	def __repr__(self):
		return '<State %r>' % self.name


class Campground(database.model):
	__tablename__ = 'campgrounds'
	name = Column(database.String, primary_key = True)
	park = Column(database.String)
	states = Column(database.String)
	description = Column(database.String)
	regulations = Column(database.String)
	wheelchairAccess = Column(database.String)
	internetInfo = Column(database.String)
	weatherInfo = Column(database.String)
	regulationsUrl = Column(database.String)
	totalSites = Column(database.Integer)
	directionsInfo = Column(database.String)
	directionsUrl = Column(database.String)
	imageUrl = Column(database.String)

	def __repr__(self):
		return '<Campground %r>' % self.name


class VisitorCenter(database.model):
	__tablename__ = 'visitor_centers'
	name = Column(database.String, primary_key = True)
	park = Column(database.String)
	states = Column(database.String)
	description = Column(database.String)
	address = Column(database.String)
	phone_number = Column(database.String)
	latLong = Column(database.String)
	directionsUrl = Column(database.String)
	directionsInfo = Column(database.String)
	website = Column(database.String)

	def __repr__(self):
		return '<Visitor Center %r>' % self.fullName