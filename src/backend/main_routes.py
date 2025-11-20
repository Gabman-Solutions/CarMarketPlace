from flask import Blueprint, request, jsonify
import requests

main_routes = Blueprint('main_routes', __name__)
url = 'https://api.api-ninjas.com/v1'
API_KEY = "+OC9ZDrTJrvOpHmyHn+AmQ==TwqQIeaB5hshqkZW"

# Simulado - reemplazar con base de datos real
favorites_db = []
cars_db = []

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

@main_routes.route("/api/favorites", methods=["GET"])
def get_favorites():
    return jsonify(favorites_db), 200

@main_routes.route("/api/favorites", methods=["POST"])
def add_favorite():
    try:
        car = request.json
        favorites_db.append(car)
        return jsonify({"message": "Added to favorites"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@main_routes.route("/api/favorites/<car_id>", methods=["DELETE"])
def remove_favorite(car_id):
    global favorites_db
    try:
        favorites_db = [car for car in favorites_db if car['id'] != car_id]
        return jsonify({"message": "Removed from favorites"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@main_routes.route("/api/cars", methods=["GET"])
def get_cars():
    return jsonify(cars_db), 200

@main_routes.route("/api/cars/<car_id>", methods=["GET"])
def get_car(car_id):
    try:
        car = next((c for c in cars_db if c['id'] == car_id), None)
        if not car:
            return jsonify({"error": "Car not found"}), 404
        return jsonify(car), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500