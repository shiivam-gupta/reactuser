import { React, useEffect, useState } from "react";
import { useForm,useFieldArray } from "react-hook-form";
import classNames  from "classnames";
import FlashMessage  from "react-flash-message";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const UserInfo = (prop) => {

    const {register,control,errors,getValues,classNames} = prop;
    const {append,fields,remove} = useFieldArray({
        name:'client',
        control
    });
    const [state,setState] = useState([]);
    useEffect(async() => {
        const getStates =  await axios.get('http://localhost:3002/states');
        setState(getStates.data)
    },[])


    return(
        <div className="card mb-2">
            <div className="card-header">Add Client Information <button type="button" className="btn btn-primary ml-5" onClick={() => append({client_first_nameclient_first_name:'',client_last_name:"",client_email:"",client_state:""})}>Add Client</button></div>
            <div className="card-body">
                {fields.map((item,index) => (
                    <div className="form-row form-group" key={item.id}>
                        <div className="col">
                            <input type="text" className={classNames('form-control',{'is-invalid': (errors.client && errors.client[index] && errors.client[index].client_first_name) })} name={`client[${index}].client_first_name`} placeholder="Enter Client First name" ref={register(
                                {
                                    required:'Client First Name field is required.',
                                    maxLength:{
                                        value: 30,
                                        message:'Client First Name field cannnot be more than 30 characters.'
                                    }
                                }
                            )} defaultValue=''/>
                            {errors.client && errors.client[index] && errors.client[index].client_first_name && (<div className="text-danger">{errors.client[index].client_first_name.message}</div>)}
                            
                        </div>
                        <div className="col">
                            <input type="text" className={classNames('form-control',{'is-invalid': (errors.client && errors.client[index] && errors.client[index].client_last_name) })} name={`client[${index}].client_last_name`} placeholder="Enter Client Last name" ref={register(
                                {
                                    required:'Client Last Name field is required.',
                                    maxLength:{
                                        value: 30,
                                        message:'Client Last Name field cannnot be more than 30 characters.'
                                    }
                                }
                            )} defaultValue=''/>
                            {errors.client && errors.client[index] && errors.client[index].client_last_name && (<div className="text-danger">{errors.client[index].client_last_name.message}</div>)}
                        </div>
                        
                        <div className="col">
                            <input type="text" className={classNames('form-control',{'is-invalid': (errors.client && errors.client[index] && errors.client[index].client_email) })} name={`client[${index}].client_email`} placeholder="Enter Client E-mail Address" ref={register(
                                {
                                    required:'Client Email field is required.',
                                    pattern:{
                                        value:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message:"Please enter a valid Client Email format."
                                    },
                                    // validate: value => value !== getValues('email') && value !== getValues('email') || 'Email already taken.',

                                }
                                    
                            )} defaultValue=''/>
                            {errors.client && errors.client[index] && errors.client[index].client_email && (<div className="text-danger">{errors.client[index].client_email.message}</div>)}
                            
                        </div>
                        <div className="col">
                            <select  className={classNames('form-control',{'is-invalid': (errors.client && errors.client[index] && errors.client[index].client_state) })} id="state" name={`client[${index}].client_state`} defaultValue='' ref={register(
                                {
                                    required:'Client State field is required.',
                                    
                                }
                            )}>
                                <option value="">Select Client State</option>
                                {state.map((value,index)=>(
                                    <option value={value.name} key={value.id}>{value.name}</option>
                                ))}
                            </select>
                            
                            {errors.client && errors.client[index] && errors.client[index].client_state && (<div className="text-danger">{errors.client[index].client_state.message}</div>)}
                            
                        </div>
                        <div className="col">
                            <button type="button" className="btn btn-danger" onClick={() => remove(index)}>Delete</button>
                        </div>
                    </div>
                ))}
                
            </div>
        </div>
    
  )
}

