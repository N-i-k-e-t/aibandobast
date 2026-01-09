# Let's first load and analyze the provided CSV data files
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta
import json

# Load the CSV files
crowd_df = pd.read_csv('/tmp/ganpati_crowd_data_csv.txt')
incidents_df = pd.read_csv('/tmp/ganpati_incidents_csv.txt')
resources_df = pd.read_csv('/tmp/ganpati_resources_csv.txt')
weather_df = pd.read_csv('/tmp/ganpati_weather_data_csv.txt')

print("=== GANPATI FESTIVAL DATA ANALYSIS 2015-2024 ===")
print("\n1. CROWD DATA OVERVIEW")
print(crowd_df.head())
print(f"\nCrowd data shape: {crowd_df.shape}")

print("\n2. INCIDENTS DATA OVERVIEW")
print(incidents_df.head())
print(f"\nIncidents data shape: {incidents_df.shape}")

print("\n3. RESOURCES DATA OVERVIEW")
print(resources_df.head())
print(f"\nResources data shape: {resources_df.shape}")

print("\n4. WEATHER DATA OVERVIEW")
print(weather_df.head())
print(f"\nWeather data shape: {weather_df.shape}")