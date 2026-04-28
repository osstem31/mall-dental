'use client';

import React, { useState } from 'react';

interface Resource {
    id: number;
    type: string;
    badgeColor: string;
    title: string;
    source: string;
    thumbnail: string;
    duration?: string;
    link?: string;
}

interface RelatedResourcesSliderProps {
    resources: Resource[];
}

export default function RelatedResourcesSlider({ resources }: RelatedResourcesSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsToShow = 5;
    const totalPages = Math.ceil(resources.length / itemsToShow);
    const maxIndex = Math.max(0, (totalPages - 1) * itemsToShow);

    const handlePrev = () => {
        setCurrentIndex(prev => Math.max(0, prev - itemsToShow));
    };

    const handleNext = () => {
        setCurrentIndex(prev => Math.min(maxIndex, prev + itemsToShow));
    };

    // Card width: 225.9px, Gap: 7.6px
    const itemWidth = 225.9;
    const gap = 7.6;
    const scrollAmount = (itemWidth + gap) * currentIndex;

    return (
        <div className="w-[1160px]">
            <div className="flex justify-between items-center mb-[15px]">
                <h2 className="text-[18px] font-extrabold text-[#000000]">관련자료 보기</h2>
                {resources.length > itemsToShow && (
                    <div className="flex items-center w-[93px] h-[24px]">
                        <button 
                            onClick={handlePrev}
                            disabled={currentIndex === 0}
                            className={`w-[24px] h-[24px] border border-[#DEDEDE] flex items-center justify-center flex-none transition-colors ${currentIndex === 0 ? 'bg-[#f7f7f7] cursor-not-allowed' : 'bg-transparent hover:bg-white/20'}`}
                        >
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                                <path d="M10 4L6 8L10 12" stroke={currentIndex === 0 ? "#DEDEDE" : "#999999"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <div className="flex-1 h-[24px] flex items-center justify-center bg-transparent text-[14px] font-pretendard leading-[17px] tracking-[-0.5px] text-[#333333]">
                            {Math.floor(currentIndex / itemsToShow) + 1} / {totalPages}
                        </div>
                        <button 
                            onClick={handleNext}
                            disabled={currentIndex >= maxIndex}
                            className={`w-[24px] h-[24px] border border-[#DEDEDE] flex items-center justify-center flex-none transition-colors ${currentIndex >= maxIndex ? 'bg-[#f7f7f7] cursor-not-allowed' : 'bg-transparent hover:bg-white/20'}`}
                        >
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                                <path d="M6 4L10 8L6 12" stroke={currentIndex >= maxIndex ? "#DEDEDE" : "#333333"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            <div className="overflow-hidden w-[1160px]">
                <div 
                    className="flex flex-row items-center p-0 gap-[7.6px] h-[170px] transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${scrollAmount}px)` }}
                >
                    {resources.map(resource => (
                        <div 
                            key={resource.id} 
                            onClick={() => resource.link && window.open(resource.link, '_blank')}
                            className={`box-sizing-border-box w-[225.9px] h-[170px] flex-none flex flex-col group overflow-hidden border border-[#DEDEDE] transition-all hover:border-[#EB6100] ${resource.link ? 'cursor-pointer' : 'cursor-default'}`}
                        >
                            {/* Thumbnail Image Area */}
                            <div className="w-full h-[120px] relative overflow-hidden">
                                <img 
                                    src={resource.thumbnail} 
                                    alt={resource.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                {resource.type === '동영상' && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {/* 반투명 검정 원형 배경 + 흰색 삼각형 플레이 아이콘 */}
                                        <div className="w-[40px] h-[40px] bg-black/50 rounded-full flex items-center justify-center pl-[3px]">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                                                <path d="M8 5V19L19 12L8 5Z" />
                                            </svg>
                                        </div>
                                        {resource.duration && (
                                            <span className="absolute bottom-[6px] right-[6px] bg-black/70 text-white text-[10px] px-[4px] py-[1px] rounded-[2px] font-medium">
                                                {resource.duration}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col items-start pt-[7px] px-[10px] pb-[7px] gap-[10px] w-full h-[50px]">
                                <h3 className="w-full font-pretendard font-semibold text-[13px] leading-[18px] tracking-[-0.5px] text-[#1E1E1E] group-hover:text-[#EB6100] line-clamp-2 h-[36px] transition-colors overflow-hidden text-ellipsis">
                                    <span className="inline-block px-[7px] py-0 h-[16px] bg-[#EB6100] rounded-[2px] text-white text-[11px] font-semibold leading-[16px] mr-[8px] align-middle -mt-[2px]">
                                        {resource.type}
                                    </span>
                                    {resource.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