const Signup = () => {
    const {register,handleSubmit,errors,getValues,control} = useForm();
    const history = useHistory([]);
    const [signup,SetSignup] = useState({
        first_name : "",
        last_name : "",
        email:"",
        password: "",
        confirm_password: "",
        term_of_use : "",
    })

    const [signUpCondition,setSignUpCondition] = useState({
        showMessage: false,
        type:"",
        message:""
    });

    // console.log(errors);
    const submitForm = async(data) => {
        let map = {};
        let clientEmail = [];
        let result = false;

        setSignUpCondition({ 
            showMessage: false,
            type:"",
            message:""
        });

        if(data.client){
            for(let i = 0; i < data.client.length; i++) {
                // check if object contains entry with this element as key
                if(map[data.client[i].client_email]) {
                    result = true;
                    // terminate the loop
                    break;
                }
                // add entry in object with the element as key
                map[data.client[i].client_email] = true;
                //clientEmail[i] = data.client[i].client_email;
                clientEmail.push(data.client[i].client_email)
            }
        }

        if(result || (clientEmail.indexOf(data.email) > -1) ){
            setSignUpCondition({ showMessage: true, type:"error",message:"Duplicate Email found." });
            return false;
        } else {
            const getRegisteredData =  await axios.get('http://localhost:3002/admin?email='+data.email);
            if(getRegisteredData.data){
                setSignUpCondition({ showMessage: true, type:"error",message:data.email+ " email already taken." });
                return false;
            }

            setSignUpCondition({ showMessage: true, type:"success",message:"You have been successfully registered." });
        }

        const response =  await axios.post('http://localhost:3002/admin',data);
        document.getElementById("create-signup-form").reset();
        SetSignup({ 
            first_name : "",
            last_name : "",
            email:"",
            password: "",
            confirm_password: "",
            term_of_use : "", 
        });
        history.push("/sign-up");
    }

    const closeMessage = (e) => {
        setSignUpCondition({ showMessage: false, type:"" });
    }
    return (
        <div className="container">
            {/* <div className="signup-form"> */}
            <div className="">
                <form onSubmit={handleSubmit((e) => { submitForm(e)})} method="post" id="create-signup-form">
                { signUpCondition.showMessage &&  
                    <FlashMessage >
                        <div className={`alert alert-${signUpCondition.type}`}>
                            <span className="close"><strong onClick={ e => closeMessage(e)}>X</strong></span>
                            <p>{signUpCondition.message}</p>
                        </div>
                    </FlashMessage>
                }
                    <h2>Sign Up</h2>
                    <p>Please fill in this form to create an account!</p>
                    <hr/>
                    <div className="form-group">
                        <div className="row">
                            <div className="col">
                                <input type="text" className={classNames('form-control',{'is-invalid': errors.first_name })} name="first_name" placeholder="First Name" ref={register({
                                    required:"First Name field is required.",
                                    maxLength:{
                                        value: 30,
                                        message:'First Name field cannnot be more than 30 characters.'
                                    }

                                })}/>
                                {errors.first_name && (<div className="text-danger">{errors.first_name.message}</div>)}
                            </div>
                            <div className="col">
                                <input type="text" className={classNames('form-control',{'is-invalid': errors.last_name })} name="last_name" placeholder="Last Name" ref={register({
                                    required:"Last Name field is required.",
                                    maxLength:{
                                        value: 30,
                                        message:'Last Name field cannnot be more than 30 characters.'
                                    }
                                })}/>
                                {errors.last_name && (<div className="text-danger">{errors.last_name.message}</div>)}
                            </div>
                        </div>        	
                    </div>
                    <div className="form-group">
                        <input type="email" className={classNames('form-control',{'is-invalid': errors.email })} name="email" placeholder="Email" ref={register({
                            required:"Email field is required.",
                            pattern:{
                                value:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message:"Please enter a valid Email format."
                            }

                        })}/>
                        {errors.email && (<div className="text-danger">{errors.email.message}</div>)}
                    </div>
                    <div className="form-group">
                        <input type="password" className={classNames('form-control',{'is-invalid': errors.password })} name="password" placeholder="Password" ref={register({
                            required:"Password field is required.",
                            maxLength:{
                                value: 30,
                                message:'Password field cannnot be more than 30 characters.'
                            },
                            minLength:{
                                value:4,
                                message:"Password field must be atleast of 4 characters."
                            }
                        })}/>
                        {errors.password && (<div className="text-danger">{errors.password.message}</div>)}
                    </div>
                    <div className="form-group">
                        <input type="password" className={classNames('form-control',{'is-invalid': errors.confirm_password })} data={getValues('password')} name="confirm_password" placeholder="Confirm Password" ref={register({
                            required:"Confirm Password field is required.",
                            validate: value => value === getValues('password') || 'Confirm Password does not match with Password field.'
                        })}/>
                        {errors.confirm_password && (<div className="text-danger">{errors.confirm_password.message}</div>)}
                    </div>        
                    <div className="form-group">
                        <label className={classNames('form-check-label',{'is-invalid': errors.term_of_use })} >
                            <input type="checkbox" name="term_of_use" ref={register({
                            required:"Term Of Use field is required."
                        })}/> 
                        I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a></label>
                        {errors.term_of_use && (<div className="text-danger">{errors.term_of_use.message}</div>)}
                    </div>
                    <UserInfo register={register} control={control} errors={errors} getValues={getValues}classNames={classNames}/>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-lg">Sign Up</button>
                    </div>
                    
                </form>
                <div className="hint-text">Already have an account? <Link to="/login">Login here</Link></div>
            </div>
        </div>
    );
}

export default Signup;