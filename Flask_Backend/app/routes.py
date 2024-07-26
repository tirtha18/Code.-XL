from flask import request, jsonify
from .scraping import scrape_gfg
from .scraping import scrape_cf
from app import app


@app.route('/scrape_gfg', methods=['GET'])
def scraping_gfg():
    result = scrape_gfg()
    return (result)


@app.route('/scrape_cf', methods=['GET'])
def scraping_cf():
    result = scrape_cf()
    return (result)
