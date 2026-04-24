'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { CATEGORIES } from '@/data/categories';

import { SUB_CATEGORY_COUNTS, BRANDS, BRAND_COUNTS, CATEGORY_TOTALS } from '@/data/categoryData';

interface TopCategoryTabsProps {
    viewType: 'brand' | 'category';
    setViewType: (val: 'brand' | 'category') => void;
    activeSub: string;
    setActiveSub: (val: string) => void;
    activeBrand: string | null;
    setActiveBrand: (val: string | null) => void;
}

export default function TopCategoryTabs({
    viewType,
    setViewType,
    activeSub,
    setActiveSub,
    activeBrand,
    setActiveBrand
}: TopCategoryTabsProps) {
    const searchParams = useSearchParams();
    const categoryName = searchParams.get('name') || '위생용품';

    const currentCategory = CATEGORIES.find(c => c.name === categoryName) || CATEGORIES[0];

    // Toggle view and reset selections
    const handleViewTypeToggle = (newView: 'brand' | 'category') => {
        if (newView === viewType) return;
        setViewType(newView);
        setActiveSub('전체');
        setActiveBrand(null);
    };

    const isBrandView = viewType === 'brand';
    // 공통 데이터 연동
    const displayItems: { name: string; count?: number }[] = isBrandView
        ? BRANDS.map((brand) => ({ name: brand, count: BRAND_COUNTS[brand] }))
        : currentCategory.subCategories.map(sub => ({
            name: sub,
            count: SUB_CATEGORY_COUNTS[categoryName]?.[sub] || 0
        }));

    // 브랜드 탭의 '전체' 버튼 수량 계산
    const allCount = CATEGORY_TOTALS[categoryName] || 0;

    const isPrevention = categoryName === '예방/구강';
    const isImplant = categoryName === '임플란트';
    const useTextTabStyle = isImplant || isPrevention;

    return (
        <div
            className={`w-[1800px] mx-auto relative mb-[20px] flex items-center border-b border-[#EEEEEE] bg-white`}
            style={{ minHeight: '52px' }}
        >
            <div className="flex items-center w-full relative">
                {/* 1단계: '전체' 버튼 - 카테고리 뷰에서만 노출 */}
                {!isBrandView && (
                    <div className="flex-shrink-0 mr-[25px]">
                        <button
                            onClick={() => setActiveSub('전체')}
                            className={`flex flex-row items-center h-[52px] shrink-0 transition-colors relative ${activeSub === '전체'
                                ? 'text-[#111111] font-bold'
                                : 'text-[#666666] font-medium hover:text-[#111111]'
                                }`}
                        >
                            <span
                                className="text-[14px] leading-[100%] tracking-[-0.03em] whitespace-nowrap"
                                style={{ fontFamily: 'Pretendard' }}
                            >
                                전체 {activeSub === '전체' && <span className="font-normal">({allCount.toLocaleString()})</span>}
                            </span>
                            {activeSub === '전체' && (
                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#111111]" />
                            )}
                        </button>
                    </div>
                )}

                {/* 나머지 필터 리스트 */}
                <div className={`flex items-center gap-x-[25px] overflow-x-auto no-scrollbar pr-[200px]`}>
                    {displayItems.map((item, index) => {
                        const isActive = isBrandView ? activeBrand === item.name : activeSub === item.name;
                        
                        return (
                            <button
                                key={index}
                                onClick={() => {
                                    if (isBrandView) {
                                        setActiveBrand(activeBrand === item.name ? null : item.name);
                                    } else {
                                        setActiveSub(item.name);
                                    }
                                }}
                                className={`flex flex-row items-center h-[52px] shrink-0 transition-colors relative ${isActive ? 'text-[#111111] font-bold' : 'text-[#666666] font-medium hover:text-[#111111]'}`}
                            >
                                <span
                                    className="text-[14px] leading-[100%] tracking-[-0.03em] whitespace-nowrap"
                                    style={{ fontFamily: 'Pretendard' }}
                                >
                                    {item.name} {item.count !== undefined && `(${item.count.toLocaleString()})`}
                                </span>
                                {isActive && (
                                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#111111]" />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* 우측 뷰 토글 스위치 */}
                <div className="absolute flex items-center right-0 top-1/2 -translate-y-1/2 gap-[10px]">
                    <div className="flex bg-white rounded-[4px] border border-[#BBBBBB]" style={{ height: '34px', padding: '1px' }}>
                        <button
                            onClick={() => handleViewTypeToggle('category')}
                            className={`px-[18px] flex items-center justify-center transition-all text-center whitespace-nowrap h-full rounded-[3px] ${!isBrandView
                                ? 'bg-[#333333] text-white font-medium'
                                : 'bg-transparent text-[#111111] font-normal'
                                }`}
                            style={{
                                fontFamily: 'Pretendard',
                                fontSize: '13px',
                                letterSpacing: '-0.5px'
                            }}
                        >
                            카테고리
                        </button>
                        <button
                            onClick={() => handleViewTypeToggle('brand')}
                            className={`px-[18px] flex items-center justify-center transition-all text-center whitespace-nowrap h-full rounded-[3px] ${isBrandView
                                ? 'bg-[#333333] text-white font-medium'
                                : 'bg-transparent text-[#111111] font-normal'
                                }`}
                            style={{
                                fontFamily: 'Pretendard',
                                fontSize: '13px',
                                letterSpacing: '-0.5px'
                            }}
                        >
                            브랜드
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
