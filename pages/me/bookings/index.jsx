import { UserBookingsPage } from "@core-ui/core-uiIndex";
import { Layout } from "@core-ui/core-uiIndex";
import { getMyBooking } from "@redux/reducers/booking/myBookingSlice";
import { wrapper } from "@redux/store";
import { getSession } from "next-auth/client";

const UserBookings = () => {
  return (
    <Layout title="My Bookings">
      <UserBookingsPage />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const session = await getSession({ req });
      if (!session)
        return { redirect: { destination: "/login", permanent: false } };
      const { cookie } = req.headers;
      await store.dispatch(getMyBooking({ cookie, req }));
    }
);

export default UserBookings;
