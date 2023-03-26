import { postState } from "@/atom/postsAtom";
import React from "react";
import { useRecoilState } from "recoil";

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const onVote = () => {};
  const onSelectPost = () => {};
  const deletePost = () => {};

  return {
    postStateValue,
    setPostStateValue,
  };
};
export default usePosts;
