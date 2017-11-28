from models import database, Park, VisitorCenter
import urllib2, json
import requests
from main import create_app

create_app().app_context().push()

"""Simple request handler that shows all of the MySQL variables."""
# parks request
endpoint = "https://developer.nps.gov/api/v1/visitorcenters?limit=350&api_key=ZpESFe8R2hqjdYKmaXyiblZZeaKuYhW1l8q6WmO2"
req = urllib2.Request(endpoint,headers={})

response = urllib2.urlopen(req)
the_page = response.read()
# response.read() returns bytes, which we need to decode into a string
the_page = the_page.decode("utf-8") 
data = json.loads(the_page)
count = 0
for x in data["data"]:
    photo_endpoint = ""
    park = database.session.query(Park).filter_by(parkCode=x["parkCode"]).first()

    if not park:
        continue

    # format latLong for google places api endpoint creation
    latLong = park.latLong
    splitLatLong = latLong.split(", ")
    if len(splitLatLong) <= 1: 
        continue
    lat = splitLatLong[0].split(":")[1]
    longi = splitLatLong[1].split(":")[1]
    latLongQuery = str(lat) + "," + longi

    # format fullName for google places api endpoint creation
    fullName = park.fullName
    fullNameEndpointString = fullName.replace(" ", "%20")
    google_endpoint = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="
    google_endpoint = google_endpoint + latLongQuery + "&radius=15000&name=" + fullNameEndpointString + "&key=AIzaSyCH_1xeQ0qsxuwRjngc5-lX7Ve9D6oIHc4"

    photo_reference = None
    try: 
        google_req = urllib2.Request(google_endpoint,headers={})
        google_response = urllib2.urlopen(google_req)
        google_page = google_response.read()
        google_page = google_page.decode("utf-8")
        google_data = json.loads(google_page)

        for place in google_data["results"]:
            if place["name"] == fullName: 
                if "photos" in place: 
                    first_photo = place["photos"][0]
                    photo_reference = first_photo["photo_reference"]
    except: 
        continue

    if photo_reference == None:
        continue
    else: 
        photo_endpoint = "https://maps.googleapis.com/maps/api/place/photo?photoreference=" + photo_reference + "&maxheight=300&key=AIzaSyCH_1xeQ0qsxuwRjngc5-lX7Ve9D6oIHc4"

    count += 1
    visitorCenter = VisitorCenter(x["name"], x["parkCode"], park.states,
        x["description"], x["latLong"], x["directionsUrl"],
        x["directionsInfo"], x["url"], photo_endpoint)
    database.session.add(visitorCenter)
database.session.commit()
print(count)


print('Finished executing')

