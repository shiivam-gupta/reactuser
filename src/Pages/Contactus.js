import { React,useEffect,useState } from "react";
import { useHistory,Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import classNames  from "classnames";
import FlashMessage  from "react-flash-message";

const Contactus = () => {

    const [contact,setContact] = useState({
        name : "",
        email : "",
        subject : "",
        message : "",
        showMessage: false,
        type : ""

    });

    const { register,handleSubmit,errors} = useForm({
        mode:"onTouched"
    });

    const {name,email,subject,message,type} = contact;
    const history = useHistory([]);

    const formSubmit = async (data) => {
        console.log(data)
        document.getElementById("create-course-form").reset();

        //e.preventDefault();
         const result =  await axios.post('http://localhost:3002/contact',data);
         setContact({ 
            name : "",
            email : "",
            subject : "",
            message : "",
            showMessage: false,
            type:"" 
        });
         setContact({ showMessage: true, type:"success" });
         history.push("/contact-us");
    }

    const closeMessage = (e) => {
        setContact({ showMessage: false, type:"" });
    }

    return (
        <div className="container">
            <section className="mb-4">
            <h2 className="h1-responsive font-weight-bold text-center my-4">Contact us</h2>
            <p className="text-center w-responsive mx-auto mb-5">Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within
                a matter of hours to help you.</p>

            <div className="row">
                <div className="col-md-9 mb-md-0 mb-5">
                    <form  onSubmit={ handleSubmit((e) =>formSubmit(e))} id="create-course-form" >     
                        { contact.showMessage &&  
                            <FlashMessage duration={5000}>
                                <div className={`alert alert-${type}`}>
                                    <span className="close"><strong onClick={ e => closeMessage(e)}>X</strong></span>
                                    <p>Your message has been sent successfully.</p>
                                </div>
                            </FlashMessage>
                        }
                        <div className="row">
                            <div className="col-md-6">
                                <div className="md-form mb-0">
                                    <label htmlFor="name" className="">Your Name</label>
                                    <input type="text" id="name" name="name" className={classNames('form-control',{'is-invalid' : errors.name})} ref={register({
                                        required:"Please enter Name.",
                                        minLength:{
                                            value:4,
                                            message:"Name field must be atleast of 4 characters."
                                        }
                                    })} defaultValue = {name}/>
                                    { errors.name && (<div className="text-danger">{errors.name.message}</div>)}
                                    
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="md-form mb-0">
                                    <label htmlFor="email" className="">Your email</label>
                                    <input type="text" id="email" name="email" className={classNames('form-control',{'is-invalid' : errors.email})} ref={register({
                                        required:"Please enter Email.",
                                        pattern:{
                                            value:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message:"Please enter a valid Email format."
                                        }
                                    })} defaultValue = {email}/>
                                    { errors.email && (<div className="text-danger">{errors.email.message}</div>)}
                                    
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="md-form mb-0">
                                    <label htmlFor="subject" className="">Subject</label>
                                    <input type="text" id="subject" name="subject" className={classNames('form-control',{'is-invalid' : errors.subject})} ref={register({
                                        required:"Please enter Subject.",
                                        minLength:{
                                            value:4,
                                            message:"Subject field must be atleast of 4 characters."
                                        }
                                    })} defaultValue = {subject}/>
                                    { errors.subject && (<div className="text-danger">{errors.subject.message}</div>)}
                                </div>
                            </div>
                        </div>

                        <div className="row">

                            <div className="col-md-12">

                                <div className="md-form">
                                    <label htmlFor="message">Your message</label>
                                    <textarea type="text" id="message" name="message" rows="2" className={classNames('form-control md-textarea',{'is-invalid' : errors.message})} ref={register({
                                        required:"Please enter Message.",
                                        minLength:{
                                            value:10,
                                            message:"Message field must be atleast of 10 characters."
                                        }
                                    })}></textarea>
                                    { errors.message && (<div className="text-danger">{errors.message.message}</div>)}
                                </div>

                            </div>
                        </div>
                        <div className="text-center text-md-left pt-3">
                            <button type="submit" className="btn btn-primary">Send</button>
                        </div>
                    </form>

                    
                    <div className="status"></div>
                </div>
                <div className="col-md-3 text-center">
                    <ul className="list-unstyled mb-0">
                        <li><i className="fas fa-map-marker-alt fa-2x"></i>
                            <p>San Francisco, CA 94126, USA</p>
                        </li>

                        <li><i className="fas fa-phone mt-4 fa-2x"></i>
                            <p>+ 01 234 567 89</p>
                        </li>

                        <li><i className="fas fa-envelope mt-4 fa-2x"></i>
                            <p>contact@mdbootstrap.com</p>
                        </li>
                    </ul>
                </div>
            </div>

        </section>
        </div>
    )
}

export default Contactus;