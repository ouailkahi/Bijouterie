import axios from 'axios';
import Chart from 'chart.js/auto';
import React, { useState, useEffect, useRef } from 'react';

export default function GraphChart() {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/commandes/total/days');
                setChartData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartData.length === 0) return;

        const ctx = chartRef.current.getContext('2d');

        // Transform the fetched data to match the chart format
        const labels = chartData.map(item => item.day);
        const dataValues = chartData.map(item => item.totalPrix);

        const data = {
            labels: labels,
            datasets: [{
                label: 'Ventas',
                data: dataValues,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        };

        // Destroy existing chart instance if it exists
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        // Create new chart instance
        chartInstance.current = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1000 // Set the step size for y-axis ticks
                        }
                    }
                }
            }
        });

        // Cleanup on component unmount
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [chartData]);

    return (
        <div className="col-xl-12 col-md-12 p-b-15">
            <div id="user-acquisition" className="card card-default" style={{ boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px', borderRadius: '10px', height: '500px' }}>
                <div className="card-header">
                <h2>Informe de ventas por dia</h2>
                </div>
                <div className="card-body">
                    <div className="tab-content pt-4" id="salesReport" style={{ height: "100%" }}>
                        <div className="tab-pane fade show active" id="source-medium" role="tabpanel"  style={{ height: "100%" }}>
                            <div className="mb-6" style={{ height: "100%"}}>
                                <canvas ref={chartRef} className='chartjs' style={{ width: '100%', height: '100%' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
