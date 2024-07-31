import React from "react";


export default function AllOrders() {

   
  return (
    <React.Fragment>
      <div className="ec-content-wrapper">
        <div className="content">
          <div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
            <div>
              <h1>Commandes Mahal</h1>
              <p className="breadcrumbs">
                <span>
                  
                </span>
                <span>
                  <i className="mdi mdi-chevron-right"></i>
                </span>
                Commandes
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card card-default">
                <div className="card-body " style={{ boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px', borderRadius: '10px' }}>
                  <div className="table-responsive">
                    <table
                      id="responsive-data-table"
                      className="table"
                      style={{ width: "100%", textAlign: "center" }}
                    >
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Nom complet</th>
                          <th>Date</th>
                          <th>Statut</th>
                          <th>Pertes</th>
                          <th>Prix Damana</th>
                          <th>Prix total</th>
                          <th>Action</th>
                        </tr>

                      </thead>

                      <tbody>
                       
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                      </tbody>
                    </table>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignContent: "center",
                        gap: "10px",
                      }}
                    >
                    
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
