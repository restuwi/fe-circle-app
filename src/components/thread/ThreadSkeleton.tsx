import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import React from "react";

export const ThreadSkeleton: React.FC = () => {
  return (
    <Box padding="6" boxShadow="lg" borderY={"1px solid rgba(255,255,255,0.2)"}>
      <SkeletonCircle size="10" />
      <SkeletonText
        mt="4"
        noOfLines={3}
        spacing="4"
        skeletonHeight="2"
        startColor="#262626"
        endColor="gray"
      />
    </Box>
  );
};

