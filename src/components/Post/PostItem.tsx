import { Post } from "@/atom/postsAtom";
import { Flex, Stack, Icon, Text, Image } from "@chakra-ui/react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { TfiQuoteLeft } from "react-icons/tfi";
import React from "react";
import { AiOutlineComment } from "react-icons/ai";

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: () => {};
  onDelete: () => {};
  onSelectPost: () => void;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userVoteValue,
  userIsCreator,
  onDelete,
  onSelectPost,
  onVote,
}) => {
  return (
    <Flex
      background="white"
      borderRadius="4px"
      border="0.5px solid "
      borderColor="blackAlpha.400"
      _hover={{ borderColor: "#898989" }}
      cursor="pointer"
    >
      <Stack
        height="100%"
        p={2}
        justify="flex-start"
        align="center"
        background="blackAlpha.100"
      >
        <Flex
          width="100%"
          _hover={{ background: "rgb(26 26 27 / 10%)" }}
          justify="center"
          align="center"
          borderRadius={2}
        >
          <Icon
            fontSize="20px"
            as={MdOutlineKeyboardArrowUp}
            color={userVoteValue === 1 ? { color: "orange" } : {}}
            _hover={{ color: "orange" }}
            outline="#898989"
          />
        </Flex>
        <Text fontWeight={700} fontSize="0.765rem">
          {post.voteStatus}
        </Text>
        <Flex
          borderRadius={2}
          width="100%"
          _hover={{ background: "rgb(26 26 27 / 10%)" }}
          justify="center"
          align="center"
        >
          <Icon
            fontSize="20px"
            as={MdOutlineKeyboardArrowDown}
            _hover={{ color: "blue" }}
          />
        </Flex>
      </Stack>
      <Stack height="100%">
        <Flex fontSize="10px" gap={2} padding={2}>
          {/* HomePage check */}
          <Image
            width="20px"
            height="20px"
            src={
              post.communityImageURL
                ? post.communityImageURL
                : "images/defaultCommunityImage.svg"
            }
          />
          <Text fontWeight={700} _hover={{ textDecoration: "underline" }}>
            a/{post.communityId}
          </Text>
          <span
            style={{ verticalAlign: "middle", color: "rgb(120, 124, 126)" }}
          >
            •
          </span>
          <Text color="rgb(120, 124, 126)">
            Posted by u/{post.creatorDisplayName}
          </Text>
        </Flex>
        <Flex paddingLeft={2}>
          <Text fontWeight={500} fontSize="1.125rem">
            {post.title}
          </Text>
        </Flex>
        <Flex>
          {post.imageURL ? (
            <Image
              border="1px solid"
              borderColor="blackAlpha.300"
              src={post.imageURL}
            />
          ) : (
            <Flex paddingLeft={2}>
              <Text fontSize="0.875rem">{post.body}</Text>
            </Flex>
          )}
        </Flex>
        <Flex p={1} gap={1}>
          <Flex
            color="#878A8C"
            _hover={{ backgroundColor: "rgb(26 26 27 / 10%)" }}
            borderRadius="2px"
            gap={2}
            height="2rem"
            justify="center"
            padding="4px"
            align="center"
          >
            <Icon fontSize="20px" as={AiOutlineComment} />
            <Text fontWeight={700} fontSize="0.765rem">
              {post.numberOfComments} Comments
            </Text>
          </Flex>
          <Flex
            color="#878A8C"
            _hover={{ backgroundColor: "rgb(26 26 27 / 10%)" }}
            borderRadius="2px"
            gap={2}
            height="2rem"
            justify="center"
            padding="4px"
            align="center"
          >
            <Icon fontSize="18px" as={TfiQuoteLeft} />
            <Text fontWeight={700} fontSize="0.765rem">
              Float
            </Text>
          </Flex>
        </Flex>
      </Stack>
    </Flex>
  );
};
export default PostItem;
