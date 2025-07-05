// Pins
const int sensorLeftPin = 2;
const int sensorRightPin = 3;
const int buzzerPin = 5;

int lastLeftState = HIGH;
int lastRightState = HIGH;

void setup() {
  Serial.begin(9600);
  pinMode(sensorLeftPin, INPUT);
  pinMode(sensorRightPin, INPUT);
  pinMode(buzzerPin, OUTPUT);
}

void loop() {
  int leftState = digitalRead(sensorLeftPin);
  int rightState = digitalRead(sensorRightPin);

  if (leftState == LOW && lastLeftState == HIGH) {
    Serial.println("GAUCHE");
    tone(buzzerPin, 1000, 150);
    delay(500);
  }

  if (rightState == LOW && lastRightState == HIGH) {
    Serial.println("DROITE");
    tone(buzzerPin, 1000, 150);
    delay(500);
  }

  lastLeftState = leftState;
  lastRightState = rightState;

  delay(50); // Anti-rebond
}
