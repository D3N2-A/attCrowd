import { Button, Flex, Input, Stack, Textarea } from "@chakra-ui/react";
import React from "react";

type TextInputsProps = {
  onTextChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  textInputs: {
    title: string;
    body: string;
  };
  handleCreatePost: () => void;
  loading: boolean;
};

const TextInputs: React.FC<TextInputsProps> = ({
  onTextChange,
  textInputs,
  handleCreatePost,
  loading,
}) => {
  return (
    <Stack spacing={2} width="100%" p={3}>
      <Input
        name="title"
        fontSize="0.875rem"
        placeholder="Title"
        value={textInputs.title}
        onChange={(e) => {
          onTextChange(e);
        }}
      />
      <Textarea
        name="body"
        fontSize="0.875rem"
        placeholder="Text (optional)"
        value={textInputs.body}
        onChange={(e) => {
          onTextChange(e);
        }}
      />
      <Flex justify="flex-end">
        <Button
          height="32px"
          disabled={true}
          onChange={() => {}}
          isLoading={loading}
        >
          Post
        </Button>
      </Flex>
    </Stack>
  );
};
export default TextInputs;
