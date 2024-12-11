import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import {useHistory} from 'react-router-dom'
import CreateEvent from "../components/modals/CreateEvent";
import {ALLEVENTS_ROUTE} from "../utils/consts";

const Moderation = () => {
    const [eventVisible, setEventVisible] = useState(true)
    const history = useHistory()

    const handleBackToHome = () => {
        history.push(ALLEVENTS_ROUTE)
    }

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center" style={{height: '80vh'}}>
            <CreateEvent show={eventVisible} onHide={() => setEventVisible(false)}/>
            <h4 className="mt-3">Ваше мероприятие подано на обработку</h4>
            <Button className="mt-3" onClick={handleBackToHome}>Вернуться на главную</Button>
        </Container>
    );
};

export default Moderation;
