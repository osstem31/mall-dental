'use client';

import React, { useState, useEffect } from 'react';

interface StickyProductBarProps {
    thumbnail: string;
    name: string;
    price: string;
}

const StickyProductBar: React.FC<StickyProductBarProps> = ({ thumbnail, name, price }) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleAddToCart = () => {
        const el = document.getElementById('add-to-cart-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => {
            // Show when scrolled past 600px (approx product info area)
            if (window.scrollY > 700) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed top-[40px] left-0 w-full bg-white border-b border-[#E9E9E9] z-[90] h-[64px] flex items-center shadow-sm">
            <div className="w-[1160px] mx-auto flex items-center justify-between px-0">
                <div className="flex items-center gap-4">
                    {/* Product Thumbnail */}
                    <div className="w-[48px] h-[48px] border border-[#EEEEEE] flex items-center justify-center p-1 bg-white">
                        <img src={thumbnail} alt={name} className="w-full h-full object-contain" />
                    </div>

                    {/* Product Basic Info */}
                    <div className="flex flex-col">
                        <h3 className="text-[14px] font-bold text-[#333333] leading-none mb-1">{name}</h3>
                        <div className="flex items-center gap-2">
                            <span className="bg-[#F4F4F4] text-[#888888] text-[10px] px-1 py-0.5 font-bold">임플란트 PKG</span>
                            <span className="text-[17px] font-black text-[#000000] leading-none">{price}원</span>
                        </div>
                    </div>
                </div>

                {/* Add to Cart Button */}
                <button 
                    onClick={handleAddToCart}
                    className="w-[240px] h-[48px] bg-[#EB6100] text-white text-[15px] font-bold hover:bg-[#d55700] transition-colors leading-none"
                >
                    주문서 담기
                </button>
            </div>
        </div>
    );
};

export default StickyProductBar;
