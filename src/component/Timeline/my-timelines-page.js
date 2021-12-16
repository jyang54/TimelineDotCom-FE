import { Center, Heading } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import TimelineList from "./timeline-list";

function MyTimeline() {
  const [timelines, setTimelines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const username = localStorage.getItem("username") || "test owner_username 2";
  useEffect(() => {
    axios
      .get(`/timeline/user/${username}`)
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
  }, []);
  return (
    <>
      <Center mt={2}>
        <Heading>My Timelines</Heading>
      </Center>
      <TimelineList timelines={timelines} isLoading={isLoading} />
    </>
  );
}

export default MyTimeline;
