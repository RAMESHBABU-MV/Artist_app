import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

interface Toast {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
}

interface ToastContextType {
    showToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: 'success' | 'error' | 'info') => {
        const id = Math.random().toString(36).substring(7);
        setToasts((prev) => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 4000);
    }, []);

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const getIcon = (type: Toast['type']) => {
        switch (type) {
            case 'success':
                return <CheckCircle size={20} />;
            case 'error':
                return <XCircle size={20} />;
            case 'info':
                return <AlertCircle size={20} />;
        }
    };

    const getColor = (type: Toast['type']) => {
        switch (type) {
            case 'success':
                return 'var(--success)';
            case 'error':
                return 'var(--error)';
            case 'info':
                return 'var(--accent-primary)';
            default:
                return 'var(--text-primary)';
        }
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed top-20 right-6 z-50 space-y-2">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg min-w-80 animate-slide-in"
                        style={{
                            backgroundColor: 'var(--bg-secondary)',
                            border: `1px solid ${getColor(toast.type)}`,
                        }}
                    >
                        <div style={{ color: getColor(toast.type) }}>{getIcon(toast.type)}</div>
                        <span className="flex-1 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                            {toast.message}
                        </span>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="p-1 opacity-60 hover:opacity-100 transition-opacity"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};
