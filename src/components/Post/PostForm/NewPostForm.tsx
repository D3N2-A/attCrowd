import { Flex, Icon } from "@chakra-ui/react";
import React, { useState } from "react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import TabItem from "./TabItem";
import TextInputs from "./TextInputs";

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

const NewPostForm: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  const onTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTextInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleCreatePost = async () => {};

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
      <Flex>
        {selectedTab === "Post" && (
          <TextInputs
            loading={false}
            onTextChange={onTextChange}
            textInputs={textInputs}
            handleCreatePost={handleCreatePost}
          />
        )}
      </Flex>
    </Flex>
  );
};
export default NewPostForm;
