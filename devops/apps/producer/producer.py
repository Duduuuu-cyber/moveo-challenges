import os
import time
import json
from kafka import KafkaProducer
from kafka.errors import NoBrokersAvailable

# Configuration via Environment Variables
KAFKA_BROKER = os.getenv('KAFKA_BROKER', 'localhost:9092')
TOPIC_NAME = os.getenv('TOPIC_NAME', 'moveo-challenge-topic')

def create_producer():
    retries = 0
    while retries < 15:
        try:
            producer = KafkaProducer(
                bootstrap_servers=[KAFKA_BROKER],
                value_serializer=lambda x: json.dumps(x).encode('utf-8')
            )
            print("SUCCESS: Connected to Kafka Producer!")
            return producer
        except NoBrokersAvailable:
            print("Kafka not ready. Retrying in 5 seconds...")
            time.sleep(5)
            retries += 1
    raise Exception("Could not connect to Kafka.")

producer = create_producer()
message_count = 1

while True:
    data = {'id': message_count, 'message': 'Hello from Producer Service!'}
    producer.send(TOPIC_NAME, value=data)
    # Flush ensures the message is sent immediately
    producer.flush() 
    print(f"Sent: {data}")
    message_count += 1
    time.sleep(3) # Send a message every 3 seconds
