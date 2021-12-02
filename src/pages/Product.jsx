import React, {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {useRouter} from "../hooks/useRouter";
import {Loader} from "../components/Loader";

export function Product ({onAddToCart,onChooseFavorite}) {

    const [product, setProduct] = useState(null);

    const router = useRouter();

    React.useEffect(() => {
        const location = router.location.pathname;
        const locationsChunks = location.split("/");
        const productId = locationsChunks[locationsChunks.length -1];
        (async  () => {
            try {
                const {data} = await axios.get(`https://60e1e9f35a5596001730f26e.mockapi.io/items/${productId}`);
                setProduct(data);

            } catch (error) {
                alert('Не удалось получить ваши заказы!')
            }
        })()
    }, [])

    return (
        <div style={{minHeight : "600px"}} className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1 className="d-flex justify-between" >
                    <Link to="/">
                        <img className="btn-back" src="/img/btn-back.svg" alt="Back"/>
                    </Link>
                    Нравится ? Покупай!
                </h1>
            </div>
            {product ?
                    <div className="d-flex justify-around p-10">
                        <div className="cart-item">
                            <img className="product-image" src={product.imageUrl} alt="Sneakers"/>
                        </div>

                        <div>
                            <h3>{product ? product.title: "Товар такой-то"}</h3>
                            <h3 >Ценна {product.price} руб .</h3>
                            <button className="greenButton mb-15"
                                    onClick={() => onAddToCart(product)}>
                                Положить в корзину
                                <img className="lol" src="/img/arrow.svg" alt="Arrow"/>
                            </button>
                            <button style={{backgroundColor : "#ff8585"}}
                                    className="greenButton"
                                    onClick={() => onChooseFavorite(product)}>
                                Добавить в избранное
                                <img className="lol" src="/img/arrow.svg" alt="Arrow"/>
                            </button>
                        </div>
                    </div>
                :
                <div style={{height : "600px"}} className="d-flex flex-column justify-center align-center">
                    <Loader />
                </div>
            }
        </div>
    )
}