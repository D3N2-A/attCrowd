import { Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import {
  IoFilterCircleOutline,
  IoNotificationsOutline,
  IoVideocamOutline,
} from "react-icons/io5";

const Icons: React.FC = () => {
  return (
    <Flex>
      <Flex
        display={{ base: "none", md: "flex" }}
        align="center"
        borderRight="1px solid"
        borderRightColor="gray.200"
      >
        <Flex
          justify="center"
          align="center"
          _hover={{ bg: "gray.300" }}
          borderRadius={4}
          padding={2}
          cursor="pointer"
        >
          <Icon as={BsArrowUpRightCircle} fontSize={19} />
        </Flex>
        <Flex
          justify="center"
          align="center"
          _hover={{ bg: "gray.300" }}
          borderRadius={4}
          padding={2}
          cursor="pointer"
        >
          <Icon as={IoFilterCircleOutline} fontSize={20} />
        </Flex>
        <Flex
          justify="center"
          align="center"
          _hover={{ bg: "gray.300" }}
          borderRadius={4}
          padding={2}
          cursor="pointer"
        >
          <Icon as={IoVideocamOutline} fontSize={20} />
        </Flex>
      </Flex>
      <>
        <Flex
          justify="center"
          align="center"
          _hover={{ bg: "gray.300" }}
          borderRadius={4}
          padding={2}
          cursor="pointer"
        >
          <Icon as={BsChatDots} fontSize={19} />
        </Flex>
        <Flex
          justify="center"
          align="center"
          _hover={{ bg: "gray.300" }}
          borderRadius={4}
          padding={2}
          cursor="pointer"
        >
          <Icon as={IoNotificationsOutline} fontSize={19} />
        </Flex>
        <Flex
          display={{ base: "none", md: "flex" }}
          justify="center"
          align="center"
          _hover={{ bg: "gray.300" }}
          borderRadius={4}
          padding={2}
          cursor="pointer"
        >
          <Icon as={GrAdd} fontSize={18} />
        </Flex>
      </>
    </Flex>
  );
};
export default Icons;
