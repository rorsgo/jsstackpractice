import React from "react";
import { Link } from "react-router-dom";
import { Form, Input } from "@rocketseat/unform";
import * as Yup from "yup";

import logo from "../../assets/logo.svg"

export default function SignOut() {

    const schema = Yup.object().shape({
        name: Yup.string().required("Name is a required field"),
        email: Yup.string().email("Type a valid e-mail address")
            .required("Email is a required field"),
        password: Yup.string().min(6, "Passwords must have 6 characteres")
            .required("Password is a required field"),
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Password confirmation is a required field")

    });
    function handleSubmit(data) {
        console.tron.log(data);
    }
    return (
        <>
            <img src={logo} alt="Barber" />
            <Form schema={schema} onSubmit={handleSubmit}>
                <Input name="name" type="text" placeholder="Full name" />
                <Input name="email" type="email" placeholder="Type your e-mail" />
                <Input name="password" type="password" placeholder="Choose a password" />
                <Input name="passwordConfirmation" type="password" placeholder="Confirm the password" />
                <button type="submit">Create Account</button>
                <Link to="/">Already registered? SingIn </Link>
            </Form>
        </>
    )
}