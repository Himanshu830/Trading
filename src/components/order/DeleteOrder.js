import React, { useState } from 'react';
import Layout from '../layout/Layout';

const DeleteOrder = (props) => {
    const [deleted, setDeleted] = useState(false)

    

    const deleteOrderHtml = () => (
        'delete order'
    );

    return (
        <Layout>
            { deleteOrderHtml() }
        </Layout>
    )
};

export default DeleteOrder;