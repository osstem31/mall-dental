'use client';

import { useState, useEffect } from 'react';

export default function TopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-[50px] right-[50px] w-[50px] h-[50px] bg-[#666666] text-white flex flex-col items-center justify-center gap-[2px] shadow-md z-[999] hover:bg-[#555555] transition-all group"
            aria-label="Scroll to top"
        >
            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" className="group-hover:-translate-y-0.5 transition-transform">
                <path d="M1 6L6 1L11 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[11px] font-bold tracking-wider">TOP</span>
        </button>
    );
}
