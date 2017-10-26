import models
import unittest
import api
from flask import Flask

class APITestMethods(unittest.TestCase):
  def testGetParksDict(self):
    parks = api.get_parks_dict()   
    self.assertTrue("dena" in parks.keys())
    self.assertTrue("yose" in parks.keys())

  def testParksStates(self):
    parks = api.get_parks_dict()
    denali = parks["dena"]
    self.assertEquals(denali["states"], "AK")

  def testParkNames(self):
    parks = api.get_parks_dict()
    denali = parks["dena"]
    self.assertEquals(denali["fullName"], "Denali National Park & Preserve")

  def testGetStatesDict(self):
    states = api.get_states_dict()
    self.assertTrue("California" in states.keys())
    self.assertFalse("XX" in states.keys())

  def testStatesNumbers(self):
    states = api.get_states_dict()
    self.assertEquals(50, len(states.keys()))

  def testStatesNames(self):
    states = api.get_states_dict()
    ca = states["California"]
    self.assertEquals("California", ca["fullName"])
  
  def testStatesCapitals(self):
    states = api.get_states_dict()
    ca = states["California"]
    self.assertEquals("Los Angeles", ca["capital"])

  def testStatesAbbreviations(self):
    states = api.get_states_dict()
    ca = states["California"]
    self.assertEquals("CA", ca["abbreviations"])

  def testCampgroundsDict(self):
    campgrounds = api.get_campgrounds_dict()
    self.assertTrue(True)

  def testVisitorCentersDict(self):
    centers = api.get_visitor_centers_dict()
    self.assertTrue("Denali Visitor Center" in centers.keys())

  def testVisitorCentersStates(self):
    centers = api.get_visitor_centers_dict()
    denali = centers["Denali Visitor Center"]
    assertEquals(denali["states"], "AK")

if __name__ == '__main__':
  app = Flask(__name__)
  app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:swetravels@104.198.224.97/swe_travels'
  app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
  with app.app_context():
    models.database.init_app(app)
    unittest.main()