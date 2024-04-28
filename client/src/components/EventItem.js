import React from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from '../assets/star.png'
import {useHistory} from "react-router-dom"
import {EVENT_ROUTE} from "../utils/consts";
import { BsCalendar2Week } from "react-icons/bs";


const EventItem = ({event}) => {
    const history = useHistory()
    return (
        <Col md={3} className={"mt-3"} onClick={() => history.push(EVENT_ROUTE + '/' + event.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + event.img}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>{event.title}</div>
                    <div className="d-flex align-items-center">
                        <Image width={18} height={18} src={star}/>
                    </div>
                </div>
                <div> <BsCalendar2Week width={16} height={16} /> {new Date(event.date).toLocaleString()}</div>
            </Card>
        </Col>
    );
};

export default EventItem;
