import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { DNA } from 'react-loader-spinner';
import { getTopResources, getTopLanguages, getTopUsers } from '../API/tics'; 
import { useNavigate } from 'react-router-dom';
import '../styles/Analysis.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Analysis = () => {
  const [currentAnalysis, setCurrentAnalysis] = useState('resources');
  const [resourcesData, setResourcesData] = useState([]);
  const [languagesData, setLanguagesData] = useState([]);
  const [usersData, setUsersData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const accessToken = user ? user.access : null;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resources = await getTopResources(accessToken);
        setResourcesData(resources);
        const languages = await getTopLanguages(accessToken);
        setLanguagesData(languages);
        const users = await getTopUsers(accessToken);
        setUsersData(users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    if (accessToken) {
      fetchData();
    }
    if (!accessToken){
        navigate('/in');
    }
  }, [accessToken, navigate]);

  const chartData = {
    labels: currentAnalysis === 'resources' ? resourcesData.map(item => item.resource_id) :
             currentAnalysis === 'languages' ? languagesData.map(lang => lang.name) :
             usersData.map(user => user.username),
    datasets: [{
      label: currentAnalysis === 'resources' ? 'Number of Likes' :
             currentAnalysis === 'languages' ? 'Number of Resources' :
             'Resources Shared',
      data: currentAnalysis === 'resources' ? resourcesData.map(item => item.num_likes) :
            currentAnalysis === 'languages' ? languagesData.map(lang => lang.num_resources) :
            usersData.map(user => user.num_resources_shared),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  return (
    <div className="analysis-container">
      <div className="btns-container">
  <button onClick={() => setCurrentAnalysis('resources')} className={currentAnalysis === 'resources' ? 'selected' : 'button'}>Resources</button>
  <button onClick={() => setCurrentAnalysis('languages')} className={currentAnalysis === 'languages' ? 'selected' : 'button'}>Languages</button>
  <button onClick={() => setCurrentAnalysis('users')} className={currentAnalysis === 'users' ? 'selected' : 'button'}>Users</button>
</div>

      <div className="content-container">
        <div className="chart-container">
          {loading ? (
            <DNA visible={true} height="80" width="80" ariaLabel="dna-loading" />
          ) : (
            <Bar data={chartData} />
          )}
        </div>
        <div className="list-container">
          <h3>{currentAnalysis === 'resources' ? 'Top Resources' :
               currentAnalysis === 'languages' ? 'Top Languages' :
               'Top Users'}</h3> 
          {loading ? (
            <DNA visible={true} height={80} width={80} ariaLabel="dna-loading" />
          ) : (
            <div className="li-container">
              {(currentAnalysis === 'resources' ? resourcesData :
                currentAnalysis === 'languages' ? languagesData :
                usersData).map((item, index) => (
                <div key={index} className="res-item">
                  <span>{item.name || item.resource_id || item.username}</span>
                  <span>{item.num_resources || item.num_likes || item.num_resources_shared} {currentAnalysis === 'resources' ? 'Likes' :
                       currentAnalysis === 'languages' ? 'Resources' :
                       'Shared'}</span> 
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analysis;