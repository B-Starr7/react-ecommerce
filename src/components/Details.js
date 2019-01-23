import React, { Component } from 'react'
import { ProductConsumer } from "../context";
import { Link } from 'react-router-dom';
import { ButtonContainer } from './Button';

export default class Details extends Component {
  render() {
    return (
        <ProductConsumer>
          {value => {
            const {id, company, img, price, title, info, inCart} = value.detailProduct;

            return (
              <div className="container">
                <div className="row">
                  <div className="col-10 mx-auto text-center my-3">
                    <h1>{title}</h1>
                  </div>
                </div>

                <div className="row">
                  <div className="col-10 mx-auto col-md-6 my-3">
                    <img src={img} alt={title} className="img-fluid" />
                  </div>

                  <div className="col-10 mx-auto col-md-6 my-3">
                    <h3>Model: {title}</h3>
                    <h6 className="text-title  text-muted mt-3 mb-2">
                      made by: <span className="">{company}</span></h6>
                    <h6>Price: 
                      <strong> £
                        <span>{price}</span>
                      </strong>
                    </h6>
                    <p className="mt-3 mb-0">
                      Info about the product
                    </p>
                    <p className="text-muted">{info}</p>

                    <div className="">
                      <Link to="/">
                        <ButtonContainer>
                          Back to Products
                        </ButtonContainer>
                        </Link>
                        
                        <ButtonContainer 
                          cart
                          className="ml-1"
                          disabled={inCart? true : false}
                          onClick={() => {
                            value.addToCart(id);
                            value.openModal(id);
                          }}>
                          {inCart ? 'In Cart' : 'Add to Cart'}
                        </ButtonContainer>
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        </ProductConsumer>
    )
  }
}