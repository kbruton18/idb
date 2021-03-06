from models import Park, State, Campground, VisitorCenter
import models
import unittest
import api
from flask import Flask

# Unit tests for api.py, the API for the Sweet Travels web app.
class APITestMethods(unittest.TestCase):
    def testSearchTermParser(self):
        term = 'yes yes no'
        expected_list = ["yes", "yes", "no"]
        actual_list = api.get_search_terms(term)
        self.assertEquals(expected_list, actual_list)

    def testSearchTermParserWithQuotes(self):
        term = 'yes  yes "hello and" yes  "hello a"'
        expected_list = ['yes', 'yes', 'hello and', 'yes', 'hello a']
        actual_list = api.get_search_terms(term)
        self.assertEquals(expected_list, actual_list)

    def testGlobalSearch(self):
        instances = api.search_instances("wica")
        self.assertTrue("wica" in instances.keys())
        self.assertTrue("Elk Mountain Campground" in instances.keys())
        self.assertTrue("Wind Cave Visitor Center" in instances.keys())
        self.assertTrue("SD" in instances.keys())
        self.assertEquals(4, len(instances.keys()))

    def testParksSearch(self):
        parks = api.search_parks("Yosemite")
        self.assertTrue("yose" in parks.keys())
        self.assertEquals(2, len(parks.keys()))
        
    def testCaseInsensitiveSearch(self):
        parks = api.search_parks("YoSEMIte")
        self.assertTrue("yose" in parks.keys())
        self.assertEquals(2, len(parks.keys()))
        
    def testCaseInsensitiveAbbreviations(self):
        results = api.search_instances("tx")
        self.assertTrue("TX" in results.keys())
        
    def testParksSearchMultipleTerms(self):
        parks = api.search_parks("Yosemite Denali")
        self.assertTrue("yose" in parks.keys())
        self.assertTrue("dena" in parks.keys())
        self.assertEquals(3, len(parks.keys()))

    def testStatesSearch(self):
        states = api.search_states("Sunshine")
        self.assertTrue("FL" in states.keys())
        self.assertEquals(1, len(states.keys()))
    
    def testStatesSearchMultipleTerms(self):
        states = api.search_states("Sunshine California")
        self.assertTrue("FL" in states.keys())
        self.assertTrue("CA" in states.keys())
        self.assertEquals(2, len(states.keys()))
        
    def testStatesMultiWordSearch(self):
        states = api.search_states('"New Mexico"')
        self.assertTrue("NM" in states.keys())
        self.assertEquals(1, len(states.keys()))

    def testCampgroundsSearch(self):
        campgrounds = api.search_campgrounds("Summerland")
        self.assertTrue("White River" in campgrounds.keys())
        self.assertEquals(1, len(campgrounds.keys()))
        campground = campgrounds["White River"]
        self.assertEquals(campground["parkName"], "Mount Rainier National Park")

    def testVisitorCentersSearch(self):
        vcs = api.search_visitor_centers("Ashford")
        self.assertTrue("Longmire Museum")
        self.assertEquals(1, len(vcs.keys()))

    def testGetParksDict(self):
        parks = api.get_parks_dict("")
        self.assertTrue("dena" in parks.keys())
        self.assertTrue("yose" in parks.keys())

    def testGetParksList(self):
        parks = api.get_parks_list(api.get_parks_dict(""))
        self.assertEquals(len(parks), 100)

    def testParksStates(self):
        parks = api.get_parks_dict("")
        denali = parks["dena"]
        self.assertEquals(denali["states"], "AK")

    def testParkNames(self):
        parks = api.get_parks_dict("")
        denali = parks["dena"]
        self.assertEquals(denali["fullName"], "Denali National Park & Preserve")

    def testGetParkInfo(self):
        denali = api.get_park_info("dena", "")
        self.assertEquals(denali["fullName"], "Denali National Park & Preserve")

    def testGetStatesDict(self):
        states = api.get_states_dict("")
        self.assertTrue("TX" in states.keys())
        self.assertFalse("XX" in states.keys())

    def testGetStateInfo(self):
        tx = api.get_state_info("TX", "")
        self.assertEquals(tx["capital"], "Austin, Texas")

    def testStatesLength(self):
        states = api.get_states_dict("")
        self.assertEquals(50, len(states.keys()))

    def testStatesNames(self):
        states = api.get_states_dict("")
        ca = states["TX"]
        self.assertEquals("Texas", ca["name"])

    def testStatesList(self):
        states = api.get_states_list(api.get_states_dict(""))
        self.assertEquals(len(states), 50)

    def testCampgroundsDict(self):
        campgrounds = api.get_campgrounds_dict("")
        self.assertTrue("White River" in campgrounds.keys())

    def testGetCampgroundInfo(self):
        cg = api.get_campground_info("White River", "")
        self.assertEquals(cg["parkCode"], "mora")

    def testCampgroundsList(self):
        campgrounds = api.get_campgrounds_list(api.get_campgrounds_dict(""))
        hasCampground = False
        for dict in campgrounds:
            if dict["name"] == "Fake Campground":
                hasCampground = True
        self.assertFalse(hasCampground)

    def testVisitorCentersDict(self):
        centers = api.get_visitor_centers_dict("")
        self.assertFalse("Fake Visitor Center" in centers.keys())

    def testGetVisitorCenterInfo(self):
        vc = api.get_visitor_center_info("Village Green Information Center", "")
        self.assertEquals(vc["parkCode"], "acad")

    def testVisitorCentersStates(self):
        centers = api.get_visitor_centers_dict("")
        cen = centers["Village Green Information Center"]
        self.assertEquals(cen["states"], "ME")

    def testVisitorCentersList(self):
        centers = api.get_visitor_centers_dict("")
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
