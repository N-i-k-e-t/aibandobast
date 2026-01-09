# Let's check what files are available and create the data from the file content
import os
print("Available files in current directory:")
print(os.listdir("."))

# Let's read the CSV content from the file snippets provided and create our datasets
crowd_data = """year,valuablemandals,largemandals,smallmandals,householdganpatis,totalpublicmandals,notes
2015,3,18,46,9000,67,Pre-COVID baseline
2016,2,22,43,9300,67,Flood year - 42642 cusecs dam discharge
2017,3,16,39,9700,58,Drowning incidents recorded
2018,6,18,61,10000,85,Crowd disturbance at Kapila Sangam
2019,4,22,41,10200,67,Highest rainfall year 1731mm - drowning incident
2020,4,9,6,4750,19,COVID-19 severe impact - lockdown restrictions
2021,3,12,25,7800,40,COVID-19 recovery phase
2022,3,18,42,8103,63,Assault incident during procession
2023,4,18,52,14000,74,Recovery - significant household increase
2024,3,22,36,23000,61,Highest household count - full recovery"""

incidents_data = """year,date,incidenttype,location,policestation,fatalities,severity,ipcsections,details
2016,,noisepollution,Panchavati,Panchavati PS,0,minor,,LoudspeakerDJ violations
2017,,drowning,Darana River,Nashik Road PS,1,fatal,,Ganpati immersion drowning
2017,,drowning,Godavari River,Panchavati PS,1,fatal,,Ganpati immersion drowning
2017,,noisepollution,Panchavati,Panchavati PS,0,minor,,LoudspeakerDJ violations
2018,,crowddisturbance,Kapila Sangam Tapovan,Panchavati PS,0,moderate,,Illegal gathering - pushing shouting
2018,,noisepollution,Bhadrakali,Bhadrakali PS,0,minor,,LoudspeakerDJ violations
2019,,drowning,Godavari River,Gangapur PS,1,fatal,,Ganpati immersion drowning
2020,,drowning,Darana River,Nashik Road PS,1,fatal,,Ganpati immersion drowning
2020,,drowning,Valdevi River,Upnagar PS,1,fatal,,Ganpati immersion drowning
2021,,accidentaldeath,Mhasoba Patangan,Panchavati PS,1,fatal,,Negligent driving of mini-truck
2022,2022-09-09,assault,Panchavati area,Panchavati PS,0,serious,"326,324,323,504,34",Knife assault during procession dispute at 2045
2023,2023-09-28,drowning,Gangaghat Panchavati,Panchavati PS,4,fatal,,Four individuals drowned during immersion"""

weather_data = """year,nashikmonsoonrainfallmm,gangapurdamdischargecusecs,floodrisklevel,weatherimpactonfestival,notableevents
2015,429,,low,minimal,Lowest rainfall in study period
2016,800,42642,veryhigh,severe,Intense rainfall 216mm Aug 2-3 severe flooding bridges submerged
2017,1200,25000,high,moderate,High rainfall year - enhanced drowning risk
2018,750,15000,moderate,low,Moderate rainfall impact
2019,1731,42642,veryhigh,severe,Highest rainfall 315mm in Trimbakeshwar city flooded Godavari above danger mark
2020,1100,20000,high,moderate,COVID restrictions reduced festival impact
2021,850,12000,moderate,low,Controlled festival due to COVID
2022,1200,18000,high,moderate,High rainfall year - flooding concerns
2023,950,14000,moderate,low,Moderate impact on festival
2024,800,16000,moderate,low,Manageable weather conditions"""

# Save the data to files
with open('crowd_data.csv', 'w') as f:
    f.write(crowd_data)
    
with open('incidents_data.csv', 'w') as f:
    f.write(incidents_data)
    
with open('weather_data.csv', 'w') as f:
    f.write(weather_data)

print("Data files created successfully!")

# Load the data
import pandas as pd
crowd_df = pd.read_csv('crowd_data.csv')
incidents_df = pd.read_csv('incidents_data.csv')
weather_df = pd.read_csv('weather_data.csv')

print("=== DATA LOADED SUCCESSFULLY ===")
print("\n1. CROWD DATA:")
print(crowd_df.head())
print("\n2. INCIDENTS DATA:")
print(incidents_df.head())
print("\n3. WEATHER DATA:")
print(weather_df.head())