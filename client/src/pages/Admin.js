import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateCategory from "../components/modals/CreateCategory";
import CreateEvent from "../components/modals/CreateEvent";
import CreateOrganization from "../components/modals/CreateOrganization";

const Admin = () => {
    const [categoryVisible, setCategoryVisible] = useState(false)
    const [organizationVisible, setOrganizationVisible] = useState(false)
    const [eventVisible, setEventVisible] = useState(false)

    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setOrganizationVisible(true)}
            >
                Добавить НКО
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
            <CreateOrganization show={organizationVisible} onHide={() => setOrganizationVisible(false)}/>
        </Container>
    );
};

export default Admin;
