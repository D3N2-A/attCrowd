import { Community } from "@/atom/communitiesAtom";
import NotFound from "@/components/Community/NotFound";
import { firestore } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React, { useEffect } from "react";

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  if (!communityData) {
    return <NotFound />;
  }
  return <div>Welcome to, {communityData.id}</div>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      context.query.communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);
    // Add conditional to return bcoz it returns no object if community does no exists which causes error
    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(JSON.stringify(communityDoc.data()))
          : "",
      },
    };
  } catch (error) {
    console.log("serverside errors", error);
  }
}
export default CommunityPage;
