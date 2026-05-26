import React, { useEffect, useReducer, useState } from 'react'
import BreadCrumb from '../GlobelComponent/BreadCrumb';
import { Link } from 'react-router';
import ThemeButton from '../GlobelComponent/ThemeButton';
import { useDispatch, useSelector } from 'react-redux';
import { removeCart, setCartTotal } from '../ProductStore/slice';

const Checkout = () => {


    const initionlValue = {}
    const productQuntFun = (state, action) =>{
        const { type, id } = action;
        switch (type) {
            case 'incriment':
                return {
                    ...state,
                    [id]: state[id] >= 5 ? 5 : (state[id] || 1) + 1
                };
            case 'decrement':
                return {
                    ...state,
                    [id]: state[id] >= 5 ? 5 : (state[id] || 1) - 1
                };
        
            default:
                break;
        }
    }

    const [productCountValue, productEvent] = useReducer(productQuntFun, initionlValue)
    


    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cart.item  )

    const allProductPrice = cartItems.reduce((sum, val) => {
        const price = parseFloat(val.productOfferPrice)
        const qty = productCountValue[val.productId] || 1;
        return sum + price * qty
    }, 0)

    
    const [activeStep, setActiveStep] = useState(1);

    const [sameDayDelivery, setSameDayDelivery] = useState(false)
    const [sameDayDeliveryDate, setSameDayDeliveryDate] = useState('')
    const [localPickup, setLocalPickup] = useState(false)
    const [deliveryDate, setDeliveryDate] = useState('')
    const [totalPrice, setTotalPrice] = useState(0)

    
    const [offer, setoffer] = useState()
    const [offerError, setofferError] = useState()
    const [offerMessage, setofferMessage] = useState()
    const [offerAmount, setOfferAmount] = useState()
    const [offerName, setOfferName] = useState('WELCOME10')


    const sameDayDeliveryCharge = 30;
    const localPickupCharge = 8;
    const offerPriceAmount = 10;


    const dispatchPrice = useDispatch()
    
    useEffect(() => {
        let total = allProductPrice;
        if (sameDayDelivery) {
            total += sameDayDeliveryCharge;
        }
        if (localPickup) {
            total += localPickupCharge;
        }
        if (offerMessage) {
            total -= offerPriceAmount;
        }
        setTotalPrice(total);
        dispatchPrice(setCartTotal(total))
        
    }, [sameDayDelivery, localPickup, allProductPrice, offerMessage]);

    // const alltotalPrice = useSelector(
    //     state => state.cart.alltotalPrice
    // );


    useEffect(() => {
        let pdt = new Date();
        pdt.setDate(pdt.getDate() + 5);
        setDeliveryDate(
            pdt.toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            })
        );
    }, []);


    const sameDayDeliveryHandlar = (e) => {
        const checked = e.target.checked;
        setSameDayDelivery(checked);
        if (checked) {
            const dt = new Date();
            setSameDayDeliveryDate(
                dt.toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                })
            );
        } else {
            setSameDayDeliveryDate('');
        }
    }

    const handelLocalPickup = (e) => {
        const checked = e.target.checked;
        setLocalPickup(checked);
    }

    const offerHandler = (e) => {
        const value = e.target.value
        setoffer(value) 
    }

    // console.log(offer);

    const offersubmit = async (e) => {
        e.preventDefault()
        // let offerVoucher = offerName

        if (offer === offerName && Number(allProductPrice) > 50) {
            setofferMessage('🎉 Offer applied successfully! Your discount has been added to the total amount.');
            setofferError(false);
            setOfferAmount(offerPriceAmount)
            console.log(totalPrice);
            
        } 
        else if (Number(allProductPrice) <= 50) {
            setofferError('A minimum purchase of $50 is required to place your order.') 
            setofferMessage(false); 
            setOfferAmount(0)
        }
        else if (Number(allProductPrice) <= 50 && offer !==  offerName) {
            setofferError('Invalid offer code, And A minimum purchase of $50 is required to place your order.') 
            setofferMessage(false); 
            setOfferAmount(0)
        }
        else if (offer !== offerName) {
            setofferError('Invalid offer code. Please enter a valid coupon code.') 
            setofferMessage(false); 
            setOfferAmount(0)
        }
        else {
            setofferError(false);
            setofferMessage(false);
        }
    }

    useEffect(() => {

    }, [])
    

    // console.log('input value - ', offerName);
    // console.log('Offer value - ', offer);

    const removeOfferHandler = () => {
        setofferMessage(false)
        setoffer('')
    }
    

    const steps = [
        {
            id: 1,
            number: "01",
            title: "Shopping Bag",
            subtitle: "Manage Your Items List",
            content : (
                <>
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
                                    {
                                        cartItems && cartItems.length > 0 ? (

                                            cartItems.map((item, index) =>
                                                <tr key={item.id}>
                                                    <td>
                                                        <div className="d-flex gap-3 align-items-center">
                                                            <div className="p_img">
                                                                <img src={item.productImg1} alt="" className={"avatar-xs"} />
                                                            </div>
                                                            <div className="content">
                                                                <Link to={`/product/${item.productTitle.toLowerCase().replace(/\s+/g, "-")}`}><span className="p_title">{item.productTitle}</span></Link>
                                                                <p className="mb-0 text-muted p_subTitle">{item.productCategory}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>${(item.productOfferPrice).toFixed(2)}</td>
                                                    <td>
                                                        <div className="number m-0">
                                                            <span className="minus" onClick={() => productEvent({type : "decrement" , id : item.productId})}>-</span>
                                                            <input type="text" className="form-control rounded-0 border-0 shadow-none" value={productCountValue[item.productId] || 1} />
                                                            <span className="plus" onClick={() => productEvent({type : "incriment" , id : item.productId})}>+</span>
                                                        </div>
                                                    </td>
                                                    <td>{(item.productOfferPrice) * productCountValue[item.productId] || item.productOfferPrice}</td>
                                                    <td>
                                                        <ul className="list-unstyled d-flex gap-3 mb-0">
                                                            <li><button onClick={() => dispatch(removeCart(item.productId))} className="actionBtn close shadow-none border-0"><img src="/assets/images/icon/red_close.svg" alt="" /></button></li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                            )
                                        ) : ''
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="row mt-3 row-gap-2">
                            <div className="col-xl-auto col-md col-sm-6 col-12">
                                <form onSubmit={offersubmit} className="form">
                                    <div className="row gx-0 mx-0">
                                        <div className="col">
                                            <input type="text" className="form-control h-100 border-2 border-end-0" onChange={offerHandler} placeholder="Coupon Code" />
                                        </div>
                                        <div className="col-auto">
                                            <ThemeButton btnType={'submit'} btnClass={'h-100 w-100'} btnFill={true} btnTitle='Apply Coupon' />
                                            {/* <Link to={""} className="btn themebtn w-100 h-100 fill">Apply Coupon</Link> */}
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-auto col-sm-6 col-12 ms-auto">
                                <ThemeButton btnLink={'/product'} btnTitle='Update Cart' />
                            </div>
                            {
                                offerError ? <div className="col-12 text-danger">{offerError}</div> : ''
                            }
                            {
                                offerMessage ? <div className="col-12 text-success">{offerMessage}</div> : ''
                            }
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="cartside">
                            <div className="card rounded-0 carttotalcard">
                                <div className="card-body p-4">
                                    <div className="row row-gap-3">
                                        <div className="col-12"><h6>CART TOTALS</h6></div>
                                        <div className="col-12">
                                            <div className="row align-items-center">
                                                <div className="col-4 subtotal pe-0">SUBTOTAL</div>
                                                <div className="col-8 subtotal">${allProductPrice.toFixed(2)}</div>
                                            </div>
                                        </div>
                                        <div className="col-12"><hr className="m-0" /></div>
                                        <div className="col-12">
                                            <div className="row align-items-center">
                                                <div className="col-4 subtotal">SHIPPING</div>
                                                <div className="col-8">
                                                    <div className="checkbox mb-1">
                                                        <input className="form-check-input" onChange={sameDayDeliveryHandlar} type="checkbox" value="" id="flexCheckDefault1" />
                                                        <label className="form-check-label subtotal" htmlFor="flexCheckDefault1">Same day delivery: ${sameDayDeliveryCharge}</label>
                                                    </div>
                                                    <div className="checkbox mb-1">
                                                        <input className="form-check-input" onChange={handelLocalPickup} type="checkbox" value="" id="flexCheckDefault2" />
                                                        <label className="form-check-label subtotal" htmlFor="flexCheckDefault2">Local pickup: ${localPickupCharge}</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12"><hr className="m-0" /></div>
                                        <div className="col-12">
                                            <div className="row align-items-center">
                                                <div className="col-4 subtotal">Delivery date</div>
                                                <div className="col-8 subtotal">
                                                    {
                                                        sameDayDelivery ? sameDayDeliveryDate : deliveryDate
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12"><hr className="m-0" /></div>
                                        <div className="col-12">
                                            <div className="row align-items-center">
                                                <div className="col-4 subtotal">Free shipping</div>
                                                <div className="col-8 subtotal">Yes</div>
                                            </div>
                                        </div>
                                        <div className="col-12"><hr className="m-0" /></div>
                                        {
                                            offerMessage ?
                                            <>
                                            <div className="col-12">
                                                <div className="row align-items-center">
                                                    <div className="col-4 subtotal">Offer Price</div>
                                                    <div className="col-8 subtotal">-${offerAmount} <span onClick={removeOfferHandler} className='shadow-none ms-2 text-danger cursor-pointer'>Remove</span></div>
                                                </div>
                                            </div>
                                            <div className="col-12"><hr className="m-0" /></div>
                                            </> : ''
                                        }
                                        <div className="col-12">
                                            <div className="row align-items-center">
                                                <div className="col-4 subtotal">TOTAL</div>
                                                <div className="col-8 subtotal"> ${totalPrice.toFixed(2)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="proccedBtn mt-3"><Link to={""} className="btn themebtn w-100 fill">Proceed to Checkout <span><img src="/assets/images/icon/right_arrow.svg" alt="arrow" /></span></Link></div>
                        </div>
                    </div>
                </div>
                </>
            )
        },
        {
            id: 2,
            number: "02",
            title: "Shipping and Checkout",
            subtitle: "Checkout Your Items List",
            content : (
                <>
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
                </>
            )
        },
        {
            id: 3,
            number: "03",
            title: "Confirmation",
            subtitle: "Review And Submit Your Order",
            content : (
                <>
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
                </>
            )
        },
    ];


  return (
    <>
    <BreadCrumb/>
    <section className='offer-marquee m-0'>
        <div className="offer-track">
            <span>🎁 Use code <strong>{offerName}</strong> and get an exclusive discount on your order!</span>
        </div>
    </section>
    <section className="checkout">
        <div className="container">
            <div className="row">
                    {
                        cartItems && cartItems.length > 0 ? (
                            <>
                            <div className="col-12">
                                {
                                    steps.map((steps, index) => 
                                        <div key={steps.id} className={`heading ${activeStep === steps.id ? 'active' : ''}`}>{steps.title}<span>{steps.subtitle}</span></div>
                                    )
                                }
                            </div>
                            <div className="col-12 stepnavbar">
                                <ul className="nav nav-pills mb-lg-5 mb-4 steps row step_bar" id="pills-tab" role="tablist">
                                    {
                                        steps.map((item, index) => 
                                            <li key={item.id} className={`col-md-4 col-12 nav-item ${item.id === 1 ? 'pe-md-0' : item.id === 2 ? 'px-md-0' : item.id === 3 ? 'ps-md-0' : ''} `} role="presentation">
                                                <button className={`nav-link w-100 ${activeStep === item.id ? 'active' : activeStep > item.id ? 'is_active' : ''}`} onClick={() => setActiveStep(item.id)} id={`pills-${item.id}-tab`} data-bs-toggle="pill" data-bs-target={`#pills-${item.id}`} type="button" role="tab" aria-controls={`pills-${item.id}`} aria-selected={activeStep === item.id ? true : false}>{item.number} <div className="step">{item.title}<span>{item.subtitle}</span></div></button>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                            <div className="tab-content" id="pills-tabContent">
                                {
                                    steps.map((stepContent, index) => 
                                        <div key={stepContent.id} className="tab-pane fade show active" id={`pills-${stepContent.id}`} role="tabpanel" aria-labelledby={`pills-${stepContent.id}-tab`} tabIndex="0">
                                            {activeStep === stepContent.id ? stepContent.content : ''}
                                        </div>
                                    )
                                }
                            </div>
                            </>
                        ) : (
                            <div className="text-center d-flex flex-column align-items-center">
                                <img src="/assets/images/empty-cart.jpg" alt="Cart is empty" className='mx-auto' width={200} />
                                <ThemeButton btnLink={'/product'} btnFill={true} btnClass={'mt-5'}  />
                            </div>
                        )
                        
                    }
            </div>
        </div>
    </section>
    </>
  )
}

export default Checkout