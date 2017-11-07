import models
import unittest
import api
from flask import Flask

class APITestMethods(unittest.TestCase):
  def testParksSearch(self):
    parks = api.search_parks("Yosemite")
    self.assertTrue("yose" in parks.keys())
    self.assertEquals(2, len(parks.keys()))
 
  def testGetParksDict(self):
    parks = api.get_parks_dict()   
    self.assertTrue("dena" in parks.keys())
    self.assertTrue("yose" in parks.keys())
    
  def testGetParksList(self):
    parks = api.get_parks_list()
    self.assertEquals(len(parks), 45)

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
    self.assertTrue("TX" in states.keys())
    self.assertFalse("XX" in states.keys())
    
  def testGetStateInfo(self):
    tx = api.get_state_info("TX")
    self.assertEquals(tx["capital"], "Austin, Texas")

  def testStatesLength(self):
    states = api.get_states_dict()
    self.assertEquals(44, len(states.keys()))

  def testStatesNames(self):
    states = api.get_states_dict()
    ca = states["TX"]
    self.assertEquals("Texas", ca["name"])

  def testStatesList(self):
    states = api.get_states_list()
    self.assertEquals(len(states), 44)

  def testCampgroundsDict(self):
    campgrounds = api.get_campgrounds_dict()
    self.assertTrue("White River" in campgrounds.keys())
    
  def testGetCampgroundInfo(self):
    cg = api.get_campground_info("White River")
    self.assertEquals(cg["parkCode"], "mora")
    
  def testCampgroundsList(self):
    campgrounds = api.get_campgrounds_list()
    hasCampground = False
    for dict in campgrounds:
      if dict["name"] == "Fake Campground":
        hasCampground = True
    self.assertFalse(hasCampground)

  def testVisitorCentersDict(self):
    centers = api.get_visitor_centers_dict()
    self.assertFalse("Fake Visitor Center" in centers.keys())
    
  def testGetVisitorCenterInfo(self):
    vc = api.get_visitor_center_info("Village Green Information Center")
    self.assertEquals(vc["parkCode"], "acad")

  def testVisitorCentersStates(self):
    centers = api.get_visitor_centers_dict()
    cen = centers["Village Green Information Center"]
    self.assertEquals(cen["states"], "ME")
    
  def testVisitorCentersList(self):
    centers = api.get_visitor_centers_dict()
    self.assertFalse("wica" in centers.keys())
    self.assertTrue("Village Green Information Center" in centers.keys())
    self.assertFalse("abcd" in centers.keys())


if __name__ == '__main__':
  app = Flask(__name__)
  app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:swetravels@104.198.224.97/swe_travels'
  app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
  with app.app_context():
    models.database.init_app(app)
    unittest.main()
