import { Layout, RoomList } from "@core-ui/core-uiIndex";
import { getAdminRooms } from "@redux/reducers/admin/adminRoomsSlice";
import { wrapper } from "@redux/store";
import { getSession } from "next-auth/client";

const AdminRooms = () => {
  return (
    <div>
      <Layout title="All Rooms">
        <RoomList />
      </Layout>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const session = await getSession({ req });
      if (!session || session.user.role.toLowerCase() !== "admin")
        return { redirect: { destination: "/login", permanent: false } };
      const { cookie } = req.headers;
      await store.dispatch(getAdminRooms({ cookie, req }));
    }
);

export default AdminRooms;
