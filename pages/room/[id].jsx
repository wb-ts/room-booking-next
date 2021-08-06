import { Layout, RoomDetails } from "@core-ui/core-uiIndex";
import { getRoom } from "@redux/reducers/room/roomSlice";
import { wrapper } from "@redux/store";

const Room = () => {
  return (
    <div>
      <Layout title="Room Details">
        <RoomDetails />
      </Layout>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      await store.dispatch(getRoom({ req, id: params.id }));
    }
);

export default Room;
