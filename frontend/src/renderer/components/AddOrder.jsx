import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTypesMetaux } from '../redux/typesMetauxSlice';
import { createCommandes } from '../redux/commandeSlice';
import axios from 'axios';
import { useNavigate } from 'react-router';

function AddOrder() {
  const dispatch = useDispatch();

  const typesMetaux = useSelector((state) => state.typesMetaux.items);
  const typesMetauxStatus = useSelector((state) => state.typesMetaux.status);

  const navigate = useNavigate();

  useEffect(() => {
    if (typesMetauxStatus === 'idle') {
      dispatch(fetchTypesMetaux());
    }
  }, [typesMetauxStatus, dispatch]);

  const [commande, setCommande] = useState({
    statut: 'confirmed',
  });

  const [form, formData] = useState([
    {
      typesMetaux: '',
      prixArticle: 0,
      poids: 0,
      profitArticle: 0,
      coutMeteaux: 0,
      prixTotal: 0,
    },
  ]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...form];
    list[index][name] = value;
    formData(list);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.length === 0) {
      return alert('Veuillez renseigner au moins un article');
    }

    if (form.find((form) => form.typesMetaux === '')) {
      return alert('Veuillez renseigner tous les champs');
    }

    if (form.find((form) => form.prixArticle === 0)) {
      return alert('Veuillez renseigner tous les champs');
    }

    if (form.find((form) => form.coutMeteaux === 0)) {
      return alert('Veuillez renseigner tous les champs');
    }

    if (form.find((form) => form.poids === 0)) {
      return alert('Veuillez renseigner tous les champs');
    }

    if(form.find((form) => form.prixArticle < form.coutMeteaux)){
      return alert('Prix Article doit être supérieur au Cout Métaux');
    }

    const commandeData = {
      ...commande,
      prixTotal: form.reduce((acc, form) => acc + form.prixTotal, 0),
      profitTotal : form.reduce((acc, form) => acc + form.profitArticle, 0)
    };

    dispatch(createCommandes(commandeData))
      .then(async(res) => {
        const commandeId = res.payload.id;
        const data = form.map((value) => {
          return {
            ...value,
            commandeId: commandeId,
          };
        })
        
        await axios.post('http://localhost:8080/articlesCommande/all', data)
        .then((res) => {
          alert('Commande crée avec succès')
          navigate('/orders')
        })
        .catch((err) => {
          console.log(err)
        })
      })
  };

  return (
    <>
      <React.Fragment>
        <div className="ec-content-wrapper">
          <div className="content">
            <div className="ec-cat-form">
              <form>
                <div className="row">
                  <div className="col-12">
                    <div className="card card-default">
                      <div className="card-body">
                        <div className="table-responsive">
                          <table
                            id="responsive-data-table"
                            className="table"
                            style={{ width: '100%', textAlign: 'center' }}
                          >
                            <thead>
                              <tr>
                                <th>Type Meteaux</th>
                                <th>Prix Article</th>
                                <th>Cout Meteaux</th>
                                <th>Poids</th>
                                <th>Prix Total</th>
                                <th>Profit Article</th>
                                <th>Action</th>
                              </tr>
                            </thead>

                            <tbody>
                              {form.map((value, index) => (
                                <tr key={index}>
                                  <td>
                                    <select
                                      name="typesMetaux"
                                      id="typesMetaux"
                                      className="form-control"
                                      onChange={(e) => handleChange(e, index)}
                                    >
                                      <option value="">Choisir un type</option>
                                      {typesMetaux.length > 0 &&
                                        typesMetaux.map((typesMetaux) => (
                                          <option
                                            key={typesMetaux.id}
                                            value={typesMetaux.id}
                                          >
                                            {typesMetaux.nom}
                                          </option>
                                        ))}
                                    </select>
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      name="prixArticle"
                                      id="prixArticle"
                                      className="form-control"
                                      value={value.prixArticle}
                                      onChange={(e) => handleChange(e, index)}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      name="coutMeteaux"
                                      id="coutMeteaux"
                                      className="form-control"
                                      value={value.coutMeteaux}
                                      onChange={(e) => {
                                        handleChange(e, index);
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      name="poids"
                                      id="poids"
                                      min={0}
                                      className="form-control"
                                      value={value.poids}
                                      onChange={(e) => {
                                        handleChange(e, index);
                                        const list = [...form];
                                        list[index]['profitArticle'] =
                                          value.prixArticle * value.poids -
                                          value.coutMeteaux * value.poids;
                                        list[index]['prixTotal'] =
                                          value.prixArticle * value.poids;
                                        formData(list);
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      name="prixTotal"
                                      id="prixTotal"
                                      className="form-control"
                                      value={value.prixArticle * value.poids}
                                      disabled
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      name="profitArticle"
                                      id="profitArticle"
                                      className="form-control"
                                      style={{ color: value.profitArticle < 0 ? 'red' : 'green' }}
                                      value={value.profitArticle}
                                      disabled
                                    />
                                  </td>
                                  <td>
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      onClick={() => {
                                        const list = [...form];
                                        list.splice(index, 1);
                                        formData(list);
                                      }}
                                    >
                                      Supprimer
                                    </button>
                                  </td>
                                </tr>
                              ))}
                              <tr>
                                <td colSpan="5"></td>
                                <td className="text-right">
                                  <strong>Total</strong>
                                </td>
                                <td className="text-right">
                                  <strong>
                                    {form.reduce((a, b) => a + b.prixTotal, 0)}
                                    Dh
                                  </strong>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan="5"></td>
                                <td colSpan="2">
                                  <select
                                    name="statut"
                                    id="statut"
                                    value={commande.statut}
                                    style={{color: commande.statut === 'confirmed' ? 'green' : 'orange'}}
                                    onChange={(e) =>
                                      setCommande({
                                        ...commande,
                                        statut: e.target.value,
                                      })
                                    }
                                    className="form-control"
                                  >
                                    <option value="confirmed" style={{ color: 'green' }}>Confirmé</option>
                                    <option value="pending" style={{ color: 'orange' }}>En cours</option>
                                  </select>
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
                    display: 'flex',
                    justifyContent: 'end',
                    marginTop: '25px',
                    gap: '15px',
                  }}
                >
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(e) =>
                      formData([
                        ...form,
                        {
                          typesMetaux: '',
                          prixArticle: 0,
                          coutMeteaux: 0,
                          poids: 0,
                          profitArticle: 0,
                          prixTotal: 0,
                        },
                      ])
                    }
                  >
                    Ajouter une article
                  </button>
                  <button type="submit" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>
                    Soumettre
                  </button>

                  <button type="cancel" onClick={(e) => {
                    e.preventDefault();
                    navigate('/orders');
                  }} className="btn btn-danger">
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
