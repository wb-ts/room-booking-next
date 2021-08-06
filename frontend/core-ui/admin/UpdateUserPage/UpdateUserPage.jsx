import {
  FormLayout,
  SubmitButton,
  FormInput,
  FormDropdown,
} from "@components/componentsIndex";
import {
  clearAdminUser,
  selectAdminUser,
  updateUserProfile,
} from "@redux/reducers/admin/adminUserSlice";
import {
  clearSingleUser,
  selectSingleUser,
} from "@redux/reducers/admin/singleUserSlice";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styles from "./UpdateUserPage.module.scss";

const UpdateUser = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user, error } = useSelector(selectSingleUser());
  const {
    success,
    status,
    error: updateError,
  } = useSelector(selectAdminUser());

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [role, setRole] = useState(user?.role);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearSingleUser());
    }
    if (updateError) {
      toast.error(error);
      dispatch(clearAdminUser());
    }
    if (success) {
      toast.success("User Updated");
      dispatch(clearAdminUser());
      router.push("/admin/users");
    }
  }, [dispatch, error, updateError, router, success]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const userData = { name, email, role };
    dispatch(updateUserProfile({ userData, id: user._id }));
  };

  return (
    <FormLayout header="User Profile Update" onSubmit={handleUpdate}>
      <FormInput
        type="text"
        name="name"
        value={name}
        setValue={setName}
        label="Full Name"
      />
      <FormInput
        type="email"
        name="email"
        value={email}
        setValue={setEmail}
        label="Email"
      />

      <FormDropdown
        dropdownList={["user", "admin"]}
        label="Select Role"
        value={role}
        name="role"
        setValue={setRole}
      />

      <SubmitButton
        text="Update"
        disabled={status === "loading" ? true : false}
      />
    </FormLayout>
  );
};

export default UpdateUser;
