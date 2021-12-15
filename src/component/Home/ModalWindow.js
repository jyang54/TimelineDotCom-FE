import React, { useState, Component } from "react";
// import {Button, List, Image, Input,  Container, Search  } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../../normalize.css";
// import axios from 'axios'

import { Button } from "@chakra-ui/react";
import { useDisclosure } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import {
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'


function ModalWindow({element}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleTitle = (e) => {
      console.log(e.target.value);
      console.log(e.target);
    }
    console.log(element)
    const [value, setValue] = useState(null);

    return (
      <>
      <button
        onClick={onOpen}
        type="button"
        className="button"
      >
      Edit
      </button>


      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Timeline</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel> StartTime </FormLabel>
            <Input type="Date" defaultValue={element.startTime}/>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel> EndTime </FormLabel>
            <Input type="Date" defaultValue={element.endTime}/>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Title</FormLabel>
            <Textarea placeholder='Title' rows={2} defaultValue={element.title} onChange={handleTitle}/>
          </FormControl>

            <FormControl mt={4}>
              <FormLabel>Content</FormLabel>

              <Textarea placeholder='Content' rows={6} defaultValue={element.content}/>
            </FormControl>

          </ModalBody>
  
          <ModalFooter>
            <Button onClick={onClose} colorScheme='blue' mr={3}>
              Finish
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </>
    )
  };

export default ModalWindow;
