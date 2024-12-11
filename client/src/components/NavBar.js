import React, { useContext } from 'react';
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, ALLEVENTS_ROUTE, LOGIN_ROUTE, CREATE_EVENT_ROUTE, REGISTRATION_EVENTS_ROUTE } from "../utils/consts";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { useHistory } from 'react-router-dom'
const NavBar = observer(() => {
    const { user } = useContext(Context)
    const history = useHistory()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="dark" variant="dark" className="p-3">
            <Container className="d-flex justify-content-between">
                <NavLink style={{ color: 'white', fontSize: 20, textDecoration: 'none' }} to={ALLEVENTS_ROUTE}>EventMaster</NavLink>
                {user.isAuth ?
                    <>
                        {user.user.role === 'ADMIN' && <Button
                            variant={"outline-light"}
                            onClick={() => history.push(ADMIN_ROUTE)}
                            className="ml-auto"
                        >
                            Админ панель
                        </Button>}
                        {user.user.role === 'USER' && <Button  // && user.user.organizationid
                            variant={"outline-light"}
                            onClick={() => history.push(CREATE_EVENT_ROUTE)}
                            className="ml-auto"
                        >
                            Предложить мероприятие
                        </Button>}
                        {user.user.role === 'USER' && <Button
                            variant={"outline-light"}
                            onClick={() => history.push(REGISTRATION_EVENTS_ROUTE)}
                            className="ml-auto"
                        >
                            Ваши мероприятия
                        </Button>}
                        <Button
                            variant={"outline-light"}
                            onClick={() => logOut()}
                            className="ml-2"
                        >
                            Выйти
                        </Button>
                    </>
                    :
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>

    );
});

export default NavBar;
