import Card from "../components/Card";
import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Info from "../components/Info";
import {chooseEmojis} from "../hooks/randomUrl";

export default function Orders () {

    const [orders, setOrders] = React.useState([]);
    const [isLoading , setIsLoading] = React.useState(true);
    const [imgUrl , setImageUrl] = React.useState('/img/emojis/emojis-8.png');



    React.useMemo(() => {
        setImageUrl(chooseEmojis(1,12));
    } , [])

    React.useEffect(() => {
        (async  () => {
            try {
                const {data} = await axios.get('https://60e1e9f35a5596001730f26e.mockapi.io/orders');
                setIsLoading(false);
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items],[]));
            } catch (error) {
                alert('Не удалось получить ваши заказы!')
            }
        })()
    }, [])

    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1 className="d-flex justify-between" >
                    <Link to="/">
                        <img className="btn-back" src="/img/btn-back.svg" alt="Back"/>
                    </Link>
                    Мои заказы
                </h1>
            </div>
            <div className="d-flex flex-wrap">
                {(isLoading? [...Array(10)] : orders).map((item, index) => (
                    <Card
                          loading={isLoading}
                          key={index} {...item}
                    />
                ))}
                {orders.length < 1 && <div className="emptyBlock">
                    <Info title="У вас нет заказов"
                          image={imgUrl}
                          description="Вы нищеброд? Оформите хотя бы один заказ."
                          widthImg="70px"
                          heightImg="70px"
                          wigthGreenBtn="greenButtonEmptyBlock"
                          redirect={true}
                    />
                </div>}
            </div>
        </div>
    )
}