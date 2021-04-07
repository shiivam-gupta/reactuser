import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { Router, useRo } from "react-router"
import { Redirect, useHistory, Link, } from "react-router-dom";
import axios from "axios";
import classNames from "classnames";
import FlashMessage from "react-flash-message";

const Login = () => {

    const [loginCondition, setLoginCondition] = useState({
        showMessage: false,
        isLogin: false,
        type: "",
        message: ""
    });
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const history = useHistory([]);
    const { email, password } = user;
    const { register, handleSubmit, errors } = useForm({
        mode: "onTouched"
    })

    const token = localStorage.getItem('token');

    const formSubmit = (data) => {

        setLoginCondition({
            showMessage: false,
            type: "",
            message: ""
        });

        const getRegisteredData = axios.get('http://localhost:3002/admin?email=' + data.email).then((getRegisteredData) => {
            console.log(getRegisteredData.data);
            if (getRegisteredData.data.length > 0) {
                if (data.password !== getRegisteredData.data[0].password) {
                    setLoginCondition({ showMessage: true, type: "error", message: "Invalid Credentials." });
                    return false;
                }
            } else {
                setLoginCondition({ showMessage: true, type: "error", message: "Invalid Credentials." });
                return false;
            }
            console.log(data);
            localStorage.setItem('token', '123456789');
            history.push('/');

        });
    }

    const closeMessage = (e) => {
        setLoginCondition({ showMessage: false, type: "" });
    }

    return (token ? <Redirect to="/"></Redirect> :
        <div className="container">
            <h2>Login </h2>
            <form onSubmit={handleSubmit(e => formSubmit(e))}>
                {loginCondition.showMessage &&
                    <FlashMessage duration={5000}>
                        <div className={`alert alert-${loginCondition.type}`}>
                            <span className="close"><strong onClick={e => closeMessage(e)}>X</strong></span>
                            <p>{loginCondition.message}</p>
                        </div>
                    </FlashMessage>
                }
                <div className="form-group">
                    <label htmlFor="exampleInputEmail">Email</label>
                    <input type="text" className={classNames('form-control', { 'is-invalid': errors.email })} id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email" name="email" dafaultvalue={email} ref={register({
                        required: "Email field is required.",
                        pattern: {
                            value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Please enter a valid Email format."
                        }
                    })} />
                    {errors.email && (<div className="text-danger">{errors.email.message}</div>)}
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword">Password</label>
                    <input type="password" className={classNames('form-control', { 'is-invalid': errors.password })} id="exampleInputPassword" placeholder="Enter Password" name="password" dafaultvalue={password} ref={register({
                        required: "Password field is required.",
                        maxLength: {
                            value: 30,
                            message: 'Password field cannnot be more than 30 characters.'
                        }
                    })} />
                    {errors.password && (<div className="text-danger">{errors.password.message}</div>)}
                </div>

                <button type="submit" className="btn btn-primary mr-2">Submit</button>

                <Link className="btn btn-primary" exact to="/sign-up">Sign Up</Link>

            </form>
        </div>

    )

}

export default Login;