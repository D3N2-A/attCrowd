import {
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { HiHome } from "react-icons/hi";

const Directory: React.FC = () => {
  return (
    <>
      <Flex justifySelf="flex-end">
        <Menu>
          <MenuButton>
            <Flex
              outline="1px solid"
              outlineColor="gray.200"
              borderRadius={2}
              padding="2px 8px"
              justify="center"
              align="center"
            >
              <Icon as={HiHome} fontSize={20} />
              <BiChevronDown color="#878a8c" fontSize={16} />
            </Flex>
          </MenuButton>

          <MenuList>
            <MenuItem>
              <Flex justify="center" align="center">
                <AiOutlineLogin fontSize={20} />
                <Text ml={4} fontSize="0.8rem" fontWeight={500}>
                  Log In/Sign Up
                </Text>
              </Flex>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </>
  );
};
export default Directory;
