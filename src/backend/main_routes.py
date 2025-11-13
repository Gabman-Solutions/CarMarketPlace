from flask import Blueprint, request, jsonify
import requests

main_routes = Blueprint('main_routes', __name__)
url = 'https://api.api-ninjas.com/v1'
API_KEY = "+OC9ZDrTJrvOpHmyHn+AmQ==TwqQIeaB5hshqkZW"

@main_routes.route("/api/brands", methods=["GET"])
def get_car_brands():
    try:
        headers = {
            "X-Api-Key": API_KEY,
            "Accept": "application/json"
        }
        response = requests.get(url + '/makers', headers=headers)
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({"error": f"Error: {response.status_code}"}), response.status_code
    except Exception as e:
        print('Exception occurred:', str(e))
        return jsonify({"error": str(e)}), 500

@main_routes.route("/api/models", methods=["GET"])
def get_maker_models():
    try:
        maker = request.args.get('maker')
        if not maker:
            return jsonify({"error": "Maker parameter is required"}), 400
        
        headers = {
            "X-Api-Key": API_KEY,
            "Accept": "application/json"
        }
        response = requests.get(url + f'/carmodels?make={maker}', headers=headers)
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({"error": f"Error: {response.status_code}"}), response.status_code
    except Exception as e:
        print('Exception occurred:', str(e))
        return jsonify({"error": str(e)}), 500