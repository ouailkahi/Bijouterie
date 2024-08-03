import axios from 'axios';
import Chart from 'chart.js/auto';
import React, { useState, useEffect, useRef } from 'react';

export default function GraphChartM() {
    const [chartData, setChartData] = useState([]);
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/commandes/total/months');
                setChartData(response.data);
            } catch (error) {
                console.error('Failed to fetch chart data:', error);
                // Optionally, you can set some error state here to display to the user
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (chartData.length === 0) return;

        const ctx = chartRef.current.getContext('2d');

        const labels = chartData.map(item => new Date(item.month).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }));
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

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Meses'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Precio Total (Dh)'

                        },
                        ticks: {
                            stepSize: 1000 // Set the step size for y-axis ticks
                        }
                    }
                }
            }
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [chartData]);

    return (
        <div className="col-xl-8 col-md-12 p-b-15">
            <div id="user-acquisition" className="card card-default" style={{ boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px', borderRadius: '10px', height: '500px' }}>
                <div className="card-header">
                <h2>Informe de ventas por mes</h2>

                </div>
                <div className="card-body">
                    <div className="tab-content pt-4" id="salesReport" style={{ height: "100%" }}>
                        <div className="tab-pane fade show active" id="source-medium" role="tabpanel" style={{ height: "100%" }}>
                            <div className="mb-6" style={{ height: "100%" }}>
                                <canvas ref={chartRef} className='chartjs' style={{ width: '100%', height: '100%' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
