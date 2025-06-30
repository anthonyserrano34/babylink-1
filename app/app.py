from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import serial
import threading

app = Flask(__name__)
socketio = SocketIO(app)
ser = serial.Serial('/dev/ttyACM0', 9600, timeout=1)

score = {"GAUCHE": 0, "DROITE": 0}

def read_serial():
    while True:
        if ser.in_waiting:
            line = ser.readline().decode('utf-8').strip()
            if line in score:
                score[line] += 1
                socketio.emit('score_update', score)

@app.route("/")
def index():
    return render_template("index.html", score=score)

if __name__ == '__main__':
    thread = threading.Thread(target=read_serial)
    thread.daemon = True
    thread.start()
    socketio.run(app, host="0.0.0.0", port=5000)