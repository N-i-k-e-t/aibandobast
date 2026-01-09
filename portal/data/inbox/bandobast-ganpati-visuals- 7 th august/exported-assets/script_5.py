# Let's fix the array length issue and create proper datasets
import pandas as pd
import numpy as np
from datetime import datetime, date

print("=== CREATING COMPREHENSIVE PLANNING DATASETS FOR GANPATI 2025 ===")

# 1. Daily operational plan for 2025 (29 days from Aug 20 to Sep 17)
dates = pd.date_range('2025-08-20', '2025-09-17', freq='D')
print(f"Total days: {len(dates)}")

# Create arrays with correct length (29 days)
daily_ops_2025 = pd.DataFrame({
    'Date': dates,
    'Event': (['Prep Phase']*7 + 
              ['Ganesh Sthapana', 'Day 2', 'Day 3', 'Day 4', 'Gauri Agman', 'Gauri Pujan', 
               'Gauri Visarjan', 'Post-Gauri', 'Mid Festival', 'Eid Coincidence', 'Regular Day',
               'Regular Day', 'Regular Day', 'Regular Day', 'Regular Day', 'Regular Day',
               '7-Day Visarjan', 'Regular Day', 'Regular Day', 'Regular Day', 'Anant Chaturdashi']),
    'Risk_Level': (['Low']*7 + 
                   ['Medium', 'Low', 'Low', 'Low', 'Medium', 'High', 'High', 'Low', 'Low', 
                    'Very High', 'Low', 'Low', 'Low', 'Low', 'Low', 'Low', 'High', 'Low', 
                    'Low', 'Medium', 'Critical']),
    'Estimated_Crowd': ([1000, 1000, 2000, 2000, 3000, 5000, 8000] + 
                        [50000, 20000, 22000, 25000, 40000, 60000, 65000, 15000, 18000, 
                         45000, 12000, 10000, 10000, 10000, 10000, 10000, 55000, 15000, 
                         18000, 25000, 100000]),
    'Personnel_Required': ([500, 500, 600, 600, 800, 1000, 1200] +
                          [2500, 1500, 1500, 1600, 2200, 2655, 2655, 1200, 1200, 2400,
                           1000, 1000, 1000, 1000, 1000, 1000, 2400, 1200, 1400, 2000, 2655]),
    'Medical_Teams': ([2, 2, 2, 2, 3, 4, 5] +
                     [8, 4, 4, 5, 7, 10, 12, 5, 5, 8, 3, 3, 3, 3, 3, 3, 10, 5, 6, 8, 15]),
    'Traffic_Diversions': (['None']*7 + 
                          ['Major', 'Minor', 'Minor', 'Minor', 'Major', 'Critical', 'Critical',
                           'Minor', 'Minor', 'Major', 'None', 'None', 'None', 'None', 'None',
                           'None', 'Major', 'None', 'Minor', 'Major', 'Critical'])
})

# 2. Zone-wise detailed deployment
zone_deployment_2025 = pd.DataFrame({
    'Zone': ['Zone 1 - Panchavati-Bhadrakali', 'Zone 2 - Nashik Road-Upnagar', 
             'Zone 3 - Ambad-Satpur', 'Zone 4 - Traffic-Special'],
    'DCP': [1, 1, 1, 1],
    'ACP': [2, 2, 2, 2], 
    'PI_SPI': [15, 12, 10, 16],
    'PSI_ASI': [35, 28, 22, 49],
    'Constables_Male': [320, 240, 160, 160],
    'Constables_Female': [80, 60, 40, 40],
    'Home_Guards': [200, 150, 100, 100],
    'Special_Units': [150, 100, 50, 212],
    'Peak_Crowd_Expected': ['8000-10000', '5000-6000', '2000-3000', 'Variable'],
    'Critical_Hours': ['15:00-21:00', '11:30-14:00', 'All day', '24/7']
})

