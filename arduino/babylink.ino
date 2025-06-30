const int sensorLeftPin = 2;
const int sensorRightPin = 3;
int lastLeftState = HIGH;
int lastRightState = HIGH;

void setup() {
  Serial.begin(9600);
  pinMode(sensorLeftPin, INPUT);
  pinMode(sensorRightPin, INPUT);
}

void loop() {
  int leftState = digitalRead(sensorLeftPin);
  int rightState = digitalRead(sensorRightPin);

  if (leftState == LOW && lastLeftState == HIGH) {
    Serial.println("GAUCHE");
    delay(500);
  }
  if (rightState == LOW && lastRightState == HIGH) {
    Serial.println("DROITE");
    delay(500);
  }

  lastLeftState = leftState;
  lastRightState = rightState;
}