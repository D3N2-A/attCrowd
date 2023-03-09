import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";

type SearchInputProps = {
  //TODO: user prop
};

const SearchInput: React.FC<SearchInputProps> = () => {
  return (
    <Flex margin="0 1rem" flexGrow="1">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon mb={1} color="gray.500" />}
        />
        <Input
          fontSize="14px"
          bg="gray.50"
          height="34px"
          placeholder="Search attCrowd"
          borderRadius={50}
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
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;
