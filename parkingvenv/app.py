from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///parking.db'
db = SQLAlchemy(app)
socketio = SocketIO(app)

class Parking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    total_spaces = db.Column(db.Integer, nullable=False)
    free_spaces = db.Column(db.Integer, nullable=False)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    phone_number = db.Column(db.String(20))
    email = db.Column(db.String(100))

admin = Admin(app, name='My Admin', template_mode='bootstrap3')

admin.add_view(ModelView(User, db.session))
admin.add_view(ModelView(Parking, db.session))

# Создаем базу данных
with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return render_template('area_parking.html')

@socketio.on('connect')
def handle_connect():
    parkings = Parking.query.all()
    data = [{'id': p.id, 'name': p.name, 'latitude': p.latitude, 'longitude': p.longitude,
             'free_spaces': p.free_spaces, 'total_spaces': p.total_spaces} for p in parkings]
    socketio.emit('update_map', {'parkings': data})

@socketio.on('reserve_parking')
def handle_reserve_parking(data):
    parking_id = data['parking_id']
    parking = Parking.query.get(parking_id)

    if parking and parking.free_spaces > 0:
        parking.free_spaces -= 1
        parking.total_spaces += 1
        db.session.commit()

        socketio.emit('update_map', {'parkings': [{'id': parking.id, 'free_spaces': parking.free_spaces}]})

        return jsonify({'success': True, 'message': 'Parking reserved successfully.'})
    else:
        return jsonify({'success': False, 'message': 'Parking not available or does not exist.'})

if __name__ == '__main__':
    socketio.run(app, debug=True)
