import React from "react";

export default function AddCategory({ categories }) {
  return (
    <React.Fragment>
      <div className="col-xl-4 col-lg-12">
        <div className="ec-cat-list card card-default mb-24px">
          <div className="card-body" style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px' }}>
            <div className="ec-cat-form" style={{ color: 'black' }}>
              <h4>Ajouter une nouvelle Commande</h4>

              <form>
                <div className="form-group row">
                  <label htmlFor="text" className="col-12 col-form-label" style={{ color: 'black' }}>
                    Nom*
                  </label>
                  <div className="col-12">
                    <input
                      id="name"
                      name="name"
                      className="form-control here slug-title"
                      type="text"
                    />
                    <p className="text-danger" style={{ color: "red" }}></p>
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    htmlFor="parentCategory"
                    className="col-12 col-form-label"
                    style={{ color: 'black' }}
                  >
                    Type Meteaux
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
                </div>

                <div className="form-group row">
                  <label htmlFor="text" className="col-12 col-form-label" style={{ color: 'black' }}>
                    Poids
                  </label>
                  <div className="col-12">
                    <input
                      id="name"
                      name="name"
                      className="form-control here slug-title"
                      type="number"
                    />
                    <p className="text-danger" style={{ color: "red" }}></p>
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="text" className="col-12 col-form-label" style={{ color: 'black' }}>
                    Prix
                  </label>
                  <div className="col-12">
                    <input
                      id="name"
                      name="name"
                      className="form-control here slug-title"
                      type="number"
                    />
                    <p className="text-danger" style={{ color: "red" }}></p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <button
                      name="submit"
                      type="submit"
                      className="btn btn-primary"
                    >
                      Soumettre
                    </button>
                  </div>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
