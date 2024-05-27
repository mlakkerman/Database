import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import {createSponsor} from "../../http/eventAPI";

const CreateSponsor = ({show, onHide}) => {
    const [name, setName] = useState('')
    const [logo, setLogo] = useState(null)
    const [url, setUrl] = useState('')
    const addSponsor = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('logo', logo)
        formData.append('websiteUrl', url)
        createSponsor(formData).then(data => onHide())
    }
    const selectLogo = e => {
        setLogo(e.target.files[0])
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder={"Введите название организатора"}
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectLogo}
                    />
                    <Form.Control
                    className="mt-3"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        placeholder={"Введите URL ссылку на сайт организации"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addSponsor}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateSponsor;
