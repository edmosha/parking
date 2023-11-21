from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Parking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    total_spots = db.Column(db.Integer)
    reserved_spots = db.Column(db.Integer)
    occupied_spots = db.Column(db.Integer)
    ...


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    email = db.Column(db.String(50))
    phone = db.Column(db.String(15))
    ...
