
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

export default function Statistics() {
 
    return (

        <div className="row" style={{color:"BLACK"}}>
            <div className="col-xl-3 col-sm-6 p-b-15 lbl-card" >
                <div className="card card-mini dash-card card-1" >
                    <div className="card-body" style={{boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',borderRadius:'10px'}}>
                        <h2 className="mb-1"></h2>
                        <p >Commande M/J</p>
                        <span className="mdi mdi-package-variant"></span>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 p-b-15 lbl-card">
                <div className="card card-mini dash-card card-2">
                    <div className="card-body" style={{boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',borderRadius:'10px'}}>
                        <h2 className="mb-1"></h2>
                        <p>Totale M/J</p>
                        <span className="mdi mdi-currency-usd"></span>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 p-b-15 lbl-card">
                <div className="card card-mini dash-card card-3">
                    <div className="card-body" style={{boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',borderRadius:'10px'}}>
                        <h2 className="mb-1"></h2>
                        <p>Commande S/J</p>
                        <span className="mdi mdi-package-variant"></span>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 p-b-15 lbl-card">
                <div className="card card-mini dash-card card-4">
                    <div className="card-body" style={{boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',borderRadius:'10px'}}>
                        <h2 className="mb-1"></h2>
                        <p>Revenu quotidien</p>
                        <span className="mdi mdi-currency-usd"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}
