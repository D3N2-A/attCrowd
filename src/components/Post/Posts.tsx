import { Community } from "@/atom/communitiesAtom";
import { Post } from "@/atom/postsAtom";
import { firestore } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect } from "react";

type PostsProps = {
  communityData: Community;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
  const { postStateValue, setPostStateValue } = usePosts();
  const fetchPosts = async () => {
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
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return <div>Posts</div>;
};

export default Posts;
