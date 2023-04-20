import React, { useState } from 'react';
import './OrderDetails.css';

const OrderDetails = (props) => {
  const handleClick = (order_id) => {
    console.log('orderId', order_id);
  };

  return (
    <div className="sike_popup">
      <div className="od_popup">
        <button
          className="button1"
          onClick={() => props.setPopup(false)}
          style={{ marginRight: '130px' }}
        >
          x
        </button>
        <div
          className="od_title"
          style={{ paddingTop: '2%', textAlign: 'center' }}
        >
          <h3>Order Details</h3>

          {props.details.map((item) => {
            return (
              <div className="items">
                <div>
                  <span className="od_label">Item: </span>
                  {item.item}
                </div>
                <div>
                  <span className="od_label">Quantity:</span>
                  {item.quantity}
                </div>
                <span className="od_label">Price: </span>
                {item.price}
                <div className="random">{'random shit'}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
