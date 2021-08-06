import { Layout, AllUsersPage } from "@core-ui/core-uiIndex";
import { wrapper } from "@redux/store";
import { getSession } from "next-auth/client";
import { getAdminUsers } from "@redux/reducers/admin/allUsersSlice";

const AdminUsers = () => {
  return (
    <div>
      <Layout title="All Users">
        <AllUsersPage />
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
      await store.dispatch(getAdminUsers({ cookie, req }));
    }
);

export default AdminUsers;
