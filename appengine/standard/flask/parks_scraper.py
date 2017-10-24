import urllib2, json
import os

import MySQLdb  

from pprint import pprint

# These environment variables are configured in app.yaml.
CLOUDSQL_CONNECTION_NAME = "sweet-travels:us-central1:myinstance"
CLOUDSQL_USER = "USER"
CLOUDSQL_PASSWORD = "PASSWORD"


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
            host='INSERT_HOST_HERE', user=CLOUDSQL_USER, passwd=CLOUDSQL_PASSWORD,
            db="parks", charset="utf8", use_unicode=True)

    return db


"""Simple request handler that shows all of the MySQL variables."""
# parks request
endpoint = "https://developer.nps.gov/api/v1/parks?limit=1000&api_key=INSERT_API_KEY"
req = urllib2.Request(endpoint,headers={})

response = urllib2.urlopen(req)
the_page = response.read()
# response.read() returns bytes, which we need to decode into a string
the_page = the_page.decode("utf-8") 
data = json.loads(the_page)

db = connect_to_cloudsql()
cursor = db.cursor()
add_park = ("INSERT INTO parks "
   "(description, designation, directionsInfo, directionsUrl, fullName, latLong, parkCode, url, weatherInfo, states) "
   "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)")

for x in data["data"]:
    data_park = (x["description"],
    x["designation"], x["directionsInfo"],
    x["directionsUrl"], x["fullName"],
    x["latLong"], x["parkCode"],
    x["url"], x["weatherInfo"], x["states"])

    try: 
        cursor.execute(add_park, data_park)
    except: 
        print (x["fullName"])

db.commit()

print('Finished executing')

