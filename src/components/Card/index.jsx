import React from 'react';
import styles from "./Card.module.scss"
import ContentLoader from "react-content-loader"
import {AppContext} from "../../App";

export default function Index({ title, imageUrl, price, id, index, onPlus , onFavorite, favorited, loading }) {
    const {itemsIsAdded, itemsIsFavorited} = React.useContext(AppContext);
    const addingToCart = () => {
        onPlus({title, imageUrl, price, id, index});

    }
    const chooseFavorite = () => {
        onFavorite({title, imageUrl, price, id});
    }
    return (
        <>
            {
                loading ?
                    <div className={styles.card}>
                        <ContentLoader
                            speed={2}
                            width={170}
                            height={228}
                            viewBox="0 0 150 228"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                            >
                            <circle cx="31" cy="31" r="15"/>
                            <rect x="0" y="0" rx="10" ry="10" width="150" height="112"/>
                            <rect x="0" y="154" rx="3" ry="3" width="93" height="15"/>
                            <rect x="0" y="194" rx="8" ry="8" width="80" height="24"/>
                            <rect x="118" y="186" rx="8" ry="8" width="32" height="32"/>
                            <rect x="0" y="128" rx="3" ry="3" width="150" height="15"/>
                        </ContentLoader>
                    </div>    : (<>
                    <div className={styles.card}>
                        {onFavorite && <div className={styles.favorite}>
                            <img src={itemsIsFavorited(id) ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"}
                                 onClick={chooseFavorite} alt="Unliked"/>
                        </div>}
                        <img width={133} height={112} src={imageUrl} alt="Sneaker"/>
                        <h5>{title}</h5>
                        <div className="d-flex justify-between align-center">
                            <div className="d-flex flex-column">
                                <span>ЦЕНА:</span>
                                <b>{price} руб.</b>
                            </div>
                            {onPlus && <img className={styles.plus}
                                  src={itemsIsAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
                                  alt="Plus add" onClick={addingToCart}
                            />}
                        </div>
                    </div>
                </>) }
            </>
    )
}