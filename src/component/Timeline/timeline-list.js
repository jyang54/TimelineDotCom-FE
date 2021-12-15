import { Box, CircularProgress, Flex, Grid } from "@chakra-ui/react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
function TimelineList({ timelines = [], isLoading = true }) {
  const history = useHistory();
  return (
    <Flex p={8} w={"100vw"} align={"center"} justify={"center"}>
      {isLoading ? (
        <CircularProgress isIndeterminate />
      ) : (
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          {timelines.map((c) => (
            <Box
              key={c._id}
              rounded={"lg"}
              bg={"white"}
              boxShadow={"md"}
              p={10}
              onClick={(e) => {
                history.push(`/timeline/${c._id}`);
              }}
              cursor="pointer"
            >
              {c.title}
            </Box>
          ))}
        </Grid>
      )}
    </Flex>
  );
}

export default TimelineList;
