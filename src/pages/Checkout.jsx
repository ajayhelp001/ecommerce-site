import React from 'react'
import BreadCrumb from '../GlobelComponent/BreadCrumb';
import { Link } from 'react-router';

const Checkout = () => {
  return (
    <>
      <BreadCrumb/>
      <section className="checkout">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="heading active" id="checkout_heading1">Cart<span>Manage Your Items List</span></div>
                    <div className="heading" id="checkout_heading2">Shipping And Checkout<span>Checkout Your Items List</span></div>
                    <div className="heading" id="checkout_heading3">Order Received<span>Review And Submit Your Order</span></div>
                </div>
                <div className="col-12 stepnavbar">
                    <ul className="nav nav-pills mb-lg-5 mb-4 steps row step_bar" id="pills-tab" role="tablist">
                        <li className="col-md-4 col-12 nav-item pe-md-0" role="presentation">
                            <button className="nav-link w-100 active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">01 <div className="step">SHOPPING BAG<span>Manage Your Items List</span></div></button>
                        </li>
                        <li className="col-md-4 col-12 nav-item px-md-0" role="presentation">
                            <button className="nav-link w-100" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">02 <div className="step">Shipping and Checkout<span>Checkout Your Items List</span></div></button>
                        </li>
                        <li className="col-md-4 col-12 nav-item ps-md-0" role="presentation">
                            <button className="nav-link w-100" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">03 <div className="step">Confirmation<span>Review And Submit Your Order</span></div></button>
                        </li>
                    </ul>
                </div>
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">
                        <div className="row row-gap-3">
                            <div className="col-lg-8">
                                <div className="table-responsive">
                                    <table className="table whichlistTable  table-nowrap align-middle">
                                        <thead>
                                            <tr>
                                                <th scope="col">Product</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col" colSpan="2">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className="d-flex gap-3 align-items-center">
                                                        <div className="p_img">
                                                            <img src="/assets/images/product/product-img-1.png" alt="" className="avatar-xs" />
                                                        </div>
                                                        <div className="content">
                                                            <Link><span className="p_title">Poutsicle Hydrating Lip Stain.</span></Link>
                                                            <p className="mb-0 text-muted p_subTitle">Women's Lip Stain</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>$540.49</td>
                                                <td>
                                                    <div className="number m-0">
                                                        <span className="minus">-</span>
                                                        <input type="text" className="form-control rounded-0 border-0 shadow-none" value="1" />
                                                        <span className="plus">+</span>
                                                    </div>
                                                </td>
                                                <td>$540.49</td>
                                                <td>
                                                    <ul className="list-unstyled d-flex gap-3 mb-0">
                                                        <li><Link to={""} className="actionBtn close"><img src="/assets/images/icon/red_close.svg" alt="" /></Link></li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="d-flex gap-3 align-items-center">
                                                        <div className="p_img">
                                                            <img src="/assets/images/product/product-img-2.png" alt="" className="avatar-xs" />
                                                        </div>
                                                        <div className="content">
                                                            <Link><span className="p_title">Hydrating Waves</span></Link>
                                                            <p className="mb-0 text-muted p_subTitle">Women's Lip Stain</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>$540.49</td>
                                                <td>
                                                    <div className="number m-0">
                                                        <span className="minus">-</span>
                                                        <input type="text" className="form-control rounded-0 border-0 shadow-none" value="1" />
                                                        <span className="plus">+</span>
                                                    </div>
                                                </td>
                                                <td>$540.49</td>
                                                <td>
                                                    <ul className="list-unstyled d-flex gap-3 mb-0">
                                                        <li><Link to={""} className="actionBtn close"><img src="/assets/images/icon/red_close.svg" alt="" /></Link></li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="d-flex gap-3 align-items-center">
                                                        <div className="p_img">
                                                            <img src="/assets/images/product/product-img-3.png" alt="" className="avatar-xs" />
                                                        </div>
                                                        <div className="content">
                                                            <Link><span className="p_title">Velvet Red Charm</span></Link>
                                                            <p className="mb-0 text-muted p_subTitle">Women's Lip Stain</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>$540.49</td>
                                                <td>
                                                    <div className="number m-0">
                                                        <span className="minus">-</span>
                                                        <input type="text" className="form-control rounded-0 border-0 shadow-none" value="1" />
                                                        <span className="plus">+</span>
                                                    </div>
                                                </td>
                                                <td>$540.49</td>
                                                <td>
                                                    <ul className="list-unstyled d-flex gap-3 mb-0">
                                                        <li><Link to={""} className="actionBtn close"><img src="/assets/images/icon/red_close.svg" alt="" /></Link></li>
                                                    </ul>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="row mt-3 row-gap-2">
                                    <div className="col-xl-auto col-md col-sm-6 col-12">
                                        <div className="form">
                                            <div className="row gx-0 mx-0">
                                                <div className="col">
                                                    <input type="text" className="form-control h-100 text-uppercase border-2 border-end-0" placeholder="Coupon Code" />
                                                </div>
                                                <div className="col-auto">
                                                    <Link to={""} className="btn themebtn w-100 h-100 fill">Apply Coupon</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-auto col-sm-6 col-12 ms-auto">
                                        <Link to={""} className="btn themebtn w-100">Update Cart <span><img src="/assets/images/icon/right_arrow.svg" alt="arrow" /></span></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="cartside">
                                    <div className="card rounded-0 carttotalcard">
                                        <div className="card-body p-4">
                                            <div className="row row-gap-3">
                                                <div className="col-12"><h6>CART TOTALS</h6></div>
                                                <div className="col-12">
                                                    <div className="row">
                                                        <div className="col-4 subtotal pe-0">SUBTOTAL</div>
                                                        <div className="col-8 subtotal">$1300</div>
                                                    </div>
                                                </div>
                                                <div className="col-12"><hr className="m-0" /></div>
                                                <div className="col-12">
                                                    <div className="row">
                                                        <div className="col-4 subtotal">SHIPPING</div>
                                                        <div className="col-8">
                                                            <div className="checkbox mb-1">
                                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                                <label className="form-check-label subtotal" htmlFor="flexCheckDefault">Free shipping</label>
                                                            </div>
                                                            <div className="checkbox mb-1">
                                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault1" />
                                                                <label className="form-check-label subtotal" htmlFor="flexCheckDefault1">Flat rate: $49</label>
                                                            </div>
                                                            <div className="checkbox mb-1">
                                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault2" />
                                                                <label className="form-check-label subtotal" htmlFor="flexCheckDefault2">Local pickup: $8</label>
                                                            </div>
                                                            <div className="subtotal">Shipping to ALL.</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12"><hr className="m-0" /></div>
                                                <div className="col-12">
                                                    <div className="row">
                                                        <div className="col-4 subtotal">VAT</div>
                                                        <div className="col-8 subtotal">$100</div>
                                                    </div>
                                                </div>
                                                <div className="col-12"><hr className="m-0" /></div>
                                                <div className="col-12">
                                                    <div className="row">
                                                        <div className="col-4 subtotal">TOTAL</div>
                                                        <div className="col-8 subtotal">$1400</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="proccedBtn mt-3"><Link to={""} className="btn themebtn w-100 fill">Proceed to Checkout <span><img src="/assets/images/icon/right_arrow.svg" alt="arrow" /></span></Link></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex="0">
                        <div className="row row-gap-3">
                            <div className="col-lg-8">
                                <div className="mb-3"><h5>BILLING DETAILS</h5></div>
                                <form className="row row-gap-sm-4 row-gap-3">
                                    <div className="col-sm-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                            <label htmlFor="floatingInput">First Name</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="floatingInput2" placeholder="name@example.com" />
                                            <label htmlFor="floatingInput2">Last Name</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="floatingInput2" placeholder="name@example.com" />
                                            <label htmlFor="floatingInput2">Company Name (optional)</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="floatingInput2" placeholder="name@example.com" />
                                            <label htmlFor="floatingInput2">Town / City</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="floatingInput2" placeholder="name@example.com" />
                                            <label htmlFor="floatingInput2">Pincode / Zip</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="floatingInput2" placeholder="name@example.com" />
                                            <label htmlFor="floatingInput2">Email Address</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="floatingInput2" placeholder="name@example.com" />
                                            <label htmlFor="floatingInput2">Phone</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-floating bg_none_select2">
                                            <select className="js-example-basic-single w-100" name="state">
                                                <option value="Choose a location..." selected>Choose a location...</option>
                                                <option value="In">India</option>
                                                <option value="AU">Australia</option>
                                                <option value="CA">Canada</option>
                                                <option value="UK">United Kingdom</option>
                                                <option value="US">United States</option>
                                                <option value="TU">Turkey</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <textarea name="" id="floatingInput3" placeholder="Street Address" className="form-control textarea w-100" cols="30" rows="2"></textarea>
                                    </div>
                                    <div className="col-12">
                                        <div className="checkbox mb-2">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefau" />
                                            <label className="form-check-label" htmlFor="flexCheckDefau">CREATE AN ACCOUNT?</label>
                                        </div>
                                        <div className="checkbox">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefaul" />
                                            <label className="form-check-label" htmlFor="flexCheckDefaul">SHIP TO A DIFFERENT ADDRESS?</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <textarea name="" id="floatingInput3" placeholder="Order Notes (optional)" className="form-control textarea w-100" cols="30" rows="8"></textarea>
                                    </div>
                                    <div className="col-12 text-end"><button type="submit" className="btn themebtn fill">Submit Now <span><img src="/assets/images/icon/right_arrow.svg" alt="arrow" /></span></button></div>
                                </form>
                            </div>
                            <div className="col-lg-4">
                                <div className="cartside">
                                    <div className="card rounded-0 carttotalcard">
                                        <div className="card-body p-4">
                                            <div className="row row-gap-3">
                                                <div className="col-12"><h6>YOUR ORDER</h6></div>
                                                <div className="col-12">
                                                    <div className="row">
                                                        <div className="col subtotal">PRODUCT</div>
                                                        <div className="col-auto subtotal">SUBTOTAL</div>
                                                    </div>
                                                </div>
                                                <div className="col-12"><hr className="m-0" /></div>
                                                <div className="col-12">
                                                    <div className="row row-gap-2 ">
                                                        <div className="col-12">
                                                            <div className="row">
                                                                <div className="col subtotal subcategory">Velvet Red Charm</div>
                                                                <div className="col-auto"><div className="subtotal subcategory">$32.50</div></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="row">
                                                                <div className="col subtotal subcategory">Hydrating Waves</div>
                                                                <div className="col-auto"><div className="subtotal subcategory">$69.50</div></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12"><hr className="m-0" /></div>
                                                <div className="col-12">
                                                    <div className="row">
                                                        <div className="col subtotal">SUBTOTAL</div>
                                                        <div className="col-auto subtotal">$120.40</div>
                                                    </div>
                                                </div>
                                                <div className="col-12"><hr className="m-0" /></div>
                                                <div className="col-12">
                                                    <div className="row">
                                                        <div className="col subtotal">SHIPPING</div>
                                                        <div className="col-auto subtotal">Free shipping</div>
                                                    </div>
                                                </div>
                                                <div className="col-12"><hr className="m-0" /></div>
                                                <div className="col-12">
                                                    <div className="row">
                                                        <div className="col subtotal">VAT</div>
                                                        <div className="col-auto subtotal">$100</div>
                                                    </div>
                                                </div>
                                                <div className="col-12"><hr className="m-0" /></div>
                                                <div className="col-12">
                                                    <div className="row">
                                                        <div className="col subtotal">TOTAL</div>
                                                        <div className="col-auto subtotal">$1400</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="card rounded-0 my-3">
                                        <div className="card-body p-4">
                                            <form action="" className="row row-gap-3 t_c_form">
                                                <div className="col-12">
                                                    <div className="form-check checkbox">
                                                        <input className="form-check-input" type="radio" name="trems" id="bank" checked />
                                                        <label className="form-check-label" htmlFor="bank">Direct bank transfer
                                                            <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference.Your order will not be shipped until the funds have cleared in our account.</p>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-check checkbox">
                                                        <input className="form-check-input" type="radio" name="trems" id="payment" />
                                                        <label className="form-check-label" htmlFor="payment">Check payments
                                                            <p>Phasellus sed volutpat orci. Fusce eget lore mauris vehicula elementum gravida nec dui. Aenean aliquam varius ipsum, non ultricies tellus sodales eu. Donec dignissim viverra nunc, ut aliquet magna posuere eget.</p>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-check checkbox">
                                                        <input className="form-check-input" type="radio" name="trems" id="mode"  />
                                                        <label className="form-check-label" htmlFor="mode">Cash on delivery
                                                            <p>Phasellus sed volutpat orci. Fusce eget lore mauris vehicula elementum gravida nec dui. Aenean aliquam varius ipsum, non ultricies tellus sodales eu. Donec dignissim viverra nunc, ut aliquet magna posuere eget.</p>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-check checkbox">
                                                        <input className="form-check-input" type="radio" name="trems" id="paypal" />
                                                        <label className="form-check-label" htmlFor="paypal">Paypal
                                                            <p>Phasellus sed volutpat orci. Fusce eget lore mauris vehicula elementum gravida nec dui. Aenean aliquam varius ipsum, non ultricies tellus sodales eu. Donec dignissim viverra nunc, ut aliquet magna posuere eget.</p>
                                                        </label>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="proccedBtn"><Link to={""} className="btn themebtn w-100 fill">Proceed to Checkout <span><img src="/assets/images/icon/right_arrow.svg" alt="arrow" /></span></Link></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabIndex="0">
                        <div className="row row-gap-3 order_placed_tab">
                            <div className="col-auto mx-auto">
                                <div className="orderPlacedImg"><img src="/assets/images/icon/order_placed.svg" alt="order" /></div>
                            </div>
                            <div className="col-12"><div className="text-center h1 m-0">Your order is completed!</div></div>
                            <div className="col-12 carttotalcard"><div className="subtotal subcategory text-center">Thank you. Your order has been received.</div></div>
                            <div className="col-lg-10 col-12 mx-auto my-3">
                                <div className="card ordersummerycard rounded-0">
                                    <div className="card-body p-md-5 p-4 carttotalcard">
                                        <div className="innerbody">
                                            <div className="overview">
                                                <div className="order_name">Order Number</div>
                                                <div className="order_value">13119</div>
                                            </div>
                                            <div className="overview">
                                                <div className="order_name">Date</div>
                                                <div className="order_value">02/01/2024</div>
                                            </div>
                                            <div className="overview">
                                                <div className="order_name">Total</div>
                                                <div className="order_value">$1499.90</div>
                                            </div>
                                            <div className="overview">
                                                <div className="order_name">Paymetn Method</div>
                                                <div className="order_value">Direct Bank Transfer</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-10 col-12 mx-auto">
                                <div className="cartside">
                                    <div className="card rounded-0 carttotalcard">
                                        <div className="card-body p-md-5 p-4">
                                            <div className="row row-gap-3">
                                                <div className="col-12"><h6>YOUR ORDER</h6></div>
                                                <div className="col-12">
                                                    <div className="row">
                                                        <div className="col subtotal">PRODUCT</div>
                                                        <div className="col-auto subtotal">SUBTOTAL</div>
                                                    </div>
                                                </div>
                                                <div className="col-12"><hr className="m-0" /></div>
                                                <div className="col-12">
                                                    <div className="row row-gap-2 ">
                                                        <div className="col-12">
                                                            <div className="row">
                                                                <div className="col subtotal subcategory">Velvet Red Charm</div>
                                                                <div className="col-auto"><div className="subtotal subcategory">$32.50</div></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="row">
                                                                <div className="col subtotal subcategory">Hydrating Waves</div>
                                                                <div className="col-auto"><div className="subtotal subcategory">$69.50</div></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12"><hr className="m-0" /></div>
                                                <div className="col-12">
                                                    <div className="row">
                                                        <div className="col subtotal">SUBTOTAL</div>
                                                        <div className="col-auto subtotal">$120.40</div>
                                                    </div>
                                                </div>
                                                <div className="col-12"><hr className="m-0" /></div>
                                                <div className="col-12">
                                                    <div className="row">
                                                        <div className="col subtotal">SHIPPING</div>
                                                        <div className="col-auto subtotal">Free shipping</div>
                                                    </div>
                                                </div>
                                                <div className="col-12"><hr className="m-0" /></div>
                                                <div className="col-12">
                                                    <div className="row">
                                                        <div className="col subtotal">VAT</div>
                                                        <div className="col-auto subtotal">$100</div>
                                                    </div>
                                                </div>
                                                <div className="col-12"><hr className="m-0" /></div>
                                                <div className="col-12">
                                                    <div className="row">
                                                        <div className="col subtotal">TOTAL</div>
                                                        <div className="col-auto subtotal">$1400</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default Checkout