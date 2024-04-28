import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/TypeBar";
import CategoryBar from "../components/CategoryBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchCategories, fetchDevices, fetchEvents, fetchTypes} from "../http/eventAPI";
import Pages from "../components/Pages";

const Shop = observer(() => {
    const {event} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => event.setTypes(data))
        fetchCategories().then(data => event.setCategories(data))
        fetchEvents(null, null, 1, 2).then(data => {
            event.setEvents(data.rows)
            event.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchEvents(event.selectedType.id, event.selectedCategory.id, event.page, 2).then(data => {
            event.setEvents(data.rows)
            event.setTotalCount(data.count)
        })
    }, [event.page, event.selectedType, event.selectedCategory,])

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <CategoryBar/>
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
