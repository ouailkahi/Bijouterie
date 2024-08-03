import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

export default function CircleChart() {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/typesMetaux/total-weight');
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (data.length === 0) return;

        const ctx = chartRef.current.getContext('2d');

        // Prepare chart data
        const chartData = {
            labels: data.map(item => item.typeMetal),
            datasets: [{
                label: 'Poids total par type de métal',
                data: data.map(item => item.totalPoids),
                backgroundColor: data.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`),
                borderWidth: 1
            }]
        };

        // Destroy existing chart instance if it exists
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        // Create new chart instance
        chartInstance.current = new Chart(ctx, {
            type: 'pie',
            data: chartData,
            options: {
                plugins: {
                    legend: {
                        display: true
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
    }, [data]);

    return (
        <div className="col-xl-4 col-md-12 p-b-15">
            <div className="card card-default" style={{ boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px', borderRadius: '10px' }}>
                <div className="card-header justify-content-center">
                <h2>Resumen de pedidos</h2>

                </div>
                <div className="card-body">
                    <canvas ref={chartRef} />
                </div>
            </div>
        </div>
    );
}
