import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import EventItem from "./EventItem";

const EventList = observer(({events}) => {
   const {event} = useContext(Context);
   const eventsFromContext = event?.events;
   const handleDeleteEvent = async (id) => {
       event.deleteEvent(id);
   };
   
   const finalEvents = events || eventsFromContext;
   
   if (!finalEvents) {
       return null;
   }

   return (
      <Row className="d-flex">
          {finalEvents.map((event) => (
              <EventItem key={event.id} event={event} deleteEvent={handleDeleteEvent} />
          ))}
      </Row>
   );
});

export default EventList;
