import React, { useState } from 'react'

const ReviewForm = ({productId}) => {

    const [nameValue, setNameValue] = useState("")
    const [emailValue, setEmailValue] = useState("")
    const [messageValue, setMessageValue] = useState("")
    const [rating, setRating] = useState(0);

    const [nameError, setNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [messageError, setMessageError] = useState("")
    const [responseError, setResponseError] = useState("")
    const [successMessage, SetSuccessMessage] = useState("")
    const [ratingError, setRatingError] = useState("");

    const [reviewStore, setReviewStore] = useState(() => {
        return JSON.parse(localStorage.getItem("reviews")) || [];
    });


    const handelReviewSubmit = async (e) => {
        e.preventDefault();
        setNameError('')
        setEmailError('')
        setMessageError('')
        setResponseError('')
        SetSuccessMessage('')

        if (!nameValue && !emailValue && !messageValue && !rating) {
            setResponseError('Invelid feeback !')

            setTimeout(() => {
                setResponseError("")
            }, 3000);
        }

        
        let realtime = new Date().toLocaleDateString("en-GB",{
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
        const Reviews = {
            productId: productId,
            name : nameValue,
            email : emailValue,
            message : messageValue,
            rating: rating,
            time : realtime,
        }

        let isValid = true;

        if (!nameValue || nameValue.trim() === "") {
            setNameError("Please enter your name !");
            isValid = false;
        } else {
            setNameError("");
        }
        if (!emailValue || emailValue.trim() === "") {
            setEmailError("Please enter your email !");
            isValid = false;
        } else {
            setEmailError("");
        }
        if (!messageValue || messageValue.trim() === "") {
            setMessageError("Please enter your feedback message !");
            isValid = false;
        } else {
            setMessageError("");
        }
        if (!rating) {
            setRatingError('Please select rating!')
            isValid = false;
        }

        if (isValid) {
            const updatedReviews = [...reviewStore, Reviews];

            setReviewStore(updatedReviews);
            localStorage.setItem("reviews", JSON.stringify(updatedReviews));
            window.dispatchEvent(new Event("reviewsUpdated"));

            setNameValue("");
            setEmailValue("");
            setMessageValue("");
            setRating(0);

            SetSuccessMessage("Review Added Successfully!");

            setTimeout(() => {
                SetSuccessMessage("");
            }, 3000);
        }

    }

    return (
        <>
        <div className="row mt-5">
            <div className="col-12">
                <div className="heading">Add A Review <span className="d-lg-block d-none">Your Email Address Will Not Be Published. Required Fields Are Marked *</span> 
                    <span className="d-lg-none d-block">Write a Review for this product</span>
                </div>
            </div>
            <div className="col-12">
                <form onSubmit={handelReviewSubmit} className="row row-gap-sm-4 row-gap-3">
                    <div className="col-sm-6">
                        <div className="form-floating">
                            <input type="text" className={`${nameError ? 'border-danger' : ''} form-control`} onChange={(e) => setNameValue(e.target.value)} value={nameValue} placeholder="Name" />
                            <label htmlFor="floatingInput">Your Name</label>
                        </div>
                        {nameError && <p className='text-danger mt-1 mb-0 text-sm'>{nameError}</p>}
                    </div>
                    <div className="col-sm-6">
                        <div className="form-floating">
                            <input type="email" className={`${emailError ? 'border-danger' : ''} form-control`} onChange={(e) => setEmailValue(e.target.value)} value={emailValue} placeholder="name@example.com" />
                            <label htmlFor="floatingInput2">Your Email</label>
                        </div>
                        {emailError && <p className='text-danger mt-1 mb-0 text-sm'>{emailError}</p>}
                    </div>
                    <div className="col-12">
                        <textarea name="message" placeholder="Message" onChange={(e) => setMessageValue(e.target.value)} value={messageValue} className={`${messageError ? 'border-danger' : ''} form-control textarea w-100`} cols="30" rows="5"></textarea>
                        {messageError && <p className='text-danger mt-1 mb-0 text-sm'>{messageError}</p>}
                    </div>
                    <div className="col-12">
                        <ul className="product_rating list-unstyled">
                            {[1,2,3,4,5].map((star) => 
                                <li key={star} onClick={() => { setRating(star); setRatingError(""); }} className={`fs-5 cursor-pointer ${ratingError ? 'text-danger' : ''}`}><span>{star <= rating ? <img src="/assets/images/icon/start.svg" alt="star"/> : "☆"}</span></li>
                            )}
                        </ul>
                        {ratingError && <p className='text-danger mt-1 mb-0 text-sm'>{ratingError}</p>}
                    </div>
                    <div className="col-12 text-end"><button type="submit" className="btn themebtn fill">Submit Now <span><img src="/assets/images/icon/right_arrow.svg" alt="arrow" /></span></button></div>
                </form>
                {responseError && <div className='col-12 mt-3'><p className='text-danger bg-danger bg-opacity-25 p-2 border border-1 border-danger text-center m-0'>{responseError}</p></div>}
                {successMessage && <div className='col-12 mt-3'><p className='text-success bg-success bg-opacity-25 p-2 border border-1 border-success text-center m-0'>{successMessage}</p></div>}
            </div>
        </div>
        </>
    )
}

export default ReviewForm