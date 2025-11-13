import Car
import BBDDConnector
from flask import Flask
from flask_cors import CORS
import main_routes

app = Flask(__name__)
CORS(app)  # Habilitar CORS para recibir requests desde React

# Registrar rutas
app.register_blueprint(main_routes)

if __name__ == "__main__":
    app.run(debug=True)
    
    