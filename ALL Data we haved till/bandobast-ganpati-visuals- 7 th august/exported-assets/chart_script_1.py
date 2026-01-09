import plotly.graph_objects as go
import plotly.express as px
import pandas as pd
import numpy as np

# Data from the provided JSON
dates = ["Aug 20", "Aug 21", "Aug 22", "Aug 23", "Aug 24", "Aug 25", "Aug 26", "Aug 27", "Aug 28", "Aug 29", "Aug 30", "Aug 31", "Sep 1", "Sep 2", "Sep 3", "Sep 4", "Sep 5", "Sep 6", "Sep 7", "Sep 8", "Sep 9", "Sep 10", "Sep 11", "Sep 12", "Sep 13", "Sep 14", "Sep 15", "Sep 16", "Sep 17"]
events = ["Prep Phase", "Prep Phase", "Prep Phase", "Prep Phase", "Prep Phase", "Prep Phase", "Prep Phase", "Ganesh Sthapana", "Day 2", "Day 3", "Day 4", "Gauri Agman", "Gauri Pujan", "Gauri Visarjan", "Post-Gauri", "Mid Festival", "Eid Coincidence", "Regular Day", "Regular Day", "Regular Day", "Regular Day", "Regular Day", "Regular Day", "Regular Day", "7-Day Visarjan", "Regular Day", "Regular Day", "Regular Day", "Anant Chaturdashi"]
risk_levels = ["Low", "Low", "Low", "Low", "Low", "Medium", "Medium", "Medium", "Low", "Low", "Low", "Medium", "High", "High", "Low", "Low", "Very High", "Low", "Low", "Low", "Low", "Low", "Low", "Low", "High", "Low", "Low", "Medium", "Critical"]
crowd_size = [1000, 1000, 2000, 2000, 3000, 5000, 8000, 50000, 20000, 22000, 25000, 40000, 60000, 65000, 15000, 18000, 45000, 12000, 10000, 10000, 10000, 10000, 10000, 12000, 55000, 15000, 18000, 25000, 100000]
personnel_deployment = [500, 500, 600, 600, 800, 1000, 1200, 2500, 1500, 1500, 1600, 2200, 2655, 2655, 1200, 1200, 2400, 1000, 1000, 1000, 1000, 1000, 1000, 1200, 2400, 1200, 1400, 2000, 2655]

# Create DataFrame
df = pd.DataFrame({
    'dates': dates,
    'events': events,
    'risk_levels': risk_levels,
    'crowd_size': crowd_size,
    'personnel_deployment': personnel_deployment
})

# Convert crowd size to thousands for display
df['crowd_k'] = df['crowd_size'] / 1000

# Define color mapping for risk levels using the specified brand colors
risk_color_map = {
    'Low': '#2E8B57',      # Sea green
    'Medium': '#D2BA4C',   # Moderate yellow  
    'High': '#B4413C',     # Moderate red
    'Very High': '#DB4545', # Bright red
    'Critical': '#13343B'   # Dark cyan
}

# Create the timeline chart
fig = go.Figure()

# Add bars for personnel deployment colored by risk level
for risk_level in df['risk_levels'].unique():
    risk_data = df[df['risk_levels'] == risk_level]
    
    fig.add_trace(go.Bar(
        x=risk_data['dates'],
        y=risk_data['personnel_deployment'],
        name=risk_level,
        marker_color=risk_color_map[risk_level],
        hovertemplate='<b>%{x}</b><br>' +
                     'Event: %{customdata[0]}<br>' +
                     'Risk: %{customdata[1]}<br>' +
                     'Personnel: %{y}<br>' +
                     'Crowd: %{customdata[2]:.1f}k<br>' +
                     '<extra></extra>',
        customdata=np.column_stack([risk_data['events'], risk_data['risk_levels'], risk_data['crowd_k']]),
        cliponaxis=False
    ))

# Update layout
fig.update_layout(
    title='Ganpati 2025 Risk Timeline',
    xaxis_title='Date',
    yaxis_title='Personnel',
    barmode='overlay',
    legend=dict(orientation='h', yanchor='bottom', y=1.05, xanchor='center', x=0.5)
)

# Update x-axis to show all dates
fig.update_xaxes(
    tickangle=45
)

# Update y-axis 
fig.update_yaxes()

# Save the chart
fig.write_image('ganpati_2025_timeline.png')
print("Chart saved as ganpati_2025_timeline.png")