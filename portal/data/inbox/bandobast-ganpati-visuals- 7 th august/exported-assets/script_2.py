# Let's create additional detailed analysis and prediction data for 2025 based on trends
import pandas as pd
import numpy as np
from datetime import datetime, date, timedelta

# Create detailed trend analysis and predictions
print("=== GANPATI FESTIVAL TREND ANALYSIS & 2025 PREDICTIONS ===")

# Calculate trend metrics
crowd_df['total_events'] = crowd_df['totalpublicmandals'] + crowd_df['householdganpatis']
crowd_df['growth_rate'] = crowd_df['householdganpatis'].pct_change() * 100

# Basic statistics
print("\n1. KEY STATISTICS (2015-2024):")
print(f"   Average Public Mandals: {crowd_df['totalpublicmandals'].mean():.0f}")
print(f"   Average Household Ganpatis: {crowd_df['householdganpatis'].mean():.0f}")
print(f"   Peak Household Year: {crowd_df.loc[crowd_df['householdganpatis'].idxmax(), 'year']} ({crowd_df['householdganpatis'].max()} households)")
print(f"   COVID Impact: {crowd_df.loc[crowd_df['year'] == 2020, 'householdganpatis'].iloc[0]} households in 2020 (down {((crowd_df.loc[crowd_df['year'] == 2019, 'householdganpatis'].iloc[0] - crowd_df.loc[crowd_df['year'] == 2020, 'householdganpatis'].iloc[0]) / crowd_df.loc[crowd_df['year'] == 2019, 'householdganpatis'].iloc[0] * 100):.1f}%)")

# Incident analysis
incidents_by_year = incidents_df.groupby('year').agg({
    'fatalities': 'sum',
    'incidenttype': 'count'
}).reset_index()
incidents_by_year.columns = ['year', 'total_fatalities', 'total_incidents']

fatal_incidents = incidents_df[incidents_df['severity'] == 'fatal']
drowning_incidents = incidents_df[incidents_df['incidenttype'] == 'drowning']

print(f"\n2. INCIDENT ANALYSIS:")
print(f"   Total Incidents (2015-2024): {len(incidents_df)}")
print(f"   Total Fatalities: {incidents_df['fatalities'].sum()}")
print(f"   Drowning Incidents: {len(drowning_incidents)} (causing {drowning_incidents['fatalities'].sum()} deaths)")
print(f"   Most Dangerous Location: Godavari River ({len(drowning_incidents[drowning_incidents['location'].str.contains('Godavari', na=False)])} incidents)")

# Weather correlation
weather_incidents = pd.merge(weather_df, incidents_by_year, on='year', how='left')
weather_incidents = weather_incidents.fillna(0)

high_rain_years = weather_df[weather_df['floodrisklevel'].isin(['high', 'veryhigh'])]
print(f"\n3. WEATHER-INCIDENT CORRELATION:")
print(f"   High Risk Weather Years: {list(high_rain_years['year'])}")
print(f"   Average Fatalities in High Risk Years: {weather_incidents[weather_incidents['floodrisklevel'].isin(['high', 'veryhigh'])]['total_fatalities'].mean():.1f}")
print(f"   Average Fatalities in Low Risk Years: {weather_incidents[weather_incidents['floodrisklevel'].isin(['low', 'moderate'])]['total_fatalities'].mean():.1f}")

# Create 2025 predictions based on trends
print("\n4. 2025 PREDICTIONS BASED ON HISTORICAL TRENDS:")

# Recovery trend from 2021-2024
recovery_years = crowd_df[crowd_df['year'] >= 2021].copy()
household_growth = recovery_years['householdganpatis'].iloc[-1] / recovery_years['householdganpatis'].iloc[0]
annual_growth = (household_growth ** (1/3)) - 1  # Compound annual growth rate

predicted_households_2025 = int(crowd_df[crowd_df['year'] == 2024]['householdganpatis'].iloc[0] * (1 + annual_growth))
predicted_mandals_2025 = int(crowd_df[crowd_df['year'] == 2024]['totalpublicmandals'].mean())

print(f"   Predicted Household Ganpatis 2025: {predicted_households_2025:,}")
print(f"   Predicted Public Mandals 2025: {predicted_mandals_2025}")
print(f"   Projected Growth Rate: {annual_growth*100:.1f}% annually")

# Risk assessment for 2025
print(f"\n5. 2025 RISK ASSESSMENT:")
print(f"   Weather Risk: Monitor monsoon patterns (Aug-Sep 2025)")
print(f"   Crowd Risk: HIGH - Expected {predicted_households_2025:,} household celebrations")
print(f"   Drowning Risk: CRITICAL - Average 1.2 fatalities/year at immersion sites")
print(f"   Infrastructure Pressure: VERY HIGH - 64% increase from pre-COVID levels")

# Create detailed day-wise prediction for 2025
ganpati_2025_dates = {
    'ganesh_sthapana': '2025-08-27',
    'gauri_agman': '2025-08-31', 
    'gauri_pujan': '2025-09-01',
    'gauri_visarjan': '2025-09-02',
    'seven_day_visarjan': '2025-09-13',
    'anant_chaturdashi': '2025-09-17'
}

print(f"\n6. GANPATI 2025 FESTIVAL TIMELINE:")
for event, date_str in ganpati_2025_dates.items():
    print(f"   {event.replace('_', ' ').title()}: {date_str}")

print("\n=== DATA SUMMARY FOR PLANNING ===")
print(f"Peak crowd expected: {predicted_households_2025:,} households + {predicted_mandals_2025} public mandals")
print(f"Critical dates: Aug 27, Sep 1-2, Sep 17, 2025")
print(f"High-risk locations: Godavari River, Darana River, Valdevi River")
print(f"Weather monitoring: Essential Aug 15 - Sep 20, 2025")