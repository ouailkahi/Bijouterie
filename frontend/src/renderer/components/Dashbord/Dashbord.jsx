import React, { useEffect, useState } from "react";
import CircleChart from "./CircleChart";
import GraphChart from "./GraphChart";
import Statistics from "./Statistics";
import axios from "axios";

export default function Dashbord() {
    const [totalMonthly, setTotalMonthly] = useState([]);
    const [totalDaily, setTotalDaily] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/commandes/total/monthly');
                setTotalMonthly(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        const fetchDataDaily = async () => {
            try {
                const response = await axios.get('http://localhost:8080/commandes/total/daily');
                setTotalDaily(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDataDaily();

        fetchData();
        
    }, []);

    return (
        <React.Fragment>
            <div className="content" style={{ background: '#14141403' }}>
                <Statistics totalMonthly={totalMonthly} totalDaily={totalDaily} />
                <GraphChart />
                <CircleChart />
            </div>
        </React.Fragment>
    )
}