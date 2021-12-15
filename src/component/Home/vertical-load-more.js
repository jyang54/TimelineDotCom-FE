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

import ModalWindow from "./ModalWindow.js"

import { useDisclosure } from '@chakra-ui/react'
import axios from 'axios'


let dataExamples = [
  {
    "_id": "61b6693ad",
      "title": "Content Marketing for Web, Mobile and Social Media",
      "content": "Strategy, Social Media",
      "startTime": "2021-12-12T21:27:22.290Z",
      "endTime": "2021-12-12T21:27:22.290Z"
  },
  {
    "_id": "61b6693adf19",
      "title": "Creative Director",
      "content": "Creative Direction, User Experience, Visual Design, Project Management, Team Leading",
      "startTime": "2021-1",
      "endTime": "2021-15"
  },
];


const VerticalLoadMore = () => {
  const [elements, setElements] = useState(dataExamples);
  const username = localStorage.getItem("username") || "Visitor";
  

  let createData = [
    {
      "_id": "61b669",
        "title": "title",
        "content": "content",
        "startTime": "startTime",
        "endTime": "endTime"
    },
  ];
  

  useEffect(() => {
    axios.get(`/timeline/user/${username}`).then(response => {
      // if response === null, use default dataExamples; // when user make a new data;
    });
    loadMore();
  }, []);

  const loadMore = () => {
    setElements([...elements, ...createData]);
    console.log(elements.length + " in loadMore()");
  };

  const addButton = () => (
    <Fab classes={{ root: "fab-button" }} color="primary" aria-label="add">
      <AddIcon />
    </Fab>
  );

  const handleDelete = (e) => {
    const elementsCopy = [...elements];
    arrayRemove(elementsCopy, e.target.id);
    setElements(elementsCopy);
  };


  const getTimelineElements = () =>
    elements.map((element) => {
      // console.log("buttonid: "+"button"+element.props.id);
      if (element != null) {
        let props = {
          date: element.startTime + "-" + element.endTime,
          className: "vertical-timeline-element--work",
          contentStyle: { background: "rgb(33, 150, 243)", color: "#fff" },
          contentArrowStyle: { borderRight: "7px solid  rgb(33, 150, 243)" },
          iconStyle: { background: "rgb(33, 150, 243)", color: "#fff" },
          icon: <WorkIcon />,
        }
        return (
          <VerticalTimelineElement {...props} key={element._id}>
            <h3 className="vertical-timeline-element-title">{element.title}</h3>
            <p>{element.content}</p>

            <ModalWindow element={element} handleChangeDate={setElements}> </ModalWindow>
            {"   "}
            <button
              onClick={handleDelete}
              type="button"
              className="button"
              id={element._id}
            >
              Delete
            </button>
            
          </VerticalTimelineElement>
        );
      }
    });


  function arrayRemove(arr, value) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]._id === value) {
        arr.splice(i, 1);
        break;
      }
    }
    return arr;
  }

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
          iconOnClick={loadMore}
          iconClassName="vertical-timeline-element-icon--button"
          icon={addButton()}
        />

      </VerticalTimeline>
    </div>
  );
};

export default VerticalLoadMore;
