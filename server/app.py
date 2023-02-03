from flask import Flask


def create_app(text_config=None):
    app = Flask(__name__)
    app.url_map.strict_slashes= False

    @app.route("/getStock")
    def test():
        return "<h1>This works</h1>"
        
    return app


