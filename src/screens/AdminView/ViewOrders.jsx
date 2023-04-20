import axios from "axios";
import { useState, useEffect } from "react";
import BASE_URL from "./Route";
// import "./Address.css";
import "./Admin.css"
// import myHeaderPost

export const ViewOrders = () => {
  const [Orders, setOrders] = useState([]);
  const eat_id = localStorage.getItem("eat_id")
  const obj = {id: eat_id}
  console.log("eat id", eat_id)

  const fetchOrders = async () => {
    try {
      console.log("b4", obj);
      const res = await axios.get(
        `${BASE_URL}/api/orders/eat_orders/${eat_id}`, obj
      );
      console.log("after", res.data);

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      {Orders.map((item) => (
        <div key={item._id} className="order-box">
          <p>name: {item.item}</p>
          <p>quantity: {item.quantity}</p>
        </div>
      ))}
    </div>
  );
};