# 3. Equipment deployment
equipment_deployment = pd.DataFrame({
    'Equipment_Type': ['Vajra Vahan', 'Varun Vahan', 'CCTV Cameras', 'Drones', 'Watch Towers',
                      'Wireless Sets', 'PA Systems', 'Barricades', 'Medical Ambulances', 'Fire Vehicles'],
    'Total_Quantity': [3, 2, 100, 5, 4, 200, 50, 500, 15, 8],
    'Zone_1_Allocation': [1, 1, 40, 2, 2, 80, 20, 200, 6, 3],
    'Zone_2_Allocation': [1, 1, 30, 2, 1, 60, 15, 150, 4, 2],
    'Zone_3_Allocation': [1, 0, 20, 1, 1, 40, 10, 100, 3, 2],
    'Zone_4_Allocation': [0, 0, 10, 0, 0, 20, 5, 50, 2, 1]
})

# 4. Historical incident analysis 
incident_analysis = pd.DataFrame({
    'Location': ['Godaghat', 'Darana River', 'Valdevi River', 'Kapila Sangam', 'Panchavati Area',
                'Bhadrakali', 'Wakadi Barav', 'Bitco Chowk'],
    'Total_Incidents_2015_2024': [6, 3, 2, 1, 3, 1, 0, 0],
    'Fatalities': [4, 2, 1, 0, 1, 0, 0, 0],
    'Risk_Score': [27, 21, 16, 19, 21, 19, 19, 14],
    'Recommended_Personnel': [200, 80, 60, 100, 150, 120, 100, 60],
    'Priority_Level': ['Critical', 'High', 'Medium', 'Medium', 'High', 'Medium', 'Medium', 'Low']
})

# 5. Weather monitoring protocol
weather_monitoring = pd.DataFrame({
    'Parameter': ['Rainfall', 'Dam Water Level', 'River Flow Rate', 'Flood Alert', 'Temperature'],
    'Monitoring_Frequency': ['Hourly', 'Every 2 hours', 'Every 2 hours', 'Continuous', 'Daily'],
    'Critical_Threshold': ['50mm/day', '80% capacity', '1000 cusecs', 'Level 2', '35°C+'],
    'Action_Required': ['Crowd control', 'Evacuation prep', 'Immersion ban', 'Festival halt', 'Medical readiness'],
    'Responsible_Agency': ['IMD', 'Irrigation Dept', 'Irrigation Dept', 'District Collector', 'Health Dept']
})

# Save all datasets
daily_ops_2025.to_csv('ganpati_2025_daily_operations.csv', index=False)
zone_deployment_2025.to_csv('ganpati_2025_zone_deployment.csv', index=False)
equipment_deployment.to_csv('ganpati_2025_equipment_deployment.csv', index=False)
incident_analysis.to_csv('ganpati_historical_incident_analysis.csv', index=False)
weather_monitoring.to_csv('ganpati_2025_weather_monitoring.csv', index=False)

print("✅ All planning datasets created successfully!")
print("\nFILES CREATED:")
print("1. ganpati_2025_daily_operations.csv")
print("2. ganpati_2025_zone_deployment.csv")
print("3. ganpati_2025_equipment_deployment.csv") 
print("4. ganpati_historical_incident_analysis.csv")
print("5. ganpati_2025_weather_monitoring.csv")

# Display critical information
print("\n=== CRITICAL DATES & PERSONNEL REQUIREMENTS ===")
critical_dates = daily_ops_2025[daily_ops_2025['Risk_Level'].isin(['High', 'Very High', 'Critical'])]
print(critical_dates[['Date', 'Event', 'Risk_Level', 'Estimated_Crowd', 'Personnel_Required']].to_string(index=False))

print(f"\n=== TOTAL RESOURCE SUMMARY ===")
print(f"Total Personnel across all zones: {zone_deployment_2025['Constables_Male'].sum() + zone_deployment_2025['Constables_Female'].sum() + zone_deployment_2025['Home_Guards'].sum()}")
print(f"Peak day personnel requirement: {daily_ops_2025['Personnel_Required'].max()}")
print(f"Total equipment items: {equipment_deployment['Total_Quantity'].sum()}")
print(f"Highest risk location: {incident_analysis.loc[incident_analysis['Risk_Score'].idxmax(), 'Location']} (Score: {incident_analysis['Risk_Score'].max()})")