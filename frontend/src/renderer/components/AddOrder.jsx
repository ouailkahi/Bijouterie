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

  const [form, setFormData] = useState([
    {
      typesMetaux: '',
      prixArticle: 0,
      poids: 0,
      profitArticle: 0,
      prixTotal: 0,
    },
  ]);

  const [errors, setErrors] = useState({});

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...form];
    list[index][name] = value;
    setFormData(list);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    let errors = {};

    if (form.length === 0) {
      errors = { ...errors, form: 'Por favor, ingrese al menos un artículo' };
    }

    form.forEach((item, index) => {
      if (item.typesMetaux === '') {
        errors[`typesMetaux_${index}`] = 'Por favor, complete este campo';
      }
      if (item.prixArticle === 0 || item.prixArticle.toString().trim() === '') {
        errors[`prixArticle_${index}`] = 'Por favor, complete este campo';
      }
      if (item.profitArticle === 0 || item.profitArticle.toString().trim() === '') {
        errors[`profitArticle_${index}`] = 'Por favor, complete este campo';
      }
      if (item.poids === 0 || item.poids.toString().trim() === '') {
        errors[`poids_${index}`] = 'Por favor, complete este campo';
      }
      if (parseFloat(item.prixArticle) < parseFloat(item.profitArticle)) {
        errors[`prixArticle_${index}`] = 'El precio del artículo debe ser mayor que el costo de los metales';
      }
    });

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const commandeData = {
      ...commande,
      prixTotal: form.reduce((acc, item) => acc + parseFloat(item.prixArticle), 0),
      profitTotal: form.reduce((acc, item) => acc + parseFloat(item.profitArticle), 0),
    };

    try {
      const res = await dispatch(createCommandes(commandeData));
      const commandeId = res.payload.id;
      const data = form.map((value) => ({
        ...value,
        commandeId: commandeId,
      }));

      await axios.post('http://localhost:8080/articlesCommande/all', data);
     
      setFormData([
        {
          typesMetaux: '',
          prixArticle: 0,
          poids: 0,
          profitArticle: 0,
          prixTotal: 0,
        },
      ]);
      navigate('/orders');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="ec-content-wrapper">
      <div className="content">
        <div className="ec-cat-form">
          <form onSubmit={handleSubmit}>
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
                            <th>Beneficio</th>
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
                                  className={`form-control ${errors[`typesMetaux_${index}`] ? 'input-error' : ''}`}
                                  onChange={(e) => handleChange(e, index)}
                                  value={value.typesMetaux}
                                >
                                  <option value="">Elegir un tipo</option>
                                  {typesMetaux.length > 0 &&
                                    typesMetaux.map((type) => (
                                      <option key={type.id} value={type.id}>
                                        {type.nom}
                                      </option>
                                    ))}
                                </select>
                                {errors[`typesMetaux_${index}`] && <div className="error-text">{errors[`typesMetaux_${index}`]}</div>}
                              </td>
                              <td>
                                <input
                                  type="number"
                                  name="prixArticle"
                                  id="prixArticle"
                                   step="0.01"
                                  className={`form-control ${errors[`prixArticle_${index}`] ? 'input-error' : ''}`}
                                  onChange={(e) => handleChange(e, index)}
                                  value={value.prixArticle}
                                />
                                {errors[`prixArticle_${index}`] && <div className="error-text">{errors[`prixArticle_${index}`]}</div>}
                              </td>
                              <td>
                                <input
                                  type="number"
                                  name="profitArticle"
                                  id="profitArticle"
                                   step="0.01"
                                  className={`form-control ${errors[`profitArticle_${index}`] ? 'input-error' : ''}`}
                                  onChange={(e) => handleChange(e, index)}
                                  value={value.profitArticle}
                                />
                                {errors[`profitArticle_${index}`] && <div className="error-text">{errors[`profitArticle_${index}`]}</div>}
                              </td>
                              <td>
                                <input
                                  type="number"
                                  name="poids"
                                  id="poids"
                                  step="0.01"
                                  min={0}
                                  className={`form-control ${errors[`poids_${index}`] ? 'input-error' : ''}`}
                                  onChange={(e) => handleChange(e, index)}
                                  value={value.poids}
                                />
                                {errors[`poids_${index}`] && <div className="error-text">{errors[`poids_${index}`]}</div>}
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => {
                                    const list = [...form];
                                    list.splice(index, 1);
                                    setFormData(list);
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
                                {form.reduce((a, b) => a + parseFloat(b.prixArticle), 0)}
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
                onClick={() =>
                  setFormData([
                    ...form,
                    {
                      typesMetaux: '',
                      prixArticle: 0,
                      profitArticle: 0,
                      poids: 0,
                      prixTotal: 0,
                    },
                  ])
                }
              >
                Añadir un artículo
              </button>
              <button type="submit" className="btn btn-primary">
                Enviar
              </button>
              <button
                type="button"
                onClick={() => navigate('/orders')}
                className="btn btn-danger"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddOrder;
