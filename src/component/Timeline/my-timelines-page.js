import { Center, Heading } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import TimelineList from "./timeline-list";
import { Button } from "@chakra-ui/button";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function MyTimeline() {
  const history = useHistory();
  const [timelines, setTimelines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const username = localStorage.getItem("username") || "test owner_username 2";
  useEffect(() => {
    axios
      .get(`https://timelinedotcom-be.herokuapp.com/timeline/user/${username}`)
      .then((res) => {
        console.log(res.data.data);
        setTimelines(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      });
  }, [username]);
  
  return (
    <>
      <Center mt={2}>
        <Heading>My Timelines</Heading>
      </Center>
      <TimelineList timelines={timelines} isLoading={isLoading} />

      <Button
        size="lg"
        bg={"teal.400"}
        color={"white"}
        _hover={{
          bg: "teal.500",
        }}
        onClick={(e) => {
          history.push(`/timeline/new`);
        }}
      > New </Button>

    </>

  );
}

export default MyTimeline;
