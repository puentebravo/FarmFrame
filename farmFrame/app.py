from flask import Flask, render_template
from werkzeug.middleware.proxy_fix import ProxyFix
import urllib.request, json, urllib.parse
from waitress import serve





app = Flask(__name__)
app.wsgi_app = ProxyFix(
        app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1
)

print(app)

app.url_map.strict_slashes= False
@app.route("/")
def home():
        return render_template("index.html")

@app.route("/api/getItemDrops/<item>")
def getItem(item):

        sanitize = item.strip()

        api_destination = "https://api.warframestat.us/drops/search/{}".format(urllib.parse.quote(sanitize))
        

        page = urllib.request.Request(api_destination, headers={'User-Agent': 'Mozilla/5.0'})
        response = urllib.request.urlopen(page).read()
        res_array = json.loads(response)

        return res_array
    

@app.route("/api/getMod/<mod>")
def getMod(mod):

        sanitize = mod.strip()

        api_destination = "https://api.warframestat.us/mods/search/{}".format(urllib.parse.quote(sanitize))

        page = urllib.request.Request(api_destination, headers={'User-Agent': 'Mozilla/5.0'})
        response = urllib.request.urlopen(page).read()
        res_array = json.loads(response)

        return res_array


@app.route("/api/getWarFrame/<frame>")
def getFrame(frame):
        sanitize = frame.strip()

        api_destination = "https://api.warframestat.us/warframes/search/{}".format(urllib.parse.quote(sanitize))

        page = urllib.request.Request(api_destination, headers={'User-Agent': 'Mozilla/5.0'})
        response = urllib.request.urlopen(page).read()
        res_array = json.loads(response)

        return res_array


@app.route("/api/getWeapon/<weapon>")
def getWeapon(weapon):
        sanitize = weapon.strip()

        api_destination = "https://api.warframestat.us/weapons/{}".format(urllib.parse.quote(sanitize))
    
        page = urllib.request.Request(api_destination, headers={'User-Agent': 'Mozilla/5.0'})
        response = urllib.request.urlopen(page).read()
        res_array = json.loads(response)

        return res_array

    

serve(app, listen="*:8080", url_scheme="https")