import React from "react";
import styles from "./Ratings.module.scss";

const Ratings = ({ ratings, rating, setRating, hover, setHover }) => {
  // const [rating, setRating] = useState(null);
  // const [hover, setHover] = useState(null);

  return (
    <div className={styles.ratings} style={{ display: ratings < 1 && "none" }}>
      {[...Array(5)].map((stars, i) => {
        const ratingValue = i + 1;
        return ratings >= 0 ? (
          <div
            key={ratingValue}
            className={`${styles.ratings__label__star} ${styles.ratings__label__star__displayOnly}`}
            style={
              ratingValue <= ratings
                ? { background: "orange" }
                : { background: "rgb(170, 166, 166)" }
            }
          >
            <div
              className={styles.ratings__label__star__displayOnly__innerDiv}
              style={
                ratingValue > ratings && 1 - (ratingValue - ratings) > 0
                  ? {
                      backgroundColor: "orange",
                      width: `${(1 - (ratingValue - ratings)) * 100}%`,
                    }
                  : { backgroundColor: "transparent" }
              }
            ></div>
          </div>
        ) : (
          <label className={styles.ratings__label} key={ratingValue}>
            <input
              className={styles.ratings__label__input}
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />

            <div
              className={styles.ratings__label__star}
              style={
                ratingValue <= (hover || rating)
                  ? hover
                    ? { background: "gold" }
                    : { background: "orange" }
                  : { background: "rgb(170, 166, 166)" }
              }
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            ></div>
          </label>
        );
      })}
    </div>
  );
};

export default Ratings;
