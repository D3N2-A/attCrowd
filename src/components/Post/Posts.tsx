import { Community } from "@/atom/communitiesAtom";
import { Post } from "@/atom/postsAtom";
import { auth, firestore } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import { Stack } from "@chakra-ui/react";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import PostItem from "./PostItem";
import PostLoader from "./PostLoader";

type PostsProps = {
  communityData: Community;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const {
    postStateValue,
    setPostStateValue,
    onVote,
    onDeletePost,
    onSelectPost,
  } = usePosts();
  const fetchPosts = async () => {
    setLoading(true);
    try {
      //post query
      const postQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData.id)
      );
      //getting posts
      const postDoc = await getDocs(postQuery);
      const posts = postDoc.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      //setting in state using custom hook
      setPostStateValue((prev) => ({ ...prev, posts: posts as Post[] }));
    } catch (error: any) {
      console.log(error.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack>
          {postStateValue.posts.map((item, index) => (
            <>
              <PostItem
                key={index}
                post={item}
                onVote={onVote}
                onSelectPost={onSelectPost}
                onDeletePost={onDeletePost}
                userVoteValue={1}
                userIsCreator={user?.uid === item.creatorId}
              />
            </>
          ))}
        </Stack>
      )}
    </>
  );
};

export default Posts;
