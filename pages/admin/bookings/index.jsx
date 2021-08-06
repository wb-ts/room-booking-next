import { Layout, AllBookingsPage } from "@core-ui/core-uiIndex";
import { getAllBookings } from "@redux/reducers/admin/allBookingsSlice";
import { wrapper } from "@redux/store";
import { getSession } from "next-auth/client";

const AllBookings = () => {
  return (
    <Layout title="All Bookings">
      <AllBookingsPage />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const session = await getSession({ req });
      if (!session || session.user.role.toLowerCase() !== "admin")
        return { redirect: { destination: "/login", permanent: false } };
      const { cookie } = req.headers;
      await store.dispatch(getAllBookings({ cookie, req }));
    }
);

export default AllBookings;
