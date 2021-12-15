import React, { useEffect, useState, useRef } from "react";
import AddIcon from "@material-ui/icons/Add";
import SchoolIcon from "@material-ui/icons/School";
import WorkIcon from "@material-ui/icons/Work";
import Fab from "@material-ui/core/Fab";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "./vertical-load-more.css";
// import timelineElements from "./timelineElements";
import { map } from "lodash";

import ModalWindow from "./ModalWindow.js"
// import { EditButton } from "./EditButton.js";

import { useDisclosure } from '@chakra-ui/react'
import axios from 'axios'

let dataExamples = [
  {
    props: {
      id: "data0",
      date: "2011 - present",
      className: "vertical-timeline-element--work",
      contentStyle: { background: "rgb(33, 150, 243)", color: "#fff" },
      contentArrowStyle: { borderRight: "7px solid  rgb(33, 150, 243)" },
      iconStyle: { background: "rgb(33, 150, 243)", color: "#fff" },
      icon: <WorkIcon />,
    },
    title: "Creative Director",
    subtitle: "Miami, FL",
    content:
      "Creative Direction, User Experience, Visual Design, Project Management, Team Leading",
  },
  {
    props: {
      id: "data1",
      date: "2010 - 2011",
      className: "vertical-timeline-element--education",
      contentStyle: { background: "rgb(233, 30, 99)", color: "#fff" },
      contentArrowStyle: { borderRight: "7px solid  rgb(233, 30, 99)" },
      iconStyle: { background: "rgb(233, 30, 99)", color: "#fff" },
      icon: <SchoolIcon />,
    },
    title: "Content Marketing for Web, Mobile and Social Media",
    subtitle: "Online Course",
    content: "Strategy, Social Media",
  },
];


let props = {
  date: "2011 - present",
  className: "vertical-timeline-element--work",
  contentStyle: { background: "rgb(33, 150, 243)", color: "#fff" },
  contentArrowStyle: { borderRight: "7px solid  rgb(33, 150, 243)" },
  iconStyle: { background: "rgb(33, 150, 243)", color: "#fff" },
  icon: <WorkIcon />,
}


dataExamples = [
  {
    "_id": "61b6693ad",
      "title": "Content Marketing for Web, Mobile and Social Media",
      "content": "Strategy, Social Media",
      "owner_username": "test owner_username 2",
      "category": "test category 2",
      // "tag": "test tag 2",
      "createTime": "2021-12-12T21:27:22.290Z",
  },
  {
    "_id": "61b6693adf19",
      "title": "Creative Director",
      "content": "Creative Direction, User Experience, Visual Design, Project Management, Team Leading",
      "owner_username": "test owner_username 2",
      "category": "test category 2",
      // "tag": "test tag 2",
      "createTime": "2021-12-12T21:27:22.290Z",
  },
];


// const mapExamples = new Map();
// mapExamples.set(0, dataExamples[0]);
// mapExamples.set(1, dataExamples[1]);

// class VerticalLoadMore extends Component {
const VerticalLoadMore = () => {
  const [elements, setElements] = useState(dataExamples);
  const [num, setNum] = useState(2); // assign num to timeline elements
  // const [idx, setIdx] = useState([0, 1]);
  const username = localStorage.getItem("username") || "Visitor";
  
  // const[map, setMap] = useState(mapExamples);

  let createData = [
    {
      props: {
        id: "data" + num,
        date: "date-tbd",
        className: "vertical-timeline-element--work",
        contentStyle: { background: "rgb(33, 150, 243)", color: "#fff" },
        contentArrowStyle: { borderRight: "7px solid  rgb(33, 150, 243)" },
        iconStyle: { background: "rgb(33, 150, 243)", color: "#fff" },
        icon: <WorkIcon />,
      },
      title: "title",
      subtitle: "subtitle",
      content: "content",
    },
  ];

  createData = [
    {
      "_id": "61b669",
        "title": "title",
        "content": "content",
        "owner_username": "test owner_username 2",
        "category": "test category 2",
        // "tag": "test tag 2",
        "createTime": "2021-12-",
    },
  ];
  

  useEffect(() => {
    axios.get(`/timeline/user/${username}`);
    loadMore();
  }, []);

  const loadMore = () => {
    setElements([...elements, ...createData]);
    // mapExamples.set(num, createData[0]);
    // setIdx([...[num], ...idx]);
    setNum(num + 1);
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

  

  // ref: https://chakra-ui.com/docs/overlay/modal
  // const { isOpen, onOpen, onClose } = useDisclosure()
  // const initialRef = useRef()
  // const finalRef = useRef()

  const getTimelineElements = () =>
    elements.map((element) => {
      // console.log("buttonid: "+"button"+element.props.id);
      if (element != null) {
        // let date = element.props.date;
        // let title = element.title;
        // let subtitle = element.subtitle
        // let content = element.content;
        return (
          <VerticalTimelineElement {...props} key={element._id}>
            <h3 className="vertical-timeline-element-title">{element.title}</h3>
            {/* <h4 className="vertical-timeline-element-subtitle">
              {element.subtitle}
            </h4> */}
            <p>{element.content}</p>

            {/* {EditButton()} */}
            <ModalWindow element={element}> </ModalWindow>

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
    // console.log("before" + arr.length);
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]._id === value) {
        arr.splice(i, 1);
        break;
      }
    }
    // console.log("after" + arr.length);
    return arr;
    // setElements(arr);
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
