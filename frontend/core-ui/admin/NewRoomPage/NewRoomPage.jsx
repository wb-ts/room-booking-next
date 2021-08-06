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
  createNewRoom,
  selectAdminRoom,
} from "@redux/reducers/admin/adminRoomSlice";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styles from "./NewRoomPage.module.scss";

const NewRoomPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [name, setName] = useState("");
  const [pricePerNight, setPricePerNight] = useState(0);
  const [description, setDescription] = useState("");
  const [street, setStreet] = useState("");
  const [pincode, setPincode] = useState(0);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("Apartments");
  const [capacity, setCapacity] = useState(1);
  const [numOfBeds, setNumOfBeds] = useState(1);
  const [internet, setInternet] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [airConditioned, setAirConditioned] = useState(false);
  const [petsAllowed, setPetsAllowed] = useState(false);
  const [roomCleaning, setRoomCleaning] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const { success, status, error } = useSelector(selectAdminRoom());
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAdminRoom());
    }
    if (success) {
      toast.success("New Room Created");
      dispatch(clearAdminRoom());
      router.push("/admin/rooms");
    }
  }, [dispatch, error, success, router]);

  const createRoom = (e) => {
    e.preventDefault();

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
      images,
      facilities: {
        internet,
        breakfast,
        airConditioned,
        petsAllowed,
        roomCleaning,
      },
    };

    if (images.length === 0) return toast.warn("Please Upload Images.");
    dispatch(createNewRoom(roomData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
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
    <FormLayout header="New Room" onSubmit={createRoom}>
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
        label="Room Price (per Night)"
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
          setDescription("");
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
        type="file"
        label="Room Images"
        onChange={onChange}
      />

      <SubmitButton
        text="Create"
        disabled={status === "loading" ? true : false}
      />
    </FormLayout>
  );
};

export default NewRoomPage;
