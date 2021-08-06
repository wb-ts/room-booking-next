import {
  FormLayout,
  FormImage,
  SubmitButton,
  FormInput,
} from "@components/componentsIndex";
import { getUser } from "@redux/reducers/user/loadUserSlice";
import {
  updateProfile,
  updateUser,
  resetProfile,
} from "@redux/reducers/user/profileSlice";

import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styles from "./UpdateProfilePage.module.scss";

const UpdateProfilePage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState("");
  const { name, email, password } = userData;
  const { status: userStatus, user } = useSelector(getUser());
  const { error, isUpdated, status } = useSelector(updateUser());
  const [avatarPreview, setAvatarPreview] = useState("/images/avatar.png");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const { name, email, avatar } = user;
      setUserData({ name, email });
      setAvatarPreview(avatar.url);
    }
    if (error) {
      toast.error(error.message);
      dispatch(resetProfile());
      setLoading(false);
    }

    if (isUpdated) {
      dispatch(resetProfile());
      router.push("/");
    }
  }, [dispatch, error, user, isUpdated, router]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const userInfo = { name, email, password, avatar };
    dispatch(updateProfile(userInfo));
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
    } else setUserData({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <FormLayout header=" Profile Update" onSubmit={handleUpdate}>
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
      <SubmitButton
        text="Update"
        disabled={status === "loading" ? true : false}
      />
    </FormLayout>
  );
};

export default UpdateProfilePage;
