import React from 'react';
import {
    Settings,
    Mail,
    Phone,
    MapPin,
    CheckCircle2,
    Star,
    Award,
    ChevronRight,
    UserPen,
    Image,
    BadgeCheck,
    IndianRupee,
    Zap,
    Trophy,
} from 'lucide-react';
import './Profile.css';
import { AuthService } from '../services/AuthService';
import { motion } from 'framer-motion';

const Profile: React.FC = () => {
    const user = AuthService.getCurrentUser();

    const profileData = {
        name: 'Divya',
        title: 'Professional Makeup Artist',
        location: 'Bangalore, India',
        bio: 'Certified bridal & fashion makeup artist with 6+ years of experience. Specializing in HD airbrush, traditional & modern bridal looks.',
        email: user?.email || 'divya.artist@gmail.com',
        phone: '+91 98765 43210',
        profileCompletion: 80,
        stats: {
            bookings: 128,
            rating: 5,
            reviews: 36,
            experience: '6 yrs',
        },
    };

    const badges = [
        { label: 'Top Rated', icon: <Trophy size={14} />, color: '#ef4444', bgColor: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.2)' },
        { label: 'Verified', icon: <CheckCircle2 size={14} />, color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.2)' },
        { label: 'Quick Responder', icon: <Zap size={14} />, color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.2)' },
    ];

    const accountItems = [
        { label: 'Edit Profile', desc: 'Update your personal details', icon: <UserPen size={18} />, color: '#3b82f6', count: null },
        { label: 'Portfolio', desc: 'Manage your work gallery', icon: <Image size={18} />, color: '#ec4899', count: 24 },
        { label: 'Certifications', desc: 'Your certifications & training', icon: <BadgeCheck size={18} />, color: '#10b981', count: 3 },
    ];

    const businessItems = [
        { label: 'Earnings', desc: 'View reports & payouts', icon: <IndianRupee size={18} />, color: '#f59e0b', value: '₹42.3K' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="profile-page"
        >
            {/* Header */}
            <div className="profile-header">
                <h1 className="profile-page-title">Profile</h1>
                <button className="settings-btn" id="profile-settings">
                    <Settings size={20} />
                </button>
            </div>

            {/* Profile Card */}
            <div className="profile-card">
                <div className="profile-top">
                    <div className="profile-avatar">
                        <span className="avatar-letter">D</span>
                        <span className="verified-badge">
                            <CheckCircle2 size={14} />
                        </span>
                    </div>
                    <div className="profile-identity">
                        <h2 className="profile-name">{profileData.name}</h2>
                        <span className="profile-title">{profileData.title}</span>
                        <span className="profile-location">
                            <MapPin size={12} /> {profileData.location}
                        </span>
                    </div>
                </div>

                <p className="profile-bio">{profileData.bio}</p>

                {/* Profile Completion */}
                <div className="completion-section">
                    <div className="completion-header">
                        <span className="completion-label">Profile Complete</span>
                        <span className="completion-percent">{profileData.profileCompletion}%</span>
                    </div>
                    <div className="completion-bar">
                        <motion.div
                            className="completion-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${profileData.profileCompletion}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                        />
                    </div>
                </div>

                {/* Contact Info */}
                <div className="contact-info">
                    <div className="contact-item">
                        <Mail size={15} className="contact-icon" />
                        <span>{profileData.email}</span>
                    </div>
                    <div className="contact-item">
                        <Phone size={15} className="contact-icon" />
                        <span>{profileData.phone}</span>
                    </div>
                </div>
            </div>

            {/* Badges */}
            <div className="badges-row">
                {badges.map((badge, index) => (
                    <motion.div
                        key={index}
                        className="badge-chip"
                        style={{
                            background: badge.bgColor,
                            borderColor: badge.borderColor,
                            color: badge.color,
                        }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                        {badge.icon}
                        <span>{badge.label}</span>
                    </motion.div>
                ))}
            </div>

            {/* Stats */}
            <div className="stats-row">
                <div className="stat-item">
                    <span className="stat-number">{profileData.stats.bookings}</span>
                    <span className="stat-label">Bookings</span>
                </div>
                <div className="stat-divider" />
                <div className="stat-item">
                    <span className="stat-number">
                        {profileData.stats.rating} <Star size={14} fill="#f59e0b" color="#f59e0b" />
                    </span>
                    <span className="stat-label">{profileData.stats.reviews} reviews</span>
                </div>
                <div className="stat-divider" />
                <div className="stat-item">
                    <span className="stat-number">{profileData.stats.experience}</span>
                    <span className="stat-label">Experience</span>
                </div>
            </div>

            {/* Account Section */}
            <div className="section-group">
                <span className="group-label">ACCOUNT</span>
                <div className="menu-items">
                    {accountItems.map((item, index) => (
                        <motion.div
                            key={index}
                            className="menu-item"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.08, duration: 0.3 }}
                        >
                            <div className="menu-icon" style={{
                                background: `${item.color}15`,
                                color: item.color,
                            }}>
                                {item.icon}
                            </div>
                            <div className="menu-info">
                                <span className="menu-label">{item.label}</span>
                                <span className="menu-desc">{item.desc}</span>
                            </div>
                            <div className="menu-right">
                                {item.count !== null && (
                                    <span className="menu-count" style={{ color: item.color }}>{item.count}</span>
                                )}
                                <ChevronRight size={18} className="menu-arrow" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Business Section */}
            <div className="section-group">
                <span className="group-label">BUSINESS</span>
                <div className="menu-items">
                    {businessItems.map((item, index) => (
                        <motion.div
                            key={index}
                            className="menu-item"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.3 }}
                        >
                            <div className="menu-icon" style={{
                                background: `${item.color}15`,
                                color: item.color,
                            }}>
                                {item.icon}
                            </div>
                            <div className="menu-info">
                                <span className="menu-label">{item.label}</span>
                                <span className="menu-desc">{item.desc}</span>
                            </div>
                            <div className="menu-right">
                                <span className="menu-value" style={{ color: '#10b981' }}>{item.value}</span>
                                <ChevronRight size={18} className="menu-arrow" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Profile;
