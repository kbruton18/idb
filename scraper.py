import urllib.request, json
# from pprint import pprint

# parks request
endpoint = "https://developer.nps.gov/api/v1/parks?limit=1000&api_key=api_key_goes_here"
HEADERS = {}
req = urllib.request.Request(endpoint,headers=HEADERS)

response = urllib.request.urlopen(req)
the_page = response.read()
# response.read() returns bytes, which we need to decode into a string
the_page = the_page.decode("utf-8") 

data = json.loads(the_page)

# this will print out each individual entry in data
for x in data["data"]:
  print (x)
