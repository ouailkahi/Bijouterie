import React from 'react';

export default function Statistics({ totalMonthly, totalDaily }) {
    return (
        <div className="row" style={{ color: "BLACK" }}>
            <div className="col-xl-3 col-sm-6 p-b-15 lbl-card">
                <div className="card card-mini dash-card card-1">
                    <div className="card-body" style={{ boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px', borderRadius: '10px' }}>
                        <h2 className="mb-1">
                            {totalDaily.length > 0 ? totalDaily[0].totalPrix : 0} Dh
                        </h2>
                        <p>Total Precio/día</p>
                        <span className="mdi mdi-currency-usd"></span>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 p-b-15 lbl-card">
                <div className="card card-mini dash-card card-2">
                    <div className="card-body" style={{ boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px', borderRadius: '10px' }}>
                        <h2 className="mb-1">
                            {totalDaily.length > 0 ? totalDaily[0].totalPoids : 0} g
                        </h2>
                        <p>Total Peso/día</p>
                        <span className="mdi mdi-weight"></span>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 p-b-15 lbl-card">
                <div className="card card-mini dash-card card-3">
                    <div className="card-body" style={{ boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px', borderRadius: '10px' }}>
                        <h2 className="mb-1">
                            {totalMonthly.length > 0 ? totalMonthly[0].totalPrix : 0} Dh
                        </h2>
                        <p>Total Precio/mes</p>
                        <span className="mdi mdi-currency-usd"></span>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 p-b-15 lbl-card">
                <div className="card card-mini dash-card card-4">
                    <div className="card-body" style={{ boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px', borderRadius: '10px' }}>
                        <h2 className="mb-1">
                            {totalMonthly.length > 0 ? totalMonthly[0].totalPoids : 0} g
                        </h2>
                        <p>Total Peso/mes</p>
                        <span className="mdi mdi-weight"></span>
                    </div>
                </div>
            </div>
        </div>
    );
}
