import {
  Community,
  CommunitySnippet,
  communityState,
} from "@/atom/communitiesAtom";
import { auth, firestore } from "@/firebase/clientApp";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";

const useCommunityData = () => {
  const [user] = useAuthState(auth);
  const [loading, isLoading] = useState(false);
  const [error, setError] = useState("");
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);

  const joinCommunity = (communityData: Community) => {};
  const leaveCommunity = (communityId: string) => {};
  const onJoinLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    //check if user is login
    //open loginDialog
    //is loggedin
    //check if community is joined then call leaveCommunity else join community
    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
  };

  const getSnippets = async () => {
    try {
      const snippetDoc = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      );

      const snippets = snippetDoc.docs.map((doc) => ({ ...doc.data() }));
      setCommunityStateValue((prev) => {
        return {
          ...prev,
          mySnippets: snippets as Array<CommunitySnippet>,
        };
      });
    } catch (error) {
      setError(error as string);
    }
  };
  useEffect(() => {
    if (!user) {
      return;
    }
    getSnippets();
  }, [user]);
  return {
    communityStateValue,
    onJoinLeaveCommunity,
  };
};
export default useCommunityData;
