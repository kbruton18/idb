from models import Park, State, Campground, VisitorCenter
from flask import Flask

def search_instances(term):
    instances_dict = search_parks(term)
    instances_dict.update(search_states(term))
    instances_dict.update(search_campgrounds(term))
    instances_dict.update(search_visitor_centers(term))
    return instances_dict

def search_parks(term):
    all_parks = Park.query.all()
    parks_list = []
    for park in all_parks:
        if park.search(term):
            parks_list.append(park)
    parks_dict = create_parks_dict(parks_list)
    return parks_dict

def search_states(term):
    all_states = State.query.all()
    states_list = []
    for state in all_states:
        if state.search(term):
            states_list.append(state)
    states_dict = create_states_dict(states_list)
    return states_dict

# Helper function to create park dicts
def create_parks_dict(parks_list):
    parks = {}
    for park in parks_list:
        park_dict = {}
        park_dict["parkCode"] = park.parkCode
        park_dict["fullName"] = park.fullName
        park_dict["description"] = park.description
        park_dict["designation"] = park.designation
        park_dict["directionsInfo"] = park.directionsInfo
        park_dict["directionsUrl"] = park.directionsUrl
        park_dict["latLong"] = park.latLong
        park_dict["url"] = park.url
        park_dict["weatherInfo"] = park.weatherInfo
        park_dict["campgrounds"] = park.campgrounds
        park_dict["states"] = park.states
        park_dict["imageUrl"] = park.imageUrl
        park_dict["searchString"] = park.searchString
        parks[park.parkCode] = park_dict
    return parks

# Returns a dictionary of park codes mapped to dictionaries.
# Each park's dictionary maps attribute park IDs to the park's attribute values
def get_parks_dict(filter_values):
    parks_list = {}
    if not filter_values: 
        parks_list = Park.query.all()
    else: 
        states = filter_values.split(",")
        for x in states: 
            parks_list.append(Park.query.filter(Park.states.contains(x)))

def get_parks_dict():
    parks_list = Park.query.all()
    return create_parks_dict(parks_list)

# Helper to make parks lists out of parks dicts
def create_parks_list(parks_dict):
    park_codes = parks_dict.keys()
    data = []
    for code in park_codes:
        data.append(parks_dict[code])
    return data

# Return all info about all national parks, in list format
def get_parks_list():
    return create_parks_list(get_parks_dict())

# Returns a park's dictionary, given the park code as a string (e.g. "dena")
def get_park_info(park_code):
    park_dict = get_parks_dict()
    return park_dict[park_code]

# Helper method to make states dictionary
def create_states_dict(states_list):
    states = {}
    for state in states_list:
        state_dict = {}
        state_dict["name"] = state.name
        state_dict["abbreviations"] = state.abbreviations
        state_dict["nicknames"] = state.nicknames
        state_dict["timeZone"] = state.timeZone
        state_dict["governor"] = state.governor
        state_dict["capital"] = state.capital
        state_dict["largestCity"] = state.largestCity
        state_dict["totalPopulation"] = state.totalPopulation
        state_dict["totalArea"] = state.totalArea
        state_dict["medianIncome"] = state.medianIncome
        state_dict["nationalParks"] = state.nationalParks
        state_dict["campgrounds"] = state.campgrounds
        state_dict["url"] = state.url
        state_dict["imageUrl"] = state.imageUrl
        state_dict["searchString"] = state.searchString
        states[state.abbreviations] = state_dict
    return states

def get_states_dict():
    states_list = State.query.all()
    return create_states_dict(states_list)

def get_states_list():
    states_dict = get_states_dict()
    states_codes = states_dict.keys()
    data = []
    for code in states_codes:
        data.append(states_dict[code])
    return data

def get_state_info(abbreviation):
    state_dict = get_states_dict()
    return state_dict[abbreviation]
    
def search_campgrounds(term):
    all_campgrounds = Campground.query.all()
    campgrounds_list = []
    for campground in all_campgrounds:
        if campground.search(term):
            campgrounds_list.append(campground)
    campgrounds_dict = create_campgrounds_dict(campgrounds_list)
    return campgrounds_dict

# Helper method to create campground dictionaries
def create_campgrounds_dict(campgrounds_list):
    campgrounds = {}
    for campground in campgrounds_list:
        campground_dict = {}
        campground_dict["name"] = campground.name
        campground_dict["parkCode"] = campground.parkCode
        campground_dict["states"] = campground.states
        campground_dict["description"] = campground.description
        campground_dict["regulations"] = campground.regulationsOverview
        campground_dict["wheelchairAccess"] = campground.wheelchairAccess
        campground_dict["internetInfo"] = campground.internetInfo
        campground_dict["weatherInfo"] = campground.weatherInfo
        campground_dict["regulationsUrl"] = campground.regulationsUrl
        campground_dict["totalSites"] = campground.totalSites
        campground_dict["directionsInfo"] = campground.directionsInfo
        campground_dict["directionsUrl"] = campground.directionsUrl
        campground_dict["imageUrl"] = campground.imageUrl
        campground_dict["searchString"] = campground.searchString
        campgrounds[campground.name] = campground_dict
    return campgrounds

def get_campgrounds_dict():
    campgrounds_list = Campground.query.all()
    return create_campgrounds_dict(campgrounds_list)

def get_campgrounds_list():
    campgrounds_dict = get_campgrounds_dict()
    campgrounds_codes = campgrounds_dict.keys()
    data = []
    for code in campgrounds_codes:
        data.append(campgrounds_dict[code])
    return data

def get_campground_info(name):
    campground_dict = get_campgrounds_dict()
    return campground_dict[name]

def search_visitor_centers(term):
    all_visitor_centers = VisitorCenter.query.all()
    visitor_centers_list = []
    for visitor_center in all_visitor_centers:
        if visitor_center.search(term):
            visitor_centers_list.append(visitor_center)
    visitor_centers_dict = create_visitor_centers_dict(visitor_centers_list)
    return visitor_centers_dict

# Helper method to make visitor center dictionaries
def create_visitor_centers_dict(visitor_centers_list):
    visitor_centers = {}
    for visitor_center in visitor_centers_list:
        visitor_center_dict = {}
        visitor_center_dict["name"] = visitor_center.name
        visitor_center_dict["parkCode"] = visitor_center.parkCode
        visitor_center_dict["states"] = visitor_center.states
        visitor_center_dict["description"] = visitor_center.description
        visitor_center_dict["latLong"] = visitor_center.latLong
        visitor_center_dict["directionsUrl"] = visitor_center.directionsUrl
        visitor_center_dict["directionsInfo"] = visitor_center.directionsInfo
        visitor_center_dict["website"] = visitor_center.website
        visitor_center_dict["imageUrl"] = visitor_center.imageUrl
        visitor_center_dict["searchString"] = visitor_center.searchString
        visitor_centers[visitor_center.name] = visitor_center_dict
    return visitor_centers

def get_visitor_centers_dict():
    visitor_centers_list = VisitorCenter.query.all()
    return create_visitor_centers_dict(visitor_centers_list)

def get_visitor_centers_list():
    vc_dict = get_visitor_centers_dict()
    vc_codes = vc_dict.keys()
    data = []
    for code in vc_codes:
            data.append(vc_dict[code])
    return data

def get_visitor_center_info(name):
    vc_dict = get_visitor_centers_dict()
    return vc_dict[name]