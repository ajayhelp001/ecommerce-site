import React, { useEffect, useState } from 'react'
import BreadCrumb from '../GlobelComponent/BreadCrumb'
import { Link, useNavigate, useParams } from 'react-router-dom';
import ThemeButton from '../GlobelComponent/ThemeButton';
import ProductSlider from '../Components/ProductSlider';
import { useDispatch } from 'react-redux';
import reducer, { add } from '../ProductStore/slice';
import ReviewForm from '../Components/ReviewForm';



const SingleProduct = () => {

        const dispatch = useDispatch();

        const handleAddToCart = () => {
            const productData = {
                productId: data.id,
                productImg1: data.thumbnail,
                productImg2: data.images?.[0],
                productOffer: data.discountPercentage,
                productTag: "New",
                productWishlistLink: "/wishlist",
                productLink: `/product/${data.id}`,
                productTitle: data.title,
                productCategory: data.category,
                productPrice: data.price,
                productOfferPrice: data.price - (data.price * data.discountPercentage) / 100,
                productRating: data.rating,
                productTotalRating: 5,
                productavailability: "Add To Cart",
                quantity: productQuntity, 
                };
            dispatch(add(productData));
        };

    const { name } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {

        fetch("https://dummyjson.com/products?limit=100")
        .then((res) => res.json())
        .then((result) => {

            const slug = name.toLowerCase();
            const product = result.products.find((item) => {
            const itemSlug = item.title.toLowerCase().replaceAll(" ", "-");
            return itemSlug === slug;
            });
            setData(product);
        });

    }, [name]);

    const [productQuntity, setProductQuntity] = useState(1)

    const tabing = ['Description', 'Ratings', 'Reviews' ]
    const [tabActive, setTabActive] = useState(tabing[0])



    const [reviews, setReviews] = useState([]);

    const fetchReviews = () => {
        let storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];

        if (!Array.isArray(storedReviews)) {
            storedReviews = [];
        }
        if (!data?.id) return; 
        const productReviews = storedReviews.filter(
            (item) => item.productId === data.id
        );
        setReviews(productReviews);
    };

    useEffect(() => {
        if (!data?.id) return;

        fetchReviews();
        window.addEventListener("reviewsUpdated", fetchReviews);
        return () => {
            window.removeEventListener("reviewsUpdated", fetchReviews);
        };
        }, [data?.id]);

    // ⭐ Rating Calculation (Live + Local)
    const localTotalReviews = reviews.length;
    const localRatingSum = reviews.reduce((sum, item) => sum + Number(item.rating), 0);

    const liveTotalReviews = data?.reviews?.length || 0;
    const liveRatingSum = (data?.reviews || []).reduce(
        (sum, item) => sum + Number(item.rating),
        0
    );

    const totalAllReviews = localTotalReviews + liveTotalReviews;
    const totalAllRatingSum = localRatingSum + liveRatingSum;

    const finalRating = totalAllReviews > 0 ? totalAllRatingSum / totalAllReviews : 0;

    const totalReviewCount = localTotalReviews + (data?.reviews?.length || 0);


    const productReview = [
        {rating : 5, color : 'success'},
        {rating : 4, color : 'primary'},
        {rating : 3, color : 'info'},
        {rating : 2, color : 'secondary'},
        {rating : 1, color : 'danger'}
    ]
    

    const navigate = useNavigate()

    const handelCheckout = () => {
        navigate(`/product/${name}/checkout`)
    }
    const handalCartAndCheckout = () => {
        handelCheckout();
        handleAddToCart();
    }

    const tabContent = {
        Description: (
            <div className="row row-gap-lg-4 row-gap-3">
                <div className="col-12">
                    <table className="table table-sm discription_tabel table-borderless align-middle">
                        <tbody>
                            {data?.title ? <tr><th className='text-capitalize'>Title</th><td>{data?.title}</td></tr> : ''}
                            {data?.category ? <tr><th className='text-capitalize'>category</th><td className='text-capitalize'>{data?.category}</td></tr> : ''}
                            {data?.price ? <tr><th className='text-capitalize'>price</th><td>{data?.price}</td></tr> : ''}
                            {data?.discountPercentage ? <tr><th className='text-capitalize'>discountPercentage</th><td>{data?.discountPercentage}</td></tr> : ''}
                            {data?.rating ? <tr><th className='text-capitalize'>rating</th><td>{data?.rating}</td></tr> : ''}
                            {data?.stock ? <tr><th className='text-capitalize'>stock</th><td>{data?.stock}</td></tr> : ''}
                            {data?.brand ? <tr><th className='text-capitalize'>brand</th><td>{data?.brand}</td></tr> : ''}
                            {data?.sku ? <tr><th className='text-capitalize'>sku</th><td>{data?.sku}</td></tr> : ''}
                            {data?.weight ? <tr><th className='text-capitalize'>weight</th><td>{data?.weight}</td></tr> : ''}
                            {data?.dimensions ? <tr><th className='text-capitalize'>dimensions</th><td>{`W - ${data?.dimensions?.width}, H - ${data?.dimensions?.height}, D - ${data?.dimensions?.depth}`}</td></tr> : ''}
                            {data?.warrantyInformation ? <tr><th className='text-capitalize'>warrantyInformation</th><td>{data?.warrantyInformation}</td></tr> : ''}
                            {data?.shippingInformation ? <tr><th className='text-capitalize'>shippingInformation</th><td>{data?.shippingInformation}</td></tr> : ''}
                            {data?.availabilityStatus ? <tr><th className='text-capitalize'>availabilityStatus</th><td>{data?.availabilityStatus}</td></tr> : ''}
                            {data?.reviews ? <tr><th className='text-capitalize'>reviews</th><td>{data?.reviews?.length}</td></tr> : ''}
                            {data?.returnPolicy ? <tr><th className='text-capitalize'>returnPolicy</th><td>{data?.returnPolicy}</td></tr> : ''}
                            {data?.minimumOrderQuantity ? <tr><th className='text-capitalize'>minimumOrderQuantity</th><td>{data?.minimumOrderQuantity}</td></tr> : ''}
                            {data?.meta?.createdAt ? <tr><th className='text-capitalize'>createdAt</th><td>{data?.meta?.createdAt}</td></tr> : ''}
                            {data?.meta?.updatedAt ? <tr><th className='text-capitalize'>updatedAt</th><td>{data?.meta?.updatedAt}</td></tr> : ''}
                            {data?.meta?.barcode ? <tr><th className='text-capitalize'>barcode</th><td>{data?.meta?.barcode}</td></tr> : ''}
                            {data?.meta?.qrCode ? <tr><th className='text-capitalize'>qrCode</th><td><img src={data?.meta?.qrCode} width={100} alt="{data?.meta?.qrCode}" /></td></tr> : ''}
                        </tbody>
                    </table>
                </div>
                {
                    data?.description ?  <div className="col-lg-8 col-12"><p className="loremText">{data?.description}</p></div> :  ''
                }
                
            </div>
        ),

        Ratings: (
            <div className="row ratings row-gap-4">
                <div className="col-md-4 col-sm-6">
                    <h6 className="mb-md-3 mb-2 fw-medium">Total Reviews's</h6>
                    <h3 className="fw-semibold mb-md-3 mb-2">{totalReviewCount ? totalReviewCount : 0}</h3>
                    <p className="text-muted mb-0 loremText">Growth in reviews on this year</p>
                </div>
                <div className="col-md-4 col-sm-6">
                    <h6 className="mb-md-3 mb-2 fw-medium">Average Rating</h6>
                    <div className="d-flex align-items-center gap-2 mb-md-3 mb-2">
                        <h3 className="fw-semibold mb-0">{finalRating ? finalRating.toFixed(2) : data?.rating}</h3>
                        <ul className="product_rating list-unstyled">
                            <li><span><img src="/assets/images/icon/start.svg" alt="star"/></span></li>
                        </ul>
                    </div>
                    <p className="text-muted mb-0 loremText">Average rating on this year</p>
                </div>
                <div className="col-md-4">
                    <div className="all_rating">
                        {
                            productReview.map((item, index) => {
                                // const totalReview = data?.reviews?.length || 0;
                                // const ratingCount = data?.reviews?.filter(r => Math.round(r.rating) === item.rating).length || 0;
                                // const ratingPercentage = totalReview > 0 ? (ratingCount / totalReview) * 100 : 0;
                                const allReviews = [...(data?.reviews || []), ...reviews];
                                const totalReview = allReviews.length;
                                const ratingCount = allReviews.filter(r => Math.round(r.rating) === item.rating).length;
                                const ratingPercentage = totalReview > 0 ? (ratingCount / totalReview) * 100 : 0;

                                return  (
                                <div key={index} className={`row align-items-center g-3 align-items-center ${index === 4 ? '' : 'mb-2'}`}>
                                    <div className="col-auto">
                                        <h6 className="rating_stars text-muted"><span><img src="/assets/images/icon/start.svg" className="w-100" alt={`Rating - ${item.rating}`} /></span>{item.rating}</h6>
                                    </div>
                                    <div className="col">
                                        <div className="progress animated-progress progress-sm">
                                            <div className={`progress-bar bg-${item.color}`} role="progressbar" style={{width: `${ratingPercentage}%`}} aria-valuenow={ratingPercentage} aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <h6 className="rating_stars text-muted">{ratingCount}</h6>
                                    </div>
                                </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        ),

        Reviews: (
            <>
                <div className='row row-gap-3'>
                    {
                        data?.reviews?.map((item, index) => {
                            const reviewData = new Date(item.date).toLocaleString("en-GB", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                            })
                            return(
                                <div className="col-12" key={index}>
                                    <div className="review_Items">
                                        <div className="userImg d-sm-block d-none"><img src={data?.thumbnail} alt="Review Img" /></div>
                                        <div className="review_dic w-100">
                                            <div className="row align-items-center row-gap-lg-3 row-gap-2">
                                                <div className="col"><div className="review_user"><div className="userImg d-sm-none d-block"><img src={data?.thumbnail} alt="Review Img" /></div> {item.reviewerName} <span className="ms-2"> {reviewData}</span></div></div>
                                                <div className="col-md-auto">
                                                    <ul className="product_rating list-unstyled">
                                                        <li>{item.rating}<span><img src="/assets/images/icon/start.svg" alt="star" /></span></li>
                                                    </ul>
                                                </div>
                                                <div className="col-12">
                                                    <p className="loremText m-0">{item.comment}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {
                        reviews.map((reviewitem, index) => 
                            <div className="col-12" key={index}>
                                <div className="review_Items">
                                    <div className="userImg d-sm-block d-none"><img src={data?.thumbnail} alt="Review Img" /></div>
                                    <div className="review_dic w-100">
                                        <div className="row align-items-center row-gap-lg-3 row-gap-2">
                                            <div className="col">
                                                <div className="review_user">
                                                    <div className="userImg d-sm-none d-block"><img src={data?.thumbnail} alt="Review Img" /></div> 
                                                    {reviewitem.name} <span className="ms-2"> {reviewitem.time}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-auto">
                                                <ul className="product_rating list-unstyled">
                                                    <li>{reviewitem.rating}<span><img src="/assets/images/icon/start.svg" alt="star" /></span></li>
                                                </ul>
                                            </div>
                                            <div className="col-12">
                                                <p className="loremText m-0">{reviewitem.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                <ReviewForm productId={data?.id}/>
            </>
        ),
        };


        
  return (
    <>
      <BreadCrumb/>

      {data ? 
      (
        <>
            <section className="p_details_section">
                <div className="container innerfluid">
                    <div className="row row-gap-4">
                        <div className="col-lg-6">
                            <ProductSlider images={data?.images} />
                            
                        </div>
                        <div className="col-lg-6">
                            <div className="row p_details_side row-gap-xl-4 row-gap-3">
                                <div className="col-12">
                                    <div className="p_subtitle text-capitalize">{data.category}</div>
                                    <div className="p_name">{data.title}</div>
                                </div>
                                <div className="col-12">
                                    <div className="row align-items-center row-gap-2">
                                        <div className="col-auto"><span className={`stock ${data.stock ? '' : 'text-danger bg-danger bg-opacity-25'}`}>{data.stock > 0 ? `In stock` : 'Out Of Stock'}</span></div>
                                        <div className="col-auto">
                                            <ul className="product_rating list-unstyled">
                                                <li>{finalRating ? finalRating.toFixed(2) : data?.rating} <span><img src="/assets/images/icon/start.svg" alt="star" /></span></li>
                                            </ul>
                                        </div>
                                        <div className="col-auto"><div className="review"> ({data?.reviews?.length} Reviews)</div></div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <p className="p_discription">{data?.description}</p>
                                </div>
                                <div className="col-12">
                                    <div className="p_prich">${data.discountPercentage}  <span className="text-muted fs-14"><del>${data.price}</del></span> <span className="fs-14 ms-2 text-danger"> ({Math.floor(((data.price - data.discountPercentage) / data.price) * 100) }% off)</span></div>
                                </div>
                                <div className="col-12">
                                    <ul className="list-unstyled vstack gap-2">
                                        
                                        <li className="list">{data.stock > 0 ? `In stock - ${data.stock}` : 'Out Of Stock'}</li>
                                        <li className="list">Free delivery available</li>
                                        <li className="list">Sales 10% Off Use Code: <b>FASHION10</b></li>
                                    </ul>
                                </div>
                                <div className="col-12">
                                    <div className="row row-gap-2 align-items-center">
                                        <div className="col-auto"><h6 className="m-0">Quantity:</h6></div>
                                        <div className="col-auto">
                                            <div className="number m-0">
                                                <span className="minus" onClick={() => setProductQuntity(productQuntity - 1)}>-</span>
                                                <input type="text" className="form-control rounded-0 border-0 shadow-none" value={Math.min(Math.max(productQuntity, 1), 5)} />
                                                <span className="plus" onClick={() => setProductQuntity(productQuntity + 1)}>+</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <h6 className="">Available offers :</h6>
                                    <ul className="list-unstyled vstack gap-2 mb-0">
                                        <li className="offer_list">
                                            <div className="tagImg"><img src="/assets/images/icon/tag-fill.svg" alt="" /></div>
                                            <div className="">
                                                <b>Bank Offer</b> 10% instant discount on Federal Bank Debit Cards, up to ₹3000 on orders of ₹5,000 and above <Link to={''}>T&amp;C</Link>
                                            </div>
                                        </li>
                                        <li className="offer_list">
                                            <div className="tagImg"><img src="/assets/images/icon/tag-fill.svg" alt="" /></div>
                                            <div className="">
                                                <b>Bank Offer</b> 10% instant discount on Federal Bank Debit Cards, up to ₹3000 on orders of ₹5,000 and above <Link to={''}>T&amp;C</Link>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-12">
                                    <div className="row row-gap-2 align-items-center">
                                        <div className="col-sm-6">
                                            <ThemeButton btnType={'button'} clickEvent={handleAddToCart} btnClass='w-100' btnTitle='Add To Cart'/>
                                        </div>
                                        <div className="col-sm-6">
                                            <ThemeButton btnType={'button'} clickEvent={handalCartAndCheckout} btnFill={true} btnClass='w-100' btnTitle='By Now'/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='product_discription'>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <ul className="nav nav-pills navtabs mb-3" id="pills-tab" role="tablist">
                                {
                                    tabing.map((item, index) => 
                                        <li key={index} className="nav-item" role="presentation">
                                            <button className={`nav-link ${tabActive === item ? "active" : ""}`} onClick={() => setTabActive(item)} id={`pills-${item}-tab`} data-bs-toggle="pill" data-bs-target={`#pills-${item}`} type="button" role="tab" aria-controls={`pills-${item}`} aria-selected={tabActive === item ? true : false}>{item}</button>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                        <div className="col-12">
                            <div className="tab-content">
                                {tabing.map((item, index) => (
                                    <div key={index} className={`tab-pane fade ${tabActive === item ? "show active" : ""}`} id={`pills-${item}`} role="tabpanel" aria-labelledby={`pills-${item}-tab`} tabIndex="0"> 
                                        {tabContent[item]}
                                    </div>
                                ))}
                                </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

        
      )
        : (<h2>Product Not Found</h2>)}
    </>
  )
}

export default SingleProduct