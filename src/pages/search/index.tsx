import React, { useEffect, useState } from "react";
import RootLayout from "../../layouts/RootLayout";
import {
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";
import { IUser } from "../../types/app";
import { search } from "../../libs/api/call/search";
import ShowUser from "../../components/user/ShowUser";
import { getSuggestions } from "../../libs/api/call/user";
import { useAppSelector } from "../../store";
import { ProfileCard } from "../../components/profile";

const Search: React.FC = () => {
  const [formSearch, setFormSearch] = useState<string>("");
  const [users, setUsers] = useState<IUser[] | null>(null);
  const user = useAppSelector((state) => state.auth).user;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormSearch(e.target.value);
  };

  const searching = async () => {
    try {
      const res = await search(formSearch);
      setUsers(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSuggestion = async () => {
    try {
      const res = await getSuggestions();
      setUsers(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await searching();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (formSearch) {
      searching();
    } else {
      fetchSuggestion();
    }
  }, [formSearch]);

  return (
    <RootLayout
      title="Search"
      childrenMain={
        <>
          <form onSubmit={handleSearch} style={{ paddingInline: "1rem", marginTop: "1rem" }}>
            <FormControl>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <RiSearchLine color="gray.300" />
                </InputLeftElement>
                <Input
                  type="text"
                  onChange={handleChange}
                  name="user"
                  placeholder="Search"
                  _placeholder={{ color: "gray" }}
                  focusBorderColor="white"
                  borderColor={"gray"}
                />
              </InputGroup>
            </FormControl>
          </form>

          <Flex p={5} flexDir={"column"} h={"80%"}>
            {users && users.length === 0 ? (
              <Flex
                h={"full"}
                flexDir={"column"}
                color={"white"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Text fontSize={"1.2rem"} fontWeight={"bold"}>
                  No results for <q>{formSearch}</q>{" "}
                </Text>
                <Text as={"span"} w={"80%"} color={"gray"} textAlign={"center"}>
                  Try searching for something else or check the spelling of what
                  you typed.
                </Text>
              </Flex>
            ) : (
              users?.map((user) => <ShowUser key={user.id} user={user} />)
            )}
          </Flex>
        </>
      }
      childrenAside={<>{user && <ProfileCard user={user} bgColor="#262626" />}</>}
    />
  );
};

export default Search;
