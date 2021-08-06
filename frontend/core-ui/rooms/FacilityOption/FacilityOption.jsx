import { CloseIcon, DoneIcon } from "@icons/iconsIndex";
import styles from "./FacilityOption.module.scss";
const FacilityOption = ({ title, value, Icon, boolean }) => {
  return (
    <div className={styles.facilityOption}>
      <Icon />
      <h5>{title}</h5>
      {boolean ? (
        value ? (
          <DoneIcon style={{ fill: "#39ff14" }} />
        ) : (
          <CloseIcon style={{ fill: "#f72119" }} />
        )
      ) : (
        <h5>{value}</h5>
      )}
    </div>
  );
};

export default FacilityOption;
