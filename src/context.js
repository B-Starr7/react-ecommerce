import React, { Component } from 'react'

//cretae nw context object 
const ProductContext = React.createContext();
// Contetx API comes with 2 compoennts Provider, Consumer

class ProductProvider extends Component {

    render() {
        return (
            <ProductContext.Provider value="Hi from Context API">
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };