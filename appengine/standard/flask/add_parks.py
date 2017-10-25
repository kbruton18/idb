from models import database, Park
import urllib2, json

"""Simple request handler that shows all of the MySQL variables."""
# parks request
endpoint = "https://developer.nps.gov/api/v1/parks?limit=519&api_key=ZpESFe8R2hqjdYKmaXyiblZZeaKuYhW1l8q6WmO2"
req = urllib2.Request(endpoint,headers={})

response = urllib2.urlopen(req)
the_page = response.read()
# response.read() returns bytes, which we need to decode into a string
the_page = the_page.decode("utf-8") 
data = json.loads(the_page)

for x in data["data"]:
    park = Park(x["parkCode"], x["fullName"], x["description"],
        x["designation"], x["directionsInfo"], x["directionsUrl"],
        x["latLong"], x["url"], x["weatherInfo"], x["states"], "")
    database.session.add(park)

database.session.commit()

print('Finished executing')

