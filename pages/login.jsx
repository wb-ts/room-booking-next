import { Layout, LoginPage } from "@core-ui/core-uiIndex";
import { getSession } from "next-auth/client";

const Login = () => {
  return (
    <Layout title="Login">
      <LoginPage />
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (session) return { redirect: { destination: "/", permanent: false } };
  return { props: {} };
};

export default Login;
