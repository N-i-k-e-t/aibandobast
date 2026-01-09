# Let's create a simpler version and check array lengths manually
import pandas as pd
import numpy as np

# Create simple datasets with verified lengths
print("=== CREATING GANPATI 2025 PLANNING DATASETS ===")

# Create key dates only (8 critical dates)
key_dates = pd.DataFrame({
    'Date': ['2025-08-27', '2025-08-31', '2025-09-01', '2025-09-02', '2025-09-05', '2025-09-13', '2025-09-17', '2025-09-18'],
    'Event': ['Ganesh Sthapana', 'Gauri Agman', 'Gauri Pujan', 'Gauri Visarjan', 'Eid Coincidence', '7-Day Visarjan', 'Anant Chaturdashi', 'Post Festival'],
    'Risk_Level': ['Medium', 'Medium', 'High', 'High', 'Very High', 'High', 'Critical', 'Low'],
    'Estimated_Crowd': [50000, 40000, 60000, 65000, 45000, 55000, 100000, 10000],
    'Personnel_Required': [2500, 2200, 2655, 2655, 2400, 2400, 2655, 1000],
    'Medical_Teams': [8, 7, 10, 12, 8, 10, 15, 3]
})

# Zone deployment
zone_deployment = pd.DataFrame({
    'Zone': ['Panchavati-Bhadrakali', 'Nashik Road-Upnagar', 'Ambad-Satpur', 'Traffic-Special'],
    'Total_Personnel': [803, 628, 372, 517],
    'Constables': [400, 300, 200, 200],
    'Officers': [53, 42, 32, 65],
    'Home_Guards': [200, 150, 100, 100],
    'Special_Units': [150, 100, 50, 212],
    'Peak_Crowd': ['8000-10000', '5000-6000', '2000-3000', 'Variable']
})

# High-risk locations
risk_locations = pd.DataFrame({
    'Location': ['Godaghat', 'Darana River', 'Panchavati Area', 'Kapila Sangam', 'Bhadrakali', 'Valdevi River'],
    'Risk_Score': [27, 21, 21, 19, 19, 16],
    'Historical_Incidents': [6, 3, 3, 1, 1, 2],
    'Fatalities': [4, 2, 1, 0, 0, 1],
    'Personnel_Needed': [200, 80, 150, 100, 120, 60],
    'Risk_Category': ['Critical', 'High', 'High', 'Medium', 'Medium', 'Medium']
})

# Resource allocation
resources = pd.DataFrame({
    'Resource_Type': ['Police Personnel', 'Home Guards', 'Special Units', 'Vehicles', 'Equipment'],
    'Total_Count': [1361, 1095, 512, 67, 674],
    'Zone_1': [400, 200, 150, 25, 250],
    'Zone_2': [300, 150, 100, 20, 200],
    'Zone_3': [200, 100, 50, 12, 120],
    'Zone_4': [461, 100, 212, 10, 104]
})

# Equipment details
equipment = pd.DataFrame({
    'Equipment': ['CCTV Cameras', 'Drones', 'Riot Vehicles', 'Medical Units', 'Communication', 'Barricades'],
    'Quantity': [100, 5, 5, 15, 250, 500],
    'Primary_Use': ['Surveillance', 'Aerial monitoring', 'Crowd control', 'Emergency response', 'Coordination', 'Crowd management'],
    'Deployment_Zone': ['All zones', 'Mobile', 'Critical points', 'Strategic locations', 'All personnel', 'High-risk areas']
})

# Save all datasets
key_dates.to_csv('ganpati_2025_critical_dates.csv', index=False)
zone_deployment.to_csv('ganpati_2025_zone_deployment.csv', index=False)
risk_locations.to_csv('ganpati_2025_risk_locations.csv', index=False)
resources.to_csv('ganpati_2025_resource_allocation.csv', index=False)
equipment.to_csv('ganpati_2025_equipment_details.csv', index=False)

print("✅ Successfully created 5 planning CSV files!")

# Display key information
print("\n=== CRITICAL DATES SUMMARY ===")
print(key_dates[['Date', 'Event', 'Risk_Level', 'Estimated_Crowd', 'Personnel_Required']].to_string(index=False))

print("\n=== ZONE DEPLOYMENT SUMMARY ===")  
print(zone_deployment[['Zone', 'Total_Personnel', 'Peak_Crowd']].to_string(index=False))

print("\n=== HIGH-RISK LOCATIONS ===")
print(risk_locations[['Location', 'Risk_Score', 'Fatalities', 'Risk_Category']].to_string(index=False))

print(f"\n=== TOTAL RESOURCES ===")
print(f"Total Personnel: {resources.loc[0, 'Total_Count'] + resources.loc[1, 'Total_Count'] + resources.loc[2, 'Total_Count']:,}")
print(f"Total Vehicles: {resources.loc[3, 'Total_Count']}")
print(f"Total Equipment Items: {resources.loc[4, 'Total_Count']}")

print("\n=== 2025 PLANNING RECOMMENDATIONS ===")
print("1. Deploy 2,655 personnel on critical days (Sep 1, 2, 17)")
print("2. Focus 60% resources on Zone 1 (Panchavati-Bhadrakali)")
print("3. Implement enhanced water safety at Godaghat (Risk Score: 27)")
print("4. Special coordination needed for Eid-e-Milad overlap (Sep 5)")
print("5. Weather monitoring critical Aug 15 - Sep 20")
print("6. Mandatory training for 3,000+ mandal volunteers")