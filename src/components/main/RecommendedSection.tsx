'use client';

import { useState } from 'react';
import ProductCard from '@/components/common/ProductCard';

interface RecommendedSectionProps {
    title: string;
}

export default function RecommendedSection({ title }: RecommendedSectionProps) {
    const [activeTab, setActiveTab] = useState('교정');

    // 추천상품 섹션 카테고리 (12종)
    const categories = ['교정', '수복/접착', '기공', '위생/기타', '예방/구강', 'GBR', '기구', '인상/보철', '절삭/연마재', '의약품', '장비', '보존/근관'];

    // 병의원 컨셉에 맞춘 현행화 데이터 (10종)
    const medicalProducts = [
        { brand: '3M', name: '3M 1860 N95 의료용 마스크 (20매입)', price: '28,000', thumbnail: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop', relatedCount: 5 },
        { brand: 'Littmann', name: '리트만 클래식 III 청진기 (Black Edition)', price: '145,000', thumbnail: 'https://images.unsplash.com/photo-1584982324911-396564619932?w=400&h=400&fit=crop', relatedCount: 2 },
        { brand: 'Omron', name: '오므론 전문가용 자동혈압계 (HEM-907)', price: '850,000', thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dad99988?w=400&h=400&fit=crop', relatedCount: 8 },
        { brand: 'Bionet', name: '환자감시장치 BM3 (ECG, SpO2, NIBP)', price: '2,800,000', thumbnail: 'https://images.unsplash.com/photo-1516549221187-dc721347a3ad?w=400&h=400&fit=crop', relatedCount: 1 },
        { brand: 'Ansell', name: 'Microflex 니트릴 검진 장갑 (Blue/100매)', price: '12,000', thumbnail: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=400&fit=crop', relatedCount: 10 },
        { brand: '중외제약', name: '생리식염수 (1000ml/20병/박스)', price: '32,000', thumbnail: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop', relatedCount: 4 },
        { brand: 'Kovax', name: '의료용 일회용 주사기 5cc (100개입)', price: '9,500', thumbnail: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=400&fit=crop', relatedCount: 7 },
        { brand: 'Hanil', name: '냉장 원심분리기 FLETA 5', price: '4,200,000', thumbnail: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=400&fit=crop', relatedCount: 3 },
        { brand: 'LG전자', name: '퓨리케어 360 공기청정기 (대형/병원용)', price: '1,250,000', thumbnail: 'https://images.unsplash.com/photo-1599423300746-b62533397364?w=400&h=400&fit=crop', relatedCount: 9 },
        { brand: 'Medicom', name: '의료용 멸균 거즈 4x4 (100포/박스)', price: '15,000', thumbnail: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop', relatedCount: 6 },
    ];

    return (
        <section className="w-full bg-white pt-[40px] pb-0 overflow-hidden">
            <div className="w-[1800px] h-[350px] mx-auto relative flex flex-col">
                {/* 1. Section Title */}
                <div className="mb-[20px]">
                    <h2 className="text-[20px] font-bold text-[#000000] leading-none mb-0">{title}</h2>
                </div>

                {/* 2. Category Buttons: 12 Tabs, Evenly Distributed (1/n) */}
                <div className="flex w-full mb-0 border-b-[1px] border-[#FF8807] gap-[4px]">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={`flex-1 flex items-center justify-center h-[40px] text-[13px] font-bold transition-all duration-200 border-none outline-none ${activeTab === cat
                                ? 'bg-[#FF8807] text-white'
                                : 'bg-[#EEEEEE] text-[#333333] hover:bg-gray-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* 3. Content Area with Orange Border (#FF8807) */}
                {/* h-[220px] 내부에 카드가 안착되도록 패딩을 px-[14px] py-[4px]로 조정하여 튀어나옴 방지 */}
                <div className="relative border-[2px] border-[#FF8807] px-[14px] bg-white mt-[-1px] h-[220px] flex items-center">
                    {/* Left Arrow */}
                    <button className="absolute -left-[16px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#000000]/30 flex items-center justify-center text-white text-xl z-20 hover:bg-black/50 transition-colors">
                        ‹
                    </button>

                    {/* 10-Column Grid: w-full을 통해 내부 공간에 균등 배분 */}
                    <div className="grid grid-cols-10 gap-x-[9px] w-full items-center">
                        {medicalProducts.map((p, i) => (
                            <ProductCard
                                key={i}
                                {...p}
                                showBorder={false}
                            />
                        ))}
                    </div>


                </div>
            </div>
        </section>
    );
}
