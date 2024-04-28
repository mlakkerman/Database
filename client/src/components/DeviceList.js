import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import EventItem from "./EventItem";

const EventList = observer(() => {
    const {event} = useContext(Context)

    return (
        <Row className="d-flex">
            {event.events.map(event =>
                <EventItem key={event.id} event={event}/>
            )}
        </Row>
    );
});

export default EventList;
