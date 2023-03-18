import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { Tabitem } from "./NewPostForm";

type TabItemProps = {
  item: Tabitem;
  isSelected: boolean;
  setSelectedTab: Function;
};

const TabItem: React.FC<TabItemProps> = ({
  item,
  isSelected,
  setSelectedTab,
}) => {
  return (
    <Flex
      padding="15px 17px"
      gap={2}
      flexGrow={1}
      height="fit-content"
      borderWidth="1px"
      _hover={{ backgroundColor: "#edeff1" }}
      borderBottomColor={isSelected ? "black" : "#edeff1"}
      onClick={() => setSelectedTab(item.title)}
    >
      <Flex>
        <Icon
          color={isSelected ? "black" : "#878a8c"}
          as={item.icon}
          fontSize={20}
        />
      </Flex>
      <Text color={isSelected ? "black" : "#878a8c"} fontSize="0.875rem">
        {item.title}
      </Text>
    </Flex>
  );
};
export default TabItem;
