import React, { useEffect, useState, useRef } from "react";
import AddIcon from "@material-ui/icons/Add";
import WorkIcon from "@material-ui/icons/Work";
import Fab from "@material-ui/core/Fab";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "./vertical-load-more.css";

import ModalWindow from "./ModalWindow.js";

import { IconButton, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { DeleteIcon } from "@chakra-ui/icons";
import DeleteAlertDialog from "./delete-alert-dialog";

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
    startTime: "2021-12-15",
    endTime: "2021-12-15",
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
  const [owner, setOwner] = useState("");
  const username = localStorage.getItem("username") || "Visitor";
  const history = useHistory();

  // default value
  let createData = [
    {
      title: "title",
      content: "content",
      startTime: "2021-12-15",
      endTime: "2022-12-15",
    },
  ];

  useEffect(() => {
    axios
      .get(`https://timelinedotcom-be.herokuapp.com/timeline/timeline/${id}`)
      .then((res) => {
        console.log(res.data.data[0]);
        if (res.data && res.data.data) {
          const { title, content, tag, category, events, owner_username } =
            res.data.data[0];
          setTitle(title);
          setContent(content);
          setCategory(category);
          setTag(tag);
          setEvents(events);
          setOwner(owner_username);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      });
    // loadMore();
  }, [id]);

  const handleSubmit = (e) => {
    axios.put(`https://timelinedotcom-be.herokuapp.com/timeline/${id}`, { events: events });
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

  const handleDeleteTimeline = (e) => {
    axios
      .delete(`https://timelinedotcom-be.herokuapp.com/timeline/${id}`)
      .then((res) => {
        history.push("/home");
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      });
  };

  const updateEvents = (newEvents) => {
    axios
      .put(`https://timelinedotcom-be.herokuapp.com/timeline/${id}`, { events: newEvents })
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

  const isOwner = () => {
    return username === owner;
  };

  const getTimelineElements = () => {
    let eventsCopy = [...events]
    eventsCopy.sort((a, b) => a.startTime - b.startTime)
    console.log(eventsCopy)
    return eventsCopy.map((element, index) => {
        let props = {
          date: (element.startTime ? element.startTime.split('T')[0] : "Not set") +
              "  to  " +
              (element.endTime ? element.endTime.split('T')[0] : " Not set"),
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
            <br />
            {isOwner() && (
              <ModalWindow element={element} helper={helper} index={index} />
            )}
            {"   "}
            {isOwner() && (
              <button
                onClick={handleDelete}
                type="button"
                className="button"
                id={index}
              >
                Delete
              </button>
            )}
          </VerticalTimelineElement>
        );
      });
    
  }
    
  
    

  // function arrayRemove(arr, value) {
  //   return arr.filter(function(ele){
  //       return ele !== value;
  //   });
  // }

  return (
    <div>
      {isOwner() && (
        <DeleteAlertDialog handleDeleteTimeline={handleDeleteTimeline} />
      )}
      <VerticalTimeline>
        {getTimelineElements()}
        {isOwner() && (
          <VerticalTimelineElement
            iconOnClick={addNewEvent}
            iconClassName="vertical-timeline-element-icon--button"
            icon={addButton()}
          />
        )}
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
