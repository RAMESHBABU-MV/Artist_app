import React, { useState } from 'react';
import {
    Search,
    Plus,
    Clock,
    Users,
    Star,
    ArrowRight,
    Sparkles,
    Palette,
    Leaf,
    Heart,
} from 'lucide-react';
import './Services.css';
import { motion } from 'framer-motion';

interface Service {
    id: number;
    name: string;
    description: string;
    duration: string;
    booked: number;
    price: string;
    rating: number;
    icon: React.ReactNode;
    iconColor: string;
}

const Services: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const services: Service[] = [
        {
            id: 1,
            name: 'Bridal Makeup',
            description: 'Complete bridal makeup with hairstyling and draping for your special day',
            duration: '3 hrs',
            booked: 89,
            price: '₹15,000',
            rating: 4.9,
            icon: <Heart size={18} />,
            iconColor: '#ef4444',
        },
        {
            id: 2,
            name: 'Facial & Skin Prep',
            description: 'Pre-event skin prep facial with hydration and glow treatment',
            duration: '1.5 hrs',
            booked: 13,
            price: '₹3,000',
            rating: 4.3,
            icon: <Sparkles size={18} />,
            iconColor: '#10b981',
        },
        {
            id: 3,
            name: 'Editorial / Fashion Makeup',
            description: 'Creative, bold looks for photoshoots, portfolios & fashion shows',
            duration: '2.5 hrs',
            booked: 21,
            price: '₹10,000',
            rating: 4.8,
            icon: <Palette size={18} />,
            iconColor: '#ec4899',
        },
        {
            id: 4,
            name: 'Natural / No-Makeup Look',
            description: "Subtle enhancement for a 'my skin but better' natural glow",
            duration: '1 hr',
            booked: 58,
            price: '₹2,000',
            rating: 4.3,
            icon: <Leaf size={18} />,
            iconColor: '#22c55e',
        },
        {
            id: 5,
            name: 'Party Makeup',
            description: 'Glamorous party-ready look for any occasion or celebration',
            duration: '1 hr',
            booked: 71,
            price: '₹2,500',
            rating: 4.7,
            icon: <Sparkles size={18} />,
            iconColor: '#f59e0b',
        },
    ];

    const filteredServices = services.filter((s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <Star
                    key={i}
                    size={12}
                    fill={i < Math.floor(rating) ? '#f59e0b' : 'transparent'}
                    color={i < Math.floor(rating) ? '#f59e0b' : '#475569'}
                    strokeWidth={1.5}
                />
            );
        }
        return stars;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="services-page"
        >
            {/* Header */}
            <div className="services-header">
                <div>
                    <h1 className="services-title">Services</h1>
                    <span className="services-subtitle">{services.length} beauty services offered</span>
                </div>
                <button className="add-btn" id="add-service">
                    <Plus size={20} />
                </button>
            </div>

            {/* Search Bar */}
            <div className="search-bar">
                <Search size={18} className="search-icon" />
                <input
                    type="text"
                    placeholder="Search services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                    id="search-services"
                />
            </div>

            {/* Service Cards */}
            <div className="services-list">
                {filteredServices.map((service, index) => (
                    <motion.div
                        key={service.id}
                        className="service-card"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08, duration: 0.3 }}
                    >
                        <div className="service-top">
                            <div className="service-left">
                                <div className="service-icon" style={{
                                    background: `${service.iconColor}15`,
                                    color: service.iconColor,
                                }}>
                                    {service.icon}
                                </div>
                                <div className="service-info">
                                    <span className="service-name">{service.name}</span>
                                    <span className="service-desc">{service.description}</span>
                                </div>
                            </div>
                        </div>

                        <div className="service-meta">
                            <span className="service-detail">
                                <Clock size={13} /> {service.duration}
                            </span>
                            <span className="service-detail">
                                <Users size={13} /> {service.booked} booked
                            </span>
                        </div>

                        <div className="service-bottom">
                            <span className="service-price">{service.price}</span>
                            <div className="service-right">
                                <div className="service-rating">
                                    {renderStars(service.rating)}
                                    <span className="rating-value">{service.rating}</span>
                                </div>
                                <button className="view-details-btn">
                                    View Details <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {filteredServices.length === 0 && (
                    <div className="empty-state">
                        <Search size={32} className="empty-icon" />
                        <p>No services found matching "{searchQuery}"</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Services;
