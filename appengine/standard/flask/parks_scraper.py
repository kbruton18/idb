import urllib2, json
import os

import MySQLdb  

from pprint import pprint

# These environment variables are configured in app.yaml.
CLOUDSQL_CONNECTION_NAME = "sweet-travels:us-central1:myinstance"
CLOUDSQL_USER = "root"
CLOUDSQL_PASSWORD = "swetravels"


def connect_to_cloudsql():
    # When deployed to App Engine, the `SERVER_SOFTWARE` environment variable
    # will be set to 'Google App Engine/version'.
    if os.getenv('SERVER_SOFTWARE', '').startswith('Google App Engine/'):
        # Connect using the unix socket located at
        # /cloudsql/cloudsql-connection-name.
        cloudsql_unix_socket = os.path.join(
            '/cloudsql', CLOUDSQL_CONNECTION_NAME)

        db = MySQLdb.connect(
            unix_socket=cloudsql_unix_socket,
            user=CLOUDSQL_USER,
            passwd=CLOUDSQL_PASSWORD,
            db="parks",
            charset='utf8',
            use_unicode=True)

    # If the unix socket is unavailable, then try to connect using TCP. This
    # will work if you're running a local MySQL server or using the Cloud SQL
    # proxy, for example:
    #
    #   $ cloud_sql_proxy -instances=your-connection-name=tcp:3306
    #
    else:
        db = MySQLdb.connect(
            host='104.198.224.97', user=CLOUDSQL_USER, passwd=CLOUDSQL_PASSWORD,
            db="parks", charset="utf8", use_unicode=True)

    return db


"""Simple request handler that shows all of the MySQL variables."""
# parks request
endpoint = "https://developer.nps.gov/api/v1/parks?limit=519&fields=contacts&fields=entranceFees&fields=images&api_key=ZpESFe8R2hqjdYKmaXyiblZZeaKuYhW1l8q6WmO2"
req = urllib2.Request(endpoint,headers={})

response = urllib2.urlopen(req)
the_page = response.read()
# response.read() returns bytes, which we need to decode into a string
the_page = the_page.decode("utf-8") 
data = json.load(the_page)

db = connect_to_cloudsql()
cursor = db.cursor()
add_park = ("INSERT INTO parks "
   "(description, designation, directionsInfo, directionsUrl, fullName, latLong, parkCode, url, weatherInfo, states, phoneNumber, emailAddress) "
   "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)")
add_park_images = ("INSERT INTO park_images "
   "(parkCode, imageUrl) "
   "VALUES (%s, %s)")
add_park_fees = ("INSERT INTO park_fees "
   "(parkCode, cost, description, title) "
   "VALUES (%s, %d, %s, %s)")
count = 0
print(data[0])
# for x in data["data"]:
#     phone_number = ""
#     email_address = ""
#     if "contacts" in x: 
#         contact_info = x["contacts"]
#         phone_numbers = contact_info["phoneNumbers"]
#         for number in phone_numbers: 
#             if number["type"] == "Voice":
#                 phone_number = contact_info["phoneNumber"]
#         email_address = contact_info["emailAddresses"]["emailAddress"]

#     data_park = (x["description"],
#     x["designation"], x["directionsInfo"],
#     x["directionsUrl"], x["fullName"],
#     x["latLong"], x["parkCode"],
#     x["url"], x["weatherInfo"], x["states"], phone_number, email_address)


#     # try: 
#     #     cursor.execute(dad_park, data_park)
#     # except: 
#     #     print ("inserting into parks table " + x["fullName"])

#     if x["parkCode"] == "yell":
#         print(x) 
 
    # for image in x["images"]:
    #     data_park_image = (x["parkCode"], image["url"])
    #     try: 
    #         cursor.execute(add_park_images, data_park_image)
    #     except: 
    #         print ("inserting into parks_images db " + x["parkCode"])

    # for fee in x["entranceFees"]:
    #     data_park_fee = (x["parkCode"], fee["cost"], fee["description"], fee["title"])
    #     try: 
    #         cursor.execute(add_park_fees, data_park_fee)
    #     except: 
    #         print ("inserting into parks_fees db " + x["parkCode"])

print(count)

db.commit()

print('Finished executing')

