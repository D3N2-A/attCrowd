import {
  Alert,
  AlertIcon,
  AlertTitle,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import TabItem from "./TabItem";
import TextInputs from "./TextInputs";
import ImageUpload from "./ImageUpload";
import { Post } from "@/atom/postsAtom";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "@/firebase/clientApp";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const formTabs = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  {
    title: "Images & Video",
    icon: IoImageOutline,
  },
  {
    title: "Link",
    icon: BsLink45Deg,
  },
  {
    title: "Poll",
    icon: BiPoll,
  },
  {
    title: "Talk",
    icon: BsMic,
  },
];
export type Tabitem = {
  title: string;
  icon: typeof Icon.arguments;
};

type NewPostFormProps = { user: User };

const NewPostForm: React.FC<NewPostFormProps> = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string>();
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  const router = useRouter();
  //----------------Handle text change---------------------//
  const onTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTextInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //-----------------Handle post creation-----------------//

  const handleCreatePost = async () => {
    setError(false);
    const { communityId } = router.query;
    //create a post of type Post

    setLoading(true);
    try {
      //store new post in db
      const postDocRef = await addDoc(collection(firestore, "posts"), {
        creatorId: user.uid,
        creatorDisplayName: user.displayName!,
        communityId: communityId as string,
        title: textInputs.title,
        body: textInputs.body,
        voteStatus: 1,
        numberOfComments: 0,
        createdAt: serverTimestamp() as Timestamp,
      });

      //check if file exists
      if (selectedFile) {
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        //upload image
        await uploadString(imageRef, selectedFile, "data_url");
        const downloadURL = await getDownloadURL(imageRef);
        //append image to post
        updateDoc(postDocRef, { imageURL: downloadURL });
      }
    } catch (error: any) {
      console.log("error making post", error.message);
      setError(true);
    }
    setLoading(false);

    //redirect to community
    router.back();
  };
  //-----------------Handle input of file----------------//
  const onSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (e.target.files?.[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readeEvent) => {
      if (readeEvent.target?.result) {
        setSelectedFile(readeEvent.target.result as string);
      }
    };
  };

  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      <Flex>
        {formTabs.map((item: Tabitem, index: number) => (
          <TabItem
            key={index}
            item={item}
            setSelectedTab={setSelectedTab}
            isSelected={selectedTab === item.title}
          />
        ))}
      </Flex>
      <Flex p={4}>
        {selectedTab === "Post" && (
          <TextInputs
            loading={loading}
            onTextChange={onTextChange}
            textInputs={textInputs}
            handleCreatePost={handleCreatePost}
          />
        )}
        {selectedTab === "Images & Video" && (
          <ImageUpload
            onSelectImage={onSelectImage}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            setSelectedTab={setSelectedTab}
          />
        )}
      </Flex>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <Text>Error creating post</Text>
        </Alert>
      )}
    </Flex>
  );
};
export default NewPostForm;
