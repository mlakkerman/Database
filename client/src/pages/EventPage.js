import React, { useEffect, useState, useContext } from 'react';
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from 'react-router-dom'
import { fetchOneEvent, fetchOrganizations, fetchCategories, registerToEvent, checkRegistration } from "../http/eventAPI";
import { Context } from "../index";

const EventPage = () => {
    const { user } = useContext(Context);
    const [event, setEvent] = useState({ info: [] })
    const [organization, setOrganization] = useState({})
    const [category, setCategory] = useState({})
    const [registered, setRegistered] = useState(false)
    const { id } = useParams()
    useEffect(() => {
        fetchOneEvent(id).then(data => {
            setEvent(data)
            fetchOrganizations().then(orgs => {
                const org = orgs.find(o => o.id === data.organizationId)
                setOrganization(org)
            })
            fetchCategories().then(cats => {
                const cat = cats.find(c => c.id === data.categoryId)
                setCategory(cat)
            })
            checkRegistration(id, user.user.id).then(res => setRegistered(res))
        })
    }, [])
    const handleButtonClick = () => {
        registerToEvent(id, user.user.id).then(_ => {
            alert("Вы успешно зарегистрировались на мероприятие!")
            setRegistered(true)
        }).catch(e => console.error(e));
    }
    return (
        <Container className="mt-3">
            <Row>
                <Col md={5}>
                    <Image width={350} height={350} src={process.env.REACT_APP_API_URL + event.img} />
                </Col>
                <Col md={7}>
                    <Row className="d-flex flex-column">
                        <h2>{event.name}</h2>
                        <h4>Категория: {category.name}</h4>
                        <h4>НКО, проводящее мероприятие: {organization.name}</h4>
                        <h4>Дата проведения: {new Date(event.date).toLocaleString()}</h4>
                        <h4>Адрес проведения: {event.address}</h4>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col className="mt-3">
                    <Card className="p-3">
                        <h3>Описание мероприятия:</h3>
                        {event.description}
                    </Card>
                    <div className="d-flex justify-content-center">
                        {user.user.role === 'USER' ? <Button className="mt-3 pl-3 pr-3" variant={"outline-dark"} onClick={handleButtonClick}>{registered ? "Вы уже зарегистрированы на это мероприятие" : "Я пойду!"}</Button> : null}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default EventPage;
