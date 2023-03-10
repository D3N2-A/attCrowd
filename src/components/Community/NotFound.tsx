import { Circle, Flex, Text, Icon, Button, Link } from "@chakra-ui/react";
import { Router } from "next/router";
import React from "react";
import { GiPlanetCore } from "react-icons/gi";

const NotFound: React.FC = () => {
  return (
    <Flex flexDirection="column" align="center" height="80dvh" justify="center">
      <Icon
        fontSize={100}
        color="gray.600"
        as={GiPlanetCore}
        _hover={{ fontSize: "150" }}
      />
      <Text mt={4} fontSize="14px" fontWeight={550}>
        Sorry, there aren't any communities on attCrowd with that name.
      </Text>
      <Text mt={2} fontSize="12px">
        This community may have been banned or the community name is incorrect.
      </Text>
      <Flex
        flexDirection="row"
        align="center"
        mt={6}
        gap="10px"
        justify="center"
      >
        <Button
          colorScheme="blue"
          variant="outline"
          // onClick={handleClose}
          height="28px"
        >
          Create Community
        </Button>
        <Button
          variant="solid"
          height="28px"
          // isLoading={loading}
        >
          <Link
            href="/"
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            {" "}
            Go To Home
          </Link>
        </Button>
      </Flex>
      <Text mt={6} fontSize="10px" color="gray.500" align="center">
        Use of this site constitutes acceptance of our User Agreement and
        Privacy Policy. ©2023 attCrowd inc. All rights reserved.
        <br /> attCrowd and the Aa Logo are registered trademarks of attCrowd
        inc.
      </Text>
    </Flex>
  );
};
export default NotFound;
