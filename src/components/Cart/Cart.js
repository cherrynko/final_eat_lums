import { useSelector } from 'react-redux';
import './Cart.css';
import BASE_URL from '../../Route/Route';
import axios from 'axios';
import { myHeaderPost } from '../../config/headers';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleCheckout = async () => {
    // MAKE SURE TO CHANGE THE EATERYID TO NUM
    let total = 0;
    let eatery_id = parseInt(cartItems[0].eateryId);
    let items = [];
    // NOT SET YET
    let droplocation = '';
    let paymentmethod = 'COD';
    let orderstatus = '';

    cartItems.forEach((item) => {
      total += item.price;
      const tempObj = {
        eatery_id: parseInt(item.eateryId),
        item: item.name,
        price: item.price,
        quantity: item.quantity,
      };
      items.push(tempObj);
    });
    // console.log("total ", total);
    // console.log("eateryId ", eatery_id);
    // console.log("items ", items);
    const data = {
      total,
      eatery_id,
      items,
      droplocation,
      paymentmethod,
      orderstatus,
    };

    navigate(
      '/address',
      { state: { data, myHeaderPost } },
      {
        onBeforeNavigate: () => {
          setTimeout(() => {
            console.log('navigating to address', data, myHeaderPost);
          }, 0);
        },
      }
    );

    // const res=await axios.post(`${BASE_URL}/api/orders/checkout`, data,myHeaderPost)
  };

  return (
    <div>
      {cartItems.length === 0 ? (
        <p className="empty-cart" style={{ color: 'white' }}>
          Your cart is empty
        </p>
      ) : (
        <>
          <div
            className="order-from"
            style={{
              marginBottom: '12px',
              fontWeight: 'bold',
              fontSize: '24px',
            }}
          >
            Ordering from : {cartItems[0].eatery}
          </div>
          <div className="progress-tracker">
            <div className="circles">
              <div className={`circle1`}>
                <div className="number1">1</div>
              </div>
              <div className={`line1`}></div>
              <div className={`circle2`}>
                <div className="number1">2</div>
              </div>
              <div className={`line2`}></div>
              <div className={`circle3`}>
                <div className="number1">3</div>
              </div>
            </div>
            <div className="labels">
              <div className="label1">Menu</div>
              <div className="label2">Cart</div>
              <div className="label3">Checkout</div>
            </div>
          </div>
          <div className="cart-deets">
            {cartItems.map((item) => {
              return (
                <div className="inv-div">
                  <div className="cart-container">
                    <div className="one-line">
                      <div className="thing">Item name: </div>
                      {item.name}
                    </div>
                    <div className="one-line">
                      <div className="thing">Item price: </div>
                      {item.price}
                    </div>
                    <div className="one-line">
                      <div className="thing">Item quantity: </div>
                      {item.quantity}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="align-button">
            <button
              className="button-cartscreen"
              onClick={handleCheckout}
              style={{ marginTop: '16px' }}
            >
              <div className="button-deets">Checkout</div>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
