import { SubmitButton, FormInput, Loader } from "@components/componentsIndex";
import {
  clearAdminUser,
  selectAdminUser,
} from "@redux/reducers/admin/adminUserSlice";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AllUsersTableOptions from "../AllUsersTableOptions/AllUsersTableOptions";
import styles from "./AllUsersTable.module.scss";

const AllUsersTable = ({ users }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showFilteredData, setShowFilteredData] = useState(false);
  const [filter, setFilter] = useState([]);

  const { success, error, status } = useSelector(selectAdminUser());

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAdminUser());
    }
    if (success) {
      toast.success("User Deleted Successfully..");
      dispatch(clearAdminUser());
      router.push("/admin/users");
    }
    if (search === "") setShowFilteredData(false);
  }, [dispatch, search, error, success, router]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search === "") return toast.warn("Enter user Id");

    const result = await users.filter((user) => user._id === search);
    if (!result) return toast.error("No room data available");
    setFilter(result);
    setShowFilteredData(true);
  };

  return (
    <div className={styles.allUsersTable}>
      {status === "loading" && <Loader />}
      <div className={styles.allUsersTable__top}>
        <form
          className={styles.allUsersTable__top__search}
          onSubmit={handleSearch}
        >
          <FormInput
            type="text"
            name="userId"
            value={search}
            setValue={setSearch}
            placeholder="Enter User id"
          />
          <SubmitButton text="Search" off={search === ""} />
        </form>
      </div>
      <div className={styles.allUsersTable__mid}>
        <div className={styles.allUsersTable__mid__heading}>
          <AllUsersTableOptions
            key="headingcontent"
            user={{
              id: "ID",
              name: "Name",
              email: "Email",
              role: "Role",
            }}
            heading
            last={
              filter.length === 0 && showFilteredData === true ? true : false
            }
          />
        </div>
        {showFilteredData
          ? filter.map((user, i) => (
              <AllUsersTableOptions
                key={user._id + 1}
                user={{
                  id: user._id,
                  name: user.name,
                  email: user.email,
                  role: user.role,
                }}
                last={filter.length - 1 === i ? true : false}
              />
            ))
          : users?.map((user, i) => (
              <AllUsersTableOptions
                key={user._id + 1}
                user={{
                  id: user._id,
                  name: user.name,
                  email: user.email,
                  role: user.role,
                }}
                last={users.length - 1 === i ? true : false}
              />
            ))}
      </div>
      {/* <div className={styles.allUsersTable__bottom}></div> */}
    </div>
  );
};

export default AllUsersTable;
