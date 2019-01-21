import React, { Component, Fragment } from 'react'
import Product from './Product';
import Title from './Title';
import { storeProducts } from '../data';

export default class ProductList extends Component {
    sate = { products: storeProducts };

    render() {
        console.log(this.state.products);

        return(
            <Fragment>
                <div className="py-5">
                    <div class="container">
                        <div className="row">
                            <Title name="our" title="products"/>
                        </div>
                    </div>
                </div>
                {/* <Product /> */}
            </Fragment>
        )
    }
}