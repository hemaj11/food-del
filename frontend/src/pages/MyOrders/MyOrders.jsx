import React, { useEffect, useState, useContext } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { token } = useContext(StoreContext);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        "https://food-delivery-backend-ecv5.onrender.com/api/order/userorders",
        {},
        { headers: { token } }
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <p>
                {order.items.map((item, i) => 
                  `${item.name} x ${item.quantity}${i < order.items.length - 1 ? ', ' : ''}`
                )}
              </p>
              <p>₹{order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span style={{ color: order.status === "Delivered" ? "green" : "orange" }}>
                  ●
                </span>{' '}
                <b>{order.status}</b>
              </p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
