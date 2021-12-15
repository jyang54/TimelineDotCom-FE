import React, { useEffect, useState, useRef } from "react";
import AddIcon from "@material-ui/icons/Add";
// import SchoolIcon from "@material-ui/icons/School";
import WorkIcon from "@material-ui/icons/Work";
import Fab from "@material-ui/core/Fab";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "./vertical-load-more.css";
import { map } from "lodash";

import ModalWindow from "./ModalWindow.js";

import { useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

let dataExamples = [
  {
    // _id: "61b6693ad",
    title: "Content Marketing for Web, Mobile and Social Media",
    content: "Strategy, Social Media",
    startTime: "2021-12-12T21:27:22.290Z",
    endTime: "2021-12-12T21:27:22.290Z",
  },
  {
    // _id: "61b6693adf19",
    title: "Creative Director",
    content:
      "Creative Direction, User Experience, Visual Design, Project Management, Team Leading",
    startTime: "2021-1",
    endTime: "2021-15",
  },
];

const VerticalLoadMore = () => {
  const id = useParams().id || "61ba197a29e3ae8ec28cf8e8";
  const [elements, setElements] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [events, setEvents] = useState([]);
  const [num, setNum] = useState(2); // assign num to timeline elements
  // const [idx, setIdx] = useState([0, 1]);
  const username = localStorage.getItem("username") || "Visitor";

  // const[map, setMap] = useState(mapExamples);

  let createData = [
    {
      title: "title",
      content: "content",
    },
  ];

  useEffect(() => {
    axios
      .get(`/timeline/${id}`)
      .then((res) => {
        console.log(res.data.data[0]);
        if (res.data && res.data.data) {
          const { title, content, tag, category, events } = res.data.data[0];
          setTitle(title);
          setContent(content);
          setCategory(category);
          setTag(tag);
          setEvents(events);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      });
    // loadMore();
  }, []);

  const handleSubmit = (e) => {
    axios.put(`/timeline/${id}`, { events: events });
  };

  const addNewEvent = () => {
    const newArr = [...events, ...createData];
    setEvents(newArr);
    console.log(newArr);
    updateEvents(newArr);
    // console.log(elements.length + " in loadMore()");
  };

  const handleDelete = (e) => {
    const eventsCopy = [...events];
    console.log(eventsCopy);
    eventsCopy.splice(e.target.id, 1);
    setEvents(eventsCopy);
    updateEvents(eventsCopy);
  };

  const updateEvents = (newEvents) => {
    axios
      .put(`/timeline/${id}`, { events: newEvents })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      });
  };

  const helper = (index, title, content, startDate, endDate) => {
    const tempEvents = [...events];
    const tempObject = { ...tempEvents[index] };
    tempObject.title = title;
    tempObject.content = content;
    tempObject.startTime = startDate;
    tempObject.endTime = endDate;
    tempEvents[index] = tempObject;
    setEvents(tempEvents);
    updateEvents(tempEvents);
  };

  const getTimelineElements = () =>
    events.map((element, index) => {
      let props = {
        date: element.startTime + "-" + element.endTime,
        className: "vertical-timeline-element--work",
        contentStyle: { background: "rgb(33, 150, 243)", color: "#fff" },
        contentArrowStyle: { borderRight: "7px solid  rgb(33, 150, 243)" },
        iconStyle: { background: "rgb(33, 150, 243)", color: "#fff" },
        icon: <WorkIcon />,
      };
      return (
        <VerticalTimelineElement {...props} key={index}>
          <h3 className="vertical-timeline-element-title">{element.title}</h3>
          <p>{element.content}</p>

          <ModalWindow element={element} helper={helper} index={index}>
            {" "}
          </ModalWindow>
          {"   "}
          <button
            onClick={handleDelete}
            type="button"
            className="button"
            id={index}
          >
            Delete
          </button>
        </VerticalTimelineElement>
      );
    });

  // function arrayRemove(arr, value) {
  //   return arr.filter(function(ele){
  //       return ele !== value;
  //   });
  // }

  return (
    <div>
      <VerticalTimeline>
        {getTimelineElements()}

        <VerticalTimelineElement
          iconOnClick={addNewEvent}
          iconClassName="vertical-timeline-element-icon--button"
          icon={addButton()}
        />
      </VerticalTimeline>
    </div>
  );
};

function arrayRemove(arr, value) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]._id === value) {
      arr.splice(i, 1);
      break;
    }
  }
  return arr;
}

const addButton = () => (
  <Fab classes={{ root: "fab-button" }} color="primary" aria-label="add">
    <AddIcon />
  </Fab>
);

export default VerticalLoadMore;
