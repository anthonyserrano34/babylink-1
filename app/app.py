from flask import Flask, render_template
from flask_socketio import SocketIO
import serial
import threading

ser = serial.Serial('/dev/ttyACM0', 9600, timeout=1)
app = Flask(__name__)
socketio = SocketIO(app)
score = {'GAUCHE': 0, 'DROITE': 0}

@app.route('/')
def index():
    return render_template('index.html', score=score)

def read_serial():
    while True:
        if ser.in_waiting > 0:
            line = ser.readline().decode().strip()
            if line in score:
                score[line] += 1
                socketio.emit('score_update', score)

@socketio.on('connect')
def handle_connect():
    socketio.emit('score_update', score)

@socketio.on('reset_score')
def reset_score():
    score['GAUCHE'] = 0
    score['DROITE'] = 0
    socketio.emit('score_update', score)

if __name__ == '__main__':
    threading.Thread(target=read_serial, daemon=True).start()
    socketio.run(app, host='0.0.0.0', port=5000)
