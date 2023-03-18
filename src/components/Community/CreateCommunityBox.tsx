import { authModalState } from "@/atom/authModalAtom";
import { auth } from "@/firebase/clientApp";
import { Flex, Image, Input, Icon } from "@chakra-ui/react";
import { query } from "firebase/firestore";
import { useRouter } from "next/router";

import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BiImages } from "react-icons/bi";
import { BsLink45Deg } from "react-icons/bs";
import { useSetRecoilState } from "recoil";

const CreateCommunityBox: React.FC = () => {
  const [user] = useAuthState(auth);

  const router = useRouter();
  const setAuthModal = useSetRecoilState(authModalState);

  const onClick = () => {
    if (!user) {
      setAuthModal((prev) => ({ ...prev, open: true }));
      return;
    }
    if (router.isReady) {
      router.push(`/a/${router.query.communityId}/submit`);
    }
  };
  return (
    <Flex
      backgroundColor="#ffffff"
      borderRadius="4px"
      marginTop="20px"
      padding="8px"
      marginBottom="16px"
      onClick={() => onClick()}
    >
      <Image
        src={
          // user?.photoURL ? `${user.photoURL}` :

          "/images/attCrowdFace.svg"
        }
        color="#878a8c"
        width={38}
        height={38}
        borderRadius="50%"
        backgroundColor="gray.100"
      />
      <Input
        fontSize="14px"
        bg="gray.50"
        height="34px"
        placeholder="Create Post"
        borderRadius="4px"
        margin="0px 6px"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          border: "1px solid",
          borderColor: "blue.500",
        }}
      />
      <Flex
        justify="center"
        align="center"
        _hover={{ bg: "gray.300" }}
        borderRadius={4}
        padding={2}
        cursor="pointer"
      >
        <Icon as={BiImages} color="#878a8c" fontSize={20} />
      </Flex>
      <Flex
        justify="center"
        align="center"
        _hover={{ bg: "gray.300" }}
        borderRadius={4}
        padding={1}
        cursor="pointer"
      >
        <Icon as={BsLink45Deg} color="#878a8c" fontSize={24} />
      </Flex>
    </Flex>
  );
};
export default CreateCommunityBox;
