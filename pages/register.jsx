import { Registeration } from "@core-ui/core-uiIndex";
import { Layout } from "@core-ui/core-uiIndex";
import { getSession } from "next-auth/client";

const Register = () => {
  return (
    <div>
      <Layout title="Register">
        <Registeration />
      </Layout>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (session) return { redirect: { destination: "/", permanent: false } };
  return { props: {} };
};

export default Register;
