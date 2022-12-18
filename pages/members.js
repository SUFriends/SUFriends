import * as React from "react";
import Layout from "../components/layouts/layout";
import MemberCard from "../components/MemberCard";

function Members(props) {
  return (
    <Layout>
      <MemberCard
        id="0x57d39B2a3d9Ea14062856388BaF34a6AC17D05fa"
        proposalsVoted="1"
      />
    </Layout>
  );
}

export default Members;
