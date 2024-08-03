import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { useState } from 'react';
export default function CircleChart() {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [data, setDataNew] = useState([]);


    useEffect(() => {
      const token = localStorage.getItem("accessToken");
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:8080/articlesCommande', {
              headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
              }
            });
            setDataNew(response.data);
            console.log([response.data.cash, response.data.aarbon,]);
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
      }, []);


  
    useEffect(() => {
      const ctx = chartRef.current.getContext('2d');
  
      // Dummy data for example
      const chartData = {
        labels: [ 'CASH', 'AARBON'],
        datasets: [{
          label: 'Order',
          
          backgroundColor: [
            '#4c84ff', // CASH
            '#ff7b7b', // AARBON
           
          ],
          borderColor: [
            '#4c84ff',
            '#ff7b7b',
          ],
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
    <div className="card card-default" style={{boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',borderRadius:'10px'}}>
        <div className="card-header justify-content-center">
            <h2>Aperçu des commandes</h2>
        </div>
        <div className="card-body" >
        <canvas  ref={chartRef} />
        </div>
        {/* <div className="card-footer d-flex flex-wrap bg-white p-0">
            <div className="col-6">
                <div className="p-20">
                    <ul className="d-flex flex-column justify-content-between">
                        <li className="mb-2"><i className="mdi mdi-checkbox-blank-circle-outline mr-2"
                            style={{ color: "#4c84ff" }}></i>KRIDI</li>
                        <li className="mb-2"><i className="mdi mdi-checkbox-blank-circle-outline mr-2"
                            style={{ color: "#80e1c1 " }}></i>CASH</li>
                        <li>
                          <i className="mdi mdi-checkbox-blank-circle-outline mr-2"
                            style={{ color: "#ff7b7b " }}></i>Returned</li>
                    </ul>
                </div>
            </div>
            <div className="col-6 border-left">
                <div className="p-20">
                    <ul className="d-flex flex-column justify-content-between">
                        <li className="mb-2"><i className="mdi mdi-checkbox-blank-circle-outline mr-2"
                            style={{ color: "#8061ef" }}></i>DAMANA</li>
                             <li className="mb-2"><i className="mdi mdi-checkbox-blank-circle-outline mr-2"
                            style={{ color: "#ffa128" }}></i>AARBON</li>
                        
                    </ul>
                </div>
            </div>
        </div> */}
    </div>
</div>
  )
}
