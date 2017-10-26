import models
import unittest
import api
from flask import Flask

class APITestMethods(unittest.TestCase):
  def testGetParksDict(self):
    parks = api.get_parks_dict()   
    self.assertTrue("dena" in parks.keys())
    self.assertTrue("yose" in parks.keys())
    
  def testGetParksList(self):
    parks = api.get_parks_list()
    self.assertEquals(len(parks), 58)

  def testParksStates(self):
    parks = api.get_parks_dict()
    denali = parks["dena"]
    self.assertEquals(denali["states"], "AK")

  def testParkNames(self):
    parks = api.get_parks_dict()
    denali = parks["dena"]
    self.assertEquals(denali["fullName"], "Denali National Park & Preserve")
    
  def testGetParkInfo(self):
    denali = api.get_park_info("dena")
    self.assertEquals(denali["fullName"], "Denali National Park & Preserve")

  def testGetStatesDict(self):
    states = api.get_states_dict()
    self.assertTrue("CA" in states.keys())
    self.assertFalse("XX" in states.keys())
    
  def testGetStateInfo(self):
    tx = api.get_state_info("TX")
    self.assertEquals(tx["capital"], "Austin")

  def testStatesLength(self):
    states = api.get_states_dict()
    self.assertEquals(50, len(states.keys()))

  def testStatesNames(self):
    states = api.get_states_dict()
    ca = states["CA"]
    self.assertEquals("California", ca["fullName"])

  def testStatesList(self):
    states = api.get_states_list()
    self.assertEquals(len(states), 50)

  def testCampgroundsDict(self):
    campgrounds = api.get_campgrounds_dict()
    self.assertTrue("Yosemite Creek Campground" in campgrounds.keys())
    
  def testGetCampgroundInfo(self):
    cg = api.get_campground_info("Yosemite Creek Campground")
    self.assertEquals(cg["parkCode"], "yose")
    
  def testCampgroundsList(self):
    campgrounds = api.get_campgrounds_list()
    hasCampground = False
    for dict in campgrounds:
      if dict["name"] == "Yosemite Creek Campground":
        hasCampground = True
    self.assertTrue(hasCampground)

  def testVisitorCentersDict(self):
    centers = api.get_visitor_centers_dict()
    self.assertTrue("Denali Visitor Center" in centers.keys())
    
  def testGetVisitorCenterInfo(self):
    vc = api.get_visitor_center_info("Denali Visitor Center")
    self.assertEquals(vc["parkCode"], "dena")

  def testVisitorCentersStates(self):
    centers = api.get_visitor_centers_dict()
    denali = centers["Denali Visitor Center"]
    assertEquals(denali["states"], "AK")
    
  def testVisitorCentersList(self):
    centers = api.get_visitor_centers_dict()
    hasVC = False
    for dict in centers:
      if dict["name"] == "Denali Visitor Center":
        hasVC = True
    self.assertTrue(hasVC)

if __name__ == '__main__':
  app = Flask(__name__)
  app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:swetravels@104.198.224.97/swe_travels'
  app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
  with app.app_context():
    models.database.init_app(app)
    unittest.main()
