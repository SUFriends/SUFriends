import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../../components/layouts/layout";

export default function Proposal() {
  const router = useRouter();
  const { id } = router.query;


  const [proposal, setProposal] = useState([]);

  async function getProposalById(){
    fetch("/api/proposal/"+id, {method: "GET"})
      .then( (response) => {
        response.json().then( (e) => {
          // console.log(e.data); //e.data
          setProposal(e.data);
          console.log(proposalCards)

        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <Layout>
      <p>Post: {id}</p>
    </Layout>
  );
}
