import plotly.graph_objects as go
import pandas as pd

# Data from the provided JSON
stations = ["Panchavati PS", "Bhadrakali PS", "Nashik Road PS", "Upnagar PS", "Ambad PS", "Satpur PS", "Gangapur PS", "Traffic Police", "Special Units"]
personnel = [180, 150, 120, 100, 80, 70, 60, 200, 512]
risk_levels = ["Critical", "High", "High", "Medium", "Medium", "Medium", "Low-Medium", "City-wide", "Mobile"]
responsibilities = ["Main procession route, Godaghat immersion", "Wakadi Barav starting point", "Bitco Chowk secondary route", "Valdevi River endpoint", "Industrial area mandals", "Local community mandals", "Gangapur area coverage", "Traffic management", "QRT, RCP, SRPF, BDDS"]
percentage = [11.5, 9.6, 7.7, 6.4, 5.1, 4.5, 3.8, 12.8, 32.8]

# Calculate total personnel
total_personnel = sum(personnel)

# Color mapping for risk levels
color_map = {
    "Critical": "#1FB8CD",
    "High": "#DB4545", 
    "Medium": "#2E8B57",
    "Low-Medium": "#5D878F",
    "City-wide": "#D2BA4C",
    "Mobile": "#B4413C"
}

# Create colors list based on risk levels
colors = [color_map[risk] for risk in risk_levels]

# Shorten responsibilities for hover (15 char limit)
short_resp = []
for resp in responsibilities:
    if len(resp) <= 15:
        short_resp.append(resp)
    else:
        # Abbreviate long responsibilities
        if "procession route" in resp:
            short_resp.append("Main route")
        elif "starting point" in resp:
            short_resp.append("Start point")
        elif "secondary route" in resp:
            short_resp.append("2nd route")
        elif "endpoint" in resp:
            short_resp.append("End point")
        elif "Industrial" in resp:
            short_resp.append("Industrial")
        elif "Local" in resp:
            short_resp.append("Local mandals")
        elif "coverage" in resp:
            short_resp.append("Area coverage")
        elif "Traffic" in resp:
            short_resp.append("Traffic mgmt")
        else:
            short_resp.append("Mobile units")

# Create horizontal bar chart
fig = go.Figure()

# Add bars for each unique risk level to create legend entries
unique_risks = []
for risk in ["Critical", "High", "Medium", "Low-Medium", "City-wide", "Mobile"]:
    if risk in risk_levels:
        unique_risks.append(risk)

# Add traces for legend
for i, risk in enumerate(unique_risks):
    # Find indices where this risk level appears
    indices = [j for j, r in enumerate(risk_levels) if r == risk]
    
    if indices:
        fig.add_trace(go.Bar(
            y=[stations[j] for j in indices],
            x=[personnel[j] for j in indices],
            orientation='h',
            marker=dict(color=color_map[risk]),
            text=[f"{personnel[j]} ({percentage[j]}%)" for j in indices],
            textposition='outside',
            cliponaxis=False,
            name=risk,
            hovertemplate='<b>%{y}</b><br>Personnel: %{x}<br>Risk: ' + risk + '<br>Role: %{customdata}<extra></extra>',
            customdata=[short_resp[j] for j in indices]
        ))

# Update layout
fig.update_layout(
    title=f"Police Station-wise Personnel Deployment Plan - Ganpati 2025<br>Total: {total_personnel:,} Personnel",
    xaxis_title="Personnel",
    yaxis_title="Police Stations",
    legend=dict(orientation='h', yanchor='bottom', y=1.05, xanchor='center', x=0.5)
)

# Update axes
fig.update_xaxes(range=[0, max(personnel) * 1.2])
fig.update_yaxes(categoryorder='total ascending')

# Save the chart
fig.write_image("police_deployment_chart.png")