import { BookingDetails } from "@core-ui/core-uiIndex";
import { Layout } from "@core-ui/core-uiIndex";
import { fetchBookingInfo } from "@redux/reducers/booking/bookingInfoSlice";
import { wrapper } from "@redux/store";
import { getSession } from "next-auth/client";

const AdminBooking = () => {
  return (
    <Layout title="Booking Info">
      <BookingDetails />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      const session = await getSession({ req });
      if (!session || session.user.role.toLowerCase() !== "admin")
        return { redirect: { destination: "/login", permanent: false } };
      const { cookie } = req.headers;
      const { id } = params;
      await store.dispatch(fetchBookingInfo({ cookie, req, id }));
    }
);

export default AdminBooking;
