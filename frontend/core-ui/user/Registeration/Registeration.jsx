import { FormLayout } from "@components/componentsIndex";
import {
  SubmitButton,
  FormInput,
  FormImage,
} from "@components/componentsIndex";
import {
  clearRegisterUser,
  registerUser,
  selectRegisterUser,
} from "@redux/reducers/user/registerSlice";
import { selectAdminReview } from "@redux/reducers/admin/adminReviewSlice";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styles from "./Registeration.module.scss";

const Registeration = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/avatar.png");

  const { name, email, password } = user;
  const { success, status, error } = useSelector(selectRegisterUser());

  useEffect(() => {
    if (success) {
      toast.success("Registration Successfull");
      dispatch(clearRegisterUser());
      router.push("/login");
    }
    if (error) {
      toast.error(error.message);
      dispatch(clearRegisterUser());
    }
  }, [dispatch, error, success, router]);

  const handleRegister = (e) => {
    e.preventDefault();

    if (name === "") return toast.warn("Enter your full name");
    if (email === "") return toast.warn("Enter email");
    if (password === "") return toast.warn("Enter password");

    const userData = { name, email, password, avatar };
    dispatch(registerUser(userData));
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const profile = new FileReader();
      profile.onload = () => {
        if (profile.readyState === 2) {
          setAvatar(profile.result);
          setAvatarPreview(profile.result);
        }
      };
      profile.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const footer = (
    <p className={styles.registeration__login}>
      Already have an account?{" "}
      <Link passHref href="/login">
        <b className={styles.registeration__login__button}>Login</b>
      </Link>
    </p>
  );

  return (
    <FormLayout
      header="Get Started Now"
      subHeader="Book best hotel at your favourite destinations."
      onSubmit={handleRegister}
      footer={footer}
    >
      <FormInput
        type="text"
        name="name"
        value={name}
        onChange={onChange}
        label="Full Name"
      />
      <FormInput
        type="email"
        name="email"
        value={email}
        onChange={onChange}
        label="Email"
      />
      <FormInput
        type="password"
        name="password"
        value={password}
        onChange={onChange}
        label="Password"
      />
      <FormImage
        name="avatar"
        src={avatarPreview}
        type="file"
        label="Avatar"
        onChange={onChange}
      />
      <SubmitButton text="Register" disabled={status === "loading"} />
    </FormLayout>
  );
};

export default Registeration;
