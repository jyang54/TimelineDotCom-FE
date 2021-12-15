import React, { Component } from "react";
// import {Button, List, Image, Input,  Container, Search  } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import styles from './Search.scss';
import "../../normalize.css";
// import axios from 'axios'

import { Box, Button } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
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
    
    return (
      <>
      <button
        onClick={onOpen}
        type="button"
        className="button"
        // id={"edit" + element.props.id}
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
            <FormLabel>Date </FormLabel>
            <Input placeholder='Date' defaultValue={element.createTime}/>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Title</FormLabel>
            {/* name={element.props.id} */}
            {/* <Input placeholder='Title' key={element.props.date} defaultValue={this.props.element.props.title} onChange={handleTitle}/> */}
            {/* <Input placeholder='Title' defaultValue={element.title} onChange={handleTitle}/> */}
            <Textarea placeholder='Title' rows={2} defaultValue={element.title} onChange={handleTitle}/>
          </FormControl>

            {/* <FormControl mt={4}>
              <FormLabel>Subtitle</FormLabel>
              <Textarea placeholder='Subtitle' rows={2} defaultValue={element.subtitle}/>
            </FormControl> */}

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
