import { UpdateRoomPage, Layout } from "@core-ui/core-uiIndex";
import { getRoom } from "@redux/reducers/room/roomSlice";
import { wrapper } from "@redux/store";

const UpdateRoom = () => {
  return (
    <Layout title="Update Room">
      <UpdateRoomPage />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      await store.dispatch(getRoom({ req, id: params.id }));
    }
);

export default UpdateRoom;
