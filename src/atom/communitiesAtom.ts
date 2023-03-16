import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface Community {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: "public" | "restricted" | "private";
  createdAt?: Timestamp;
  imageURL?: string;
}

// we need to store community related data in order to access it globally

interface CommunitySnippet {
  communityId: string;
  isModerator?: boolean;
  imageURL?: string;
}
interface CommunityState {
  mySnippets: CommunitySnippet[];
  //visited community
}

const defaultCommunityState: CommunityState = {
  mySnippets: [],
};

export const communityState = atom<CommunityState>({
  key: "CommunityState",
  default: defaultCommunityState,
});
