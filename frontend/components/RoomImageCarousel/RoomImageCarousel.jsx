import {
  FiberManualRecordIcon,
  NavigationRoundedIcon,
} from "@icons/iconsIndex";
import Image from "next/image";
import { useState } from "react";
import styles from "./RoomImageCarousel.module.scss";

const RoomImageCarousel = ({ images }) => {
  const [imageNo, setImageNo] = useState(0);
  return (
    <div className={styles.roomImageCarousel}>
      <div
        style={{ display: images.length <= 1 && "none" }}
        className={`${styles.roomImageCarousel__navigation} ${styles.roomImageCarousel__navigation__left}`}
        onClick={() => imageNo > 0 && setImageNo(imageNo - 1)}
      >
        <NavigationRoundedIcon style={{ transform: "rotate(-90deg)" }} />
      </div>
      <div className={styles.roomImageCarousel__image}>
        <Image
          layout="fill"
          src={images[imageNo].url}
          alt={images[imageNo].public_id}
        />
      </div>
      <div
        className={`${styles.roomImageCarousel__navigation} ${styles.roomImageCarousel__navigation__right}`}
        style={{ display: images.length <= 1 && "none" }}
        onClick={(e) => imageNo < images.length - 1 && setImageNo(imageNo + 1)}
      >
        <NavigationRoundedIcon style={{ transform: "rotate(90deg)" }} />
      </div>
      <div className={styles.roomImageCarousel__navs}>
        {images?.map(({ _id }, i) => (
          <div
            key={_id}
            className={styles.roomImageCarousel__navs__icon}
            onClick={() => setImageNo(i)}
          >
            <FiberManualRecordIcon
              className={styles.roomImageCarousel__navs__icon__symbol}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomImageCarousel;
