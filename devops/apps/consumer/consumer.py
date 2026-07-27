import os
import time
import sys
from kafka import KafkaConsumer
from kafka.errors import NoBrokersAvailable

# Configuration via Environment Variables
KAFKA_BROKER = os.getenv('KAFKA_BROKER', 'localhost:9092')
TOPIC_NAME = os.getenv('TOPIC_NAME', 'moveo-challenge-topic')

print(f"--- Starting Consumer Service ---")
print(f"Targeting Kafka Broker: {KAFKA_BROKER}")

def connect_consumer():
    retries = 0
    while retries < 15:
        try:
            print(f"Attempting to connect to Kafka (Attempt {retries+1})...")
            consumer = KafkaConsumer(
                TOPIC_NAME,
                bootstrap_servers=[KAFKA_BROKER],
                auto_offset_reset='earliest',
                group_id='devops-challenge-group'
            )
            print("SUCCESS: Connected to Kafka!")
            return consumer
        except NoBrokersAvailable:
            print("Kafka not ready yet. Retrying in 5 seconds...")
            time.sleep(5)
            retries += 1
    
    print("ERROR: Could not connect to Kafka after multiple retries.")
    sys.exit(1)

# Main Loop
consumer = connect_consumer()
print("Listening for messages...")
for message in consumer:
    print(f"Received: {message.value.decode('utf-8')}")
    sys.stdout.flush() # Ensure logs are printed immediately in Docker
