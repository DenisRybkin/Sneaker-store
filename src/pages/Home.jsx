import Card from "../components/Card";
import React from "react";

export default function Home ({items,
                                  searchValue,
                                  clearSearchBlock,
                                  onChangeSearchInput,
                                  onAddToCart,
                                  onChooseFavorite,
                                  favoriteItems,
                                  isLoading }) {
    const renderItems = () => {
        const filtered = items.filter((item) => item.title.toLowerCase().includes(`${searchValue.toLowerCase()}`))
         return (
             isLoading ? [...Array(10)]
                 : filtered).map((item, index) => (
                    <Card {...item}
                      onPlus={(product) => onAddToCart(product)}
                      onFavorite={(product) => onChooseFavorite(product)}
                      favoriteItems={favoriteItems} key={index} loading={isLoading}/>
                )
            )
    }
    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1 className="">{searchValue ? `Поиск по запросу : "${searchValue}"`: "Все кроссовки"}</h1>
                <div className="search-block">
                    <img src="/img/search.svg" alt="Search" />
                    {searchValue && <img src="img/btn-remove.svg" onClick={clearSearchBlock} alt="Clear" className="clear cu-p"/>}
                    <input onChange={onChangeSearchInput} value={searchValue}
                           type="text" placeholder="Поиск..." />
                </div>
            </div>
            <div className="d-flex flex-wrap">
                {renderItems()}
            </div>
        </div>
    )
}