import { Post } from "@/atom/postsAtom";
import { Flex, Icon, Image, Stack, Text } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { HiOutlineChatBubbleBottomCenter } from "react-icons/hi2";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { TfiQuoteLeft, TfiShare } from "react-icons/tfi";

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: () => {};
  onDeletePost: () => {};
  onSelectPost: () => void;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userVoteValue,
  userIsCreator,
  onDeletePost,
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
            fontSize="1.5rem"
            as={MdOutlineKeyboardArrowUp}
            color={userVoteValue === 1 ? "orange" : {}}
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
            color={userVoteValue === -1 ? "#4379ff" : ""}
            fontSize="1.5rem"
            as={MdOutlineKeyboardArrowDown}
            _hover={{ color: "#4379ff" }}
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
            {"  "}&nbsp;&nbsp;
            {moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
          </Text>
        </Flex>
        <Stack paddingLeft={2}>
          <Text fontWeight={500} fontSize="1.125rem">
            {post.title}
          </Text>
          <Text fontSize="0.865rem">{post.body}</Text>
        </Stack>
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
        <Flex p={1} gap={2}>
          <Flex
            color="#878A8C"
            _hover={{ backgroundColor: "rgb(26 26 27 / 10%)" }}
            borderRadius="2px"
            gap={1}
            height="2rem"
            justify="center"
            padding="4px"
            align="center"
          >
            <Icon fontSize="20px" as={HiOutlineChatBubbleBottomCenter} />
            <Text fontWeight={700} fontSize="0.765rem">
              {post.numberOfComments} Comments
            </Text>
          </Flex>
          <Flex
            color="#878A8C"
            _hover={{ backgroundColor: "rgb(26 26 27 / 10%)" }}
            borderRadius="2px"
            gap={1}
            height="2rem"
            justify="center"
            padding="4px"
            align="center"
          >
            <Icon fontSize="17px" as={TfiQuoteLeft} />
            <Text fontWeight={700} fontSize="0.765rem">
              Float
            </Text>
          </Flex>
          <Flex
            color="#878A8C"
            _hover={{ backgroundColor: "rgb(26 26 27 / 10%)" }}
            borderRadius="2px"
            gap={1}
            height="2rem"
            justify="center"
            padding="4px"
            align="center"
          >
            <Icon fontSize="17px" as={TfiShare} mb="2px" />
            <Text fontWeight={700} fontSize="0.765rem">
              Share
            </Text>
          </Flex>
          <Flex
            color="#878A8C"
            _hover={{ backgroundColor: "rgb(26 26 27 / 10%)" }}
            borderRadius="2px"
            gap={1}
            height="2rem"
            justify="center"
            padding="4px"
            align="center"
          >
            <Icon fontSize="16px" as={BsBookmark} />
            <Text fontWeight={700} fontSize="0.765rem">
              Save
            </Text>
          </Flex>
          {userIsCreator && (
            <Flex
              color="#878A8C"
              _hover={{ backgroundColor: "rgb(26 26 27 / 10%)", color: "red" }}
              borderRadius="2px"
              gap={1}
              height="2rem"
              justifySelf="end"
              ml="auto"
              padding="4px"
              align="center"
              onClick={onDeletePost}
            >
              <Icon fontSize="18px" as={AiOutlineDelete} />
              <Text fontWeight={700} fontSize="0.765rem">
                Delete Post
              </Text>
            </Flex>
          )}
        </Flex>
      </Stack>
    </Flex>
  );
};
export default PostItem;
