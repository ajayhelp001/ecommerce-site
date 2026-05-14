import React, { useEffect, useState } from 'react'
import BreadCrumb from '../GlobelComponent/BreadCrumb'
import { Link, useParams } from 'react-router-dom';
import ThemeButton from '../GlobelComponent/ThemeButton';
import ProductSlider from '../Components/ProductSlider';



const SingleProduct = () => {

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
                                                <li>{data.rating} <span><img src="/assets/images/icon/start.svg" alt="star" /></span></li>
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
                                        <div className="col-sm-6"><ThemeButton btnType={'button'} btnClass='w-100' btnTitle={'Add To Cart'} /></div>
                                        <div className="col-sm-6"><ThemeButton btnFill={true} btnClass='w-100' btnTitle={'By Now'} /></div>
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
                                            <button className={`nav-link ${index === 0 ? "active" : ""}`} id={`pills-${item}-tab`} data-bs-toggle="pill" data-bs-target={`#pills-${item}`} type="button" role="tab" aria-controls={`pills-${item}`} aria-selected={index ? true : false}>{item}</button>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                        <div className="col-12">
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">

                                </div>
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