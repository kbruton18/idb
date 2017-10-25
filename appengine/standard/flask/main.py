from flask import Flask, render_template, request

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:swetravels@104.198.224.97/swe_travels'

@app.route('/')
@app.route('/index.html')
def index():
  return render_template('index.html')

@app.route('/about.html')
def about():
  return render_template('about.html')

@app.route('/parks.html')
def parks():
  return render_template('parks.html')

@app.route('/visitorcenters.html')
def visitorcenters():
  return render_template('visitorcenters.html')

@app.route('/states.html')
def states():
  return render_template('states.html')

@app.route('/visitorcenters/sieurdemonts.html')
def acadia_visitor_center():
  return render_template('visitorcenters/sieurdemonts.html')

@app.route('/visitorcenters/yellowstonevisitorcenter.html')
def yellowstone_visitor_center():
  return render_template('visitorcenters/yellowstonevisitorcenter.html')

@app.route('/visitorcenters/yosemitevisitorcenter.html')
def yosemite_visitor_center():
  return render_template('visitorcenters/yosemitevisitorcenter.html')

@app.route('/parks/yellowstone.html')
def yellowstone():
  return render_template('parks/yellowstone.html')

@app.route('/parks/yosemite.html')
def yosemite():
  return render_template('parks/yosemite.html')

@app.route('/parks/acadia.html')
def acadia():
  return render_template('parks/acadia.html')

@app.route('/states/california.html')
def california():
  return render_template('states/california.html')

@app.route('/states/maine.html')
def maine():
  return render_template('states/maine.html')

@app.route('/states/wyoming.html')
def wyoming():
  return render_template('states/wyoming.html')

@app.route('/campgrounds.html')
def campgrounds():
  return render_template('campgrounds/campground_landing.html')

@app.route('/campgrounds/2357')
def campground1():
  return render_template('campgrounds/campground.html', name='Mammoth Campground', park='Yellowstone National Park', state='Wyoming', description="Our only year-round campground, Mammoth is located five miles south of Gardiner, Montana and the park's North Entrance. Situated in a high sage brush steppe above the Gardner River, scattered juniper and Douglas fir trees provide shade during hot summer months. The campground is close to fishing, hiking, and the famous Mammoth Hot Springs Terraces. Great wildlife viewing opportunities abound with elk and bison occasionally passing through the campground.", sites='85', parkUrl='yellowstone.html', photoUrl='http://media-cdn.tripadvisor.com/media/photo-s/01/ad/c5/fc/mammoth-campground.jpg', attr={"Regulations": "https://www.nps.gov/yell/planyourvisit/rules.htm","Weather Overview": "Yellowstone's weather can vary greatly within a day and throughout the park. Snow can fall every month of the year. Summer highs reach 70 to 80F (25 to 30C) during the day, but nights can be cool (and it may freeze at higher elevations). During spring and fall, daytime highs range from 30 to 60F (0 to 20C), with overnight lows in the teens to single digits (-5 to -20C). Winter temperatures range from zero to 20F (-20 to -5C) throughout the day, with sub-zero temperatures overnight.", "Wheelchair Access": "Paths in the campground area are compacted gravel/dirt with some gradient change. In some cases, boardwalks have been constructed to provide easier access to facilities.", "Internet Info": "Wi-Fi is available at the Albright Visitor Center (free) and at the Mammoth Hot Springs Hotel & Cabins (fee charged).", "Total Sites": 85, "Directions Overview": "Located at Mammoth Hot Springs, five miles south of the North Entrance.", "Regulations Overview": "Overnight camping or parking is only allowed in designated campgrounds or campsites.\n\nCampsite occupancy is limited to six people per site.\n\nCheckout time is 11 am.\n\nCamping is limited to 14 days from July 1 through Labor Day, and 30 days for the rest of the year. There is no stay limit at the Fishing Bridge RV Park.\n\nUnless posted otherwise, wood and charcoal fires are permitted in all campgrounds except the Fishing Bridge RV Park. Propane grills and stoves are usually unaffected by fire restrictions.\n\nAll odorous items that may attract bears, including food, cooking gear, toiletries, and garbage, must be kept secured when not in use. Bear-proof storage boxes are available at many campsites.\n\nWhere permitted, generators may only be operated from 8 am to 8 pm (60 dB limit). Generators are not permitted at Indian Creek, Lewis Lake, Pebble Creek, Slough Creek, or Tower Fall."})

