import AuthModal from "@/components/Modal/Auth/AuthModal";
import { auth } from "@/firebase/clientApp";
import { Button, Flex } from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import React from "react";
import AuthButton from "./AuthButton";
import Icons from "./Icons";
import UserMenu from "./UserMenu";

type RightContentProps = {
  user: User;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <>
      {/* Global State required for authModal as it might be required when user is not logged 
      and just trying some action in other concern */}

      <AuthModal />
      <Flex align="center" justify="center">
        {user ? <Icons /> : <AuthButton />}
        <UserMenu user={user} />
      </Flex>
    </>
  );
};
export default RightContent;
