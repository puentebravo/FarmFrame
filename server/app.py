from flask import Flask, render_template
import urllib.request, json, urllib.parse




def create_app(text_config=None):
    app = Flask(__name__)
    app.url_map.strict_slashes= False
 
    @app.route("/")
    def test():
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
     
    return app


