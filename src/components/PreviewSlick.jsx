import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class SimpleSlider extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div>
                <Slider {...settings}>
                    <div>
                        <img src="/img/preview.jpg" alt="preview"/>
                    </div>
                    <div>
                        <img src="/img/preview.jpg" alt="preview"/>
                    </div>
                    <div>
                        <img src="/img/preview.jpg" alt="preview"/>
                    </div>
                    <div>
                        <img src="/img/preview.jpg" alt="preview"/>
                    </div>
                    <div>
                        <img src="/img/preview.jpg" alt="preview"/>
                    </div>
                    <div>
                        <img src="/img/preview.jpg" alt="preview"/>
                    </div>
                </Slider>
            </div>
        );
    }
}