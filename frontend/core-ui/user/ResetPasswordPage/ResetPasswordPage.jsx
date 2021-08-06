import { FormLayout } from "@components/componentsIndex";
import { SubmitButton, FormInput } from "@components/componentsIndex";
import {
  clearPassword,
  getPassword,
  resetPassword,
} from "@redux/reducers/user/passwordSlice";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styles from "./ResetPasswordPage.module.scss";

const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { status, message, error } = useSelector(getPassword());

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearPassword());
      setPassword("");
      setConfirmPassword("");
    }

    if (status === "success") {
      toast.success(message);
      router.push("/login");
      dispatch(clearPassword());
    }
  }, [dispatch, error, status, router, message]);
  const resetPasswordHandler = (e) => {
    e.preventDefault();
    const passwords = { password, confirmPassword };
    const { token } = router?.query;
    dispatch(resetPassword({ token, passwords }));
  };

  return (
    <FormLayout header="Reset Password" onSubmit={resetPasswordHandler}>
      <FormInput
        type="password"
        value={password}
        setValue={setPassword}
        label="New Password"
      />
      <FormInput
        type="password"
        value={confirmPassword}
        setValue={setConfirmPassword}
        label="Confirm Password"
      />

      <SubmitButton
        text="Reset Password"
        disabled={status === "loading" ? true : false}
      />
    </FormLayout>
  );
};

export default ResetPasswordPage;
