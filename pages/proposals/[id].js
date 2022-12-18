import { useRouter } from "next/router";
import Layout from "../../components/layouts/layout";

export default function Proposal() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <p>Post: {id}</p>
    </Layout>
  );
}
