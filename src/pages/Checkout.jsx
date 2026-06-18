import React, { useEffect, useReducer, useState } from 'react'
import BreadCrumb from '../GlobelComponent/BreadCrumb';
import { Link } from 'react-router';
import ThemeButton from '../GlobelComponent/ThemeButton';
import { useDispatch, useSelector } from 'react-redux';
import { removeCart, setCartTotal, updateQuantity, setCartSummary, setBillingDetails } from '../ProductStore/slice';
import Select from 'react-select';

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

    // const allProductPrice = cartItems.reduce((sum, val) => {
    //     const price = parseFloat(val.productOfferPrice)
    //     const qty = productCountValue[val.productId] || 1;
    //     return sum + price * qty
    // }, 0)

    const allProductPrice = cartItems.reduce((sum, item) => {
        return sum + item.itemTotalPrice;
    }, 0);
    
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

    // console.log(setCartTotal);
    

    // const alltotalPrice = useSelector(
    //     state => state.setCartTotal.alltotalPrice
    //     dispatch(removeCart(item.productId))
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

    const [applyOffer, setApplyOffer] = useState()

    useEffect(() => {
        setApplyOffer(JSON.parse(localStorage.getItem('cartSummary')))
    },[])

    const offersubmit = async (e) => {
        e.preventDefault()

        if (offer === offerName && Number(allProductPrice) > 50) {
            setofferMessage('🎉 Offer applied successfully! Your discount has been added to the total amount.');
            setofferError(false);
            setOfferAmount(offerPriceAmount)
            
            const cartData = {
                subtotal: allProductPrice, 
                shipping: deliveryDate,
                // shipping: (sameDayDelivery ? sameDayDeliveryCharge : sameDayDelivery) + (localPickup ? localPickupCharge : localPickup),
                discount: offerPriceAmount,
                total: totalPrice - offerPriceAmount,
                coupon: offer,
                // productDate : 
            }

            dispatch(setCartSummary(cartData))
            setApplyOffer(cartData)
            
        } 
        else if (Number(allProductPrice) <= 50 && offer !== offerName) {
            // ⚠️ Ye condition pehle check karo (specific pehle, general baad mein)
            setofferError('Invalid offer code, And A minimum purchase of $50 is required to place your order.') 
            setofferMessage(false); 
            setOfferAmount(0)
        }
        else if (Number(allProductPrice) <= 50) {
            setofferError('A minimum purchase of $50 is required to place your order.') 
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

    const removeOfferHandler = () => {
        setofferMessage(false)
        setoffer('')
        setOfferAmount(0)  
        setApplyOffer(null)     
        localStorage.removeItem('cartSummary')

        dispatch(setCartSummary({
            subtotal: allProductPrice,
            shipping: (sameDayDelivery ? sameDayDeliveryCharge : sameDayDelivery) + (localPickup ? localPickupCharge : localPickup),
            discount: 0,
            total: allProductPrice,
            coupon: ''
        }))
    }




    // Step 2 Shipping Form
    
        const options = [
            { value: 'Choose a location...', label: 'Choose a location...' },
            { value: 'RJ', label: 'Rajasthan' },
            { value: 'MH', label: 'Maharashtra' },
            { value: 'GJ', label: 'Gujarat' },
            { value: 'DL', label: 'Delhi' },
            { value: 'HR', label: 'Haryana' },
        ]


    const [billingName, setBillingName] = useState()
    const [billingEmail, setBillingEmail] = useState()
    const [billingCity, setBillingCity] = useState()
    const [billingZipCode, setBillingZipCode] = useState()
    const [billingPhone, setBillingPhone] = useState()
    // const [billingLocation, setBillingLocation] = useState()
    const [billingAddress, setBillingAddress] = useState()
    const [billingMessage, setBillingMessage] = useState()

    const [errorBillingName, setErrorBillingName] = useState()
    const [errorBillingEmail, setErrorBillingEmail] = useState()
    const [errorBillingCity, setErrorBillingCity] = useState()
    const [errorBillingZipCode, setErrorBillingZipCode] = useState()
    const [errorBillingPhone, setErrorBillingPhone] = useState()
    // const [errorBillingLocation, setErrorBillingLocation] = useState()
    const [errorBillingAddress, setErrorBillingAddress] = useState()
    const [errorBillingMessage, setErrorBillingMessage] = useState()
    const [bilingSuccessMessage, setbilingSuccessMessage] = useState()
    
    const [bilingFormSubmit, setBilingFormSubmit] = useState(false)

    const bilingForm = async (e) => {
        e.preventDefault();
        setBilingFormSubmit(false)

        if (!billingName) {
            setErrorBillingName('Please enter full name')
        }
        if (!billingEmail) {
            setErrorBillingEmail('Please enter Email')
        }
        if (!billingCity) {
            setErrorBillingCity('Please enter city name')
        }
        if (!billingZipCode) {
            setErrorBillingZipCode('Please enter zip code')
        }
        if (!billingPhone) {
            setErrorBillingPhone('Please enter phone number')
        }
        if (!billingAddress) {
            setErrorBillingAddress('Please enter delivery address')
        }

        if (billingName && billingEmail && billingCity && billingZipCode && billingPhone && billingAddress) {
            setErrorBillingName('')
            setErrorBillingEmail('')
            setErrorBillingCity('')
            setErrorBillingZipCode('')
            setErrorBillingPhone('')
            setErrorBillingAddress('')
            setbilingSuccessMessage("🎉 Your billing information has been saved successfully.")

            const generateOrderId = () => {
                return `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`
            }
            const orderId = generateOrderId();

            let bilingData = {billingName, billingEmail, billingCity, billingZipCode, billingPhone, billingAddress, orderId} 
            dispatch(setBillingDetails(bilingData))

             setActiveStep(3);

            // console.log(bilingData); 
        }

    }
    

    const bilingData = useSelector(
        (state) => state.cart.billingDetails
    );
    const cartSummaryData = useSelector(
        (state) => state.cart.cartSummary
    );

    console.log(bilingData, cartSummaryData);
    



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
                                                            <span className="minus" onClick={() => dispatch(updateQuantity({productId: item.productId, quantity: item.quantity <= 1 ? 1 : item.quantity - 1}))}>-</span>
                                                            <input type="text" className="form-control rounded-0 border-0 shadow-none" value={item.quantity ? item.quantity : 1} readOnly />
                                                            <span className="plus" onClick={() => dispatch(updateQuantity({productId: item.productId, quantity: item.quantity >= 5 ? 5 : item.quantity + 1}))}>+</span>
                                                        </div>
                                                    </td>
                                                    <td>${(item.itemTotalPrice).toFixed(2)}</td>
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
                                        {/* <div className="col-12">
                                            <div className="row align-items-center">
                                                <div className="col-4 subtotal">SHIPPING</div>
                                                <div className="col-8">
                                                    <div className="checkbox mb-1">
                                                        <input className="form-check-input" id='flexCheckDefault1' onChange={sameDayDeliveryHandlar} type="checkbox" value=""/>
                                                        <label className="form-check-label subtotal" htmlFor="flexCheckDefault1">Same day delivery: ${sameDayDeliveryCharge}</label>
                                                    </div>
                                                    <div className="checkbox mb-1">
                                                        <input className="form-check-input" id='flexCheckDefault2' onChange={handelLocalPickup} type="checkbox" value=""/>
                                                        <label className="form-check-label subtotal" htmlFor="flexCheckDefault2">Local pickup: ${localPickupCharge}</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
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
                                            applyOffer?.discount ? (
                                                <>
                                                <div className="col-12">
                                                    <div className="row align-items-center">
                                                        <div className="col-4 subtotal">Offer Price</div>
                                                        <div className="col-8 subtotal">-${applyOffer?.discount} <span onClick={removeOfferHandler} className='shadow-none ms-2 text-danger cursor-pointer'>Remove</span></div>
                                                    </div>
                                                </div>
                                                <div className="col-12"><hr className="m-0" /></div>
                                                </> 
                                            ) : ''
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
                            <div className="proccedBtn mt-3">
                                <ThemeButton btnType={'button'} clickEvent={() => setActiveStep(2)} btnTitle='Proceed to Checkout' btnClass={'w-100'} btnFill={true}/>
                            </div>
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
                <form onSubmit={bilingForm} className="row row-gap-3">
                    {
                        bilingSuccessMessage ? <div className="col-12"><p className='m-0 text-center p-2 text-success bg-success bg-opacity-10'>{bilingSuccessMessage}</p></div> : ''
                    }
                    <div className="col-lg-8">
                        <div className="mb-3"><h5>BILLING DETAILS</h5></div>
                        <div className="row row-gap-sm-4 row-gap-3">
                            <div className="col-sm-6">
                                <div className="form-floating">
                                    <input type="text" className={`${errorBillingName ? 'border-danger' : ''} form-control`} onChange={(e) => setBillingName(e.target.value)} value={billingName} placeholder="name@example.com" />
                                    <label>Full Name</label>
                                </div>
                                {errorBillingName ? <small className='text-danger'>{errorBillingName}</small> : ''}
                            </div>
                            <div className="col-sm-6">
                                <div className="form-floating">
                                    <input type="email" className={`${errorBillingEmail ? 'border-danger' : ''} form-control`} onChange={(e) => setBillingEmail(e.target.value)} value={billingEmail} placeholder="name@example.com" />
                                    <label>Email Address</label>
                                </div>
                                {errorBillingEmail ? <small className='text-danger'>{errorBillingEmail}</small> : ''}
                            </div>
                            <div className="col-sm-6">
                                <div className="form-floating">
                                    <input type="text" className={`${errorBillingCity ? 'border-danger' : ''} form-control`} onChange={(e) => setBillingCity(e.target.value)} value={billingCity} placeholder="name@example.com" />
                                    <label>Town / City</label>
                                </div>
                                {errorBillingCity ? <small className='text-danger'>{errorBillingCity}</small> : ''}
                            </div>
                            <div className="col-sm-6">
                                <div className="form-floating">
                                    <input type="tel" className={`${errorBillingZipCode ? 'border-danger' : ''} form-control`} onChange={(e) => setBillingZipCode(e.target.value)} value={billingZipCode} placeholder="name@example.com" />
                                    <label>Pincode / Zip</label>
                                </div>
                                {errorBillingZipCode ? <small className='text-danger'>{errorBillingZipCode}</small> : ''}
                            </div>
                            <div className="col-sm-12">
                                <div className="form-floating">
                                    <input type="tel" className={`${errorBillingPhone ? 'border-danger' : ''} form-control`} onChange={(e) => setBillingPhone(e.target.value)} value={billingPhone} placeholder="name@example.com" />
                                    <label>Phone</label>
                                </div>
                                {errorBillingPhone ? <small className='text-danger'>{errorBillingPhone}</small> : ''}
                            </div>
                            {/* <div className="col-sm-6">
                                <div className="form-floating bg_none_select2">
                                    <Select options={options} onChange={(e) => setBillingLocation(e.target.value)} value={billingLocation}   />
                                </div>
                            </div> */}
                            <div className="col-12">
                                <textarea id="floatingInput3" placeholder="Street Address" className={`${errorBillingAddress ? 'border-danger' : ''} form-control textarea w-100`} onChange={(e) => setBillingAddress(e.target.value)} value={billingAddress} cols="30" rows="2"></textarea>
                                {errorBillingAddress ? <small className='text-danger'>{errorBillingAddress}</small> : ''}
                            </div>
                            <div className="col-12">
                                <textarea id="floatingInput3" placeholder="Order Notes (optional)" className={`${errorBillingMessage ? 'border-danger' : ''} form-control textarea w-100`} onChange={(e) => setBillingMessage(e.target.value)} value={billingMessage} cols="30" rows="8"></textarea>
                            </div>
                            <div className="col-12">
                                <div className="row">
                                    <div className="col"><ThemeButton btnType={'button'} clickEvent={() => setActiveStep(1)} btnTitle='Back to shop bag'/></div>
                                    {/* <div className="col-auto "><button type="submit" className="btn themebtn fill">Update Address<span><img src="/assets/images/icon/right_arrow.svg" alt="arrow" /></span></button></div> */}
                                </div>
                            </div>
                        </div>
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
                                                {
                                                    cartItems && cartItems.length > 0 ? (
                                                        cartItems.map((item, index) => 
                                                        <div key={item.id} className="col-12">
                                                            <div className="row">
                                                                <div className="col subtotal subcategory">{item.productTitle} <strong className='text-dark'>({item.quantity})</strong></div>
                                                                <div className="col-auto"><div className="subtotal subcategory">${(item.itemTotalPrice).toFixed(2)}</div></div>
                                                            </div>
                                                        </div>
                                                        )
                                                    ) : ''
                                                }
                                            </div>
                                        </div>
                                        <div className="col-12"><hr className="m-0" /></div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col subtotal">SUBTOTAL</div>
                                                <div className="col-auto subtotal">${allProductPrice.toFixed(2)}</div>
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
                                            <div className="row align-items-center">
                                                <div className="col subtotal">Delivery date</div>
                                                <div className="col-auto subtotal">
                                                    {cartSummaryData.shipping}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12"><hr className="m-0" /></div>

                                        {
                                            applyOffer?.discount ? (
                                                <>
                                                <div className="col-12">
                                                    <div className="row align-items-center">
                                                        <div className="col subtotal">Offer Price</div>
                                                        <div className="col-auto subtotal">-${applyOffer?.discount}</div>
                                                    </div>
                                                </div>
                                                <div className="col-12"><hr className="m-0" /></div>
                                                </> 
                                            ) : ''
                                        }
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col subtotal">TOTAL</div>
                                                <div className="col-auto subtotal">${totalPrice.toFixed(2)}</div>
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
                                                <input className="form-check-input" type="radio" name="trems" id="bank"/>
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
                            <div className="proccedBtn"><ThemeButton btnType={'submit'} btnFill={true} btnClass={'w-100'} btnTitle='Proceed Order'/></div>
                        </div>
                    </div>
                </form>
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
                                        <div className="order_value">{bilingData.orderId}</div>
                                    </div>
                                    <div className="overview">
                                        <div className="order_name">Date</div>
                                        <div className="order_value">{cartSummaryData.shipping}</div>
                                    </div>
                                    <div className="overview">
                                        <div className="order_name">Total</div>
                                        <div className="order_value">${totalPrice.toFixed(2)}</div>
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
                                            {
                                                cartItems && cartItems.length > 0 ? (
                                                    cartItems.map((item, index) => 
                                                    <div key={item.id} className="col-12">
                                                        <div className="row">
                                                            <div className="col subtotal subcategory">{item.productTitle} <strong className='text-dark'>({item.quantity})</strong></div>
                                                            <div className="col-auto"><div className="subtotal subcategory">${(item.itemTotalPrice).toFixed(2)}</div></div>
                                                        </div>
                                                    </div>
                                                    )
                                                ) : ''
                                            }
                                        <div className="col-12"><hr className="m-0" /></div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col subtotal">SUBTOTAL</div>
                                                <div className="col-auto subtotal">${allProductPrice.toFixed(2)}</div>
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
                                                <div className="col subtotal">Offer Price</div>
                                                <div className="col-auto subtotal">${cartSummaryData.discount}</div>
                                            </div>
                                        </div>
                                        <div className="col-12"><hr className="m-0" /></div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col subtotal">TOTAL</div>
                                                <div className="col-auto subtotal">${totalPrice.toFixed(2)}</div>
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
                                <ul className="nav nav-pills steps row step_bar" id="pills-tab" role="tablist">
                                    {
                                        steps.map((item, index) => 
                                            <li key={item.id} className={`col-md-4 col-12 nav-item ${item.id === 1 ? 'pe-md-0' : item.id === 2 ? 'px-md-0' : item.id === 3 ? 'ps-md-0' : ''} `} role="presentation">
                                                <button className={`nav-link w-100 ${activeStep === item.id ? 'active' : activeStep > item.id ? 'is_active' : ''}`}>{item.number} <div className="step">{item.title}<span>{item.subtitle}</span></div></button>
                                                {/* <button className={`nav-link w-100 ${activeStep === item.id ? 'active' : activeStep > item.id ? 'is_active' : ''}`} onClick={() => setActiveStep(item.id)} id={`pills-${item.id}-tab`} data-bs-toggle="pill" data-bs-target={`#pills-${item.id}`} type="button" role="tab" aria-controls={`pills-${item.id}`} aria-selected={activeStep === item.id ? true : false}>{item.number} <div className="step">{item.title}<span>{item.subtitle}</span></div></button> */}
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                            <div className="tab-content mt-lg-5 mt-4" id="pills-tabContent">
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