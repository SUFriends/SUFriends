import * as React from "react";
import Layout from "../components/layouts/layout";
import MemberCard from "../components/MemberCard";

function Members(props) {

  function getMembers() {
    const { ethereum } = window;
    const contract = getContract(contract_address, abi, library, address);

  }

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <>
      <MemberCard
        id="0x57d39B2a3d9Ea14062856388BaF34a6AC17D05fa"
        proposalsVoted="1"
      />
    </>
  );
}

export default Members;
