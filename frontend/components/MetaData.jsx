import Head from "next/head";

const MetaData = ({
  title = "Book the Hotel you want at intriguing price",
  description,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta
        charSet="utf-8"
        name="viewport"
        content="initial-scale=1.0,width=device-width"
      />
      <meta name="description" content={description || title} />
    </Head>
  );
};

export default MetaData;
