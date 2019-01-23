import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data';

//create a new context object 
const ProductContext = React.createContext();
// Contetx API comes with 2 components Provider, Consumer

class ProductProvider extends Component {
    state = { 
        products: [],
        detailProduct
    };

    setProducts = () => {
        let products = [];
        storeProducts.forEach(item => {
            // asign the value from the object and copy them 
            const singleItem = {...item};
            products = [...products, singleItem];
        });

        this.setState(() => {
            return {products}
        });
    }

    componentDidMount() {
        this.setProducts();
    }

    handleDetail = () => {
        console.log('this is the detail');
    }

    addToCart = (id) => {
        console.log(`This product has been added to the Cart with id: ${id}`);
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