import React, { useState } from 'react';
import {
    CalendarDays,
    Clock3,
    Timer,
    MapPin,
    Plus,
    CheckCircle2,
    AlertCircle,
    CircleDot,
    StickyNote,
} from 'lucide-react';
import './Bookings.css';
import { motion, AnimatePresence } from 'framer-motion';

type BookingStatus = 'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled';

interface Booking {
    id: number;
    name: string;
    initials: string;
    service: string;
    date: string;
    time: string;
    duration: string;
    location: string;
    amount: string;
    status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
    notes?: string;
    avatarBg: string;
}

const Bookings: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<BookingStatus>('all');

    const summaryCards = [
        { label: 'Upcoming', value: 3, icon: <CalendarDays size={22} />, color: '#3b82f6' },
        { label: 'Pending', value: 2, icon: <AlertCircle size={22} />, color: '#f59e0b' },
        { label: 'Done', value: 2, icon: <CheckCircle2 size={22} />, color: '#10b981' },
    ];

    const filters: { key: BookingStatus; label: string; color: string }[] = [
        { key: 'all', label: 'All', color: '#3b82f6' },
        { key: 'pending', label: 'Pending', color: '#f59e0b' },
        { key: 'confirmed', label: 'Confirmed', color: '#10b981' },
        { key: 'completed', label: 'Completed', color: '#8b5cf6' },
        { key: 'cancelled', label: 'Cancelled', color: '#ef4444' },
    ];

    const allBookings: Booking[] = [
        {
            id: 1,
            name: 'Priya Sharma',
            initials: 'PS',
            service: 'Bridal Makeup Package',
            date: 'Mar 5, 2026',
            time: '9:00 AM',
            duration: '3 hrs',
            location: "Client's Home, Banjara Hills",
            amount: '₹15,000',
            status: 'Confirmed',
            notes: 'Traditional South Indian bridal look',
            avatarBg: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
        },
        {
            id: 2,
            name: 'Ananya Verma',
            initials: 'AV',
            service: 'Party Makeup',
            date: 'Mar 5, 2026',
            time: '4:00 PM',
            duration: '1.5 hrs',
            location: 'Studio - Jubilee Hills',
            amount: '₹3,500',
            status: 'Pending',
            avatarBg: 'linear-gradient(135deg, #a855f7, #7c3aed)',
        },
        {
            id: 3,
            name: 'Meera Patel',
            initials: 'MP',
            service: 'Pre-Wedding Shoot Makeup',
            date: 'Mar 6, 2026',
            time: '6:00 AM',
            duration: '2 hrs',
            location: 'Ramoji Film City',
            amount: '₹8,000',
            status: 'Confirmed',
            notes: 'Outdoor shoot, waterproof products needed',
            avatarBg: 'linear-gradient(135deg, #f59e0b, #d97706)',
        },
    ];

    const filteredBookings = activeFilter === 'all'
        ? allBookings
        : allBookings.filter((b) => b.status.toLowerCase() === activeFilter);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Confirmed': return '#10b981';
            case 'Pending': return '#f59e0b';
            case 'Completed': return '#8b5cf6';
            case 'Cancelled': return '#ef4444';
            default: return '#64748b';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bookings-page"
        >
            {/* Header */}
            <div className="bookings-header">
                <div>
                    <h1 className="bookings-title">Bookings</h1>
                    <span className="bookings-subtitle">{allBookings.length} total appointments</span>
                </div>
                <button className="add-btn" id="add-booking">
                    <Plus size={20} />
                </button>
            </div>

            {/* Summary Cards */}
            <div className="summary-cards">
                {summaryCards.map((card, index) => (
                    <motion.div
                        key={index}
                        className="summary-card"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                        <div className="summary-icon" style={{ color: card.color }}>
                            {card.icon}
                        </div>
                        <span className="summary-value">{card.value}</span>
                        <span className="summary-label">{card.label}</span>
                    </motion.div>
                ))}
            </div>

            {/* Filter Chips */}
            <div className="filter-chips">
                {filters.map((filter) => (
                    <button
                        key={filter.key}
                        className={`filter-chip ${activeFilter === filter.key ? 'active' : ''}`}
                        onClick={() => setActiveFilter(filter.key)}
                        style={activeFilter === filter.key ? {
                            background: `${filter.color}20`,
                            borderColor: `${filter.color}40`,
                            color: filter.color,
                        } : {}}
                    >
                        <CircleDot size={12} style={{ color: filter.color }} />
                        {filter.label}
                        {activeFilter === filter.key && <span className="chip-close">×</span>}
                    </button>
                ))}
            </div>

            {/* Bookings List */}
            <div className="bookings-list-header">
                <h3>All Bookings</h3>
                <span className="results-count">{filteredBookings.length} results</span>
            </div>

            <div className="bookings-list">
                <AnimatePresence>
                    {filteredBookings.map((booking, index) => (
                        <motion.div
                            key={booking.id}
                            className="booking-card"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                        >
                            <div className="card-top">
                                <div className="card-left">
                                    <div className="card-avatar" style={{ background: booking.avatarBg }}>
                                        {booking.initials}
                                    </div>
                                    <div className="card-person">
                                        <span className="card-name">{booking.name}</span>
                                        <span className="card-service">{booking.service}</span>
                                    </div>
                                </div>
                                <span className="card-status" style={{ color: getStatusColor(booking.status) }}>
                                    <span className="status-dot" style={{ background: getStatusColor(booking.status) }}></span>
                                    {booking.status}
                                </span>
                            </div>

                            <div className="card-details">
                                <span className="card-detail">
                                    <CalendarDays size={13} /> {booking.date}
                                </span>
                                <span className="card-detail">
                                    <Clock3 size={13} /> {booking.time}
                                </span>
                                <span className="card-detail">
                                    <Timer size={13} /> {booking.duration}
                                </span>
                            </div>

                            <div className="card-bottom">
                                <span className="card-location">
                                    <MapPin size={13} /> {booking.location}
                                </span>
                                <span className="card-amount">{booking.amount}</span>
                            </div>

                            {booking.notes && (
                                <div className="card-notes">
                                    <StickyNote size={13} />
                                    <span>{booking.notes}</span>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Bookings;
