from models import Park

def get_parks():
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

# Enter park code as a string, e.g. "dena" and the name of the desired
# attribute, e.g. "imageUrl"
def get_park_attribute(park_code, attribute_name):
    park = Park.query.filter_by(parkCode=park_code).first()
    return getattr(park, attribute_name)
