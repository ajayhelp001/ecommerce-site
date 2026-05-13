import React, { useEffect, useState } from 'react'
import BreadCrumb from '../GlobelComponent/BreadCrumb'
import { useParams } from 'react-router-dom';

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

    console.log(data);
    
  return (
    <>
      <BreadCrumb/>

      {data ? 
      (
        <section className="p_details_section">
            <div className="container innerfluid">
                <div className="row row-gap-4">
                    <div className="col-lg-6">
                        {/* <div className="productslider">
                            <div className="owl-carousel p_details owlslider trending">
                                <div className="item"><div className="productImg"><img  src="/assets/images/product/product-img-3.png" alt="" /></div></div>
                                <div className="item"><div className="productImg"><img  src="/assets/images/product/product-img-4.png" alt="" /></div></div>
                                <div className="item"><div className="productImg"><img  src="/assets/images/product/product-img-1.png" alt="" /></div></div>
                            </div>
                        </div> */}
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
                                            <span className="minus">-</span>
                                            <input type="text" className="form-control rounded-0 border-0 shadow-none" value="1" />
                                            <span className="plus">+</span>
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
                                            <b>Bank Offer</b> 10% instant discount on Federal Bank Debit Cards, up to ₹3000 on orders of ₹5,000 and above <a href="javascript:;" data-bs-toggle="tooltip" data-bs-title="Terms &amp; Conditions">T&amp;C</a>
                                        </div>
                                    </li>
                                    <li className="offer_list">
                                        <div className="tagImg"><img src="/assets/images/icon/tag-fill.svg" alt="" /></div>
                                        <div className="">
                                            <b>Bank Offer</b> 10% instant discount on Federal Bank Debit Cards, up to ₹3000 on orders of ₹5,000 and above <a href="javascript:;" data-bs-toggle="tooltip" data-bs-title="Terms &amp; Conditions">T&amp;C</a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-12">
                                <div className="row row-gap-2 align-items-center">
                                    <div className="col-sm-6"><button type="button" className="btn themebtn w-100">Add To Cart <span><img src="/assets/images/icon/right_arrow.svg" alt="arrow" /></span></button></div>
                                    <div className="col-sm-6"><a href="checkout.html"  className="btn themebtn fill w-100">By Now <span><img src="/assets/images/icon/right_arrow.svg" alt="arrow" /></span></a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      )
        : (<h2>Product Not Found</h2>)}
    </>
  )
}

export default SingleProduct