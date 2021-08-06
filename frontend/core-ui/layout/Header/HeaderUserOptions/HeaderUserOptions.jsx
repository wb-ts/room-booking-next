import { getUser } from "@redux/reducers/user/loadUserSlice";
import { signOut } from "next-auth/client";
import Link from "next/link";
import { useSelector } from "react-redux";
import styles from "./HeaderUserOptions.module.scss";

const HeaderUserOptions = () => {
  const { user } = useSelector(getUser());

  const logOutHandler = () => {
    signOut();
  };
  return (
    <div className={styles.headerUserOptions}>
      {user?.role.toLowerCase() === "admin" && (
        <>
          <Link passHref href="/admin/bookings">
            <h5 className={styles.headerUserOptions__title}>All Bookings</h5>
          </Link>
          <Link passHref href="/admin/rooms">
            <h5 className={styles.headerUserOptions__title}>All Rooms</h5>
          </Link>
          <Link passHref href="/admin/reviews">
            <h5 className={styles.headerUserOptions__title}>All Reviews</h5>
          </Link>
          <Link passHref href="/admin/users">
            <h5 className={styles.headerUserOptions__title}>All Users</h5>
          </Link>
          <div
            style={{
              width: "100%",
              height: ".5px",
              backgroundColor: "black",
            }}
          />
        </>
      )}
      <Link passHref href="/me/bookings">
        <h5 className={styles.headerUserOptions__title}>My Bookings</h5>
      </Link>
      <Link passHref href="/me/update">
        <h5 className={styles.headerUserOptions__title}>Profile</h5>
      </Link>

      <Link passHref href="/">
        <h5
          style={{ color: "red" }}
          className={styles.headerUserOptions__title}
          onClick={logOutHandler}
        >
          Logout
        </h5>
      </Link>
    </div>
  );
};

export default HeaderUserOptions;
