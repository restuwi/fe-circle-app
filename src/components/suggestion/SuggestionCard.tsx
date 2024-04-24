import {
  Card,
  CardBody,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IUser } from "../../types/app";
import { getSuggestions } from "../../libs/api/call/user";
import ShowUser from "../user/ShowUser";

export const SuggestionCard: React.FC = () => {
  const [suggestions, setSuggestions] = useState<IUser[]>([]);

  const fetchSuggestions = async () => {
    try {
      const response = await getSuggestions();
      setSuggestions(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  return (
    <Card bgColor={"#262626"} color={"white"}>
      <CardBody>
        <Text mb={"10px"}>Suggested for you</Text>
        {suggestions?.map((suggestion) => (
          <ShowUser key={suggestion.id} user={suggestion} />
        ))}
      </CardBody>
    </Card>
  );
};
