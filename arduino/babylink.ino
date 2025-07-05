// Pins
const int sensorLeftPin = 2;
const int sensorRightPin = 3;
const int boutonResetPin = 4;
const int buzzerPin = 5;

int lastLeftState = HIGH;
int lastRightState = HIGH;
int lastResetState = HIGH;

void setup() {
  Serial.begin(9600);
  pinMode(sensorLeftPin, INPUT);
  pinMode(sensorRightPin, INPUT);
  pinMode(boutonResetPin, INPUT_PULLUP);
  pinMode(buzzerPin, OUTPUT);
}

void loop() {
  int leftState = digitalRead(sensorLeftPin);
  int rightState = digitalRead(sensorRightPin);
  int resetState = digitalRead(boutonResetPin);

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

  if (resetState == LOW && lastResetState == HIGH) {
    Serial.println("RESET");
    tone(buzzerPin, 600, 400);
    delay(500);
  }

  lastLeftState = leftState;
  lastRightState = rightState;
  lastResetState = resetState;

  delay(50); // Anti-rebond simple
}
