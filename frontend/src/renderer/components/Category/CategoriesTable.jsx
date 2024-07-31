import React from "react";

export default function CategoriesTable() {
  return (
    <React.Fragment>
      <div className="col-xl-8 col-lg-12">
        <div className="ec-cat-list card card-default">
          <div className="card-body" style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px' }} >
            <div className="table-responsive">
              <table
                id="responsive-data-table"
                style={{ textAlign: "center" }}
                className="table"
              >
                <thead>
                  <tr>
                    
                    <th>Nom</th>
                    <th>Type meteaux</th>
                    <th>Poids</th>
                    <th>Prix</th>
                    <th>Profite</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <img
                        className="cat-thumb"
                        src="./assets/img/category/clothes.png"
                        alt="Product Image"
                      />
                    </td>
                    <td>Example Category</td>
                    <td>
                      <span className="ec-sub-cat-list">
                        <span className="ec-sub-cat-tag">Parent Category</span>
                      </span>
                    </td>
                    <td>{new Date().toString()}</td>
                    <td></td>
                    <td>
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-outline-success dropdown-toggle dropdown-toggle-split"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          data-display="static"
                        ></button>
                        <div className="dropdown-menu">
                          <a
                            className="dropdown-item"
                            style={{ cursor: "pointer" }}
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
