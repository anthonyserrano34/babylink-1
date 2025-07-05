from flask import Flask, render_template, request
from flask_socketio import SocketIO
import serial
import threading

# Connexion au port série de l'Arduino
ser = serial.Serial('/dev/ttyACM0', 9600, timeout=1)

# Création de l'app Flask + SocketIO
app = Flask(__name__)
socketio = SocketIO(app)
score = {'GAUCHE': 0, 'DROITE': 0}

# Route principale : page HTML
@app.route('/')
def index():
    return render_template('index.html', score=score)

# Nouvelle route pour gérer le bouton "Remettre à zéro" (HTTP)
@app.route('/reset', methods=['POST'])
def reset_via_http():
    score['GAUCHE'] = 0
    score['DROITE'] = 0
    emit_score()
    return '', 204  # No Content

# Fonction d'envoi des scores en temps réel
def emit_score():
    socketio.emit('score_update', {
        'left': score['GAUCHE'],
        'right': score['DROITE']
    })

# Thread pour lire les infos série de l'Arduino
def read_serial():
    while True:
        if ser.in_waiting > 0:
            line = ser.readline().decode().strip()
            if line in score:
                score[line] += 1
                emit_score()

# Lorsqu'un utilisateur se connecte au site
@socketio.on('connect')
def handle_connect():
    emit_score()

# Lancement de l'app Flask + SocketIO
if __name__ == '__main__':
    threading.Thread(target=read_serial, daemon=True).start()
    socketio.run(app,
                 host='0.0.0.0',
                 port=5000,
                 allow_unsafe_werkzeug=True)
