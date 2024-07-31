import React from "react";

export default function Type() {


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
                          <td>1</td>
                          <td>Nom complet</td>
                          <td>Janvier 1, 2024 12:00</td>
                          <td>
                            <span className="badge bg-success">CASH</span>
                          </td>
                          <td>-</td>
                          <td style={{ color: "green" }}>100</td>
                          <td style={{ color: "black" }}>200</td>
                          <td>
                            <div className="btn-group mb-1">
                              <button
                                type="button"
                                className="btn btn-outline-success"
                                
                              >
                                info
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-success dropdown-toggle dropdown-toggle-split"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                data-display="static"
                              >
                                <span className="sr-only">Info</span>
                              </button>
                              <div className="dropdown-menu">
                                <a
                                  className="dropdown-item"
                                  style={{
                                    cursor: "pointer",
                                    color: "orange",
                                  }}
                                >
                                  Retour
                                </a>
                                <a
                                  className="dropdown-item"
                                  style={{
                                    color: "red",
                                    cursor: "pointer",
                                  }}
                                >
                                  Supprimer
                                </a>
                              </div>
                            </div>
                          </td>
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
                      <button type="button" className="btn btn-outline-success">
                        1
                      </button>
                      <button type="button" className="btn btn-outline-success">
                        2
                      </button>
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
 