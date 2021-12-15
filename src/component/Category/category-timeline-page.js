import { Box } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function CategoryTimeline() {
  const { id: categoryName } = useParams();
  useEffect(() => {
    axios
      .get(`/timeline/category/${categoryName}`)
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      });
  }, []);
  return <Box></Box>;
}

export default CategoryTimeline;
