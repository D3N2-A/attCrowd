import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Flex,
  Text,
  Image,
} from "@chakra-ui/react";
import { CiUser } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { BiChevronDown } from "react-icons/bi";
import { signOut, User } from "firebase/auth";
import React from "react";
import { BsEscape } from "react-icons/bs";
import { AiOutlineLogin } from "react-icons/ai";
import { HiSparkles } from "react-icons/hi";
import { auth } from "@/firebase/clientApp";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "@/atom/authModalAtom";
import { communityState } from "@/atom/communitiesAtom";

type UserMenuProps = {
  user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const resetCommunity = useResetRecoilState(communityState);
  const logout = async () => {
    signOut(auth);
    //clear community state
    resetCommunity();
  };
  return (
    <>
      <Menu>
        <MenuButton>
          {user ? (
            <Flex
              outline="1px solid"
              outlineColor="gray.200"
              borderRadius={2}
              padding="2px 8px"
              justify="center"
              align="center"
            >
              <Image
                src="/images/attCrowdFace.svg"
                color="#878a8c"
                width={6}
                height={6}
              />
              <Flex
                padding="0px 8px"
                flexDirection="column"
                justify="flex-start"
                align="flex-start"
              >
                <Text fontSize="12px">
                  {user?.displayName || user.email?.split("@")[0]}
                </Text>
                <Flex justify="center" align="center">
                  <HiSparkles fontSize={10} />{" "}
                  <Text fontSize="10px" color="#a8aaab">
                    1 karma
                  </Text>
                </Flex>
              </Flex>
              <BiChevronDown color="#878a8c" fontSize={16} />
            </Flex>
          ) : (
            <>
              <Flex
                outline="1px solid"
                outlineColor="gray.200"
                borderRadius={2}
                padding="2px 8px"
                justify="center"
                align="center"
              >
                <CiUser color="#878a8c" fontSize={24} />
                <BiChevronDown color="#878a8c" fontSize={16} />
              </Flex>
            </>
          )}
        </MenuButton>
        {user ? (
          <MenuList>
            <MenuItem>
              <Flex justify="center" align="center">
                <CgProfile fontSize={20} />
                <Text ml={4} fontSize="0.8rem" fontWeight={500}>
                  Profile
                </Text>
              </Flex>
            </MenuItem>
            <MenuItem onClick={logout}>
              <Flex justify="center" align="center">
                <BsEscape fontSize={20} />
                <Text ml={4} fontSize="0.8rem" fontWeight={500}>
                  Log Out
                </Text>
              </Flex>
            </MenuItem>
            <Flex justify="flex-start" padding="6px 12px" align="center">
              <p style={{ fontSize: "10px" }}>
                © 2023 attCrowd, Inc. All rights reserved
              </p>
            </Flex>
          </MenuList>
        ) : (
          <MenuList>
            <MenuItem
              onClick={() => {
                setAuthModalState((prev) => ({ ...prev, open: true }));
              }}
            >
              <Flex justify="center" align="center">
                <AiOutlineLogin fontSize={20} />
                <Text ml={4} fontSize="0.8rem" fontWeight={500}>
                  Log In/Sign Up
                </Text>
              </Flex>
            </MenuItem>
          </MenuList>
        )}
      </Menu>
    </>
  );
};
export default UserMenu;
