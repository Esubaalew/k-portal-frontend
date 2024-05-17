import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getTopLanguages } from '../API/tics';
import { getLanguageProportionsById } from '../API/languages';
import '../styles/LanguageProportionsChart.css';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const LanguageProportionsChart = ({ selectedLanguage }) => {
  const [chartData, setChartData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const accessToken = user ? user.access : null;

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        setIsLoading(true);
        if (!selectedLanguage) {
          const languagesData = await getTopLanguages(accessToken);
          if (languagesData && languagesData.length > 0) {
            setChartData({
              labels: languagesData.map(lang => lang.name),
              datasets: [{
                data: languagesData.map(lang => lang.proportion),
                backgroundColor: languagesData.map((_, index) =>
                  `hsl(${(index / languagesData.length) * 360}, 100%, 50%)`
                ),
              }],
            });
          } else {
            setChartData({});
          }
        } else {
          const languageData = await getLanguageProportionsById(selectedLanguage, accessToken);
          if (languageData) {
            setChartData({
              labels: [languageData.name, 'Others'],
              datasets: [{
                data: [languageData.proportion, languageData.others],
                backgroundColor: [
                  'rgba(75, 192, 192, 0.6)', 
                  'rgba(201, 203, 207, 0.6)'  
                ],
              }],
            });
          } else {
            setChartData({});
          }
        }
      } catch (error) {
        console.error("Error fetching language data:", error);
        setChartData({});
      } finally {
        setIsLoading(false);
      }
    };

    fetchLanguages();
  }, [selectedLanguage, accessToken]);

  const options = {
    plugins: {
      datalabels: {
        formatter: (value, context) => {
          const data = context.chart.data.datasets[0].data;
          const total = data.reduce((acc, val) => acc + val, 0);
          const percentage = ((value / total) * 100).toFixed(2) + '%';
          return percentage;
        },
        color: '#fff',
        font: {
          weight: 'bold',
        },
      },
    },
  };

  return (
    <div className="language-proportions-chart">
      <h2>Languages Shown</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : Object.keys(chartData).length > 0 ? (
        <Pie data={chartData} options={options} />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default LanguageProportionsChart;
