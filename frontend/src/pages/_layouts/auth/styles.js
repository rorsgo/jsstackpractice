import styled from "styled-components";
import { darken } from "polished";

export const Wrapper = styled.div`
    height: 100%;
    background: linear-gradient(-90deg, #221920, #09102F);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Content = styled.div`
    width: 100%;
    max-width: 315px;
    text-align: center;

    form {
        display: flex;
        flex-direction: column;
        margin-top: 30px;
    }

    input {
        background: rgba(0, 0, 0, 0.1);
        border: 0;
        border-radius: 4px;
        height: 40px;
        padding: 0 15px;
        color: #FFF;
        margin: 0 0 30px;

        &::placeholder {
        color: rgba(255, 255, 255, 0.7);
        }
    }

    button {
        height: 40px;
        border: none;
        border-radius: 10px;
        font-weight: bold;
        font-size: 16px;
        background: rgba(255, 255, 255, 0.8);
        transition: background 0.2s;

        &:hover {
            background: ${darken(0.1, "rgba(255, 255, 255, 0.7)")}
        }
    }

    a {
        margin-top: 20px;
        font-size: 16px;
        color: rgba(255, 255, 255, 0.7);
        transition: color 0.1s;

        &:hover {
            color: ${darken(0.3, "rgba(255, 255, 255, 0.7)")}
        }
    }
`;