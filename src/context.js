import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data';

//create a new context object 
const ProductContext = React.createContext();
// Contetx API comes with 2 components Provider, Consumer

class ProductProvider extends Component {
    state = { 
        products: [],
        detailProduct,
        cart: [], 
        modalOpen: true,
        modalProduct: detailProduct,
    };

    componentDidMount() {
        this.setProducts();
    }

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

    // get an item based on id 
    getItem = (id) => {
        const product = this.state.products.find(item => item.id ===id);
        return product;
    }
    
    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return {detailProduct: product}
        })
    }

    addToCart = (id) => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id)); 
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        // get the total
        const price = product.price;
        product.total = price;

        // change the values in the state
        this.setState(() => {
            return {
                products: tempProducts,
                cart: [...this.state.cart, product]
            };
        },
        () => {console.log(this.state)})
    }

    openModal = id => {
        // retrieve the product 
        const product = this.getItem(id);
        // change the state 
        this.setState(() => {
            return {
                modalProduct: product,
                modalOpen: true
            }
        });
    }

    closeModal = () => {
        this.setState(() => {
            return {modalOpen: false}
        })
    }

    render() {
        return (
            <ProductContext.Provider value={{
                // use destructuring here
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal
            }}
        >

                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };