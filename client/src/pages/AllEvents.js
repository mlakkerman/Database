import React, { useContext, useEffect } from 'react';
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OrganizationBar from "../components/OrganizationBar";
import CategoryBar from "../components/CategoryBar";
import EventList from "../components/EventList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchCategories, fetchEvents, fetchOrganizations } from "../http/eventAPI";
import Pages from "../components/Pages";

const Shop = observer(() => {
    const { event } = useContext(Context)

    useEffect(() => {
        fetchOrganizations().then(data => event.setOrganizations(data))
        fetchCategories().then(data => event.setCategories(data))
        fetchEvents(null, null, 1, 8).then(data => {
            event.setEvents(data.rows)
            event.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchEvents(event.selectedCategory.id, event.selectedOrganization.id, event.page, 8).then(data => {
            event.setEvents(data.rows)
            event.setTotalCount(data.count)
        })
    }, [event.page, event.selectedOrganization, event.selectedCategory, event.totalCount])

    return (
        <Container>
            <Row className="mr-auto d-flex align-items-center pt-3">
                <h4 style={{fontStyle: 'italic'}}>Платформа EventMaster представляет собой агрегатор, разработанный специально для некоммерческих организаций (НКО), который предоставляет информацию о различных событиях, проводимых НКО в городе Самара.</h4>
            </Row>
            <Row className="mt-4">
                <Col md={3}>
                    <Row className="d-flex justify-content-center"><h5>Организаторы</h5></Row>
                    <OrganizationBar />
                </Col>
                <Col md={9}>
                    <Row className="d-flex justify-content-center"><h5>Сортрировка по категориям мероприятий</h5></Row>
                    <CategoryBar />
                    <EventList />
                    <Row className="d-flex align-items-end justify-content-center mb-4">
                        <Pages />
                    </Row>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
