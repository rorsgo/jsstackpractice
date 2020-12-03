import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Input } from "@rocketseat/unform";
import * as Yup from "yup";

import logo from "../../assets/logo.svg";
import { signInRequest } from "../../store/modules/auth/actions";

const schema = Yup.object().shape({
    email: Yup.string().email("Type a valid e-mail address").required("E-mail is a required field"),
    password: Yup.string().required("Password is a required field")
});

export default function SignIn() {
    const dispatch = useDispatch();

    function handleSubmit({ email, password }) {
        dispatch(signInRequest(email, password));
    }
    
    return (
        <>
            <img src={logo} alt="React Barber" />

            <Form schema={schema} onSubmit={handleSubmit}>
                <Input name="email" type="email" placeholder="Type your e-mail" />
                <Input name="password" type="password" placeholder="Type your password" />

                <button type="submit">Access</button>
                <Link to="/register">Create an account</Link>
            </Form>
        </>
    )
}