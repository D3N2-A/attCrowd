import { Community } from "@/atom/communitiesAtom";
import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import React from "react";
import { FaReddit } from "react-icons/fa";

type HeaderProps = {
  communityData: Community;
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {
  const isJoined = false;
  // community snippets to be used
  return (
    <Flex direction="column" width="100%" height="146px">
      <Box height="50%" bg="blue.400" />
      <Flex justifyContent="center" bg="white" flexGrow={1} height="50%">
        <Flex width="95%" maxWidth="860px">
          {communityData.imageURL ? (
            <Image src={communityData.imageURL} />
          ) : (
            <Icon
              as={FaReddit}
              fontSize={64}
              position="relative"
              top={-3}
              border="4px solid white"
              borderRadius="50%"
            />
          )}
          <Flex padding="10px 16px">
            <Flex direction="column" mr={6}>
              <Text fontWeight={800} fontSize="16pt">
                {communityData.id}
              </Text>
              <Text fontWeight={600} fontSize="10pt" color="gray.400">
                a/{communityData.id}
              </Text>
            </Flex>
            <Flex>
              <Button
                variant={isJoined ? "outline" : "solid"}
                height="30px"
                pr={6}
                pl={6}
                //   onClick={() => onJoinLeaveCommunity(communityData, isJoined)}
                //   isLoading={loading}
              >
                {isJoined ? "Joined" : "Join"}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Header;
