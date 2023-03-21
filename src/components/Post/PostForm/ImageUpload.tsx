import { Button, Flex, Stack } from "@chakra-ui/react";
import React, { useRef } from "react";

type ImageUploadProps = {
  onSelectImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFile?: string;
  setSelectedFile: (value: string) => void;
  setSelectedTab: (value: string) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  onSelectImage,
  selectedFile,
  setSelectedFile,
  setSelectedTab,
}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);
  return (
    <Flex justify="center" align="center" width="100%">
      <Flex
        border={selectedFile ? "1px solid black" : "1px dashed"}
        padding={20}
        width="100%"
        justify="center"
        align="center"
        borderRadius={4}
      >
        {selectedFile ? (
          <>
            <Flex height="100%" gap={4} flexDirection="column">
              <img src={selectedFile} alt="" />
              <Flex gap={4} justify="center" align="center">
                <Button
                  height="28px"
                  onClick={() => {
                    setSelectedTab("Post");
                  }}
                >
                  Post
                </Button>
                <Button
                  height="28px"
                  variant="outline"
                  onClick={() => {
                    setSelectedFile("");
                  }}
                >
                  Remove
                </Button>
              </Flex>
            </Flex>
          </>
        ) : (
          <Button
            variant="outline"
            color="black"
            borderColor="blackAlpha.500"
            onClick={() => selectedFileRef.current?.click()}
          >
            Upload
            <input
              type="file"
              ref={selectedFileRef}
              hidden
              onChange={(e) => {
                onSelectImage(e);
              }}
            />
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
export default ImageUpload;
