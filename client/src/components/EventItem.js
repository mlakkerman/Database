import React, { useContext } from 'react';
import { Card, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useHistory } from "react-router-dom"
import { EVENT_ROUTE } from "../utils/consts";
import { BsCalendar2Week } from "react-icons/bs";
import { MdOutlineStarOutline } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import { Context } from '../index';

const EventItem = ({ event, deleteEvent }) => { 
    const {user} = useContext(Context)
    const history = useHistory()
    const deleteCardEvent = async (e) => {
        e.stopPropagation();
        try {
            await deleteEvent(event.id);
        } catch (error) {
            console.log('Ошибка при удалении мероприятия: ', error);
        }
    };
    return (
        <Col md={3} className={"mt-3"} onClick={() => history.push(EVENT_ROUTE + '/' + event.id)}>
            <Card style={{ width: 200, cursor: 'pointer' }} border={"light"}>
                <Image width={200} height={200} src={process.env.REACT_APP_API_URL + event.img} />
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>{event.title}</div>
                    <div className="d-flex align-items-center">
                        <MdOutlineStarOutline size={22} />
                    </div>
                </div>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div style={{ fontSize: 12 }}> <BsCalendar2Week size={12} /> {new Date(event.date).toLocaleString()}</div>
                    {user.user.role === 'ADMIN' &&<IoTrashOutline size={22} onClick={deleteCardEvent} />}
                </div>
            </Card>
        </Col>
    );
};

export default EventItem;
