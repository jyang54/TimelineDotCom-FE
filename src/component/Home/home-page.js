
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import TimelineList from "../Timeline/timeline-list";

function Explore() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [timelines, setTimelines] = useState([]);
  useEffect(() => {
    axios
      .get("/timeline")
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
    <TimelineList timelines={timelines} isLoading={isLoading} />
  );
}

export default Explore;
