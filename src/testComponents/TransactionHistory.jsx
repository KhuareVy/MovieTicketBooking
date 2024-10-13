import React, { useState } from 'react'
import { Table, Modal, Typography, Space, Tag } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

// Sample static data for transactions
const transactions = [
    {
        id: 1,
        ticketCode: 'MOV001',
        purchaseDate: '2023-05-01',
        movieTitle: 'Inception',
        cinema: 'Cineplex Downtown',
        seatNumber: 'A12',
        quantity: 2,
        totalAmount: 25.00,
        showTime: '19:30',
        paymentMethod: 'Credit Card',
    },
    {
        id: 2,
        ticketCode: 'MOV002',
        purchaseDate: '2023-05-03',
        movieTitle: 'The Dark Knight',
        cinema: 'AMC Metropolis',
        seatNumber: 'B7, B8',
        quantity: 2,
        totalAmount: 30.00,
        showTime: '20:00',
        paymentMethod: 'PayPal',
    },
    {
        id: 3,
        ticketCode: 'MOV003',
        purchaseDate: '2023-05-05',
        movieTitle: 'Interstellar',
        cinema: 'IMAX City Center',
        seatNumber: 'D15',
        quantity: 1,
        totalAmount: 15.00,
        showTime: '18:45',
        paymentMethod: 'Debit Card',
    },
]

export default function Component() {
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedTransaction, setSelectedTransaction] = useState(null)

    const showModal = (record) => {
        setSelectedTransaction(record)
        setModalVisible(true)
    }

    const handleModalClose = () => {
        setModalVisible(false)
    }

    const columns = [
        {
            title: 'Ticket Code',
            dataIndex: 'ticketCode',
            key: 'ticketCode',
        },
        {
            title: 'Purchase Date',
            dataIndex: 'purchaseDate',
            key: 'purchaseDate',
        },
        {
            title: 'Movie Title',
            dataIndex: 'movieTitle',
            key: 'movieTitle',
        },
        {
            title: 'Cinema',
            dataIndex: 'cinema',
            key: 'cinema',
        },
        {
            title: 'Seat Number',
            dataIndex: 'seatNumber',
            key: 'seatNumber',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Details',
            key: 'details',
            render: (_, record) => (
                <a onClick={() => showModal(record)}>
                    <InfoCircleOutlined /> View Details
                </a>
            ),
        },
    ]

    return (
        <div style={{ margin: '0 200px' }}>
            <Title level={2} className="mb-4">Lịch Sử Giao Dịch</Title>
            <Table 
                dataSource={transactions} 
                columns={columns} 
                rowKey="id"
                pagination={{ pageSize: 5 }}
                responsive
            />
            <Modal
                title="Transaction Details"
                open={modalVisible}
                onCancel={handleModalClose}
                footer={null}
            >
                {selectedTransaction && (
                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                        <Text strong>Ticket Code: <Tag color="blue">{selectedTransaction.ticketCode}</Tag></Text>
                        <Text strong>Purchase Date: {selectedTransaction.purchaseDate}</Text>
                        <Text strong>Movie Title: {selectedTransaction.movieTitle}</Text>
                        <Text strong>Cinema: {selectedTransaction.cinema}</Text>
                        <Text strong>Seat Number: {selectedTransaction.seatNumber}</Text>
                        <Text strong>Quantity: {selectedTransaction.quantity}</Text>
                        <Text strong>Show Time: {selectedTransaction.showTime}</Text>
                        <Text strong>Total Amount: ${selectedTransaction.totalAmount.toFixed(2)}</Text>
                        <Text strong>Payment Method: {selectedTransaction.paymentMethod}</Text>
                    </Space>
                )}
            </Modal>
        </div>
    )
}