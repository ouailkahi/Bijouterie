import React from "react";

function AddOrder() {


  return (
    <>
      <React.Fragment>
        <div className="ec-content-wrapper">
          <div className="content">
            <div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
              <div>
                <p className="breadcrumbs">
                
                  <span>
                    <i className="mdi mdi-chevron-right"></i>
                  </span>
                  Ajouter une commande
                </p>
              </div>

            </div>
            
              <div className="ec-cat-form">
                <form >
                  <div className="form-row">
                    <div className="form-group col-md-4 ">
                      <label htmlFor="customer_name">
                        Nom du client <span>(Facultatif)</span>
                      </label>
                      <input
                        type="text"
                        id="customer_name"
                        className="form-control "
                      
                      />
                     
                        <div
                          className="invalid-feedback"
                          style={{
                            display: "block",
                            marginBottom: "10px",
                          }}
                        >
                   
                        </div>
                     
                    </div>

                    <div className="form-group col-md-4 ">
                      <label htmlFor="phone_number">
                        Numéro de téléphone <span>(Facultatif)</span>
                      </label>
                      <input
                        type="text"
                        id="phone_number"
                        className="form-control "
                      
                    
                      />
                     
                        <div
                          className="invalid-feedback"
                          style={{
                            display: "block",
                            marginBottom: "10px",
                          }}
                        >
                       
                        </div>
                     
                    </div>

                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="productName"
                      className="col-12 col-form-label"
                    >
                      Nom du produit
                    </label>
                    <div className="col-12">
                    <select
                      id="parentCategory"
                      name="parentCategory"
                      className="form-control"
                    >
                      <option value={"null"}>Aucune</option>
                      
                           
                    </select>
                    </div>
                   
                      <div
                        className="invalid-feedback"
                        style={{
                          display: "block",
                          marginBottom: "10px",
                        }}
                      >
                        
                      </div>
                   
                    
                      <div
                        className="invalid-feedback"
                        style={{
                          display: "block",
                          marginBottom: "10px",
                        }}
                      >
                      </div>
                  
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <div className="card card-default">
                        <div className="card-body">
                          <div className="table-responsive">
                            <table
                              id="responsive-data-table"
                              className="table"
                              style={{ width: "100%", textAlign: "center" }}
                            >
                              <thead>
                                <tr>
                                  <th>Type</th>
                                  
                                  <th>Poids</th>
                                  <th>Prix</th>
                                  <th>Variante</th>
                                  <th>Stock</th>
                                  <th>Coût total (Dh)</th>
                                  <th>Action</th>
                                </tr>

                              </thead>

                              <tbody>
                               
                                    <tr >
                                      <td>
                                        Rodiage
                                      </td>
                                     
                                      <td style={{ width: "15%" }}>
                                        <input
                                          type="number"
                                          className="form-control"
                                          value=''
                                         
                                        />
                                      </td>
                                      <td style={{ width: "15%" }}>
                                        <input
                                          type="number"
                                          className="form-control "
                                          placeholder=''
                                        />
                                      </td>
                                      <td>
                                     
                                          <select
                                            className="form-control"
                                           
                                          >
                                            
                                          </select>
                                   
                                      </td>
                                      <td>
                                      
                                      </td>
                                      <td>
                                       
                                      </td>
                                      <td>
                                        <div className="btn-group mb-1">
                                          <button
                                            type="button"
                                            className="btn btn-outline-danger"
                                           
                                          >
                                            Supprimer
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                              

                                <tr>
                                  <td colSpan="6"></td>
                                  <td className="text-right">
                                    <strong>Total</strong>
                                  </td>
                                  <td className="text-right">
                                    <strong>
                                       Dh
                                    </strong>
                                  </td>
                                </tr>

                               
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="col-md-12"
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      marginTop: "25px",
                      gap: "15px",
                    }}
                  >
                    <button type="submit" className="btn btn-primary">
                      Soumettre
                    </button>

                    <button type="cancel" className="btn btn-danger">
                      Annuler
                    </button>

                  </div>
                </form>
              </div>
        
          </div>
        </div>
      </React.Fragment>
    </>
  );
}

export default AddOrder;
