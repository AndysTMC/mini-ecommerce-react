import React from "react";
import "./CartSection.css";
import { useMediaQuery } from 'react-responsive';

export default function CartSection({ products, cart, handleCartUpdate, handleCartDelete }) {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [currentCartProductIndex, setCurrentCartProductIndex] = React.useState(0);
    const setRightCartItem = () => {
        if (currentCartProductIndex < cart.length - 1) {
            setCurrentCartProductIndex(currentCartProductIndex + 1);
        }
    };
    const setLeftCartItem = () => {
        if (currentCartProductIndex > 0) {
            setCurrentCartProductIndex(currentCartProductIndex - 1);
        }
    };
    function getProductName(p_id) {
        return products?.find((product) => product.p_id === p_id)?.p_name;
    }
    return (
        <div className="container border rounded h-100">
            <div className="container bg-white w-100 cart-heading-container rounded-bottom-4">
                <h2 className="text-center">Cart</h2>
            </div>
            {cart.length > 0 ? (
                isTabletOrMobile ? (
                    <div className="container d-flex w-100 bg-white cart-product my-auto mt-2 rounded mx-0 px-0">
                        <div
                            className="btn btn-grey h-100 lrbtn text-center d-flex flex-column justify-content-center align-content-start"
                            onClick={setLeftCartItem}
                        ></div>
                        <div className="container image-container d-flex justify-content-center align-items-center h-100">
                            <img
                                src={cart[currentCartProductIndex].p_img}
                                style={{ maxHeight: '100px' }}
                                alt={getProductName(cart[currentCartProductIndex].p_id)}
                            />
                        </div>
                        <div className="container details-container d-flex flex-column flex-grow-1 justify-content-center">
                            <div className="container d-flex justify-content-between">
                                <h4>{getProductName(cart[currentCartProductIndex].p_id)}</h4>
                            </div>
                            <div className="container d-flex flex-column justify-content-start flex-wrap">
                                <h6>Price: ₹{cart[currentCartProductIndex].p_cost}</h6>
                                <h6>Quantity: {cart[currentCartProductIndex].p_qty}</h6>
                                <h6>Total: ₹{cart[currentCartProductIndex].p_cost * cart[currentCartProductIndex].p_qty}</h6>
                            </div>
                            <div className="container d-flex justify-content-start align-items-center">
                                <button
                                    className="btn btn-danger mx-1 btn-sm"
                                    onClick={() => handleCartDelete(cart[currentCartProductIndex].p_id)}
                                >Remove</button>
                                <div className="container d-flex justify-content-start align-items-center">
                                    <button
                                        className="btn btn-primary mx-1 btn-sm rounded"
                                        onClick={() => handleCartUpdate(cart[currentCartProductIndex].p_id, -1)}
                                    >-</button>
                                    <button
                                        className="btn btn-primary mx-1 btn-sm rounded"
                                        onClick={() => handleCartUpdate(cart[currentCartProductIndex].p_id, 1)}
                                    >+</button>
                                </div>
                            </div>
                        </div>
                        <div
                            className="btn btn-grey h-100 lrbtn text-center d-flex flex-column justify-content-center align-content-start"
                            onClick={setRightCartItem}
                        ></div>
                    </div>
                ) : (
                    <div className="container w-100 cart-product">
                        {cart.reverse().map((cartProduct, index) => (
                            <div key={index} className="container d-flex w-100 bg-white cart-product-other my-auto mt-2 rounded mx-0 px-2">
                                <div className="container image-container d-flex justify-content-center align-items-center h-100">
                                    <img
                                        src={cartProduct.p_img}
                                        style={{ maxHeight: '100px' }}
                                        alt={getProductName(cartProduct.p_id)}
                                    />
                                </div>
                                <div className="container details-container d-flex flex-column flex-grow-1 justify-content-center">
                                    <div className="container d-flex justify-content-between">
                                        <h5>{getProductName(cartProduct.p_id)}</h5>
                                    </div>
                                    <div className="container d-flex flex-column justify-content-start flex-wrap">
                                        <h6>Price: ₹{cartProduct.p_cost}</h6>
                                        <h6>Quantity: {cartProduct.p_qty}</h6>
                                        <h6>Total: ₹{cartProduct.p_cost * cartProduct.p_qty}</h6>
                                    </div>
                                    <div className="container d-flex justify-content-start align-items-center">
                                        <button
                                            className="btn btn-danger mx-1 btn-sm"
                                            onClick={() => handleCartDelete(cartProduct.p_id)}
                                        >Remove</button>
                                        <div className="container d-flex justify-content-start align-items-center">
                                            <button
                                                className="btn btn-primary mx-1 btn-sm rounded"
                                                onClick={() => handleCartUpdate(cartProduct.p_id, -1)}
                                            >-</button>
                                            <button
                                                className="btn btn-primary mx-1 btn-sm rounded"
                                                onClick={() => handleCartUpdate(cartProduct.p_id, 1)}
                                            >+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            ) : (
                <div className="container rounded bg-white w-100 my-2 d-flex justify-content-center align-items-center">
                    <h4>Your cart is empty</h4>
                </div>
            )}
        </div>
    );
}
