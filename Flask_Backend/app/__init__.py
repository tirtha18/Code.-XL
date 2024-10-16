from flask import Flask
from flask_cors import CORS
from quart import Quart, request, jsonify
app = Flask(__name__)
CORS(app)

from app import routes