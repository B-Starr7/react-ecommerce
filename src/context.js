import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data';

//cretae nw context object 
const ProductContext = React.createContext();
// Contetx API comes with 2 compoennts Provider, Consumer

class ProductProvider extends Component {
    state = { 
        products: storeProducts,
        detailProduct
    };

    handleDetail = () => {
        console.log('this is the detail');
    }

    addToCart = () => {
        console.log('this is the addToCart');
    }

    render() {
        return (
            <ProductContext.Provider value={{
                // use destructuring here
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart
            }}>

                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };