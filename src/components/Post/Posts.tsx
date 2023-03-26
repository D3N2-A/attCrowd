import { Community } from "@/atom/communitiesAtom";
import { firestore } from "@/firebase/clientApp";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect } from "react";

type PostsProps = {
  communityData: Community;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
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
