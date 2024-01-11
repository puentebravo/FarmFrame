from flask import Flask, render_template
from werkzeug.middleware.proxy_fix import ProxyFix
import urllib.request, json, urllib.parse
from waitress import serve





app = Flask(__name__)
app.wsgi_app = ProxyFix(
        app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1
)

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

        sorted_results = sorted( res_array, key= lambda chance: chance['chance'], reverse=True)

        return sorted_results


@app.route("/api/getItemDesc/<item>")
def getDesc(item):
        sanitize = item.strip()

        api_destination = "https://api.warframestat.us/items/{}".format(urllib.parse.quote(sanitize))

        page = urllib.request.Request(api_destination, headers={"User-Agent": "Mozilla/5.0"})
        response = urllib.request.urlopen(page).read()
        res_item = json.loads(response)

        return res_item
    
    

serve(app, listen="*:8080", url_scheme="https")