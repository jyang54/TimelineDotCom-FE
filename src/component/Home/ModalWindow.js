import React, { useState, Component } from "react";
// import {Button, List, Image, Input,  Container, Search  } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../../normalize.css";
// import axios from 'axios'

import { Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { HelpOutlineRounded } from "@material-ui/icons";

function ModalWindow({ element, helper, index }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // console.log(element)
  const [title, setTitle] = useState(element.title);
  const [content, setContent] = useState(element.content);
  const [startTime, setStartTime] = useState(element.startTime);
  const [endTime, setEndTime] = useState(element.endTime);

  const handleChangeTitle = (e) => {
    console.log(element.title);
    setTitle(e.target.value);
  };

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  const handleChangeStartTime = (e) => {
    setStartTime(e.target.value);
  };

  const handleChangeEndTime = (e) => {
    setEndTime(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    helper(index, title, content, startTime, endTime);
    onClose();
  };

  return (
    <>
      <button onClick={onOpen} type="button" className="button">
        Edit
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <form onSubmit={handleSubmit}>
          <ModalContent>
            <ModalHeader>Edit Timeline</ModalHeader>
            <ModalCloseButton />

            <ModalBody pb={6}>
              <FormControl mt={4}>
                <FormLabel>Title</FormLabel>
                <Textarea
                  placeholder="Title"
                  rows={2}
                  defaultValue={title}
                  onChange={handleChangeTitle}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Content</FormLabel>

                <Textarea
                  placeholder="Content"
                  rows={6}
                  defaultValue={content}
                  onChange={handleChangeContent}
                />
              </FormControl>
              <FormControl>
                <FormLabel> StartTime </FormLabel>
                <Input
                  type="Date"
                  defaultValue={startTime}
                  onChange={handleChangeStartTime}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel> EndTime </FormLabel>
                <Input
                  type="Date"
                  defaultValue={endTime}
                  onChange={handleChangeEndTime}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Finish
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}

export default ModalWindow;
