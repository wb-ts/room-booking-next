import Image from "next/image";
import Link from "next/link";
import SearchIcon from "@material-ui/icons/Search";
import styles from "./Header.module.scss";
import { Button } from "@components/componentsIndex";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import HeaderUserOptions from "./HeaderUserOptions/HeaderUserOptions";
import { loadUser, getUser } from "@redux/reducers/user/loadUserSlice";
import { toast } from "react-toastify";
import Close from "@material-ui/icons/Close";
import { FormDropdown } from "@components/componentsIndex";

const Header = () => {
  const dispatch = useDispatch();
  const [userOption, setUserOption] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [city, setCity] = useState("");
  const { user, status } = useSelector(getUser());

  useEffect(() => {
    if (!user) dispatch(loadUser());
  }, [dispatch, user]);
  const handleSearch = (e) => {
    e.preventDefault();
    if (city === "") return toast.error("Please enter city name.");
    window.location.href = `/?location=${city}`;
  };

  return (
    <nav className={styles.header}>
      <div className={styles.header__logo}>
        <Link passHref href="/">
          <p className={styles.header__logo__title}>MyBnB</p>

          {/* <Image src alt='mybnb_logo'/> */}
        </Link>
      </div>
      <div className={styles.header__left}>Left</div>
      <div className={styles.header__mid}>
        <div
          className={styles.header__mid__search}
          onClick={() => setShowSearch(true)}
          style={{ visibility: showSearch ? "hidden" : "visible" }}
        >
          <p className={styles.header__mid__search__placeholder}>
            Search Rooms
          </p>
          <div className={styles.header__mid__search__icon}>
            <SearchIcon />
          </div>
        </div>

        {showSearch && (
          <form
            onSubmit={handleSearch}
            className={styles.header__mid__search__box}
          >
            <div className={styles.header__mid__search__box__top}>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
                className={styles.header__mid__search__box__top__input}
              />
              <button className={styles.header__mid__search__icon}>
                <SearchIcon />
              </button>
              <div onClick={() => setShowSearch(false)}>
                <Close />
              </div>
            </div>
            {/* <div className={styles.header__mid__search__box__filters}>
              <FormDropdown />
            </div> */}
          </form>
        )}
      </div>
      <div className={styles.header__right}>
        {user ? (
          <div
            className={styles.header__right__user}
            onClick={() => setUserOption((opt) => !opt)}
          >
            <p className={styles.header__right__user__name}>{user.name}</p>
            <div className={styles.header__right__user__photo}>
              <Image
                layout="fixed"
                width={40}
                height={40}
                src={user.avatar.url}
                alt={user.avatar.public_id}
              />
            </div>
            {userOption && <HeaderUserOptions />}
          </div>
        ) : (
          (!status || status === "failed") && (
            <Button text="Login" page="login" />
          )
        )}
      </div>
    </nav>
  );
};

export default Header;
