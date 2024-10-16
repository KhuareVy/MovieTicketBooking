/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Card, Typography, Row, Col } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';

const { Text, Title } = Typography;

export default function TicketCard({ ticket, index }) {
    return (
        <Card key={index} className="mb-4" bordered={false} style={{ width: '30vw', margin: '30px auto' }}>
            <CheckCircleTwoTone style={
                { fontSize: '50px',
                color: '#52c41a',
                display: 'block',
                margin: '0 auto',
                marginBottom: '20px' }
            } />
            <Row justify="center" align="middle" gutter={[16, 16]}>
                <Col span={24}>
                    <Title level={5}>Mã vé: {ticket.ticketId}</Title>
                </Col>
                <Col span={24}>
                    <Text type="secondary">Phim: </Text>
                    <Text>{ticket.movieName}</Text>
                </Col>
                <Col span={24}>
                    <Text type="secondary">Rạp: </Text>
                    <Text>{ticket.cinemaName}</Text>
                </Col>
                <Col span={24}>
                    <Text type="secondary">Phòng chiếu: </Text>
                    <Text>{ticket.screenNumber}</Text>
                </Col>
                <Col span={24}>
                    <Text type="secondary">Ngày chiếu: </Text>
                    <Text>{ticket.showDate}</Text>
                </Col>
                <Col span={24}>
                    <Text type="secondary">Suất chiếu: </Text>
                    <Text>{ticket.startTime}</Text>
                </Col>
                <Col span={24}>
                    <Text type="secondary">Ghế: </Text>
                    <Text>{ticket.seatNumber.join(', ')}</Text>
                </Col>
                <Col span={24}>
                    <Text type="secondary">Ngày đặt vé: </Text>
                    <Text>{ticket.bookingDate}</Text>
                </Col>
                <Col span={24}>
                    <Text type="secondary">Người đặt: </Text>
                    <Text>{ticket.userName}</Text>
                </Col>
                <Col span={24}>
                    <Text type="secondary">Tổng tiền: </Text>
                    <Text strong>{ticket.totalAmount.toLocaleString()} đ</Text>
                </Col>
            </Row>
        </Card>
    );
}