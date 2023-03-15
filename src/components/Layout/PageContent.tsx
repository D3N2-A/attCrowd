import { Flex } from "@chakra-ui/react";
import React from "react";

type PageContentProps = {
  children?: any;
};

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  console.log(children);
  return (
    <Flex align="center" justify="center">
      <Flex width="95%" maxWidth="860px">
        {/* LHS */}
        <Flex
          direction="column"
          width={{ base: "100%", md: "65%" }}
          mr={{ base: 0, md: 6 }}
        >
          {children && children[0 as keyof typeof children]}
        </Flex>

        {/* RHS */}
        <Flex
          direction="column"
          flexGrow={1}
          display={{ base: "none", md: "flex" }}
        >
          {children && children[1 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PageContent;
