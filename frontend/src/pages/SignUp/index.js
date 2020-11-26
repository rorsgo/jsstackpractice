import React from "react";
import { Link } from "react-router-dom";
import { Form, Input } from "@rocketseat/unform";

import logo from "../../assets/logo.svg"

export default function SignOut() {

    function handleSubmit(data) {
        console.tron.log(data);
    }
    return (
        <>
            <img src={logo} alt="Barber" />
            <Form onSubmit={handleSubmit}>
                <Input name="name" type="text" placeholder="Full name" />
                <Input name="email" type="email" placeholder="Type your e-mail" />
                <Input name="password" type="password" placeholder="Choose a password" />
                <button type="submit">Create Account</button>
                <Link to="/">Already registered? SingIn </Link>
            </Form>
        </>
    )
}