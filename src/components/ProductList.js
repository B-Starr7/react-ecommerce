import React, { Component, Fragment } from 'react'
import Product from './Product';
import Title from './Title';
import { storeProducts } from '../data';
import { ProductConsumer } from '../context';

export default class ProductList extends Component {
    sate = { products: storeProducts };

    render() {
        // console.log(this.state.products);

        return(
            <Fragment>
                <div className="py-5">
                    <div className="container">
                        <div className="row">
                            <Title name="our" title="products"/>
                        </div>
                        <div className="row">
                            <ProductConsumer>
                                {/* always function to get the data */}
                                {value => {
                                    console.log(value);
                                }}
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
                {/* <Product /> */}
            </Fragment>
        )
    }
}