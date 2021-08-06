import { useState } from "react";
import { signIn } from "next-auth/client";
import styles from "./LoginPage.module.scss";
import { toast } from "react-toastify";
import { SubmitButton, FormInput } from "@components/componentsIndex";
import Link from "next/link";
import { FormLayout } from "@components/componentsIndex";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();

    if (email === "") return toast.warn("Enter email");
    if (password === "") return toast.warn("Enter password");

    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result.error) {
      setLoading(false);
      return toast.error(result.error);
    }
    window.location.href = "/";
  };

  const footer = (
    <>
      <p className={styles.login__register}>
        {`Don't`} have an account?{" "}
        <Link passHref href="/register">
          <b className={styles.login__register__button}>Register Now</b>
        </Link>
      </p>
      <p className={styles.login__register}>
        <Link passHref href="/password/forgot">
          <b className={styles.login__register__button}>Forgot Password?</b>
        </Link>
      </p>
    </>
  );

  return (
    <FormLayout
      header="Get Started Now"
      subHeader="Book best hotel at your favourite destinations."
      onSubmit={loginHandler}
      footer={footer}
    >
      <FormInput type="email" value={email} setValue={setEmail} label="Email" />
      <FormInput
        type="password"
        value={password}
        setValue={setPassword}
        label="Password"
      />
      <SubmitButton text="Login" disabled={loading} />
    </FormLayout>
  );
};

export default LoginPage;
