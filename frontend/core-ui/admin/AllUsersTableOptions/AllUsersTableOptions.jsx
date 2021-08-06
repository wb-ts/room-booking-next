import { EditIcon, DeleteIcon } from "@icons/iconsIndex";
import { deleteUser } from "@redux/reducers/admin/adminUserSlice";
import Link from "next/link";
import { useDispatch } from "react-redux";
import styles from "./AllUsersTableOptions.module.scss";

const AllUsersTableOptions = ({ user, heading, last }) => {
  const dispatch = useDispatch();
  const { name, email, role, id } = user;

  const userDelete = (e) => {
    e.preventDefault();
    dispatch(deleteUser(id));
  };

  return (
    <div
      className={
        heading
          ? `${styles.allUsersTableOptions} ${styles.allUsersTableOptions__heading}`
          : `${styles.allUsersTableOptions}`
      }
      style={{
        borderBottom: last && "1px solid black",
        backgroundColor: heading && "rgb(235, 235, 235)",
      }}
    >
      <div className={styles.allUsersTableOptions__sections}>
        <p className={styles.allUsersTableOptions__sections__id}>{id}</p>
      </div>
      <div className={styles.allUsersTableOptions__sections}>
        {heading ? (
          <p
            className={styles.allUsersTableOptions__sections__name}
            style={{ color: "black" }}
          >
            {name}
          </p>
        ) : (
          <p className={styles.allUsersTableOptions__sections__name}>{name}</p>
        )}
      </div>
      <div className={styles.allUsersTableOptions__sections}>
        <p
          className={styles.allUsersTableOptions__sections__email}
          // style={{ textAlign: !heading && "center" }}
        >
          {email}
        </p>
      </div>
      <div className={styles.allUsersTableOptions__sections}>
        <p
          className={styles.allUsersTableOptions__sections__role}
          // style={{ textAlign: !heading && "center" }}
        >
          {role}
        </p>
      </div>

      <div
        className={`${styles.allUsersTableOptions__sections} ${styles.allUsersTableOptions__sections__button}`}
      >
        {heading ? (
          <p className={styles.allUsersTableOptions__sections__actions}>
            Actions
          </p>
        ) : (
          <div className={styles.allUsersTableOptions__sections__actions}>
            <Link passHref href={`/admin/users/${id}`}>
              <p
                className={`${styles.allUsersTableOptions__sections__actions__button} ${styles.allUsersTableOptions__sections__actions__button__edit}`}
              >
                <EditIcon />
              </p>
            </Link>

            <p
              onClick={userDelete}
              className={`${styles.allUsersTableOptions__sections__actions__button} ${styles.allUsersTableOptions__sections__actions__button__delete}`}
            >
              <DeleteIcon />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsersTableOptions;
