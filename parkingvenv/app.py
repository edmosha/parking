from flask import Flask, request, render_template

app = Flask(__name__)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        # проверка логина и пароля
        return 'Вы вошли в систему!'
    else:
        return render_template('login.html')


@app.route('/parking/pay-now', methods=['POST'])
def pay_now():
    # Логика оплаты парковки на определенное время
    ...


@app.route('/parking/pay-later', methods=['POST'])
def pay_later():
    # Логика оплаты парковки до неопределенного времени
    ...


@app.route('/parking/reserve', methods=['POST'])
def reserve_spot():
    # Логика бронирования парковочного места
    ...


@app.route('/parking/fine', methods=['POST'])
def issue_fine():
    # Логика выдачи штрафа за задержку на парковке
    ...


@app.route('/parking/evacuate', methods=['POST'])
def call_tow_truck():
    # Логика вызова эвакуатора
    ...


if __name__ == '__main__':
    app.run()