@app.route('/campgrounds/100')
def campground2():
  return render_template('campgrounds/campground.html', name='Seawall Campground', park='Acadia National Park', state='Maine', description="Seawall Campground is located on Mount Desert Island, 4 miles south of Southwest Harbor on ME 102A. It is open from late May through September. Reservations are recommended. There are walk-in and drive-up tent sites, as well as RV sites (without hookups).", parkUrl='acadia.html', photoUrl='http://media-cdn.tripadvisor.com/media/photo-s/09/41/ef/e9/seawall-campground.jpg', attr={"Regulations": "http://www.nps.gov/acad/learn/management/lawsandpolicies.htm","Weather Overview": "Summer temperatures range from 45-90F (7-30C). Fall temperatures range from 30-70F (-1-21C). Typically the first is in frost mid-October and first snowfall begins in November and can continue through April with an average accumulation of 73 inches (185 cm). Winter temperatures range from 14-35F (-10 - 2C). A limited number of primitive hike-in sites are available in the winter. Spring temperatures range from 30-70F (-1-21C).", "Total Sites": 275, "Regulations Overview": "Camp only in designated sites. Always leave something on your site to indicate occupancy. This is especially important for truck campers, vans, and RVs.\nCampsites are limited to two tents, six people, and one vehicle.\nAll equipment must be placed on the gravel portion of the site.\nConnecting to any water or electric utility is prohibited.\nPlease contact a ranger about special circumstances or extra parking.\nKeep off vegetated areas.\nDo not feed wildlife.\nDo not gather, pick, or cut wildflowers, plants, trees, rocks, or any other objects.\nDo not wash items at water faucets. All camp waste water must be disposed of in designated drains.\nStore all food and cooking equipment in an enclosed vehicle or hard-sided food locker. Place all garbage in trash containers or in your vehicle. Properly store all items that may attract wildlife.\nDriving nails, spikes, or screws into trees is prohibited.\nDigging trenches is prohibited."})


@app.route('/campgrounds/4508')
def campground3():
  return render_template('campgrounds/campground.html', name='Upper Pines', park='Yosemite National Park', state='California', description="Upper Pines Campground is in Yosemite Valley (4,000 ft / 1200m).", parkUrl='yosemite.html', photoUrl='https://img.hipcamp.com/image/upload/c_limit,f_auto,h_1200,q_60,w_1920/v1478553192/campground-photos/otkkgag1zwvqkossq8ti.jpg', attr={"Regulations": "https://www.nps.gov/yose/planyourvisit/campregs.htm","Weather Overview": "Yosemite National Park covers nearly 1,200 square miles (3,100 square km) in the Sierra Nevada, with elevations ranging from about 2,000 feet (600 m) to 13,000 ft (4,000 m). Yosemite receives 95% of its precipitation between October and May (and over 75% between November and March). Most of Yosemite is blanketed in snow from about November through May. (Yosemite Valley can be rainy or snowy in any given winter storm.)", "Wheelchair Access": "The following campsites are suitable for wheelchairs and include picnic tables with extended tops. The closest restrooms to these campsites are also wheelchair accessible. These campsites are limited to people with disabilities. Upper Pines: sites 6, 7, 21, 26, 27, 28, 29, 39, 42, and 43",  "Total Sites": 235, "Directions Overview": "Yosemite Valley, near Half Dome Village (formerly Curry Village)", "Regulations Overview": "A maximum of six people (including children) are allowed per campsite. There is no limit on the number of tents (as long as they all fit into the campsite).\n\nA maximum of two motor vehicles are allowed per campsite. All vehicles must be parked on a parking pad. Trailers don't count against the vehicle limit as long as they fit on the parking pad. Additional parking is available near each campground for no additional charge."})
