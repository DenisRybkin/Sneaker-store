import React from "react";
import {AppContext} from "../App";
import {useHistory} from "react-router-dom";

export default function Info({title , description, image, widthImg, heightImg, redirect}) {
    const {setCartOpened} = React.useContext(AppContext);

    const history = useHistory();



    const onClickButton = () => {
        if (redirect) {
            history.push("/");
        } else {
            setCartOpened(false);
            document.body.classList.remove('no-scroll');
        }
    }

    return (
            <div className="cartEmpty d-flex align-center justify-center flex-column flex">
                <img src={image} alt="Cart empty" width={widthImg} height={heightImg ? heightImg : "120px"} className="mb-20"/>
                <h2>{title}</h2>
                <p className="opacity-6">{description}</p>
                <button className="greenButton greenButtonBack greenButtonEmptyBlock"
                        onClick={onClickButton} ><img src="/img/arrowBack.svg"
                        alt="Cancel"/>Вернуться назад</button>
            </div>
    )
};
