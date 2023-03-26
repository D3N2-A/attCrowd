import { postState } from "@/atom/postsAtom";
import React from "react";
import { useRecoilState } from "recoil";

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const onVote = async () => {};
  const onSelectPost = () => {};
  const onDelete = async () => {};

  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onDelete,
    onSelectPost,
  };
};
export default usePosts;
