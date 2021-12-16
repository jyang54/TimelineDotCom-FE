import { Center, Heading } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import TimelineList from "../Timeline/timeline-list";

function Explore() {
  const [isLoading, setIsLoading] = useState(true);
  const [timelines, setTimelines] = useState([]);
  useEffect(() => {
    axios
      .get("https://timelinedotcom-be.herokuapp.com/timeline")
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
      <TimelineList timelines={timelines} isLoading={isLoading} />
    </>
  );
}

export default Explore;
