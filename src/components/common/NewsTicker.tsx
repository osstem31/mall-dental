'use client';

import { useState } from 'react';

const newsItems = [
    { category: '산업', text: '허영구 회장 치과산업, K-컬처와 결합한 국가 산업 육성' },
    { category: '회무', text: '대한치의학회, "의사를 위한 치의학" 출간기념회' },
    { category: '병·의원', text: '기초 치의학 핵심 원리부터 다양한 임상까지' },
    { category: '산업', text: '치산협, 회장 이취임식 및 미래 비전 선포식' },
    { category: '산업', text: '치과산업 12.5억 상생기금 조성오스템 10억 원 출연' },
    { category: '산업', text: '허영구 회장 치과산업, K-컬처와 결합한 국가 산업 육성' },
    { category: '회무', text: '대한치의학회, "의사를 위한 치의학" 출간기념회' },
];

export default function NewsTicker() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="fixed bottom-0 left-0 w-full h-[35px] bg-[#DCE4F2] border-t border-[#C5D0E6] flex items-center z-[1000] overflow-hidden">
            {/* Left Control */}
            <div className="w-[35px] h-full bg-white border-r border-[#C5D0E6] flex items-center justify-center shrink-0 cursor-pointer hover:bg-gray-50">
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                    <path d="M1 1L6 6L11 1" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>

            {/* Scrolling Area */}
            <div className="flex-1 overflow-hidden relative h-full flex items-center">
                <div className="flex whitespace-nowrap animate-ticker">
                    {/* Duplicate the items to ensure seamless loop */}
                    {[...newsItems, ...newsItems].map((item, index) => (
                        <div key={index} className="flex items-center mx-[30px] cursor-pointer group">
                            <span className="text-[#0047BB] font-bold text-[16px] mr-[8px] whitespace-nowrap">[{item.category}]</span>
                            <span className="text-[#333333] text-[16px] font-medium group-hover:underline whitespace-nowrap">{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx global>{`
                @keyframes ticker {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                .animate-ticker {
                    animation: ticker 30s linear infinite;
                }
                .animate-ticker:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
}
