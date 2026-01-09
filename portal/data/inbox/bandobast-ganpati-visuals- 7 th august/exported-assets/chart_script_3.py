import plotly.graph_objects as go
import plotly.io as pio

# Data from the provided JSON
locations = ["Godaghat", "Darana River", "Panchavati Area", "Kapila Sangam", "Bhadrakali", "Wakadi Barav", "Valdevi River", "Bitco Chowk"]
risk_scores = [27, 21, 21, 19, 19, 19, 16, 14]

# Define colors based on risk categories
colors = []
for score in risk_scores:
    if score >= 25:  # Critical
        colors.append("#DB4545")  # Bright red
    elif score >= 20:  # High
        colors.append("#B4413C")  # Moderate red (closest to orange)
    elif score >= 15:  # Medium
        colors.append("#D2BA4C")  # Moderate yellow
    else:  # Low
        colors.append("#2E8B57")  # Sea green

# Create the bar chart
fig = go.Figure()

fig.add_trace(go.Bar(
    x=locations,
    y=risk_scores,
    marker_color=colors,
    text=risk_scores,
    textposition='outside',
    cliponaxis=False
))

# Update layout
fig.update_layout(
    title="Risk Assessment - Ganpati 2025",
    xaxis_title="Locations",
    yaxis_title="Risk Score",
    showlegend=False
)

# Update axes
fig.update_xaxes(tickangle=45)
fig.update_yaxes(range=[0, max(risk_scores) + 3])

# Save the chart
fig.write_image("risk_assessment_chart.png")