import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";

const Navbar: React.FC = () => {
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
      <RightContent />
      {/* <Directory/> */}
    </Flex>
  );
};

export default Navbar;
