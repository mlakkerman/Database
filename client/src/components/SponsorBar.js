import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import ListGroup from "react-bootstrap/ListGroup";

const SponsorBar = observer(() => {
    const {event} = useContext(Context)
    return (
        <ListGroup>
            {event.sponsors.map(sponsor =>
                <ListGroup.Item
                    style={{cursor: 'pointer'}}
                    active={sponsor.id === event.selectedSponsor.id}
                    onClick={() => event.setSelectedSponsor(sponsor)}
                    key={sponsor.id}
                >
                    {sponsor.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default SponsorBar;
