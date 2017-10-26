from models import Park, State, Campground, VisitorCenter
from flask import Flask

# Returns a dictionary of park codes mapped to dictionaries.
# Each park's dictionary maps attribute park IDs to the park's attribute values
def get_parks_dict():
    parks_list = Park.query.all()
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
        park_dict["states"] = park.states
        park_dict["imageUrl"] = park.imageUrl
        parks[park.parkCode] = park_dict
    return parks
    
def get_parks_list():
	parks_dict = get_parks_dict()
	park_codes = parks_dict.keys()
	data = []
	for code in park_codes:
		data.append(parks_dict[code])
	return data

# Returns a park's attribute, given the park code as a string (e.g. "dena")
# and the name of the desired attribute (e.g. "imageUrl")
def get_park_attribute_code(park_code, attribute_name):
    # raises exception if park code does not match exactly one park
    park = Park.query.filter_by(parkCode=park_code).one()
    if hasattr(Park, attribute_name):
        return getattr(park, attribute_name)
    else:
        raise ValueError("attribute_name not valid")

# Returns a park's dictionary, given the park code as a string (e.g. "dena")
def get_park_dict(park_code):
  park = Park.query.filter_by(parkCode=park_code).one()
  return park.__dict__

def get_states_dict():
    states_list = State.query.all()
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
        state_dict["medianIncome"] = state.medianIncome
        state_dict["nationalParks"] = state.nationalParks
        state_dict["url"] = state.url
	# state_dict["ID"] = state.ID
        states[state.name] = state_dict
    return states

def get_state_attribute(state_name, attribute_name):
    state = State.query.filter_by(name=state_name).one()
    if hasattr(State, attribute_name):
        return getattr(state, attribute_name)
    else:
        raise ValueError("attribute_name not valid")

def get_campgrounds_dict():
    campgrounds_list = Campground.query.all()
    campgrounds = {}
    for campground in campgrounds_list:
        campground_dict = {}
        campground_dict["name"] = campground.name
        campground_dict["park"] = campground.park
        campground_dict["states"] = campground.states
        campground_dict["description"] = campground.description
        campground_dict["regulations"] = campground.regulations
        campground_dict["wheelchairAccess"] = campground.wheelchairAccess
        campground_dict["internetInfo"] = campground.internetInfo
        campground_dict["weatherInfo"] = campground.weatherInfo
        campground_dict["regulationsUrl"] = campground.regulationsUrl
        campground_dict["totalSites"] = campground.totalSites
        campground_dict["directionsInfo"] = campground.directionsInfo
        campground_dict["directonsUrl"] = campground.directonsUrl
        campground_dict["imageUrl"] = campground.imageUrl
        campgrounds[campground.name] = campground_dict
    return campgrounds

def get_campground_attribute(campground_name, attribute_name):
    campground = Campground.query.filter_by(name=campground_name).one()
    if hasattr(Campground, attribute_name):
        return getattr(campground, attribute_name)
    else:
        raise ValueError("attribute_name not valid")

def get_visitor_centers_dict():
    visitor_centers_list = VisitorCenter.query.all()
    visitor_centers = {}
    for visitor_center in visitor_centers_list:
        visitor_center_dict = {}
        visitor_center_dict["name"] = visitor_center.name
        visitor_center_dict["park"] = visitor_center.park
        visitor_center_dict["states"] = visitor_center.states
        visitor_center_dict["description"] = visitor_center.description
        visitor_center_dict["address"] = visitor_center.address
        visitor_center_dict["phone_number"] = visitor_center.phone_number
        visitor_center_dict["latLong"] = visitor_center.latLong
        visitor_center_dict["directionsUrl"] = visitor_center.directionsUrl
        visitor_center_dict["directionsInfo"] = visitor_center.directionsInfo
        visitor_center_dict["website"] = visitor_center.website
        visitor_centers[visitor_center.name] = visitor_center_dict
    return visitor_centers

def get_visitor_center_list():
    visit_dict = get_visitor_centers_dict()
    visit_code = visit_dict.keys()
    data = []
    for code in visit_code:
        data.append(visit_dict[code])
    return data

def get_visitor_center_attribute(visitor_center_name, attribute_name):
    visitor_center = VisitorCenter.query.filter_by(name=visitor_center_name).one()
    if hasattr(VisitorCenter, attribute_name):
        return getattr(visitor_center, attribute_name)
    else:
        raise ValueError("attribute_name not valid")
