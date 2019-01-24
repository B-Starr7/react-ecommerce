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
        modalOpen: false,
        modalProduct: detailProduct,
        // cart
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0
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
        () => {
            // console.log(this.state)
            this.addTotals();
        })
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

    // Shopping cart dummy
    increment = (id) => {
        console.log('increment method');
    }

    decrement = (id) => {
        console.log('decrement method');
    }

    removeItem = (id) => {
        console.log('rmeove an item');
    }

    clearCart = () => {
        console.log('shopping cart was cleared');
    }
    
    addTotals = () => {
        let subTotal = 0;
        // map thotugh the items and add the total
        this.state.cart.map(item => (subTotal += item.total));
        const tempTax = subTotal * 0.1; // 10% 
        // get decimals with toFixed(number)
        // user parseFloat ot return a decimal
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(() => {
            return {
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
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
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart
            }}
        >

                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };