import { useRef } from "react";
import FormInput from "../UI/FormInput";
import CustomButton from "../UI/CustomButton";
import classes from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const SignUp = () => {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            alert("Passwords do not match");
            return;
        }

        const body = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        };
        const fetchData = async () => {
            try {
                const response = await axios.post("http://localhost:5000/user/signup", body);
                alert(response.data.message);
                navigate("/signin");
            } catch (error) {
                console.log(error);
                const error_msg = error.response.data.message;
                alert(error_msg);
            }
        };
        fetchData();
    };

    return (
        <div className={classes.center}>
            <div className={classes.sign_up}>
                <h1>SIGN UP</h1>
                <form onSubmit={handleSubmit}>
                    <FormInput
                        name="displayName"
                        type="text"
                        label="Display Name"
                        Ref={nameRef}
                        required
                    />
                    <FormInput
                        name="email"
                        type="email"
                        label="Email"
                        Ref={emailRef}
                        required
                    />
                    <FormInput
                        name="password"
                        type="password"
                        label="Password"
                        Ref={passwordRef}
                        required
                    />
                    <FormInput
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        Ref={confirmPasswordRef}
                        required
                    />
                    <CustomButton type="submit">Sign up</CustomButton>
                </form>
                <p>Already have an account ? <Link to="/signin" className={classes.link}>Sign in</Link></p>
            </div>
        </div>

    );
}

export default SignUp;