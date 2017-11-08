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
    terms = term.split()
    for park in all_parks:
        for search_term in terms:
            if park.search(search_term):
                parks_list.append(park)
                break
    parks_dict = create_parks_dict(parks_list)
    return parks_dict

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
def get_parks_dict(args):
    parks_list = []
    if 'states' not in args: 
        parks_list = Park.query.all()
    else: 
        filterString = args['states']
        filter_values = filterString.split(",")
        for string in filter_values:
            parks_list += Park.query.filter(Park.states.contains(string)).all()
    return create_parks_dict(parks_list)

# Helper to make parks lists out of parks dicts
def create_parks_list(parks_dict):
    park_codes = parks_dict.keys()
    data = []
    for code in park_codes:
        data.append(parks_dict[code])
    return data

# Return all info about all national parks, in list format
def get_parks_list(args):
	return create_parks_list(get_parks_dict(args))

# Returns a park's dictionary, given the park code as a string (e.g. "dena")
def get_park_info(park_code, args):
    park_dict = get_parks_dict(args)
    return park_dict[park_code]
    
def search_states(term):
    all_states = State.query.all()
    states_list = []
    for state in all_states:
        if state.search(term):
            states_list.append(state)
    states_dict = create_states_dict(states_list)
    return states_dict
    
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
        states[state.abbreviations] = state_dict
    return states

def get_states_dict(args):
    states_list = []
    # if the user wants a specific timezone, parse the arguments and find states for each
    if 'timezone' in args:
        filterString = args['timezone']
        filter_values = filterString.split(",")
        for string in filter_values: 
            states_list += State.query.filter(State.timeZone.contains(string)).all()
    # if the user wants states with national parks, return all with national parks
    if 'nationalParks' in args and args['nationalParks'] == "True": 
        states_list += State.query.filter(State.nationalParks != "None").all()
    if 'nationalParks' in args and args['nationalParks'] == "False": 
        states_list += State.query.filter(State.nationalParks == "None").all()
    # if no filters are specified, return all states
    if 'timezone' not in args and 'nationalParks' not in args: 
        states_list = State.query.all()
    return create_states_dict(states_list)

def get_states_list(args):
    states_dict = get_states_dict(args)
    states_codes = states_dict.keys()
    data = []
    for code in states_codes:
        data.append(states_dict[code])
    return data

def get_state_info(abbreviation, args):
    state_dict = get_states_dict(args)
    return state_dict[abbreviation]
    
def search_campgrounds(term):
    all_campgrounds = Campground.query.all()
    campgrounds_list = []
    for campground in all_campgrounds:
        if campground.search(term):
            campgrounds_list.append(campground)
    campgrounds_dict = create_campgrounds_dict(campgrounds_list)
    return campgrounds_dict
    
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
        campgrounds[campground.name] = campground_dict
    return campgrounds

def get_campgrounds_dict(args):
    campgrounds_list = []
    if 'states' in args: 
        filterString = args['states']
        filter_values = filterString.split(",")
        for string in filter_values:
            campgrounds_list += Campground.query.filter(Campground.states.like(string + "%")).all()

    if 'parkCode' in args: 
        filterString = args['parkCode']
        filter_values = filterString.split(",")
        for string in filter_values:
            campgrounds_list += Campground.query.filter(Campground.parkCode.like(string + "%")).all()

    if 'states' not in args and 'parkCode' not in args:
        campgrounds_list = Campground.query.all()
    return create_campgrounds_dict(campgrounds_list)
    
def get_campgrounds_list(args):
    campgrounds_dict = get_campgrounds_dict(args)
    campgrounds_codes = campgrounds_dict.keys()
    data = []
    for code in campgrounds_codes:
        data.append(campgrounds_dict[code])
    return data

def get_campground_info(name, args):
    campground_dict = get_campgrounds_dict(args)
    return campground_dict[name]
    
def search_visitor_centers(term):
    all_visitor_centers = VisitorCenter.query.all()
    visitor_centers_list = []
    for visitor_center in all_visitor_centers:
        if visitor_center.search(term):
            visitor_centers_list.append(visitor_center)
    visitor_centers_dict = create_visitor_centers_dict(visitor_centers_list)
    return visitor_centers_dict
    
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
        visitor_centers[visitor_center.name] = visitor_center_dict
    return visitor_centers

def get_visitor_centers_dict(args):
    visitor_centers_list = []
    # look for matching states, if there is a state filter
    if 'states' in args:
        filterString = args['states']
        filter_values = filterString.split(",")
        for string in filter_values:
            visitor_centers_list += VisitorCenter.query.filter(VisitorCenter.states.like(string + "%")).all()
    # look for matching parkCodes, if the http requested filtered data
    if 'parks' in args: 
        filterString = args['parks']
        filter_values = filterString.split(",")
        for string in filter_values:
            visitor_centers_list += VisitorCenter.query.filter(VisitorCenter.parkCode.like(string + "%")).all()

    # if no filter, return all visitor centers
    if not 'parks' in args and not 'states' in args: 
        visitor_centers_list = VisitorCenter.query.all()
    return create_visitor_centers_dict(visitor_centers_list)

def get_visitor_centers_list(args):
    vc_dict = get_visitor_centers_dict(args)
    vc_codes = vc_dict.keys()
    data = []
    for code in vc_codes:
            data.append(vc_dict[code])
    return data      

def get_visitor_center_info(name, args):
    vc_dict = get_visitor_centers_dict(args)
    return vc_dict[name]

