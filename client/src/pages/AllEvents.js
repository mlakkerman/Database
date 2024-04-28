import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/SponsorBar";
import CategoryBar from "../components/CategoryBar";
import DeviceList from "../components/EventList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchCategories, fetchEvents, fetchSponsors} from "../http/eventAPI";
import Pages from "../components/Pages";

const Shop = observer(() => {
    const {event} = useContext(Context)

    useEffect(() => {
        fetchSponsors().then(data => event.setSponsors(data))
        fetchCategories().then(data => event.setCategories(data))
        fetchEvents(null, null, 1, 5).then(data => {
            event.setEvents(data.rows)
            event.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchEvents(event.selectedCategory.id, event.selectedSponsor.id, event.page, 3).then(data => {
            event.setEvents(data.rows)
            event.setTotalCount(data.count)
        })
    }, [event.page, event.selectedSponsor, event.selectedCategory,])

    return (
        <Container>
            <Row className="mr-auto">
            </Row>  
                
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
