import React, { useState, useEffect } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from "react-toastify";

const List = () => {
  const [list, setList] = useState([]);
  const backendURL = import.meta.env.VITE_API_URL;

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to fetch food list.");
      }
    } catch (error) {
      toast.error("Server error while fetching food list.");
      console.error(error);
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${backendURL}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(); // refresh the list
      } else {
        toast.error("Failed to remove food item.");
      }
    } catch (error) {
      toast.error("Server error while removing food item.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.length > 0 ? (
          list.map((item, index) => (
            <div key={index} className="list-table-format">
              <img 
                src={`${backendURL}/images/${item.image}`} 
                alt={item.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/60x40?text=Image";
                }}
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹ {item.price}</p>
              <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
            </div>
          ))
        ) : (
          <p style={{ padding: "1rem" }}>No items found.</p>
        )}
      </div>
    </div>
  );
};

export default List;
