import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import ListGroup from "react-bootstrap/ListGroup";

const OrganizationBar = observer(() => {
    const {event} = useContext(Context)
    return (
        <ListGroup>
            {event.organizations.map(organization =>
                <ListGroup.Item
                    style={{cursor: 'pointer'}}
                    active={organization.id === event.selectedOrganization.id}
                    onClick={() => event.setSelectedOrganization(organization)}
                    key={organization.id}
                >
                    {organization.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default OrganizationBar;
