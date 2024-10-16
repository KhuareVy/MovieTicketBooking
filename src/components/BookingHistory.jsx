// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from 'react';
import { _get } from '../config/axiosConfig';
import { message } from 'antd';
import TicketCard from './TicketCard';

export default function BookingHistory() {
    const [bookingHistory, setBookingHistory] = useState([]);

    useEffect(() => {
        const fetchBookingHistory = async () => {
            try {
                const response = await _get('/bookings/history');
                const bookingHistoryData = await response.data;
                setBookingHistory(bookingHistoryData);
            } catch (error) {
                message.error('Error fetching booking history');
                console.error('Error fetching booking history:', error);
            }
        };

        fetchBookingHistory();
    }, []);

    // console.log(bookingHistory);

    return (
        <>
            <h1 style={
                {textAlign: 'center',
                fontSize: '30px',
                fontWeight: 'bold',
                marginTop: '20px',
                marginBottom: '20px'}
            }>
                Lịch sử đặt vé
            </h1>
            {bookingHistory.map((booking, index) => (
                <TicketCard key={index} ticket={booking} index={index} />
            ))}
        </>
    )
}