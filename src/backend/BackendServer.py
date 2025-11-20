
from flask import Flask
from flask_cors import CORS
from main_routes import main_routes

app = Flask(__name__)

# Configurar CORS para permitir requests desde React
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

# Registrar el blueprint
app.register_blueprint(main_routes)

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')

