import { authModalState } from "@/atom/authModalAtom";
import {
    Community,
    CommunitySnippet,
    communityState,
} from "@/atom/communitiesAtom";
import { auth, firestore } from "@/firebase/clientApp";
import {
    collection,
    doc,
    getDocs,
    increment,
    writeBatch,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";

const useCommunityData = () => {
    const [user] = useAuthState(auth);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    //-------------community state hook-------------------//

    const [communityStateValue, setCommunityStateValue] =
        useRecoilState(communityState);

    //-------------user dialog setter--------------------//
    const setUserDialog = useSetRecoilState(authModalState);

    //-------------community function handeling----------//
    const joinCommunity = async (communityData: Community) => {
        setLoading(true);
        try {
            const batch = writeBatch(firestore);

            const communitySnippetsRef = doc(
                firestore,
                `users/${user?.uid}/communitySnippets`,
                communityData.id
            );
            const communityRef = doc(firestore, `communities`, communityData.id);
            //check is user origanally created community

            if (communityData.creatorId === user?.uid) {
                const newSnippet: CommunitySnippet = {
                    communityId: communityData.id,
                    imageURL: communityData.imageURL || "",
                    isModerator: true,
                };
                batch.set(communitySnippetsRef, newSnippet);
                //update recoil state of community snippet
                setCommunityStateValue((prev) => ({
                    ...prev,
                    mySnippets: [...prev.mySnippets, newSnippet],
                }));
            } else {
                const newSnippet: CommunitySnippet = {
                    communityId: communityData.id,
                    imageURL: communityData.imageURL || "",
                };
                batch.set(communitySnippetsRef, newSnippet);
                //update recoil state of community snippet
                setCommunityStateValue((prev) => ({
                    ...prev,
                    mySnippets: [...prev.mySnippets, newSnippet],
                }));
            }
            batch.update(communityRef, {
                numberOfMembers: increment(1),
            });
            await batch.commit();
        } catch (error: any) {
            console.log("community Join error", error);
            setError(error.message);
        }
        setLoading(false);
    };

    const leaveCommunity = async (communityId: string) => {
        setLoading(true);
        try {
            const batch = writeBatch(firestore);

            const communitySnippetsRef = doc(
                firestore,
                `users/${user?.uid}/communitySnippets`,
                communityId
            );
            const communityRef = doc(firestore, `communities`, communityId);
            batch.delete(communitySnippetsRef);
            batch.update(communityRef, { numberOfMembers: increment(-1) });
            await batch.commit();
            //update recoil state of community snippet
            setCommunityStateValue((prev) => ({
                ...prev,
                mySnippets: prev.mySnippets.filter(
                    (item) => item.communityId !== communityId
                ),
            }));
        } catch (error: any) {
            console.log("community Leave error", error);
            setError(error.message);
        }
        setLoading(false);
    };
    const onJoinLeaveCommunity = (
        communityData: Community,
        isJoined: boolean
    ) => {
        //check if user is login
        if (!user) {
            setUserDialog((prev) => ({ ...prev, open: true }));
            return;
        }
        //open loginDialog
        //is loggedin
        //check if community is joined then call leaveCommunity else join community
        if (isJoined) {
            leaveCommunity(communityData.id);
            return;
        }
        joinCommunity(communityData);
    };

    //--------------getting snippet from db-------------//

    const getSnippets = async () => {
        setLoading(true);
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
            setLoading(false);
        } catch (error) {
            setError(error as string);
            setLoading(false);
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
        loading,
    };
};
export default useCommunityData;
