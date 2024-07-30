import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersAsync } from "../../redux/orderSlice";
import { fetchAllUsersAsync } from "../../redux/userSlice";
import { Link } from "react-router-dom";

export default function OrderHistory() {
 
  return (
    <div className="ec-content-wrapper">
      <div className="content">
        <div className="row">
          <div className="col-12">
            <div className="card card-default">
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    id="responsive-data-table"
                    className="table"
                    style={{ width: "100%" ,textAlign:"center"}}
                  >
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Email</th>
                        <th>Price</th>
                        <th>Payment</th>
                        <th>Shipping</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {statusOrders === "succeeded" &&
                        statusUsers === "succeeded" && (
                          <>
                            {orders.map((order) => (
                              <tr key={order.orderId}>
                                <td>00{order.orderId}</td>
                                <td>
                                  {users
                                    .filter((user) => user.id === order.userId)
                                    .map(
                                      (user) =>
                                        `${user.firstName} ${user.lastName}`
                                    )
                                    .join(", ")}
                                </td>
                                <td>{users.filter((user) => user.id === order.userId)[0].email}</td>
                                <td>{order.totalAmount} Dh</td>
                                <td>{order.paymentStatus}</td>
                                <td>{order.shippingStatus}</td>
                                <td>
                                  <span className={"mb-2 mr-2 badge " + (order.status === "payé" ? "badge-success" : order.status === "en attente"? "badge-secondary" : "badge-danger")}>
                                    {order.status}
                                  </span>
                                </td>
                                <td>{order.createdAt}</td>
                                <td>
                                  <div className="btn-group mb-1">
                                    <Link
                                      to={"/admin/orderDetail/" + order.orderId}
                                      className="btn btn-outline-success"
                                    >
                                      Info
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </>
                        )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
