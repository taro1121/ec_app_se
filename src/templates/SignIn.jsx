import React, {useCallback, useState} from 'react';
import {TextInput, PrimaryButton} from "../components/UIkit";
import {signIn} from "../reducks/users/operations";
import {useDispatch} from "react-redux";
import {push} from 'connected-react-router';

const SignIn = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState(""),
        [password, setPassword] = useState("");

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    }, [setEmail]);

    const inputPassword = useCallback((event) => {
        setPassword(event.target.value)
    }, [setPassword]);


        return (
        <div className="c-section-container">
            <h2 className="u-text__headline u-text-center">Sign In</h2>
            <div className="module-spacer--medium" />

            <TextInput
                fullWidth={true} label={"Mail address"} multiline={false} required={true}
                rows={1} value={email} type={"email"} onChange={inputEmail}
            />
            <TextInput
                fullWidth={true} label={"Password"} multiline={false} required={true}
                rows={1} value={password} type={"password"} onChange={inputPassword}
            />

            <div className="module-spacer--medium" />
            <div className="center">
                <PrimaryButton
                    label={"Sign In"}
                    onClick={() => dispatch(signIn(email, password))}
                />
                <div className="module-spacer--medium" />
                <p onClick={() => dispatch(push('/signup'))}>Those who do not have an account</p>
                <p onClick={() => dispatch(push('/signin/reset'))}>Those who forgot password</p>

            </div>
        </div>
    )
}

export default SignIn