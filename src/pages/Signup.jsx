import React, { useState } from 'react'
import { Link } from 'react-router'
import Register from '../Components/Register'
import { Login } from '../Components/Login'

const Signup = () => {

    const [tab, setTab] = useState(0)

    const tabing = [
        {tabName :  'Sign Up', tabData : <Register/>},
        {tabName :  'Sign In', tabData : <Login/>},
    ]

  return (
    <>
    <section className="signUpsection m-0">
        <div className="container innerfluid h-100">
            <div className="row h-100 align-items-center justify-content-center">
                <div className="col-xxl-5 col-xl-6 col-lg-7 col-md-8 col-sm-10 col-12">
                    <div className="card formcard">
                        <div className="card-body">
                            {
                                tabing ? 
                                    <div className="innerformbody" id="loginGroup">
                                        <ul className="nav nav-pills row mb-4" id="pills-tab" role="tablist">
                                            {
                                                tabing.map((item, i) => 
                                                    <li key={i} className="nav-item col-6" role="presentation"><button onClick={() => setTab(i)} className={`${tab === i ? 'active' : ''} nav-link`}>{item.tabName}</button></li>
                                                )
                                            }
                                        </ul>
                                        <div className="tab-content" id="pills-tabContent">
                                            {
                                                tabing.map ((item, i) =>
                                                <div key={i} className={`${tab === i ? "active show" : ''} tab-pane fade`}>
                                                    {item.tabData}
                                                </div>
                                                )
                                            }
                                        </div>
                                    </div> : ''
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default Signup