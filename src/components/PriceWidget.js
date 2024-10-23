import './PriceWidget.css';
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function PriceWidget() {
  const [price, setPrice] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current price
        const priceResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=sui&vs_currencies=usd&include_24hr_change=true');
        if (!priceResponse.ok) {
          throw new Error(`HTTP error! status: ${priceResponse.status}`);
        }
        const priceData = await priceResponse.json();
        setPrice(priceData.sui);

        // Fetch historical data (7 days)
        const historicalResponse = await fetch('https://api.coingecko.com/api/v3/coins/sui/market_chart?vs_currency=usd&days=7');
        if (!historicalResponse.ok) {
          throw new Error(`HTTP error! status: ${historicalResponse.status}`);
        }
        const historicalData = await historicalResponse.json();
        setHistoricalData(historicalData.prices);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(`Failed to fetch data: ${error.message}`);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: historicalData ? historicalData.map(data => new Date(data[0]).toLocaleDateString()) : [],
    datasets: [
      {
        label: 'SUI Price (USD)',
        data: historicalData ? historicalData.map(data => data[1]) : [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'SUI Price Last 7 Days'
      }
    }
  };

  return (
    <div className="price-widget bg-[#1c243e] text-white p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-2">Current SUI Price</h3>
      {loading && <p>Loading data...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {price && (
        <div>
          <p className="text-lg">Price: <span className="font-bold">${price.usd.toFixed(2)}</span></p>
          <p className={`text-lg ${price.usd_24h_change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            24h Change: <span className="font-bold">{price.usd_24h_change.toFixed(2)}%</span>
          </p>
        </div>
      )}
      {historicalData && (
        <div className="mt-4">
          <Line data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
}

export default PriceWidget;
