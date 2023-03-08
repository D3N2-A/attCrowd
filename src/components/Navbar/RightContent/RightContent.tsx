import AuthModal from "@/components/Modal/AuthModal";
import { Flex } from "@chakra-ui/react";
import React from "react";
import AuthButton from "./AuthButton";

type RightContentProps = {};

const RightContent: React.FC<RightContentProps> = () => {
  return (
    <>
      {/* Global State required for authModal as it might be required when user is not logged 
      and just trying some action in other concern */}

      <AuthModal />
      <Flex align="center" justify="center">
        <AuthButton />
      </Flex>
    </>
  );
};
export default RightContent;
