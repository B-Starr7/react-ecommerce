import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

export default function CartTotals({value}) {
    const { cartSubTotal, cartTax, cartTotal, clearCart } = value;

  return (
    <Fragment>
      <div className="container">
        <div className="row">
            <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                <Link to="/">
                    <button 
                        className="btn btn-outline-danger text-uppercase mb-3 px-5"
                        type="button"
                        onClick={() => clearCart()}>
                            clear cart  
                    </button>
                </Link>
                <h5>Subtotal:
                    <strong> £{cartSubTotal}</strong>
                </h5>

                <h5>Tax: 
                    <strong> £{cartTax}</strong>
                </h5>

                <h5>Total:
                    <strong> £{cartTotal}</strong>
                </h5>
            </div>
        </div>
      </div>
    </Fragment>
  )
}
