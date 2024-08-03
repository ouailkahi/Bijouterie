import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCommandes } from "../redux/commandeSlice";
import Pagination from "./Pagination"; // Importa el componente de paginación personalizado
import { useNavigate } from "react-router";

export default function AllOrders() {
  const dispatch = useDispatch();
  const { commandesList, status } = useSelector((state) => state.commandes);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);

  useEffect(() => {
    if (status !== "succeeded-fetching") {
      dispatch(fetchAllCommandes({ page: currentPage, size: pageSize }));
    }
  }, [currentPage, dispatch, status]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const convertToDate = (date) => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  };

  const totalItems = commandesList.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <React.Fragment>
      <div className="ec-content-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-12">
              <div className="card card-default">
                <div className="card-body" style={{ boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px', borderRadius: '10px' }}>
                  <div className="table-responsive">
                    <table
                      id="responsive-data-table"
                      className="table"
                      style={{ width: "100%", textAlign: "center" }}
                    >
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Fecha del Pedido</th>
                          <th>Precio Total</th>
                          <th>Beneficio Total</th>
                          <th>Estado</th>
                          <th>Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        {commandesList.length > 0 && commandesList.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map((commande) => (
                          <tr key={commande.id}>
                            <td>#00{commande.id}</td>
                            <td>{convertToDate(commande.dateCommande)}</td>
                            <td>{commande.prixTotal ? `${commande.prixTotal}Dh` : '0Dh'}</td>
                            <td style={{ color: 'green' }}>{commande.profitTotal ? `${commande.profitTotal}Dh` : '0Dh'}</td>
                            <td style={{ color: commande.statut === 'reject' ? 'red' : commande.statut === 'pending' ? 'orange' : 'green' }}>
                              {commande.statut.toUpperCase()}
                            </td>
                            <td>
                              <button type="button" className="btn btn-primary" onClick={() => {
                                window.scrollTo(0, 0);
                                navigate(`/orders/${commande.id}`)
                                }}>
                                Detalles
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
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
