import React from "react";
import { Link } from "react-router-dom";
import { Form, Input } from "@rocketseat/unform";

import logo from "../../assets/logo.svg";

export default function SignIn() {

    function handleSubmit(data) {
        console.tron.log(data)
    }
    
    return (
        <>
            <img src={logo} alt="Barber" />

            <Form onSubmit={handleSubmit}>
                <Input name="email" type="email" placeholder="Type your e-mail" />
                <Input name="password" type="password" placeholder="Type your password" />

                <button type="submit">Access</button>
                <Link to="/register">Create an account</Link>
            </Form>
        </>
    )
}