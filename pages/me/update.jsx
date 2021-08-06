import { Layout, UpdateProfilePage } from "@core-ui/core-uiIndex";
import { getSession } from "next-auth/client";

const UpdateProfile = () => {
  return (
    <Layout title="Update Profile">
      <UpdateProfilePage />
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session)
    return { redirect: { destination: "/login", permanent: false } };

  return { props: { session } };
};

export default UpdateProfile;
