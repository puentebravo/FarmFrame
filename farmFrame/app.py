from flask import Flask, render_template
import urllib.request, json, urllib.parse
from waitress import serve





app = Flask(__name__)

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

        try:
                response = urllib.request.urlopen(page).read()
                res_item = json.loads(response)
                return res_item
        except urllib.error.HTTPError as e:
                return {"error": e.code }
    
    

serve(app, listen="*:8080", url_scheme="https")