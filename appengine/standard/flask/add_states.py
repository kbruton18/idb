from models import database, State, Park, Campground
import urllib2, json
import requests
from main import create_app
from pprint import pprint

def clean_text(text):
  text = text.replace("[", "").replace("]", "")
  endIndex = text.find("<")
  if endIndex != -1:
  	text = text[0:endIndex]
  endIndex = text.find("|")
  if endIndex != -1:
  	text = text[0:endIndex]
  endIndex = text.find("(")
  if endIndex != -1:
  	text = text[0:endIndex]
  text = text.replace(")", "")
  return text

create_app().app_context().push()

"""Simple request handler that shows all of the MySQL variables."""
# parks request
start = "https://en.wikipedia.org/w/api.php?action=query&titles="
# put the states that you want scraped here. Put %20 for spaces and things like New York (state) and Washington (state) need the (state)s after it
states = "Alabama|Alaska|Arizona|Arkansas|Colorado|Connecticut|Delaware|Florida|Georgia|Hawaii|Idaho|Illinois|Indiana|Iowa|Kansas|Kentucky|Louisiana|Maine|Maryland|Massachusetts|Michigan|Minnesota|Mississippi|Missouri|Montana|Nebraska|Nevada|New%20Hampshire|New%20Jersey|New%20Mexico|New%20York%20(state)|North%20Carolina|North%20Dakota|Ohio|Oklahoma|Oregon|Pennsylvania|Rhode%20Island|South%20Carolina|South%20Dakota|Tennessee|Texas|Utah|Vermont|Virgina|Washington%20(state)|West%20Virginia|Wisconsin|Wyoming"
# states = "California"
end = "&prop=revisions&rvprop=content&format=json"
endpoint = ''.join([start, states, end])

req = urllib2.Request(endpoint,headers={"User-Agent": "UT Austin CS 373 Project (http://swetravels.me/)"})

response = urllib2.urlopen(req)
the_page = response.read()
# response.read() returns bytes, which we need to decode into a string
the_page = the_page.decode("utf-8") 
data = json.loads(the_page)
count = 0

pageids = data["query"]["pages"].keys()

for id in pageids:
  statedata = data["query"]["pages"][id]

  name = clean_text(statedata["title"])
  nickname = ""
  abbreviations = ""
  timeZone = ""
  governor = ""
  capital = ""
  largestCity = ""
  totalPopulation = ""
  totalArea = ""
  medianIncome = ""
  nationalParks = ""
  campgrounds = ""
  url = ""
  flag = ""
  flagurl = ""

  text = statedata["revisions"][0]["*"][0:10000]
  attributes = text.split('\n')
  for attribute in attributes:
    if nickname == "" and attribute.startswith("|Nickname"):
      index = attribute.find("=")
      nickname = clean_text(attribute[index+2:])
    if abbreviations == "" and attribute.startswith("|PostalAbbreviation"):
      index = attribute.find("=")
      abbreviations = clean_text(attribute[index+2:])
    if timeZone == "" and attribute.startswith("|TimeZone "):
      index = attribute.find("=")
      timeZone = clean_text(attribute[index+2:])
    if governor == "" and attribute.startswith("|Governor "):
      index = attribute.find("=")
      governor = clean_text(attribute[index+2:])
    if capital == "" and attribute.startswith("|Capital "):
      index = attribute.find("=")
      capital = clean_text(attribute[index+2:])
    if largestCity == "" and attribute.startswith("|LargestCity"):
      index = attribute.find("=")
      largestCity = clean_text(attribute[index+2:])
      if "pital" in largestCity:
        largestCity = capital
    if totalPopulation == "" and attribute.startswith("|2010Pop"):
      index = attribute.find("=")
      totalPopulation = clean_text(attribute[index+2:])
    if totalArea == "" and attribute.startswith("|TotalAreaUS"):
      index = attribute.find("=")
      totalArea = clean_text(attribute[index+2:])
    if medianIncome == "" and attribute.startswith("|MedianHouseholdIncome"):
      index = attribute.find("=")
      medianIncome = clean_text(attribute[index+2:])
    if url == "" and attribute.startswith("|Website"):
      index = attribute.find("=")
      url = attribute[index+2:]
    if flag == "" and attribute.startswith("|Flag"):
      index = attribute.find("=")
      flag = attribute[index+2:]
      flag = flag.replace(" ", "_")

      imageEndpoint = "https://commons.wikimedia.org/w/api.php?action=query&titles=File:" + flag + "&prop=imageinfo&iiprop=url&format=json"
      imageReq = urllib2.Request(imageEndpoint,headers={"User-Agent": "UT Austin CS 373 Project (http://swetravels.me/)"})
      imageResponse = urllib2.urlopen(imageReq)
      imagePage = imageResponse.read()
      # response.read() returns bytes, which we need to decode into a string
      imagePage = imagePage.decode("utf-8") 
      imageData = json.loads(imagePage)

      pageids = imageData["query"]["pages"].keys()
      for image_id in pageids:
        imageData = imageData["query"]["pages"][image_id]
        if "imageinfo" in imageData.keys():
          flagurl = imageData["imageinfo"][0]["url"]
          print(str(flagurl))
          break

  # assume abbreviations is just the postal code, which it currently is
  filter_clause = "%" + abbreviations + "%"
  parks = database.session.query(Park).filter(Park.states.like(filter_clause)).all()
  nationalParks = ""
  for p in parks:
    nationalParks += str(p.parkCode) + ","
  nationalParks = nationalParks.rstrip(",")

  campgroundModels = database.session.query(Campground).filter(Campground.states.like(filter_clause)).all()
  campgrounds = ""
  for c in campgroundModels:
    campgrounds += str(c.name) + ","
  campgrounds = campgrounds.rstrip(",")

  state = State(name, abbreviations, nickname, timeZone, governor, capital, largestCity, totalPopulation, totalArea, medianIncome, nationalParks, campgrounds, url, flagurl)
  database.session.add(state)
database.session.commit()
print('Finished executing\n')
