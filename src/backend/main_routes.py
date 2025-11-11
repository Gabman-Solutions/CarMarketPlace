from flask import Blueprint,Flask, request, jsonify
from flask_cors import CORS
import requests

main_routes = Blueprint('main_routes', __name__)
url = 'https://api.api-ninjas.com/v1/'
app = Flask(__name__)
CORS(app)  # Habilitar CORS para recibir requests desde React
@main_routes.route("/api/brands", methods=["GET"])
def get_car_brands():
    try:
        headers = {
            "X-Api-Key": "+OC9ZDrTJrvOpHmyHn+AmQ==TwqQIeaB5hshqkZW",
            "Accept": "application/json"
        }
        response = requests.get(url + '/makers', headers=headers)
        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            posts = response.json()
            return posts
        else:
            print('Error:', response.status_code)
            return None
    except Exception as e:
        print('Exception occurred:', str(e))
        return None

@main_routes.route("/api/models", methods=["GET"])
def get_maker_models(maker):
    try:
        headers = {
            "X-Api-Key": "+OC9ZDrTJrvOpHmyHn+AmQ==TwqQIeaB5hshqkZW",
            "Accept": "application/json"
        }
        response = requests.get(url + f'/carmodels?make={maker}', headers=headers)
        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            posts = response.json()
            return posts
        else:
            print('Error:', response.status_code)
            return None
    except Exception as e:
        print('Exception occurred:', str(e))
        return None
if __name__ == '__main__':
    app.run(debug=True)