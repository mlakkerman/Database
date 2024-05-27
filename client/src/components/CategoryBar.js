import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";

const CategoryBar = observer(() => {
    const {event} = useContext(Context)

    return (
        <Row className="d-flex ml-2">
            {event.categories.map(category =>
                <Card
                    style={{cursor:'pointer'}}
                    key={category.id}
                    className="p-3 mr-1"
                    onClick={() => event.setSelectedCategory(category)}
                    border={category.id === event.selectedCategory.id ? 'danger' : 'black'}
                >
                    {category.name}
                </Card>
            )}
        </Row>
    );
});

export default CategoryBar;
