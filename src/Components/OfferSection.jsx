import React from 'react'
import ThemeButton from '../GlobelComponent/ThemeButton'

const OfferSection = () => {
  return (
    <>
        <section className="offerSection m-0">
            <div className="container">
                <div className="row row-gap-lg-5 row-gap-sm-4 row-gap-3 mx-0">
                    <div className="col-12 productName">One-colored <br/>jackets up to</div>
                    <div className="col-12 discount">-20%</div>
                    <div className="col-12"><ThemeButton btnLink={'/product'} btnFill={true}/></div>
                </div>
            </div>
        </section>
    </>
  )
}

export default OfferSection