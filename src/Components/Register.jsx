import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import ThemeButton from '../GlobelComponent/ThemeButton'

const Register = () => {

    const [showpass, setShowPass] = useState(false)

    const [inputValue, setInputValue] = useState({
        name : '',
        password : '',
        email : '',
    })

    const [nameError, setNameError] = useState()
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
        setNameError("")
        setEmailError("")
        setPasswordError("")
        setSuccess("")
        setLoding(false)
        

            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"  
                },
                body: JSON.stringify(inputValue),
                redirect: "follow"
            };

            fetch("https://04a7-122-162-240-56.ngrok-free.app/api/auth/register", requestOptions).then((response) => {
                response.json().then((result) => {
                    setSuccess(result.message)
                    console.log(result.message);
                    
                    if (!inputValue.name) {
                        setNameError(result.message[2])
                    }
                    if (!inputValue.email) {
                        setEmailError(result.message[0])
                    }
                    if (!inputValue.password) {
                        setPasswordError(result.message[1])
                    } else if (!inputValue.password.length >= 6){
                        setPasswordError("your password equal to 6 characters")
                    }
                    if(response.ok) {
                        navigate('/')
                        setLoding(true)
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
                        <input onChange={handalChange} type="text" className={`${nameError ? 'border-danger' : ''} form-control`} name='name' value={inputValue.name} placeholder="Username" />
                        <label for="user"  >Username</label>
                    </div>
                    {nameError && <p className='text-danger mt-1 mb-0 text-sm'>{nameError}</p>}
                </div>
                <div className="col-12">
                    <div className="form-floating">
                        <input onChange={handalChange} type="email" className={`${emailError ? 'border-danger' : ''} form-control`} name='email' value={inputValue.email} placeholder="name@example.com" />
                        <label for="floatingInput">Email Address</label>
                    </div>
                    {emailError && <p className='text-danger mt-1 mb-0 text-sm'>{emailError}</p>}
                </div>
                <div className="col-12">
                    <div className="form-floating password">
                        <input onChange={handalChange} type={showpass ? 'text' : 'password'} className={`${passwordError ? 'border-danger' : ''} form-control`} name='password' value={inputValue.password} placeholder="******" />
                        <label for="password">Your Password</label>
                        <div className={`visibalty ${showpass ? 'show' : ''}`} onClick={() => setShowPass(!showpass)}>
                            <span className="closeEye"><img src="/assets/images/icon/close_eye.svg" alt="password unvisibile" /></span>
                            <span className="openEye"><img src="/assets/images/icon/eye.svg" alt="password visibile" /></span>
                        </div>
                    </div>
                    {passwordError && <p className='text-danger mt-1 mb-0 text-sm'>{passwordError}</p>}
                </div>
                <div className="col-12 checkbox d-flex align-items-start">
                    <input className="form-check-input" type="checkbox" value="policy" id="policy" />
                    <label className="form-check-label" for="policy">Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.</label>
                </div>
                {success && <div className='col-12'><p className='text-success bg-success bg-opacity-25 p-2 border border-1 border-success text-center m-0'>{success}</p></div>}
                <div className="col-12"><ThemeButton btnType={'submit'} btnFill={true} btnTitle={loding ? 'REGISTER...' : 'REGISTER' } /></div>
            </div>
        </form>
    </>
  )
}

export default Register