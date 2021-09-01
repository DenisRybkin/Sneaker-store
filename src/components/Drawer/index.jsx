import React from "react";
import axios from "axios";

import styles from './Drawer.module.scss';

import Info from "../Info";
import {useCart} from "../../hooks/useCart";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Drawer({onClick, items , onRemove, opened}) {

    const {cartItems, setCartItems, totalPrice} = useCart();

    const [orderId, setOrderId] = React.useState(null);
    const  [isCompleted, setIsCompleted] = React.useState(false);
    const  [isLoading, setIsLoading] = React.useState(false);

    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const {data} = await axios.post('https://60e1e9f35a5596001730f26e.mockapi.io/orders', {items : cartItems});
            setIsCompleted(true);
            setOrderId(data.orderNumber);
            setCartItems([]);

            for (let i = 0; i<cartItems.length; i++){
                const item = cartItems[i];
                await axios.delete('https://60e1e9f35a5596001730f26e.mockapi.io/cartItems/' + item.index);
                await delay(1000)
            }
        } catch (error) {
            alert("Не удалось добавить заказ!");
        }
        setIsLoading(false);
    }

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}>
                <h2 className="d-flex justify-between">Корзина <img
                    className="btn-remove cu-p" src="/img/btn-remove.svg"
                    alt="Remove" onClick={onClick} /></h2>
                {
                    items.length > 0 ? <div className={styles.items}>
                        {items.map((cartItem, index) => (
                            <div key={index} className="cart-item d-flex align-center">
                                <img className="mr-20" width={70} height={70} src={cartItem.imageUrl} alt="Sneakers" />
                                <div className="mr-20">
                                    <p >{cartItem.title}</p>
                                    <b>{cartItem.price} руб.</b>
                                </div>
                                <img onClick={() => onRemove(cartItem.index)}
                                     className="btn-remove" src="/img/btn-remove.svg" alt="Remove" />
                            </div>
                        ))}
                    </div> :
                        <Info title={isCompleted ? "Заказ оформлен!":"Корзина пустая"}
                        description={isCompleted ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                            : "Добавьте хотя бы одну пару кроссовок, вы что нищеброд?"}
                        image={isCompleted ? "/img/complete-order.jpg" : "/img/cart-empty.jpg"}
                        widthImg={isCompleted ? "83px" : "120px"}/>
                }
                {
                    items.length > 0 &&  <div className="cartTotalBlock">
                        <ul>
                            <li >
                                <span>Итого:</span>
                                <div></div>
                                <b>{totalPrice} руб.</b>
                            </li>
                            <li >
                                <span>Налог 5%:</span>
                                <div></div>
                                <b>{(totalPrice / 100 * 5).toFixed(1)} руб.</b>
                            </li>
                        </ul>
                        <button disabled={isLoading} className="greenButton" onClick={onClickOrder}>Оформить заказ
                            <img src="/img/arrow.svg" alt="Arrow"/></button>
                    </div>
                }

            </div>
        </div>
    )
}