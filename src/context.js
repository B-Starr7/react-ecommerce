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
        // get the cart items 
        let tempCart = [...this.state.cart];

        // loop through specific product that has been selected
        const selectedProduct =tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        //assign the product to a product variable
        const product = tempCart[index];
        product.count = product.count + 1;
        // multipl the price
        product.total = product.count * product.price;
        this.setState(() => {
            return {cart: [...tempCart]}
            // must have a callback() as the totals will be counted exactly when they're changed!
            // we need the newest value in the state 
        }, ()=> {
            this.addTotals()
        })
    }
    
    decrement = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count - 1;
        if(product.count === 0) {
            this.removeItem(id);
        } else {
            product.total = product.count * product.price;

            this.setState(() => {
                return {cart: [...tempCart]}
            }, ()=> {
                this.addTotals()
            })
        }
    }

    removeItem = (id) => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !== id);

        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState(() => {
            return {
                cart: [...tempCart],
                products: [...tempProducts]
            }
        }, ()=> {
            this.addTotals()
        });
    }

    clearCart = () => {
        this.setState(() => {
            return {cart: [] } 
        }, () => {

            // add a callback so that setProducts will give a new original copy of objects
            this.setProducts();

            // update totals 
            this.addTotals();
        });
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