import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { fetchTypesMetaux } from "../redux/typesMetauxSlice";

export default function OrderDetail() {
  const [order, setOrder] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const typesMetaux = useSelector((state) => state.typesMetaux.items);
  const typesMetauxStatus = useSelector((state) => state.typesMetaux.status);

  useEffect(() => {
    if (typesMetauxStatus === 'idle') {
        dispatch(fetchTypesMetaux());
    }
  }, [typesMetauxStatus, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/commandes/detail/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.log(error);
        navigate('/commandes');
      }
    };

    fetchData();
  }, [id, navigate]);

  return (
    <React.Fragment>
      <div className="ec-content-wrapper">
        <div className="content">
          {order && (
            <div className="row">
              <div className="col-12">
                <div className="ec-odr-dtl card card-default">
                  <div className="card-header card-header-border-bottom d-flex justify-content-between">
                    <h2 className="ec-odr">
                      Detalle del Pedido
                      <br />
                      <span className="small">
                        Pedido ID: #00{order.first.id}
                      </span>
                    </h2>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12">
                        <h3 className="tbl-title">Resumen del Producto</h3>
                        <div className="table-responsive">
                          <table
                            className="table table-striped o-tbl"
                            style={{ width: "100%", textAlign: "center" }}
                          >
                            <thead>
                              <tr className="line">
                                <td>
                                  <strong>#</strong>
                                </td>
                                <td className="text-center">
                                  <strong>TIPO DE METALES</strong>
                                </td>
                                <td className="text-center">
                                  <strong>PRECIO</strong>
                                </td>
                                <td className="text-center">
                                  <strong>PESO</strong>
                                </td>
                                <td className="text-center">
                                  <strong>BENEFICIO</strong>
                                </td>
                              </tr>
                            </thead>
                            <tbody>
                              {order.second.length > 0 && order.second.map((item, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{typesMetaux.find((type) => type.id === item.typesMetaux).nom}</td>
                                  <td className="text-center">{item.prixArticle}</td>
                                  <td className="text-center">{item.poids}</td>
                                  <td className="text-center" style={{ color: item.profitArticle < 0 ? "red" : "green" }}>
                                    {item.profitArticle}
                                  </td>
                                </tr>
                              ))}
                              
                              <tr>
                                <td colSpan="3"></td>
                                <td className="text-right">
                                  <strong>Total</strong>
                                </td>
                                <td className="text-right">
                                  <strong>{order.first.prixTotal}</strong>
                                </td>
                              </tr>

                              <tr>
                                <td colSpan="3"></td>
                                <td className="text-right">
                                  <strong>Beneficio Total</strong>
                                </td>
                                <td className="text-right" style={{ color: order.first.profitTotal < 0 ? "red" : "green" }}>
                                  <strong>{order.first.profitTotal}</strong>
                                </td>
                              </tr>

                              <tr>
                                <td colSpan="3"></td>
                                <td className="text-right">
                                  <strong>Estado</strong>
                                </td>
                                <td className="text-right">
                                  <strong style={{ color: order.first.statut === "pending" ? "orange" : order.first.statut === "rejected" ? "red" : "green" }}>
                                    {order.first.statut.toUpperCase()}
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
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
