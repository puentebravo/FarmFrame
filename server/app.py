from flask import Flask, render_template
import urllib.request, json




def create_app(text_config=None):
    app = Flask(__name__)
    app.url_map.strict_slashes= False

    @app.route("/")
    def test():
        return render_template("index.html")

    @app.route("/api/getItem/<item>")
    def getItem(item):

        api_destination = "https://api.warframestat.us/drops/search/{}".format(item)
        

        page = urllib.request.Request(api_destination, headers={'User-Agent': 'Mozilla/5.0'})
        response = urllib.request.urlopen(page).read()
        res_array = json.loads(response)

        return res_array
    
        

    
        
    return app


