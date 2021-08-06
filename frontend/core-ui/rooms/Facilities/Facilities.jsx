import styles from "./Facilities.module.scss";

import AcUnitRoundedIcon from "@material-ui/icons/AcUnitRounded";
import PeopleOutlineOutlinedIcon from "@material-ui/icons/PeopleOutlineOutlined";
import WifiOutlinedIcon from "@material-ui/icons/WifiOutlined";
import HotelIcon from "@material-ui/icons/Hotel";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import PetsIcon from "@material-ui/icons/Pets";
import RoomIcon from "@material-ui/icons/Room";
import KingBedIcon from "@material-ui/icons/KingBed";
import { FacilityOption } from "@core-ui/core-uiIndex";

const Facilities = ({ facilities }) => {
  const {
    airConditioned,
    beds,
    breakfast,
    internet,
    petsAllowed,
    roomCleaning,
    size,
    type,
  } = facilities;

  return (
    <div className={styles.facilities}>
      <FacilityOption title="Size" value={type} Icon={KingBedIcon} />
      <FacilityOption title="Bed(s)" value={beds} Icon={HotelIcon} />
      <FacilityOption
        title="Guest(s)"
        value={size}
        Icon={PeopleOutlineOutlinedIcon}
      />
      <FacilityOption
        title="AC"
        value={airConditioned}
        Icon={AcUnitRoundedIcon}
        boolean
      />
      <FacilityOption
        title="Breakfast"
        value={breakfast}
        Icon={RestaurantIcon}
        boolean
      />
      <FacilityOption
        title="Internet"
        value={internet}
        Icon={WifiOutlinedIcon}
        boolean
      />
      <FacilityOption
        title="Pets"
        value={petsAllowed}
        Icon={PetsIcon}
        boolean
      />
      <FacilityOption
        title="Room Cleaning"
        value={roomCleaning}
        Icon={RoomIcon}
        boolean
      />
    </div>
  );
};

export default Facilities;
