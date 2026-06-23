import React from 'react'
import BreadCrumb from '../GlobelComponent/BreadCrumb';
import SectionHeading from '../GlobelComponent/SectionHeading';
import ThemeButton from '../GlobelComponent/ThemeButton';

const ContactUs = () => {

const contactInfo = [
  {
    title: "Our Main Office",
    subHeading: "29 SE 2nd Ave, Miami, Florida 33131, United States",
    contactImg: "location",
  },
  {
    title: "Phone Number",
    subHeading: "1200-425-1900",
    subHeading2: "1200-1800-1500 (Toll free)",
    contactImg: "call",
  },
  {
    title: "Fax",
    subHeading: "1-234-567-8900",
    contactImg: "fax",
  },
  {
    title: "Email Address",
    subHeading: "info@example.com",
    contactImg: "mail",
  }
];

const mapLink = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.907162940387!2d-80.19265112393954!3d25.77362980811082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b69dccef6d8f%3A0x53004b4cc7b92d70!2s29%20SE%202nd%20Ave%2C%20Miami%2C%20FL%2033131%2C%20USA!5e0!3m2!1sen!2sin!4v1703158464608!5m2!1sen!2sin'


  return (
     <>
      <BreadCrumb/>
      <section className="contactUs_page">
        <div className="container innerfluid">
            <div className="row mb-5">
                {/* <div className="col-12"><div className="heading">Contact Us <span>Keep In Touch with Us</span></div></div> */}
                <div className="col-12">
                  <SectionHeading mianHeading={'Contact Us'} subHeading={'Keep In Touch with Us'}/>
                </div>
                <div className="col-12 mx-auto">
                    <div className="card border-0">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12"><p className="loremText m-0 text-center">Our Customer Care team are available for support Monday - Friday from 9am to 5pm GMT. Alternatively, look to our FAQs page for answers to common queries.</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row contactForm row-gap-4">
                <div className="col-lg-4">
                    <div className="row row-gap-3">
                      {
                        contactInfo.map((item, index) =>
                          <div className="col-12" key={index}>
                              <div className="card">
                                  <div className="card-body p-4">
                                      <div className="d-flex iconcard">
                                          <div className="iconImg"><img src={`assets/images/icon/${item.contactImg}.svg`} alt={item.title}/></div>
                                          <div className="content">
                                              <h5 className="contact_heading">{item.title}</h5>
                                              <p className="text">{item.subHeading}  {item.subHeading2 ? <><br /> {item.subHeading2}</> : ''}</p>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                        )
                      }
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="custom-form card p-4 p-lg-5">
                        <form name="myForm" action="#!">
                            <div className="row row-gap-lg-4 row-gap-3">
                                <div className="col-lg-12 mb-2">
                                    <div className="text-center">
                                        <h3 className="text-capitalize">Get In Touch with us for more Information</h3>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-floating">
                                        <input name="nameInput" id="nameInput" type="text" className="form-control" placeholder="Enter name"/>
                                        <label for="nameInput">Name</label>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-floating">
                                        <input name="emailInput" id="emailInput" type="email" className="form-control" placeholder="Enter email"/>
                                        <label for="emailInput">Email</label>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="subjectInput" placeholder="Enter Subject.."/>
                                        <label for="subjectInput">Subject</label>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="">
                                        <textarea name="" id="floatingInput3" placeholder="Message" className="form-control textarea w-100" cols="30" rows="5"></textarea>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="text-end mt-2">
                                      <ThemeButton btnTitle='Send Message' btnType={'button'} btnFill={'true'} />
                                        {/* <button type="submit" id="submit" name="submit" className="btn themebtn fill">Send Message <span><img src="assets/images/icon/right_arrow.svg" alt="arrow"/></span></button> */}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className="map">
        <div className="container">
            <div className="row">
                <div className="col-12">
                  <iframe src={mapLink} frameborder="0" width={'100%'} height={'450'} loading='lazy'></iframe>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default ContactUs