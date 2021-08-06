import { Layout, Home } from "@core-ui/core-uiIndex";
import { getAllRooms } from "@redux/reducers/room/allRoomsSlice";
import { wrapper } from "@redux/store";

const Index = () => {
  return (
    <div>
      <Layout>
        <Home />
      </Layout>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, query }) => {
      await store.dispatch(
        getAllRooms({ req, page: query.page || 1, location: query.location })
      );
    }
);

export default Index;
