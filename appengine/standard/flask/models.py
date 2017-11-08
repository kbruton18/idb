from flask_sqlalchemy import SQLAlchemy

database = SQLAlchemy()

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
    campgrounds = database.Column(database.Text)
    states = database.Column(database.Text)
    imageUrl = database.Column(database.Text)
    searchString = ''

    def __init__(self, parkCode, fullName, description, designation,
        directionsInfo, directionsUrl, latLong, url, weatherInfo,
        campgrounds, states, imageUrl):
        self.parkCode = parkCode
        self.fullName = fullName
        self.description = description
        self.designation = designation
        self.directionsInfo = directionsInfo
        self.directionsUrl = directionsUrl
        self.latLong = latLong
        self.url = url
        self.weatherInfo = weatherInfo
        self.campgrounds = campgrounds
        self.states = states
        self.imageUrl = imageUrl

    def __repr__(self):
        return '<Park %s: ParkCode=%s>' % self.fullName, self.parkCode
        
    def search(self, term):
        self.searchString = ''
        if self.fullName.find(term) != -1:
            self.searchString = 'Name: %s' % self.fullName
        elif self.parkCode.find(term) != -1:
            self.searchString = 'Park Code: %s' % self.parkCode
        elif self.states.find(term) != -1:
            self.searchString = 'State(s): %s' % self.states
        elif self.description.find(term) != -1:
            self.searchString = 'Description: %s' % self.description
        elif self.designation.find(term) != -1:
            self.searchString = 'Designation: %s' % self.designation
        elif self.campgrounds.find(term) != -1:
            self.searchString = 'Campgrounds: %s' % self.campgrounds
        elif self.latLong.find(term) != -1:
            self.searchString = 'Lat Long: %s' % self.latLong
        elif self.directionsInfo.find(term) != -1:
            self.searchString = 'Directions Info: %s' % self.directionsInfo
        elif self.directionsUrl.find(term) != -1:
            self.searchString = 'Directions URL: %s' % self.directionsUrl
        elif self.weatherInfo.find(term) != -1:
            self.searchString = 'Weather Info: %s' % self.weatherInfo
        elif self.url.find(term) != -1:
            self.searchString = 'Website: %s' % self.url

        if self.searchString == '':
            return False
        else:
            return True


class State(database.Model):
    __tablename__ = 'states'
    name = database.Column(database.String(200))
    abbreviations = database.Column(database.String(200), primary_key = True)
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
    imageUrl = database.Column(database.Text)
    searchString = ""

    def __init__(self, name, abbreviations, nicknames, timeZone, governor,
        capital, largestCity, totalPopulation, totalArea, medianIncome,
        nationalParks, campgrounds, url, imageUrl):
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
        self.imageUrl = imageUrl

    def __repr__(self):
        return '<State %s>' % self.name
        
    def search(self, term):
        self.searchString = ''
        if self.name.find(term) != -1:
            self.searchString = 'Name: %s' % self.name
        elif self.abbreviations.find(term) != -1:
            elf.searchString = 'Abbreviations: %s' % self.abbreviations
        elif self.nicknames.find(term) != -1:
            self.searchString = 'Nicknames: %s' % self.nicknames
        elif self.timeZone.find(term) != -1:
            self.searchString = 'Time Zone: %s' % self.timeZone
        elif self.governor.find(term) != -1:
            self.searchString = 'Governor: %s' % self.governor
        elif self.capital.find(term) != -1:
            self.searchString = 'Capital: %s' % self.capital
        elif self.largestCity.find(term) != -1:
            self.searchString = 'Largest City: %s' % self.largestCity
        elif self.totalPopulation.find(term) != -1:
            self.searchString = 'Total Population: %s' % self.totalPopulation
        elif self.totalArea.find(term) != -1:
            self.searchString = 'Total Area: %s' % self.totalArea
        elif self.medianIncome.find(term) != -1:
            self.searchString = 'Median Income: %s' % self.medianIncome
        elif self.nationalParks != None and self.nationalParks.find(term) != -1:
            self.searchString = 'National Parks: %s' % self.nationalParks
        elif self.campgrounds != None and self.campgrounds.find(term) != -1:
            self.searchString = 'Campgrounds: %s' % self.campgrounds
        elif self.url.find(term) != -1:
            self.searchString = 'Website: %s' % self.url

        if self.searchString == '':
            return False
        else:
            return True


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

    def search(self, term):
        self.searchString = ''
        if self.name.find(term) != -1:
            self.searchString = 'Name: %s' % self.name
        elif self.parkCode.find(term) != -1:
            self.searchString = 'Park Code: %s' % self.parkCode
        elif self.states.find(term) != -1:
            self.searchString = 'State(s): %s' % self.states
        elif self.description.find(term) != -1:
            self.searchString = 'Description: %s' % self.description
        elif self.regulationsOverview.find(term) != -1:
            self.searchString = 'Regulations: %s' % self.regulationsOverview
        elif self.regulationsUrl.find(term) != -1:
            self.searchString = 'Regulations URL: %s' % self.regulationsUrl
        elif self.wheelchairAccess.find(term) != -1:
            self.searchString = 'Wheelchair Access: %s' % self.wheelchairAccess
        elif self.internetInfo.find(term) != -1:
            self.searchString = 'Internet Info: %s' % self.internetInfo
        elif self.directionsInfo.find(term) != -1:
            self.searchString = 'Directions Info: %s' % self.directionsInfo
        elif self.directionsUrl.find(term) != -1:
            self.searchString = 'Directions URL: %s' % self.directionsUrl

        if self.searchString == '':
            return False
        else:
            return True

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
