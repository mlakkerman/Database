import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateCategory from "../components/modals/CreateCategory";
import CreateEvent from "../components/modals/CreateEvent";
import CreateSponsor from "../components/modals/CreateSponsor";

const Admin = () => {
    const [categoryVisible, setCategoryVisible] = useState(false)
    const [sponsorVisible, setSponsorVisible] = useState(false)
    const [eventVisible, setEventVisible] = useState(false)

    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setSponsorVisible(true)}
            >
                Добавить спонсора
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setCategoryVisible(true)}
            >
                Добавить категорию мероприятия
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setEventVisible(true)}
            >
                Добавить мероприятие
            </Button>
            <CreateCategory show={categoryVisible} onHide={() => setCategoryVisible(false)}/>
            <CreateEvent show={eventVisible} onHide={() => setEventVisible(false)}/>
            <CreateSponsor show={sponsorVisible} onHide={() => setSponsorVisible(false)}/>
        </Container>
    );
};

export default Admin;
