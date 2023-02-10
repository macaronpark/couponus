import { trpc } from "../utils/trpc";

const IndexPage = () => {
  const hello = trpc.greeting.useQuery();

  if (!hello.data) return <div>Loading...</div>;

  return (
    <div>
      <p>{hello.data.text}</p>
    </div>
  );
};

export default IndexPage;
