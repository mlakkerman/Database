import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Pagination} from "react-bootstrap";

const Pages = observer(() => {
    const {event} = useContext(Context)
    const pageCount = Math.ceil(event.totalCount / event.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }
    console.log('Страницы:', pages, 'Общее количество:', event.totalCount, 'Лимит:', event.limit); // это помогает отладить код
    return (
        <Pagination className="mt-3">
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={event.page === page}
                    onClick={() => event.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default Pages;
