import { selectAllUsers } from "@redux/reducers/admin/allUsersSlice";
import { useSelector } from "react-redux";
import AllUsersTable from "../AllUsersTable/AllUsersTable";
import styles from "./AllUsersPage.module.scss";

const AllUsersPage = () => {
  const { users } = useSelector(selectAllUsers());
  return (
    <div className={styles.allUsersPage}>
      <div className={styles.allUsersPage__top}>
        <h1 className={styles.allUsersPage__top__heading}>All Users</h1>
      </div>
      <AllUsersTable users={users} />
    </div>
  );
};

export default AllUsersPage;
