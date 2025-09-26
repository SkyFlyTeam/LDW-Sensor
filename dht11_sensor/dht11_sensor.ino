#include "DHT.h"
#include <WiFi.h>
#include <HTTPClient.h>

// Define the GPIO pin connected to the DHT11 data pin
#define DHTPIN 4

// Define the type of DHT sensor
#define DHTTYPE DHT11

// Initialize the DHT sensor object
DHT dht(DHTPIN, DHTTYPE);

// WiFi credentials
const char* ssid = "fogueira's Galaxy M62";         // Your WiFi SSID
const char* password = "avaememu"; // Your WiFi Password

// Backend URL (adjust to your actual backend URL)
const char* serverUrl = "http://10.109.23.165:5000/sensor";

void setup() {
  // Start the serial communication
  Serial.begin(115200);
  Serial.println("DHT11 Test!");

  // Initialize the DHT sensor
  dht.begin();

  // Connect to Wi-Fi
  connectToWiFi();
}

void loop() {
  // Wait a few seconds between measurements
  delay(2000);

  // Read humidity
  float h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();
  // Read temperature as Fahrenheit (isFahrenheit = true)
  float f = dht.readTemperature(true);

  // Check if any reads failed and exit early (to try again)
  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  // Send data to backend
  sendSensorData(t, h);
  
  // Optional: Print the results to the Serial Monitor
  Serial.print("Humidity: ");
  Serial.print(h);
  Serial.print(" %\t");
  Serial.print("Temperature: ");
  Serial.print(t);
  Serial.print(" *C ");
  Serial.print(f);
  Serial.print(" *F\t");
  Serial.println();
}

// Function to connect to WiFi
void connectToWiFi() {
  Serial.print("Connecting to WiFi...");
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }

  Serial.println();
  Serial.print("Connected to WiFi! IP Address: ");
  Serial.println(WiFi.localIP());
}

// Function to send sensor data to the backend
void sendSensorData(float temperatura, float umidade) {
  // Check if there is a valid Wi-Fi connection
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl); // Specify the backend URL
    http.addHeader("Content-Type", "application/json"); // Set the request header to JSON

    // Create the JSON payload with temperature and humidity
    String payload = "{\"temperatura\": " + String(temperatura, 2) + ", \"umidade\": " + String(umidade, 2) + "}";

    // Send the HTTP POST request
    int httpResponseCode = http.POST(payload);

    // Check for errors in the response
    if (httpResponseCode > 0) {
      Serial.print("Data sent successfully, response code: ");
      Serial.println(httpResponseCode);
    } else {
      Serial.print("Error sending data, HTTP response code: ");
      Serial.println(httpResponseCode);
    }

    // End the HTTP request
    http.end();
  } else {
    Serial.println("WiFi not connected. Cannot send data.");
  }
}
