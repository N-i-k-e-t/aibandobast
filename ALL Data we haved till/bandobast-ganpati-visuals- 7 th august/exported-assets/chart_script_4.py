import pandas as pd
import plotly.graph_objects as go
from plotly.subplots import make_subplots

# Data from the JSON
hours = ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]
personnel = [1000, 1200, 1400, 1600, 2000, 2300, 2400, 2500, 2600, 2655, 2655, 2655, 2655, 2655, 2500, 2000, 1700, 1500]
crowd = [5000, 8000, 12000, 18000, 25000, 30000, 45000, 60000, 80000, 100000, 100000, 100000, 100000, 90000, 80000, 60000, 40000, 20000]
risk_levels = ["Low", "Low", "Medium", "Medium", "Medium", "High", "High", "High", "High", "Critical", "Critical", "Critical", "Critical", "High", "High", "Medium", "Medium", "Low"]
key_events = ["", "", "", "", "Preparation", "Main Procession", "", "", "", "Peak Crowds", "", "", "", "", "Crowd Dispersal", "Procession End", "", ""]

# Create DataFrame
df = pd.DataFrame({
    'Hour': hours,
    'Personnel': personnel,
    'Crowd_k': [x/1000 for x in crowd],
    'Risk': risk_levels,
    'Events': key_events
})

# Define risk level colors
risk_colors = {
    'Low': '#2E8B57',      # Sea green
    'Medium': '#D2BA4C',   # Moderate yellow  
    'High': '#DB4545',     # Bright red
    'Critical': '#B4413C'  # Moderate red
}

# Create figure
fig = go.Figure()

# Add personnel line with markers colored by risk level
fig.add_trace(go.Scatter(
    x=hours,
    y=personnel,
    mode='lines+markers',
    name='Personnel',
    line=dict(color='#1FB8CD', width=3),
    marker=dict(
        color=[risk_colors[risk] for risk in risk_levels], 
        size=10,
        line=dict(width=2, color='white')
    ),
    hovertemplate='<b>%{x}</b><br>Personnel: %{y:,.0f}<br>Risk: %{customdata}<extra></extra>',
    customdata=risk_levels,
    cliponaxis=False
))

# Add crowd estimate line (scaled to fit on same axis)
crowd_scaled = [x/50 for x in crowd]  # Scale down crowd for visualization
fig.add_trace(go.Scatter(
    x=hours,
    y=crowd_scaled,
    mode='lines+markers',
    name='Crowd (÷50)',
    line=dict(color='#5D878F', width=2, dash='dash'),
    marker=dict(color='#5D878F', size=8),
    hovertemplate='<b>%{x}</b><br>Crowd: %{customdata}k<extra></extra>',
    customdata=[x/1000 for x in crowd],
    cliponaxis=False
))

# Add key event markers
event_indices = [i for i, event in enumerate(key_events) if event]
event_hours = [hours[i] for i in event_indices]
event_personnel = [personnel[i] for i in event_indices]
event_names = [key_events[i] for i in event_indices]

if event_hours:
    fig.add_trace(go.Scatter(
        x=event_hours,
        y=event_personnel,
        mode='markers+text',
        name='Key Events',
        marker=dict(color='#964325', size=15, symbol='star'),
        text=event_names,
        textposition='top center',
        textfont=dict(size=10, color='#964325'),
        hovertemplate='<b>%{x}</b><br>%{text}<br>Personnel: %{y:,.0f}<extra></extra>',
        cliponaxis=False
    ))

# Create risk level legend entries
for risk, color in risk_colors.items():
    fig.add_trace(go.Scatter(
        x=[None], y=[None],
        mode='markers',
        marker=dict(color=color, size=12),
        name=f'{risk} Risk',
        showlegend=True,
        cliponaxis=False
    ))

# Update layout
fig.update_layout(
    title='Anant Chaturdashi Plan - Sep 17, 2025',
    xaxis_title='Time',
    yaxis_title='Personnel Count',
    legend=dict(orientation='h', yanchor='bottom', y=1.05, xanchor='center', x=0.5),
    hovermode='x unified'
)

# Update axes without cliponaxis
fig.update_xaxes(tickangle=45)
fig.update_yaxes()

# Save the chart
fig.write_image("anant_chaturdashi_plan.png")
fig.show()