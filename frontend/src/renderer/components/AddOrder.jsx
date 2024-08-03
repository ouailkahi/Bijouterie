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
    if (name === 'prixArticle' || name === 'coutMeteaux' || name === 'poids') {
      list[index]['profitArticle'] =  parseFloat(list[index].coutMeteaux);
      list[index]['prixTotal'] = parseFloat(list[index].prixArticle) ;
      formData(list);
    } else {
      formData(list);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.length === 0) {
      return alert('Por favor, ingrese al menos un artículo');
    }

    if (form.find((form) => form.typesMetaux == '')) {
      return alert('Por favor, complete todos los campos');
    }

    if (form.find((form) => form.prixArticle == 0)) {
      return alert('Por favor, complete todos los campos');
    }

    if (form.find((form) => form.coutMeteaux == 0)) {
      return alert('Por favor, complete todos los campos');
    }

    if (form.find((form) => form.poids == 0)) {
      return alert('Por favor, complete todos los campos');
    }

    if (
      form.find(
        (form) => parseFloat(form.prixArticle) < parseFloat(form.coutMeteaux),
      )
    ) {
      return alert('El precio del artículo debe ser mayor que el costo de los metales');
    }

    const commandeData = {
      ...commande,
      prixTotal: form.reduce((acc, form) => acc + form.prixTotal, 0),
      profitTotal: form.reduce((acc, form) => acc + form.profitArticle, 0),
    };

    dispatch(createCommandes(commandeData)).then(async (res) => {
      const commandeId = res.payload.id;
      const data = form.map((value) => {
        return {
          ...value,
          commandeId: commandeId,
        };
      });

      await axios
        .post('http://localhost:8080/articlesCommande/all', data)
        .then((res) => {
          alert('Pedido creado con éxito');
          navigate('/orders');
        })
        .catch((err) => {
          console.log(err);
        });
    });
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
                                <th>Tipo de Metales</th>
                                <th>Precio del Artículo</th>
                                <th>Costo de Metales</th>
                                <th>Peso/g</th>
                                <th>Acción</th>
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
                                      <option value="">Elegir un tipo</option>
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
                                      }}
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
                                      Eliminar
                                    </button>
                                  </td>
                                </tr>
                              ))}
                              <tr>
                                <td colSpan="3"></td>
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
                                <td colSpan="4"></td>
                                <td colSpan="2">
                                  <select
                                    name="statut"
                                    id="statut"
                                    value={commande.statut}
                                    style={{
                                      color:
                                        commande.statut === 'confirmed'
                                          ? 'green'
                                          : 'orange',
                                    }}
                                    onChange={(e) =>
                                      setCommande({
                                        ...commande,
                                        statut: e.target.value,
                                      })
                                    }
                                    className="form-control"
                                  >
                                    <option
                                      value="confirmed"
                                      style={{ color: 'green' }}
                                    >
                                      Confirmado
                                    </option>
                                    <option
                                      value="pending"
                                      style={{ color: 'orange' }}
                                    >
                                      En curso
                                    </option>
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
                    Añadir un artículo
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Enviar
                  </button>

                  <button
                    type="cancel"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/orders');
                    }}
                    className="btn btn-danger"
                  >
                    Cancelar
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
