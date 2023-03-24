import { Timestamp } from "firebase/firestore";

export interface Post {
  timeofCreation: Timestamp;
  imageURL?: string;
  postId: number;
  
}
