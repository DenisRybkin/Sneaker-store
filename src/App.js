import React from 'react';
import {Route} from "react-router-dom";

import Header from "./components/Header";
import Drawer from "./components/Drawer";
import axios from "axios";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import SimpleSlider from "./components/PreviewSlick";
import {Product} from "./pages/Product";

export const AppContext = React.createContext({});

function App() {


 const [items, setItems] = React.useState([]);
 const [favoriteItems, setFavoriteItems] = React.useState([]);
 const [cartItems, setCartItems] = React.useState([]);
 const [searchValue, setSearchValue] = React.useState('')
 const [cartOpened , setCartOpened] = React.useState(false);
 const [isLoading , setIsLoading] = React.useState(true);

 const openCart = () => {
   setCartOpened(true);
   document.body.classList.add('no-scroll');
 }
 const closeCart = () => {
     setCartOpened(false);
     document.body.classList.remove('no-scroll');
 }
 const onAddToCart = async (product) => {
     try{
         if(cartItems.find((item) => item.id === product.id)){
             setCartItems(prev => prev.filter((item) => item.id !== product.id));
             onRemoveCartItem(product.id);
         } else {
             setCartItems(prev => [...prev, product]);
             await axios.post('https://60e1e9f35a5596001730f26e.mockapi.io/cartItems', product);
         }
     }
    catch (error) {
         alert("Ошибка при взаимодействии с корзиной");
     }
 }
 const onChooseFavorite = async (product) => {
     try {
         if(favoriteItems.find((item) => item.id === product.id)){
             const item = favoriteItems.find((item, index) => item.id === product.id);
             axios.delete(`https://60e1e9f35a5596001730f26e.mockapi.io/favoritsItems/${item.index}`);
             setFavoriteItems(prev => prev.filter((item) => item.id !== product.id));
         }
         else {
             setFavoriteItems((prev) => [...prev, product]);
             const {data} = await axios.post('https://60e1e9f35a5596001730f26e.mockapi.io/favoritsItems', product);
             setFavoriteItems((prev) => prev.map((item) => {
                 if(item.id === product.id) {
                     return {
                         ...item,
                         index : data.index
                     };
                 } else {
                     return item;
                 }
             }));
         }
     }
     catch (error) {
         alert("Не удалось добавить в фавориты");
     }
 }
 const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    }
 const clearSearchBlock = () => {
        setSearchValue('');
    }
 const onRemoveCartItem = async (index) => {
     try {
         if((typeof index) == 'string'){
             setCartItems(prev => prev.filter((item) => item.index !== index));
             axios.delete(`https://60e1e9f35a5596001730f26e.mockapi.io/cartItems/${index}`)
         } else  if ((typeof index) == 'number'){
             const {data} = await axios.get('https://60e1e9f35a5596001730f26e.mockapi.io/cartItems');
             const item = data.find((item) => item.id === index);
             axios.delete(`https://60e1e9f35a5596001730f26e.mockapi.io/cartItems/${item.index}`)
         }
     } catch (error) {
         alert('Ошибка при удалении из корзины((');
     }
 };
 const itemsIsAdded = (id) => {
     return cartItems.some((product) => product.id === id);
 }
 const itemsIsFavorited = (id) => {
     return favoriteItems.some((product) => product.id === id)
 }
 React.useEffect(() => {
     axios.get('https://60e1e9f35a5596001730f26e.mockapi.io/cartItems')
         .then((res) => setCartItems(res.data));
    }, [cartOpened]);
 React.useEffect(() => {
     async function fetchData () {
         try {
            const [favoritesResponse, cartResponse, itemsResponse] = await Promise.all([
                axios.get('https://60e1e9f35a5596001730f26e.mockapi.io/favoritsItems'),
                axios.get('https://60e1e9f35a5596001730f26e.mockapi.io/cartItems'),
                axios.get('https://60e1e9f35a5596001730f26e.mockapi.io/items'),
            ]);
             setIsLoading(false);
             setFavoriteItems(favoritesResponse.data);
             setCartItems(cartResponse.data);
             setItems(itemsResponse.data);
         } catch (error) {
             alert('Ошибка при загрузке данных :(');
         }
     }
     fetchData();
 }, []);
  return (
      <AppContext.Provider value={{ items, cartItems ,favoriteItems, itemsIsAdded, setCartOpened, setCartItems, onAddToCart, onChooseFavorite, itemsIsFavorited}}>
          <div className="wrapper clear">
              <Drawer onClick={closeCart} items={cartItems} onRemove={onRemoveCartItem} opened={cartOpened}/>
              <Header onClick={openCart}/>
              <Route path="/" exact>
                  <SimpleSlider/>
              </Route>
              <Route path="/product">
                  <Product
                      onAddToCart={onAddToCart}
                      onChooseFavorite={onChooseFavorite}
                  />
              </Route>
              <Route path="/" exact>
                  <Home
                        items={items}
                        cartItems={cartItems}
                        searchValue={searchValue}
                        clearSearchBlock={clearSearchBlock}
                        onChangeSearchInput={onChangeSearchInput}
                        onAddToCart={onAddToCart}
                        onChooseFavorite={onChooseFavorite}
                        isLoading={isLoading} exact />
              </Route>
              <Route path="/favorites" exact>
                  <Favorites
                      onChooseFavorite={onChooseFavorite}/>
              </Route>
              <Route path="/orders" exact>
                  <Orders />
              </Route>
          </div>
      </AppContext.Provider>
  );
}

export default App;
