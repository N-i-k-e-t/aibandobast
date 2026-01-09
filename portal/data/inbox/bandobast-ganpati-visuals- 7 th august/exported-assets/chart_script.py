import plotly.graph_objects as go

# Data for household Ganpati trends
years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]
households = [9000, 9300, 9700, 10000, 10200, 4750, 7800, 8103, 14000, 23000, 32981]
is_prediction = [False, False, False, False, False, False, False, False, False, False, True]

# Separate historical and prediction data
historical_years = [year for i, year in enumerate(years) if not is_prediction[i]]
historical_households = [households[i] for i, pred in enumerate(is_prediction) if not pred]
prediction_year = [year for i, year in enumerate(years) if is_prediction[i]]
prediction_households = [households[i] for i, pred in enumerate(is_prediction) if pred]

# Create the figure
fig = go.Figure()

# Add historical data line
fig.add_trace(go.Scatter(
    x=historical_years,
    y=historical_households,
    mode='lines+markers',
    name='Historical',
    line=dict(color='#1FB8CD', width=3),
    marker=dict(size=8),
    hovertemplate='Year: %{x}<br>Households: %{y:,.0f}<extra></extra>'
))

# Add prediction point
fig.add_trace(go.Scatter(
    x=prediction_year,
    y=prediction_households,
    mode='markers',
    name='2025 Predict',
    marker=dict(color='#DB4545', size=12, symbol='diamond'),
    hovertemplate='Year: %{x}<br>Predicted: %{y:,.0f}<extra></extra>'
))

# Add connection line from 2024 to 2025 prediction
fig.add_trace(go.Scatter(
    x=[2024, 2025],
    y=[23000, 32981],
    mode='lines',
    name='Trend to 2025',
    line=dict(color='#DB4545', width=2, dash='dash'),
    hoverinfo='skip',
    showlegend=False
))

# Highlight COVID impact years (2020-2021)
covid_years = [2020, 2021]
covid_households = [4750, 7800]
fig.add_trace(go.Scatter(
    x=covid_years,
    y=covid_households,
    mode='markers',
    name='COVID Impact',
    marker=dict(color='#2E8B57', size=10, symbol='x'),
    hovertemplate='Year: %{x}<br>COVID Impact: %{y:,.0f}<extra></extra>'
))

# Update layout
fig.update_layout(
    title='Nashik Ganpati Household Trends',
    xaxis_title='Year',
    yaxis_title='Households (k)',
    legend=dict(orientation='h', yanchor='bottom', y=1.05, xanchor='center', x=0.5),
    showlegend=True
)

# Format y-axis to show abbreviated numbers
fig.update_yaxes(tickformat='.1s')

# Save the chart
fig.write_image('ganpati_household_trends.png')