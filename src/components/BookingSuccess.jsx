// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useLocation } from 'react-router-dom';
import TicketCard from './TicketCard';

export default function BookingSuccess() {
    const location = useLocation();
    const {ticketinfor} = location.state || {ticketinfor: null};

    return (
        <>
            <h1 style={
                {textAlign: 'center',
                fontSize: '30px',
                fontWeight: 'bold',
                marginTop: '20px',
                marginBottom: '20px'}
            }>Đặt vé thành công</h1>
            <TicketCard key={0} ticket={ticketinfor} index={0} />
        </>
    )
}