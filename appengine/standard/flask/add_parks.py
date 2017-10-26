from models import database, Park, Campground
import urllib2, json
import requests
from main import create_app

create_app().app_context().push()

"""Simple request handler that shows all of the MySQL variables."""
# parks request
endpoint = "https://developer.nps.gov/api/v1/parks?limit=350&fields=images&api_key=ZpESFe8R2hqjdYKmaXyiblZZeaKuYhW1l8q6WmO2"
req = urllib2.Request(endpoint,headers={})

response = urllib2.urlopen(req)
the_page = response.read()
# response.read() returns bytes, which we need to decode into a string
the_page = the_page.decode("utf-8") 
data = json.loads(the_page)
count = 0
for x in data["data"]:
    photo_endpoint = ""

    if "images" in x:
        if len(x["images"]) > 0:
            photo_endpoint = x["images"][0]["url"]
    else: 
        # format latLong for google places api endpoint creation
        latLong = x["latLong"]
        splitLatLong = latLong.split(", ")
        if len(splitLatLong) <= 1: 
            continue
        lat = splitLatLong[0].split(":")[1]
        longi = splitLatLong[1].split(":")[1]
        latLongQuery = str(lat) + "," + longi

        # format fullName for google places api endpoint creation
        fullName = x["fullName"]
        fullNameEndpointString = fullName.replace(" ", "%20")
        google_endpoint = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="
        google_endpoint = google_endpoint + latLongQuery + "&radius=500&name=" + fullNameEndpointString + "&key=AIzaSyCH_1xeQ0qsxuwRjngc5-lX7Ve9D6oIHc4"

        google_req = urllib2.Request(google_endpoint,headers={})
        google_response = urllib2.urlopen(google_req)
        google_page = google_response.read()
        google_page = google_page.decode("utf-8")
        google_data = json.loads(google_page)

        photo_reference = None
        for place in google_data["results"]:
            if place["name"] == fullName: 
                if "photos" in place: 
                    first_photo = place["photos"][0]
                    photo_reference = first_photo["photo_reference"]

        if photo_reference == None:
            continue
        else: 
            photo_endpoint = "https://maps.googleapis.com/maps/api/place/photo?photoreference=" + photo_reference + "&maxheight=300&key=AIzaSyCH_1xeQ0qsxuwRjngc5-lX7Ve9D6oIHc4"

    if "National Park" not in x["fullName"]:
        continue

    campgrounds = ""
    with database.session.no_autoflush:
        campgroundModels = database.session.query(Campground).filter(Campground.parkCode==x["parkCode"]).all()
        for c in campgroundModels:
            campgrounds += str(c.name) + ", "
        campgrounds = campgrounds.rstrip(", ")

    if campgrounds == "": 
        campgrounds = "N/A"
    park = Park(x["parkCode"], x["fullName"], x["description"],
        x["designation"], x["directionsInfo"], x["directionsUrl"],
        x["latLong"], x["url"], x["weatherInfo"], campgrounds, x["states"], 
        photo_endpoint)
    database.session.add(park)
database.session.commit()

print('Finished executing')

