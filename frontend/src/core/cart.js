import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { Link } from "react-router-dom";
import { getAllProducts } from "./helper/coreapicalls";
import { loadCart } from "./helper/CardHelper";
import PaymentB from './paymentBrainTree'

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState([]);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);
  const loadAllProductsToCart = (products) => {
    return (
      <div>
        {products.map((product, index) => {
          return (
            <div className="row text-center ">
              <div className="col-md-6 offset mb-3">
                <Card
                  product={product}
                  key={index}
                  showaddToCard={false}
                  removeFromCard={true}
                  setReload={setReload}
                  reload={reload}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const loadCheckOut = () => {
    return (
      <div>
        <h1>check out section</h1>
      </div>
    );
  };

  return (
    <div>
      <Base title="Your Cart" description="Amazing place to buy Tshirts">
        <div className="row  text-center">
          <div className="col-md-6">{products.length >0 ?loadAllProductsToCart(products) :(<h3>NO PRODUCTS </h3>) }</div>
          <div className="col-md-6"><PaymentB products={products}  setReload ={setReload}/></div>
        </div>
      </Base>
    </div>
  );
};

export default Cart;
