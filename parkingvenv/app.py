from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
import random

app = Flask(__name__)
app.config['SECRET_KEY'] = 'JVvdfvodk3443$$frefj134252'
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


class ParkingUser(db.Model):
    __tablename__ = 'parking_user'

    id = db.Column(db.Integer, primary_key=True)
    parking_id = db.Column(db.Integer, db.ForeignKey('parking.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    parking = db.relationship('Parking', backref=db.backref('users', lazy='dynamic'))
    user = db.relationship('User', backref=db.backref('parkings', lazy='dynamic'))

admin = Admin(app, name='My Admin', template_mode='bootstrap3')

admin.add_view(ModelView(User, db.session))
admin.add_view(ModelView(Parking, db.session))
admin.add_view(ParkingUser(Parking, db.session))

# Создаем базу данных
with app.app_context():
    db.create_all()

def generate_confirmation_code():
    return ''.join(str(random.randint(0, 9)) for _ in range(5))

# Это словарь, где будут храниться телефоны пользователей и соответствующие им коды подтверждения
confirmation_codes = {}

@app.route('/send_code', methods=['POST'])
def send_code():
    phone_number = request.form.get('phone_number')

    # Генерируем код подтверждения
    confirmation_code = generate_confirmation_code()

    # Сохраняем код подтверждения для данного номера телефона
    confirmation_codes[phone_number] = confirmation_code

    # Здесь должен быть код для отправки SMS с confirmation_code на указанный номер phone_number

    return f"Код подтверждения для примера - {confirmation_code}"


@app.route('/verify_code', methods=['POST'])
def verify_code():
    phone_number = request.form.get('phone_number')
    user_code = request.form.get('code')

    # Получаем сохраненный код подтверждения для данного номера телефона
    saved_code = confirmation_codes.get(phone_number)

    if saved_code and user_code == saved_code:
        # Здесь происходит аутентификация пользователя, например, устанавливается сессия или токен
        return "Пользователь аутентифицирован!"
    else:
        return "Неверный код подтверждения. Попробуйте еще раз."

@socketio.on('connect')
def handle_connect():
    parkings = Parking.query.all()
    data = [{'id': p.id, 'name': p.name, 'latitude': p.latitude, 'longitude': p.longitude,
             'free_spaces': p.free_spaces, 'total_spaces': p.total_spaces} for p in parkings]
    socketio.emit('update_map', {'parkings': data})

@socketio.on('reserve_parking')
def handle_reserve_parking(data):
    parking_id = data['parking_id']
    user = data['user_id']
    parking = Parking.query.get(parking_id)

    if parking and parking.free_spaces > 0:
        parking.free_spaces -= 1
        parking.total_spaces += 1
        db.session.add(ParkingUser(parking=parking, user=user))
        db.session.commit()

        socketio.emit('update_map', {'parkings': [{'id': parking.id, 'free_spaces': parking.free_spaces}]})

        return jsonify({'success': True, 'message': 'Parking reserved successfully.'})
    else:
        return jsonify({'success': False, 'message': 'Parking not available or does not exist.'})


@app.route('/parking/<int:parking_id>')
def parking_detail(parking_id):
    parking = Parking.query.get_or_404(parking_id)
    return render_template('parking_detail.html', parking=parking)

if __name__ == '__main__':
    socketio.run(app, debug=True)
