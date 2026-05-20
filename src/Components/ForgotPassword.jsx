import React, { useState } from 'react'
import { Link } from 'react-router'

const ForgotPassword = () => {

  return (
    <>
    <section className="signUpsection m-0">
        <div className="container innerfluid h-100">
            <div className="row h-100 align-items-center justify-content-center">
                <div className="col-xxl-5 col-xl-6 col-lg-7 col-md-8 col-sm-10 col-12">
                    <div className="card formcard">
                        <div className="card-body">
                            <div className="forgotPasswordBody d-block" id="forgotBody">
                                <form>
                                    <div className="row row-gap-4">
                                        <div className="col-12 createaccount">We will send you an email to reset your password</div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input type="email" className="form-control" placeholder="name@example.com" />
                                                <label htmlFor="floatingInput">Email Address</label>
                                            </div>
                                        </div>
                                        <div className="col-12"><button type="submit" className="btn themebtn fill w-100" id="p_submit">SUBMIT<span><img src="/assets/images/icon/right_arrow.svg" alt="arrow" /></span></button></div>
                                        <div className="col-12 text-end"><Link to={'/signup'} className="lostPassword" id="backToLogin">Back To Login</Link></div>
                                    </div>
                                </form>
                            </div>

                            <div className="forgotPasswordBody d-none otpFeild" id="otpFeild">
                                <form>
                                    <div className="row row-gap-4">
                                        <div className="col-12 createaccount">Please Enter OTP</div>
                                        <div className="col-12 verification-code">
                                            <ul className="otpbox verification-code--inputs otpbox">
                                                <input type="text" maxlength="1" className="form-control box" />
                                                <input type="text" maxlength="1" className="form-control box" />
                                                <input type="text" maxlength="1" className="form-control box" />
                                                <input type="text" maxlength="1" className="form-control box" />
                                                <input type="text" maxlength="1" className="form-control box" />
                                                <input type="text" maxlength="1" className="form-control box" />
                                            </ul>
                                        </div>
                                        <div className="col-12"><button type="button" className="btn themebtn fill w-100">SUBMIT<span><img src="/assets/images/icon/right_arrow.svg" alt="arrow" /></span></button></div>
                                        <div className="col-12 text-end"><Link to={''} className="lostPassword" id="backToPassword">Change Email Address</Link></div>
                                    </div>
                                </form>
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

export default ForgotPassword