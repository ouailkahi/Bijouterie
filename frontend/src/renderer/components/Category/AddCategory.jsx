import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTypesMetaux } from "../../redux/typesMetauxSlice";

export default function AddCategory({ typesMetaux }) {
  const dispatch = useDispatch();

  const [nom,setNom] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(nom.trim() === ""){
      return alert("Veuillez renseigner le nom");
    }
    if(typesMetaux.find((typesMetaux) => typesMetaux.nom === nom)){
      return alert("Ce type existe déja");
    }

    dispatch(createTypesMetaux({ nom }));

    setNom("");
  };
  return (
    <React.Fragment>
      <div className="col-xl-4 col-lg-12">
        <div className="ec-cat-list card card-default mb-24px">
          <div className="card-body" style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px' }}>
            <div className="ec-cat-form" style={{ color: 'black' }}>
              <h4>Ajouter une nouvelle Type</h4>

              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group row">
                  <label htmlFor="text" className="col-12 col-form-label" style={{ color: 'black' }}>
                    Nom Type*
                  </label>
                  <div className="col-12">
                    <input
                      id="nom"
                      name="nom"
                      onChange={(e) => setNom(e.target.value)}
                      className="form-control here slug-title"
                      type="text"
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
