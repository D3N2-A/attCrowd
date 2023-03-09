import { auth } from "@/firebase/clientApp";
import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <Flex bg="white" height="48px" padding="6px 12px">
      <Flex align="center" gap="8px" borderBottom="1px bottom #EDEFF">
        <Image src="/images/attCrowdFace.svg" height="32px" width="32px" />
        <Image
          display={{ base: "none", md: "unset" }}
          src="/images/attCrowdText.svg"
          width="57px"
        />
      </Flex>
      <SearchInput />
      <RightContent user={user} />
      {/* <Directory/> */}
    </Flex>
  );
};

export default Navbar;
