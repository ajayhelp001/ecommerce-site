import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import ThemeButton from '../GlobelComponent/ThemeButton'

export const Login = ({forgotPassComponent}) => {

    const [showpass, setShowPass] = useState(false)

    const [inputValue, setInputValue] = useState({
        password : '',
        email : '',
    })

    const [emailError, setEmailError] = useState()
    const [passwordError, setPasswordError] = useState()
    const [success, setSuccess] = useState()
    const [loding, setLoding] = useState(false)

    const handalChange = (e) => {
        setInputValue({
            ...inputValue,
            [e.target.name] : e.target.value
        })
    }


    const navigate = useNavigate()

    const  handalSubmit = async (e) => {
        e.preventDefault();
        setEmailError("")
        setPasswordError("")
        setSuccess("")
        setLoding(false)
        
        // if (!inputValue.email) {
        //     setEmailError("Email must be an email")
        // }
        // if (!inputValue.password) {
        //     setPasswordError("password must be longer than or equal to 6 characters")
        // } 

            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"  
                },
                body: JSON.stringify(inputValue),
                redirect: "follow"
            };

            fetch("https://04a7-122-162-240-56.ngrok-free.app/api/auth/login", requestOptions).then((response) => {
                response.json().then((result) => {
                    
                    console.log(result.message);

                    if (!inputValue.email) {
                            setEmailError(result.message[0])
                    }
                    if (!inputValue.password) {
                        setPasswordError(result.message[1])
                    }
            
                    if(result.access_token) {
                        setSuccess(result.message)
                        
                        localStorage.setItem("token" , result.access_token)

                        console.log(result);
                        
                        navigate('/')
                        setLoding(true)
                    } else{
                        setSuccess(result.message || "Login failed");
                    }

                })
            })

            .catch((error) => console.error(error));

            setLoding(false)
    }

  return (
    <>
        <form onSubmit={handalSubmit}>
            <div className="row row-gap-4">
                <div className="col-12">
                    <div className="form-floating">
                        <input onChange={handalChange} type="email" name='email' value={inputValue.email} className={`${emailError ? 'border-danger' : ''} form-control`} placeholder="name@example.com" />
                        <label for="floatingInput">Email Address</label>
                    </div>
                    {emailError && <p className='text-danger mt-1 mb-0 text-sm'>{emailError}</p>}
                </div>
                <div className="col-12">
                    <div className="form-floating password">
                        <input onChange={handalChange} type={showpass ? 'text' : 'password'}  name='password' value={inputValue.password}className={`${passwordError ? 'border-danger' : ''} form-control`} placeholder="******" />
                        <label for="password">Your Password</label>
                        <div className={`visibalty ${showpass ? 'show' : ''}`} onClick={() => setShowPass(!showpass)}>
                            <span className="closeEye"><img src="/assets/images/icon/close_eye.svg" alt="password unvisibile" /></span>
                            <span className="openEye"><img src="/assets/images/icon/eye.svg" alt="password visibile" /></span>
                        </div>
                    </div>
                    {passwordError && <p className='text-danger mt-1 mb-0 text-sm'>{passwordError}</p>}
                </div>
                <div className="col-12">
                    <div className="row align-items-center">
                        <div className="col checkbox">
                            <input className="form-check-input" type="checkbox" value="Remember" id="flexCheckDefault" />
                            <label className="form-check-label" for="flexCheckDefault">Remember me</label>
                        </div>
                        {/* <div className="col-auto"><Link to={'/forgot-password'} className="lostPassword" id="forgot_password">Lost Password?</Link></div> */}
                    </div>
                </div>
                {success && <div className='col-12'><p className='text-success bg-success bg-opacity-25 p-2 border border-1 border-success text-center m-0'>{success}</p></div>}
                <div className="col-12">
                    <ThemeButton btnType={'submit'} btnFill={true} btnTitle={loding ? 'LOGED IN...' : 'LOG IN' } />
                    {/* <button type="submit" className="btn themebtn fill w-100">{loding ? 'LOGED IN...' : 'LOG IN' }<span><img src="/assets/images/icon/right_arrow.svg" alt="arrow" /></span></button> */}
                </div>
            </div>
        </form>
    </>
  )
}
 