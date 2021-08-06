import { UpdateUserPage } from "@core-ui/core-uiIndex";
import { Layout } from "@core-ui/core-uiIndex";
import { fetchSingleUser } from "@redux/reducers/admin/singleUserSlice";
import { wrapper } from "@redux/store";
import { getSession } from "next-auth/client";

const UpdateUser = () => {
  return (
    <Layout title="Update User Profile">
      <UpdateUserPage />
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
      await store.dispatch(fetchSingleUser({ cookie, req, id }));
    }
);

export default UpdateUser;
