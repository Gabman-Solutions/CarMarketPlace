from flask import Blueprint, request, jsonify

main_routes = Blueprint('main_routes', __name__)

@main_routes.route("/api/saludo", methods=["GET"])
def get_saludo():
    return jsonify({"mensaje": "Hola desde Flask!"})

@main_routes.route("/api/enviar", methods=["POST"])
def recibir_datos():
    data = request.json
    texto = data.get("texto", "")
    return jsonify({"respuesta": f"Recibí: {texto}"})
