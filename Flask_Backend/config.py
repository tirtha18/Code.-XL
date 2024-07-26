import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'default_secret_key'
    DEBUG = True
