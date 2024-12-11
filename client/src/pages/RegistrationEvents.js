import React, { useEffect, useState, useContext } from 'react';
import { getRegisteredEvents } from '../http/eventAPI';
import { Context } from "../index";
import EventList from "../components/EventList";
import { Container, Row, Col } from 'react-bootstrap';

const RegistrationEvents = () => {
    const [events, setEvents] = useState([]);
    const { user } = useContext(Context);

    useEffect(() => {
        getRegisteredEvents(user.user.id).then(data => setEvents(data));
    }, [user.user.id]);

    return (
        <Container>
            <Row className="justify-content-md-center mt-3">
                <Col md="auto">
                    <h1>Мероприятия, на которые вы зарегистрировались</h1>
                </Col>
            </Row>
            <EventList className="mt-3" events={events} />
        </Container>
    )
};

export default RegistrationEvents;
