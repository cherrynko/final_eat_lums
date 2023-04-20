import React, { useEffect, useState } from "react";
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import "../Eateries/Eateries.css";
import axios from "axios";
import BASE_URL from "../../Route/Route";

export default function Eatery() {
  const navigate = useNavigate();
  const [eateries, setEateries] = useState([]);
  const [fetched, setfetched] = useState(false);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/eateries`)
      .then((response) => {
        setEateries(
          Array.isArray(response.data) ? response.data : [response.data]
        );
        console.log("Eateries:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching eateries:", error);
      });
  }, []);

  //   useEffect(() => {
  //     const eateriesContainer = document.querySelector(".eateries-container");
  //     if (fetched === false)
  //     {

  //     // eateries.forEach((eatery) => {
  //     //   const eateryContainer = document.createElement("div");
  //     //   eateryContainer.classList.add("eateries-item");

  //     //   const eateryLink = document.createElement("a");
  //     //   eateryLink.href = `/menu/${eatery.eatery_id}`;
  //     //   eateryLink.textContent = eatery.name;

  //     //   eateryContainer.appendChild(eateryLink);

  //     //   eateriesContainer.appendChild(eateryContainer);

  //     //   setfetched(true)

  //     // });

  // }

  //   }, [eateries]);

  const eateryImages = {
    PDC: "https://images.unsplash.com/photo-1630851840633-f96999247032?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    "Green Olive":
      "https://images.unsplash.com/photo-1662116765994-1e4200c43589?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80",
    Fusion:
      "https://images.unsplash.com/photo-1625242661157-e9e5708ffe5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    "Cupcake Lounge":
      "https://images.unsplash.com/photo-1586985290301-8db40143d525?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  };

  return (
    <div className="image-container">
      {eateries.map((eatery) => (
        <div
          key={eatery._id}
          className="eatery-container"
          onClick={() => navigate(`/menu/${eatery.name}/:${eatery.eatery_id}`)}
          style={{ color: "white", fontWeight: "bold" }}
        >
          <div className="imgborder">
            <img
              className="imgclass"
              src={eateryImages[eatery.name]}
              alt={eatery.name}
            />
            <h3>{eatery.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
