import React, { useState, useEffect } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
        console.log("Orders fetched:", response.data.data);
      } else {
        toast.error("Failed to load orders");
      }
    } catch (error) {
      toast.error("Server Error: Unable to fetch orders");
      console.error(error);
    }
  };

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: newStatus,
      });

      if (response.data.success) {
        toast.success(`Order status updated to "${newStatus}"`);
        await fetchAllOrders(); // Refresh list
      } else {
        toast.error("Error updating order status");
      }
    } catch (error) {
      toast.error("Server Error: Could not update order status");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Management</h3>

      {orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <div className="order-list">
          {orders.map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="Parcel Icon" />

              <div className="order-details">
                <p className="order-item-food">
                  {order.items.map((item, idx) => (
                    <span key={idx}>
                      {item.name} x {item.quantity}
                      {idx < order.items.length - 1 && ', '}
                    </span>
                  ))}
                </p>

                <p className="order-item-name">
                  {order.address.firstName} {order.address.lastName}
                </p>

                <div className="order-item-address">
                  <p>{order.address.street},</p>
                  <p>
                    {order.address.city}, {order.address.state},{' '}
                    {order.address.country} - {order.address.zipcode}
                  </p>
                </div>

                <p className="order-item-phone">{order.address.phone}</p>
              </div>

              <div className="order-status">
                <p>Items: {order.items.length}</p>
                <p>₹{order.amount}</p>
                <select
                  value={order.status}
                  onChange={(e) => statusHandler(e, order._id)}
                >
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out For Delivery">Out For Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
