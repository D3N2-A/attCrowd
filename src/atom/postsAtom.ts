import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export type Post = {
  id: string;
  creatorId: string;
  creatorDisplayName: string;
  communityId: string;
  communityImageURL?: string;
  title: string;
  body?: string;
  imageURL?: string;
  voteStatus: number;
  numberOfComments: number;
  createdAt: Timestamp;
};

interface PostState {
  selectedPost: Post | null;
  posts: Post[];
  //postVotes
}

const defaultPostState: PostState = {
  selectedPost: null,
  posts: [],
};

export const postState = atom<PostState>({
  key: "postState",
  default: defaultPostState,
});
