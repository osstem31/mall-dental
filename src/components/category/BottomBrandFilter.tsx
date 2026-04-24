'use client';

import React, { useState } from 'react';

const BRANDS = [
    { name: '3M Medical', count: 195 },
    { name: 'Osstem Implant', count: 110 },
    { name: 'GE Healthcare', count: 27 },
    { name: 'Philips', count: 4 },
    { name: 'Medtronic', count: 29 },
    { name: 'Johnson & Johnson', count: 18 },
    { name: 'B.Braun', count: 15 },
    { name: 'Hu-Friedy', count: 30 },
    { name: 'Dentium', count: 28 },
    { name: 'Vatech', count: 34 },
    { name: 'Ray', count: 21 },
    { name: 'Medit', count: 52 },
    { name: 'Dentsply Sirona', count: 7 },
    { name: 'GC Korea', count: 48 },
    { name: 'Ivoclar Vivadent', count: 11 },
    { name: '기타', count: 34 }
];

export default function BottomBrandFilter() {
    const [activeBrand, setActiveBrand] = useState('3M Medical');

    return (
        <div className="w-full bg-[#F8F8F8] py-[15px] border-t border-[#DEDEDE]">
            <div className="w-[1800px] mx-auto flex flex-wrap justify-center items-center gap-x-[12px] gap-y-[8px]">
                {BRANDS.map((brand) => (
                    <button
                        key={brand.name}
                        onClick={() => setActiveBrand(brand.name)}
                        className={`h-[32px] px-[12px] flex items-center justify-center rounded-[4px] font-pretendard text-[14px] font-medium transition-all whitespace-nowrap ${activeBrand === brand.name
                                ? 'bg-[#EB6100] text-white'
                                : 'bg-white text-[#424242] border border-[#DEDEDE] hover:bg-gray-50'
                            }`}
                    >
                        {brand.name}
                        <span className={`ml-[4px] text-[12px] ${activeBrand === brand.name ? 'text-white/80' : 'text-[#999999]'}`}>
                            ({brand.count})
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
