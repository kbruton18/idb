import urllib2, json
import os

import MySQLdb  

from pprint import pprint

# These environment variables are configured in app.yaml.
CLOUDSQL_CONNECTION_NAME = "sweet-travels:us-central1:myinstance"
CLOUDSQL_USER = "INSERT_USER_HERE"
CLOUDSQL_PASSWORD = "INSERT_PASSWORD_HERE"


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
            passwd=CLOUDSQL_PASSWORD)

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
# response.headers['Content-Type'] = 'text/plain'
        
#           # parks request
          # endpoint = "https://developer.nps.gov/api/v1/parks?limit=1000&api_key=api_key_goes_here"
          # req = urllib2.Request(endpoint,headers={})
          
          # response = urllib2.urlopen(req)
          # the_page = response.read()
          # # response.read() returns bytes, which we need to decode into a string
          # the_page = the_page.decode("utf-8") 
          
          # data = json.loads(the_page)
          
          # # this will print out each individual entry in data
          # for x in data["data"]:
          #   print (x)

db = connect_to_cloudsql()
cursor = db.cursor()
cursor.execute('SHOW DATABASES;')

for r in cursor.fetchall():
    print('{}\n'.format(r))

print('Finished executing')
