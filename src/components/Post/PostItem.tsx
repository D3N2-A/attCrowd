import { Post } from "@/atom/postsAtom";
import { Flex } from "@chakra-ui/react";
import React from "react";

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVote?: number;
  onVote: () => void;
  onDelete: () => void;
  onSelectPost: () => void;
};

const PostItem: React.FC<PostItemProps> = () => {
  return <Flex background="white"></Flex>;
};
export default PostItem;
