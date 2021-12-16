import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import TimelineList from "../Timeline/timeline-list";

function CategoryTimeline() {
  const { id: categoryName } = useParams();
  const [timelines, setTimelines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`https://timelinedotcom-be.herokuapp.com/timeline/category/${categoryName}`)
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
  }, [categoryName]);
  return <TimelineList timelines={timelines} isLoading={isLoading}/>;
}

export default CategoryTimeline;
