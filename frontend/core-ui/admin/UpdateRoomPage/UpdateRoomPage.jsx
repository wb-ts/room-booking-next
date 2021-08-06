import {
  FormLayout,
  SubmitButton,
  FormInput,
  FormDropdown,
  FormMultiCheckBox,
  FormMultiImage,
  FormTextBox,
} from "@components/componentsIndex";
import {
  clearAdminRoom,
  selectAdminRoom,
  updateRoom,
} from "@redux/reducers/admin/adminRoomSlice";
import { roomSelector } from "@redux/reducers/room/roomSlice";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styles from "./UpdateRoomPage.module.scss";

const UpdateRoomPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { room } = useSelector(roomSelector());

  const [name, setName] = useState(room?.name);
  const [pricePerNight, setPricePerNight] = useState(room?.pricePerNight);
  const [description, setDescription] = useState(room?.description);
  const [street, setStreet] = useState(room?.street);
  const [country, setCountry] = useState(room?.country);
  const [state, setState] = useState(room?.state);
  const [city, setCity] = useState(room?.city);
  const [pincode, setPincode] = useState(room?.pincode);
  const [category, setCategory] = useState(room?.category);
  const [capacity, setCapacity] = useState(room?.capacity);
  const [numOfBeds, setNumOfBeds] = useState(room?.numOfBeds);
  const [internet, setInternet] = useState(room?.facilities?.internet);
  const [breakfast, setBreakfast] = useState(room?.facilities?.breakfast);
  const [airConditioned, setAirConditioned] = useState(
    room?.facilities?.airConditioned
  );
  const [petsAllowed, setPetsAllowed] = useState(room?.facilities?.petsAllowed);
  const [roomCleaning, setRoomCleaning] = useState(
    room?.facilities?.roomCleaning
  );
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState(room?.images);
  const [imagesPreview, setImagesPreview] = useState(
    room?.images.map(({ url }) => url)
  );
  const { success, status, error } = useSelector(selectAdminRoom());

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAdminRoom());
    }
    if (success) {
      toast.success("Room Updated");
      dispatch(clearAdminRoom());
      router.push("/admin/rooms");
    }
  }, [dispatch, error, success, router]);

  const roomUpdate = (e) => {
    e.preventDefault();

    const { id } = router.query;

    const roomData = {
      name,
      pricePerNight,
      description,
      street,
      pincode,
      category,
      capacity,
      numOfBeds,
      country,
      state,
      city,

      facilities: {
        internet,
        breakfast,
        airConditioned,
        petsAllowed,
        roomCleaning,
      },
    };

    if (images.length > 0) roomData.images = images;
    dispatch(updateRoom({ roomData, id }));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setOldImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const profile = new FileReader();
      profile.onload = () => {
        if (profile.readyState === 2) {
          setImages((old) => [...old, profile.result]);
          setImagesPreview((old) => [...old, profile.result]);
        }
      };
      profile.readAsDataURL(file);
    });
  };

  return (
    <FormLayout header="Update Room" onSubmit={roomUpdate}>
      <FormInput
        type="text"
        name="name"
        value={name}
        setValue={setName}
        label="Room Name"
        placeholder="Enter Room Name."
        required
      />
      <FormInput
        type="number"
        name="price"
        value={pricePerNight}
        setValue={setPricePerNight}
        label="Room Price (per Night) (Rs.)"
        placeholder="Enter Room Price per Night."
        required
      />
      <FormTextBox
        name="description"
        value={description}
        setValue={setDescription}
        label="Description"
        placeholder="Enter Room Description."
        clear={(e) => {
          e.preventDefault();
          setDescription(room?.description);
        }}
      />
      <FormInput
        type="text"
        name="street"
        value={street}
        setValue={setStreet}
        label="Street"
        placeholder="Enter Street."
        required
      />
      <FormInput
        type="text"
        name="country"
        value={country}
        setValue={setCountry}
        label="Country"
        placeholder="Enter Country Name."
        required
      />
      <FormInput
        type="text"
        name="state"
        value={state}
        setValue={setState}
        label="State"
        placeholder="Enter State Name."
        required
      />
      <FormInput
        type="text"
        name="city"
        value={city}
        setValue={setCity}
        label="City"
        placeholder="Enter City Name."
        required
      />

      <FormInput
        type="number"
        name="pincode"
        value={pincode}
        setValue={setPincode}
        label="Pincode"
        placeholder="Enter Pincode."
        required
      />

      <FormDropdown
        dropdownList={[
          "Apartments",
          "Adjacent",
          "Adjoining",
          "Cabana",
          "Connecting",
          "Disabled",
          "Double",
          "Double-Double",
          "Executive Floor",
          "Executive Suite",
          "Hollywood Twin Bed",
          "Junior Suite",
          "King",
          "Murphy",
          "Non-Smoking",
          "Presidential Suite",
          "Single",
          "Smoking",
          "Studio",
          "Triple",
          "Twins",
          "Villa",
          "Quad",
        ]}
        label="Select Room Category"
        value={category}
        name="category"
        setValue={setCategory}
      />
      <FormDropdown
        dropdownList={[1, 2, 3, 4, 5, 6]}
        label="Select Capacity"
        value={capacity}
        name="capacity"
        setValue={setCapacity}
      />
      <FormDropdown
        dropdownList={[1, 2, 3]}
        label="Number of Beds"
        value={numOfBeds}
        name="beds"
        setValue={setNumOfBeds}
      />

      <FormMultiCheckBox
        title="Facilities"
        options={[
          {
            name: "AC",
            value: airConditioned,
            setValue: setAirConditioned,
          },
          { name: "Breakfast", value: breakfast, setValue: setBreakfast },
          { name: "Internet", value: internet, setValue: setInternet },
          { name: "Pets", value: petsAllowed, setValue: setPetsAllowed },
          {
            name: "Room Cleaning",
            value: roomCleaning,
            setValue: setRoomCleaning,
          },
        ]}
      />

      <FormMultiImage
        name="image"
        images={imagesPreview}
        oldImages
        type="file"
        label="Room Images"
        onChange={onChange}
      />

      <SubmitButton
        text="Update"
        disabled={status === "loading" ? true : false}
      />
    </FormLayout>
  );
};

export default UpdateRoomPage;
