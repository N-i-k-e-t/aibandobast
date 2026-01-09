# Create comprehensive CSV files for planning purposes
import pandas as pd
import numpy as np
from datetime import datetime, date

# Create detailed 2025 planning data
print("=== CREATING COMPREHENSIVE PLANNING DATASETS FOR GANPATI 2025 ===")

# 1. Daily operational plan for 2025
daily_ops_2025 = pd.DataFrame({
    'Date': pd.date_range('2025-08-20', '2025-09-17', freq='D'),
    'Event': ['Prep Phase']*7 + ['Ganesh Sthapana', 'Day 2', 'Day 3', 'Day 4', 'Gauri Agman', 
              'Gauri Pujan', 'Gauri Visarjan', 'Post-Gauri', 'Mid Festival', 'Eid Coincidence',
              'Regular Day']*6 + ['7-Day Visarjan'] + ['Regular Day']*3 + ['Anant Chaturdashi'],
    'Risk_Level': ['Low']*7 + ['Medium', 'Low', 'Low', 'Low', 'Medium', 'High', 'High', 'Low', 
                   'Low', 'Very High'] + ['Low']*6 + ['High'] + ['Low']*2 + ['Medium', 'Critical'],
    'Estimated_Crowd': [1000]*5 + [3000, 5000, 50000, 20000, 22000, 25000, 40000, 60000, 65000,
                        15000, 18000, 45000] + [12000]*6 + [55000] + [15000, 18000, 25000, 100000],
    'Personnel_Required': [500]*5 + [800, 1200, 2500, 1500, 1500, 1600, 2200, 2655, 2655, 1200,
                          1200, 2400] + [1000]*6 + [2400] + [1200, 1400, 2000, 2655],
    'Medical_Teams': [2]*7 + [8, 4, 4, 5, 7, 10, 12, 5, 5, 8] + [3]*6 + [10, 5, 6, 8, 15],
    'Traffic_Diversions': ['None']*7 + ['Major', 'Minor', 'Minor', 'Minor', 'Major', 'Critical', 
                          'Critical', 'Minor', 'Minor', 'Major'] + ['None']*6 + ['Major', 'None', 'Minor', 'Major', 'Critical']
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
    'Critical_Hours': ['15:00-21:00', '11:30-14:00', 'All day', '24/7'],
    'Main_Responsibilities': ['Main procession route, Godaghat immersion', 
                             'Secondary route, Valdevi River', 
                             'Industrial area, local mandals',
                             'Traffic management, intelligence']
})

# 3. Equipment and vehicle deployment
equipment_deployment = pd.DataFrame({
    'Equipment_Type': ['Vajra Vahan (Riot Control)', 'Varun Vahan (Water Cannon)', 'CCTV Cameras',
                      'Drones', 'Watch Towers', 'Wireless Sets', 'PA Systems', 'Barricades',
                      'Medical Ambulances', 'Fire Vehicles', 'Rescue Boats'],
    'Quantity': [3, 2, 100, 5, 4, 200, 50, 500, 15, 8, 10],
    'Zone_1': [1, 1, 40, 2, 2, 80, 20, 200, 6, 3, 5],
    'Zone_2': [1, 1, 30, 2, 1, 60, 15, 150, 4, 2, 3],
    'Zone_3': [1, 0, 20, 1, 1, 40, 10, 100, 3, 2, 1],
    'Zone_4': [0, 0, 10, 0, 0, 20, 5, 50, 2, 1, 1],
    'Primary_Location': ['Mobile deployment', 'Critical points', 'Fixed locations',
                        'Aerial surveillance', 'Main routes', 'All zones', 'Procession routes',
                        'Crowd control', 'Emergency response', 'Fire safety', 'Water rescue']
})

# 4. Historical incident analysis for planning
incident_analysis = pd.DataFrame({
    'Location': ['Godaghat', 'Darana River', 'Valdevi River', 'Kapila Sangam', 'Panchavati Area'],
    'Total_Incidents_2015_2024': [6, 3, 2, 1, 3],
    'Fatalities': [4, 2, 1, 0, 1],
    'Drowning_Risk': [5, 5, 4, 1, 2],
    'Crowd_Density_Risk': [5, 3, 3, 4, 5],
    'Recommended_Personnel': [200, 80, 60, 100, 150],
    'Safety_Measures': ['Lifeguards, boats, barriers', 'Lifeguards, warning signs', 
                       'Lifeguards, crowd control', 'Crowd barriers', 'Enhanced patrolling']
})

# 5. Weather monitoring plan
weather_monitoring = pd.DataFrame({
    'Parameter': ['Rainfall', 'Dam Water Level', 'River Flow Rate', 'Flood Alert', 'Temperature', 'Humidity'],
    'Monitoring_Frequency': ['Hourly', 'Every 2 hours', 'Every 2 hours', 'Continuous', 'Daily', 'Daily'],
    'Critical_Threshold': ['50mm/day', '80% capacity', '1000 cusecs', 'Level 2', '35°C+', '85%+'],
    'Action_Required': ['Crowd control', 'Evacuation prep', 'Immersion ban', 'Festival halt', 
                       'Medical readiness', 'Health advisory'],
    'Responsible_Agency': ['IMD', 'Irrigation Dept', 'Irrigation Dept', 'District Collector',
                          'IMD', 'Health Dept']
})

# Save all datasets
daily_ops_2025.to_csv('ganpati_2025_daily_operations.csv', index=False)
zone_deployment_2025.to_csv('ganpati_2025_zone_deployment.csv', index=False)
equipment_deployment.to_csv('ganpati_2025_equipment_deployment.csv', index=False)
incident_analysis.to_csv('ganpati_historical_incident_analysis.csv', index=False)
weather_monitoring.to_csv('ganpati_2025_weather_monitoring.csv', index=False)

print("✅ All planning datasets created successfully!")
print("\nFILES CREATED:")
print("1. ganpati_2025_daily_operations.csv - Day-wise operational planning")
print("2. ganpati_2025_zone_deployment.csv - Zone-wise personnel deployment")  
print("3. ganpati_2025_equipment_deployment.csv - Equipment and vehicle allocation")
print("4. ganpati_historical_incident_analysis.csv - Risk analysis by location")
print("5. ganpati_2025_weather_monitoring.csv - Weather monitoring protocol")

# Display sample data
print("\n=== SAMPLE DATA ===")
print("\nDAILY OPERATIONS (Critical dates):")
critical_dates = daily_ops_2025[daily_ops_2025['Risk_Level'].isin(['High', 'Very High', 'Critical'])]
print(critical_dates[['Date', 'Event', 'Risk_Level', 'Estimated_Crowd', 'Personnel_Required']].to_string(index=False))

print("\nZONE DEPLOYMENT SUMMARY:")
print(zone_deployment_2025[['Zone', 'Constables_Male', 'Constables_Female', 'Peak_Crowd_Expected']].to_string(index=False))

print("\nHIGH-RISK LOCATIONS:")
high_risk_locations = incident_analysis[incident_analysis['Total_Incidents_2015_2024'] >= 2]
print(high_risk_locations[['Location', 'Total_Incidents_2015_2024', 'Fatalities', 'Recommended_Personnel']].to_string(index=False))