import {Link} from "react-router-dom";
import React from "react";
import {useCart} from "../hooks/useCart";

export default function Header(props) {

    const {totalPrice} = useCart();

    return (
        <header className="d-flex justify-between align-center p-40">
            <Link to="/">
                <div className="d-flex align-center">
                    <img width={40} height={40} src="/img/logo.png" alt="Logo" />
                    <div className="header__info">
                        <h3 className="text-uppercase"> React Sneakers</h3>
                        <p>Магазин лучших кроссовок</p>
                    </div>
                </div>
             </Link>
            <ul className="header__right d-flex">
                <li className="mr-30 cu-p" onClick={props.onClick}>
                    <img width={18} height={18} src="/img/cart.svg" alt="Cart" />
                    <span>{totalPrice} руб.</span>
                </li>
                <li>
                    <Link to="/favorites">
                        <img className="mr-30 cu-p" width={20} height={20} src="/img/heart.svg" alt="favorites" />
                    </Link>
                </li>
                <li>
                    <Link to="/orders">
                        <img className="cu-p" width={20} height={20} src="/img/user.svg" alt="User" />
                    </Link>
                </li>
            </ul>
        </header>
    )
}