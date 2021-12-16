import React, { useState, Component } from "react";
function SearchResultView({events}) {
  console.log("here in view ")

    
  return (
    events.map(event => {
      // console.log("here: "+ event._source.title)
      return (
          <div> what {event._source.title} </div>
      )
    })
  )

}

export default SearchResultView;
