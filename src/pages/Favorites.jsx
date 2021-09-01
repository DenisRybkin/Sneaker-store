import Card from "../components/Card";
import React from "react";
import {AppContext} from "../App";
import {Link} from "react-router-dom";
import Info from "../components/Info";
import {chooseEmojis} from "../hooks/randomUrl";

export default React.memo(function Favorites ({ onChooseFavorite }) {

    const {favoriteItems} = React.useContext(AppContext);

    const [imgUrl , setImageUrl] = React.useState('/img/emojis/emojis-8.png');

    React.useMemo(() => {
        setImageUrl(chooseEmojis(1,12));
    } , [])

    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1 className="d-flex justify-between"><Link to="/">
                    <img className="btn-back" src="/img/btn-back.svg" alt="Back"/>
                </Link>
                    Мои закладки
                </h1>
            </div>
            <div className="d-flex flex-wrap">
                {favoriteItems.length > 0 ? favoriteItems.map((item, index) => (
                    <Card key={index} {...item}
                          onFavorite={(product) => onChooseFavorite(product)} favorited={true}/>
                )): <div className="emptyBlock">
                    <Info title="Закладок нет :("
                          image={imgUrl}
                          description="Вы ничего не добавляли в закладки"
                          widthImg="70px"
                          heightImg="70px"
                          wigthGreenBtn="greenButtonEmptyBlock"
                          redirect={true}
                    />
                </div>
                }
            </div>
        </div>
    )
})