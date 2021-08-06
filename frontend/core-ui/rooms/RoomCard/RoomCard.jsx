import Image from "next/image";
import Link from "next/link";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import TrendingFlatIcon from "@material-ui/icons/TrendingFlat";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import styles from "./RoomCard.module.scss";
import { Ratings } from "@components/componentsIndex";

const RoomCard = ({ room }) => {
  return (
    <div className={styles.roomCard}>
      <div className={styles.roomCard__image}>
        <Image
          src={room?.images[0].url}
          alt={room?.images[0]._id}
          layout="fill"
        />
      </div>
      <div className={styles.roomCard__top}>
        <div className={styles.roomCard__top__data}>
          <p className={styles.roomCard__top__data__name}> {room.name}</p>
          <div className={styles.roomCard__top__data__address}>
            <RoomOutlinedIcon style={{ fontSize: 15 }} />
            <address className={styles.roomCard__top__data__address__text}>
              {`${room?.city}, ${room?.country}`}
            </address>
          </div>
        </div>
        <div className={styles.roomCard__top__price}>
          <p className={styles.roomCard__top__price__amount}>
            ₹{room.pricePerNight}
          </p>
          /<p>night</p>
        </div>
      </div>
      <div className={styles.roomCard__underline}></div>
      <div className={styles.roomCard__rating}>
        {room.ratings > 0 && (
          <div
            className={`${styles.roomCard__rating__section} ${styles.roomCard__rating__section__stars}`}
          >
            <Ratings ratings={room.ratings} />
          </div>
        )}
        {/* <div
          className={`${styles.roomCard__rating__section} ${styles.roomCard__rating__section__review}`}
        >
          {room.numOfReviews} Review(s)
        </div> */}
      </div>
      <div className={styles.roomCard__bottom}>
        <p className={styles.roomCard__bottom__section}>
          <b>{room.numOfBeds}</b> bed(s)
        </p>
        <FiberManualRecordIcon style={{ fontSize: 5 }} />
        <p className={styles.roomCard__bottom__section}>
          <b>{room.capacity}</b>
          person(s)
        </p>
        <FiberManualRecordIcon style={{ fontSize: 5 }} />
        <p>{room.category}</p>
      </div>
      <Link passHref href={`/room/${room._id}`}>
        <div className={styles.roomCard__details}>
          <p className={styles.roomCard__details__text}>Details</p>
          <div className={styles.roomCard__details__smallArrow}>
            <ArrowRightAltIcon style={{ fill: "white" }} />
          </div>
          <div className={styles.roomCard__details__bigArrow}>
            <TrendingFlatIcon style={{ fill: "white" }} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RoomCard;
