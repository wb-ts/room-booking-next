import { createInvoice, download } from "easyinvoice";
import { getDate } from "./formatDate";

const getInvoice = async ({
  pricePerNight,
  bookingId,
  checkInDate,
  checkOutDate,
  daysOfStay,
  email,
  name,
  roomName,
}) => {
  const data = {
    documentTitle: "Booking Invoice",
    currency: "INR",
    taxNotation: "gst",
    marginTop: 25,
    marginRight: 25,
    marginLeft: 25,
    marginBottom: 25,
    logo: "https://public.easyinvoice.cloud/img/logo_en_original.png",
    // background: "https://public.easyinvoice.cloud/img/watermark-draft.jpg",
    sender: {
      company: "MyBnB",
      address: "404th Street, A-51 Not Found",
      zip: "130013",
      city: "Spaceship",
      country: "Area 51",
    },
    client: {
      company: `${name}`,
      address: `${email}`,
      zip: "23454363",
      city: `Check In: ${getDate(checkInDate)}`,
      country: `Check Out: ${getDate(checkOutDate)}`,
    },
    invoiceNumber: `${bookingId}`,
    invoiceDate: `${new Date(Date.now()).toLocaleString("en-US")}`,
    products: [
      {
        quantity: `${daysOfStay}`,
        description: `${roomName}`,
        tax: 0,
        price: `${pricePerNight}`,
      },
    ],
    bottomNotice: "Auto generated invoice for your mybnb purchase.",
  };

  const result = await createInvoice(data);
  download(`invoice_${bookingId}.pdf`, result.pdf);
};

export default getInvoice;
