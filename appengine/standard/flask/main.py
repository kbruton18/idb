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

@app.route('/campgrounds/100')
def campground2():
  return render_template('campgrounds/campground.html', name='Seawall Campground', park='Acadia National Park', state='Maine', description="Seawall Campground is located on Mount Desert Island, 4 miles south of Southwest Harbor on ME 102A. It is open from late May through September. Reservations are recommended. There are walk-in and drive-up tent sites, as well as RV sites (without hookups).", sites='275')


@app.route('/campgrounds/4508')
def campground3():
  return render_template('campgrounds/campground.html', name='Upper Pines', park='Yosemite National Park', state='California', description="Upper Pines Campground is in Yosemite Valley (4,000 ft / 1200m).", sites='235')
