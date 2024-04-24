import { Card, CardBody, Image, Text } from "@chakra-ui/react";
import React from "react";
import {
  RiFacebookCircleFill,
  RiGithubFill,
  RiInstagramLine,
  RiLinkedinBoxFill,
} from "react-icons/ri";
import iconDW from "../../assets/icon-dw.png";
export const FooterCard: React.FC = () => {
  return (
    <Card bgColor={"#262626"} color={"white"}>
      <CardBody>
        <Text display={"flex"} alignItems={"center"} gap={"3px"}>
          Developed by Restu •
          <Text as={"span"}>
            <RiGithubFill />
          </Text>
          <Text as={"span"}>
            <RiLinkedinBoxFill />
          </Text>
          <Text as={"span"}>
            <RiFacebookCircleFill />
          </Text>
          <Text as={"span"}>
            <RiInstagramLine />
          </Text>
        </Text>
        <Text
          fontSize={"0.6rem"}
          display={"flex"}
          alignItems={"center"}
          gap={"4px"}
        >
          Powered by <Image src={iconDW} width={"1.2rem"} display={"inline"} />{" "}
          DumbWays Indonesia • #1 CodingBootcamp
        </Text>
      </CardBody>
    </Card>
  );
};
