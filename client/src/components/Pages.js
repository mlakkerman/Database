import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Pagination } from "react-bootstrap";

const Pages = observer(() => {
    const { event } = useContext(Context)
    const pageCount = Math.ceil(event.totalCount / event.limit)
    const pages = []
    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }
    return (
        <Pagination className="mt-3 bg-dark text-white">
            <Pagination.Prev onClick={() => event.setPage(event.page - 1)} disabled={event.page === 1} />
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={event.page === page}
                    onClick={() => event.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
            <Pagination.Next onClick={() => event.setPage(event.page + 1)} disabled={event.page === pages.length} />
        </Pagination>
    );
});

export default Pages;
