import React, { useState } from "react";
import { Button, Row, Col, Typography } from "antd";

const { Title } = Typography;

const totalSeats = 30; // Tổng số ghế

const BookingPage = () => {
    // Tạo mảng ghế ngồi với 30 ghế
    const [seats, setSeats] = useState(
        Array.from({ length: totalSeats }, (_, index) => ({
            id: index + 1,
            seatNumber: `Ghế ${index + 1}`,
            isBooked: false, // Tất cả ghế đều chưa được đặt
        }))
    );

    // Xử lý khi chọn ghế
    const handleSeatSelect = (seatId) => {
        const updatedSeats = seats.map((seat) =>
            seat.id === seatId ? { ...seat, isBooked: true } : seat
        );
        setSeats(updatedSeats);
        alert(`Đặt ${updatedSeats.find(seat => seat.id === seatId).seatNumber} thành công!`);
    };

    return (
        <div style={{ padding: "20px" }}>
            <Title level={2}>Chọn Ghế</Title>
            <Row gutter={[16, 16]}>
                {seats.map((seat) => (
                    <Col span={4} key={seat.id}>
                        <Button
                            type={seat.isBooked ? "primary" : "default"}
                            disabled={seat.isBooked}
                            onClick={() => handleSeatSelect(seat.id)}
                            style={{
                                width: "100%",
                                height: "60px",
                                fontSize: "16px",
                                backgroundColor: seat.isBooked ? "#f5222d" : "#ffffff",
                                color: seat.isBooked ? "#ffffff" : "#000000",
                            }}
                        >
                            {seat.seatNumber}
                        </Button>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default BookingPage;
