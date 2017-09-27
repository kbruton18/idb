from flask import Flask, render_template, request

app = Flask(__name__)

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

@app.route('/cities.html')
def cities():
  return render_template('cities.html')

@app.route('/visitorcenters.html')
def visitorcenters():
  return render_template('visitorcenters.html')

@app.route('/states.html')
def states():
  return render_template('states.html')

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
  return render_template('campgrounds/campground.html', name='Mammoth Campground', park='Yellowstone National Park', state='Wyoming', description="Our only year-round campground, Mammoth is located five miles south of Gardiner, Montana and the park's North Entrance. Situated in a high sage brush steppe above the Gardner River, scattered juniper and Douglas fir trees provide shade during hot summer months. The campground is close to fishing, hiking, and the famous Mammoth Hot Springs Terraces. Great wildlife viewing opportunities abound with elk and bison occasionally passing through the campground.", sites='85')

@app.route('/campgrounds/2372')
def campground2():
  return render_template('campgrounds/campground.html', name='Madison Campground', park='Yellowstone National Park', state='Wyoming', description="One of our most popular campgrounds due to its central location and long season, Madison sits about 14 miles east from the town of West Yellowstone and 16 miles north of Old Faithful. Nearby, the Gibbon and Firehole rivers join to form the Madison, all of which are considered world-class fly fishing destinations. In spring and early summer, nearby meadows teem with wildflowers and grazing bison. In September and early October, you can often hear the bugling of bull elk.", sites='278')


@app.route('/campgrounds/2374')
def campground3():
  return render_template('campgrounds/campground.html', name='Fishing Bridge RV Park', park='Yellowstone National Park', state='Wyoming', description="Fishing Bridge RV Park is located near the Yellowstone River where it exits Yellowstone Lake on its way north toward the Grand Canyon of the Yellowstone. This is the only campground in Yellowstone to offer water, sewer, and electrical hookups for RVs. Because grizzly bears frequent the area, no tents or tent campers are allowed. Campfires are prohibited in the Fishing Bridge RV Park, including the use of portable fire pits.", sites='340')
