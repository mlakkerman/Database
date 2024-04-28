import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import {Context} from "../../index";
import {createEvent, fetchCategories, fetchEvents, fetchSponsors} from "../../http/eventAPI";
import {observer} from "mobx-react-lite";

const CreateEvent = observer(({show, onHide}) => {
    const {event} = useContext(Context)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])
    const [date, setDate] = useState('')

    useEffect(() => {
        fetchSponsors().then(data => event.setSponsors(data))
        fetchCategories().then(data => event.setCategories(data))
    }, [])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addEvent = () => {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('img', file)
        formData.append('date', date)
        formData.append('categoryId', event.selectedCategory.id)
        formData.append('sponsorId', event.selectedSponsor.id)
        formData.append('info', JSON.stringify(info))
        createEvent(formData).then(data => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавление мероприятия
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{event.selectedSponsor.name || "Выберите спонсора"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {event.sponsors.map(sponsor =>
                                <Dropdown.Item
                                    onClick={() => event.setSelectedSponsor(sponsor)}
                                    key={sponsor.id}
                                >
                                    {sponsor.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{event.selectedCategory.name || "Выберите категорию МП"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {event.categories.map(category =>
                                <Dropdown.Item
                                    onClick={() => event.setSelectedCategory(category)}
                                    key={category.id}
                                >
                                    {category.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название мероприятия"
                    />
                    <Form.Control
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="mt-3"
                        placeholder="Введите описание мероприятия"
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <Form.Control
                      className="mt-3"
                      type="datetime-local"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                  />
                    <hr/>
                    <Button
                        variant={"outline-dark"}
                        onClick={addInfo}
                    >
                        Добавить новое свойство
                    </Button>
                    {info.map(i =>
                        <Row className="mt-4" key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    placeholder="Введите название свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    placeholder="Введите описание свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeInfo(i.number)}
                                    variant={"outline-danger"}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addEvent}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateEvent;