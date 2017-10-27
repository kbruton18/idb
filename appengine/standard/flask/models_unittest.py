from models import State, Park, Campground, VisitorCenter, database
import unittest
from flask import Flask

class ModelsUnitTest(unittest.TestCase):
  def setUp(self):
    database.create_all()

  def tearDown(self):
    database.session.remove()
    database.drop_all()

  def testState_1(self):
    texas = State("Texas", "TX", "Best State Ever", "CST", "Rick Perry", 
      "Austin", "San Antonio", 1000, 1300, 1200, "Big Bend", "Campground 1",
      "https://www.google.com", "imageUrl")
    database.session.add(texas)

    state = State.query.first()
    self.assertTrue(state.name == "Texas")
    self.assertTrue(state.abbreviations == "TX")

    
  def testPark_1(self):
    park = Park("pppp", "name!", "desc", "hello", "directionsInfo", "directionsUrl", 
    "111,444", "https://www.facebook.com", "It's raining", "Campground 10", "TX, WA",
    "http://www.piazza.com")
    database.session.add(park)

    park = Park.query.first()
    self.assertTrue(park.fullName == "name!")
    self.assertTrue(park.weatherInfo == "It's raining")

  def testCampground_1(self):
    campground = Campground("This is name", "abcd", "CT", "good description", 
    "There are many regulations here.", "wheelchair access is good", 
    "lots of internet here", "Weather is pretty good", "google.com", 170, "go right",
    "another url", "piazza.com")
    database.session.add(campground)

    campground = Campground.query.first()
    self.assertTrue(campground.totalSites == 170)
    self.assertTrue(campground.internetInfo == "lots of internet here")

  def testVisitorCenter_1(self):
    visitorCenter = VisitorCenter("my name", "abab", "TX, WY", "description", 
    "111,444", "https://www.facebook.com", "Directions!", "www.swetravels.me", 
    "blah blah")
    database.session.add(visitorCenter)

    visitorCenter = VisitorCenter.query.first()
    self.assertTrue(visitorCenter.name == "my name")
    self.assertTrue(visitorCenter.imageUrl == "blah blah")

if __name__ == '__main__':
  app = Flask(__name__)
  app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:swetravels@104.198.224.97/test_db'
  app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
  with app.app_context():
    database.init_app(app)
    unittest.main()
