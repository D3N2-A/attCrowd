import AuthModal from "@/components/Modal/AuthModal";
import { Flex } from "@chakra-ui/react";
import React from "react";
import AuthButton from "./AuthButton";

type RightContentProps = {};

const RightContent: React.FC<RightContentProps> = () => {
  return (
    <>
      <AuthModal />
      <Flex align="center" justify="center">
        <AuthButton />
      </Flex>
    </>
  );
};
export default RightContent;
