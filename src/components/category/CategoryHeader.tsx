'use client';

import React from 'react';

interface CategoryHeaderProps {
    totalCount: number;
    filters: {
        isCompanyOnly: boolean;
        isInsuranceOnly: boolean;
    };
    setFilters: {
        setIsCompanyOnly: (val: boolean) => void;
        setIsInsuranceOnly: (val: boolean) => void;
    };
}

export default function CategoryHeader({ totalCount, filters, setFilters }: CategoryHeaderProps) {
    const [activeSort, setActiveSort] = React.useState('등록일순');
    const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('desc');

    const handleSortClick = (label: string) => {
        if (activeSort === label) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setActiveSort(label);
            setSortOrder('desc'); // New sort defaults to desc
        }
    };

    const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const categoryName = searchParams?.get('name') || '';
    const isImplant = categoryName === '임플란트';

    const sortOptions = isImplant ? ['규격순', '등록인순'] : ['등록일순', '인기순', '가격순', '상품명순'];

    return (
        <div className="flex justify-between items-center h-[32px] mb-[20px] relative w-[1800px] mx-auto">
            {/* 총 개수 */}
            <div className="font-pretendard text-[14px] leading-[17px] tracking-[-0.5px] text-[#000000]">
                <span className="font-bold text-[#EB6100]">{Math.max(1, totalCount).toLocaleString()}</span>개 제품이 있습니다.
            </div>

            <div className="flex items-center">
                {/* 정렬 버튼 영역 */}
                <div className="flex items-center">
                    {sortOptions.map((label, i) => {
                        const isActive = activeSort === label;
                        return (
                            <button
                                key={i}
                                onClick={() => handleSortClick(label)}
                                className={`h-[32px] flex items-center justify-center gap-[4px] border bg-white font-pretendard text-[13px] transition-all hover:bg-gray-50 relative ${isActive ? 'text-[#000000] font-bold border-[#424242] z-10' : 'text-[#BBBBBB] border-[#BBBBBB] z-0'
                                    } ${i !== 0 ? 'ml-[-1px]' : ''} w-[92px]`}
                            >
                                {label}
                                {isActive && (
                                    <div className="flex items-center justify-center ml-[2px]">
                                        {sortOrder === 'asc' ? (
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M12 19V5M5 12l7-7 7 7" />
                                            </svg>
                                        ) : (
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M12 5v14M5 12l7 7 7-7" />
                                            </svg>
                                        )}
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
