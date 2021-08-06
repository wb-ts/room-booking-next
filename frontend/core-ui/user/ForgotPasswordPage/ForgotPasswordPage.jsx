import { FormInput, SubmitButton } from "@components/componentsIndex";
import { useEffect, useState } from "react";
import {
  clearPassword,
  forgotPassword,
  getPassword,
} from "@redux/reducers/user/passwordSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ForgotPasswordPage.module.scss";
import { toast } from "react-toastify";
import { FormLayout } from "@components/componentsIndex";
const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const { status, message, error } = useSelector(getPassword());

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearPassword());
    }

    if (message) {
      toast.success(message);
      dispatch(clearPassword());
    }
  }, [dispatch, error, message]);
  const sendMailHandler = (e) => {
    e.preventDefault();
    const userData = { email };
    dispatch(forgotPassword(userData));
  };
  return (
    <FormLayout
      header="Forgot Password"
      subHeader="Enter email associated with your account."
      onSubmit={sendMailHandler}
    >
      <FormInput type="email" value={email} setValue={setEmail} label="Email" />

      <SubmitButton
        text="Send Mail"
        disabled={status === "loading" ? true : false}
      />
    </FormLayout>
  );
};

export default ForgotPasswordPage;
