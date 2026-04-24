'use client';

import { useState } from 'react';
import ProductCard from '@/components/common/ProductCard';

interface RecommendedSectionProps {
    title: string;
}

export default function RecommendedSection({ title }: RecommendedSectionProps) {
    const [activeTab, setActiveTab] = useState('위생용품');

    // 기존 6개 카테고리 구성 (위생용품, 기구, 의약품, 장비, 메디컬, 생활가전)
    const categories = ['위생용품', '기구', '의약품', '장비', '메디컬', '생활가전'];

    // 병의원 컨셉에 맞춘 현행화 데이터 (10종)
    const medicalProducts = [
        { brand: '3M', name: '3M 1860 N95 의료용 마스크 (20매입)', price: '28,000', thumbnail: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop' },
        { brand: 'Littmann', name: '리트만 클래식 III 청진기 (Black Edition)', price: '145,000', thumbnail: 'https://images.unsplash.com/photo-1584982324911-396564619932?w=400&h=400&fit=crop' },
        { brand: 'Omron', name: '오므론 전문가용 자동혈압계 (HEM-907)', price: '850,000', thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dad99988?w=400&h=400&fit=crop' },
        { brand: 'Bionet', name: '환자감시장치 BM3 (ECG, SpO2, NIBP)', price: '2,800,000', thumbnail: 'https://images.unsplash.com/photo-1516549221187-dc721347a3ad?w=400&h=400&fit=crop' },
        { brand: 'Ansell', name: 'Microflex 니트릴 검진 장갑 (Blue/100매)', price: '12,000', thumbnail: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=400&fit=crop' },
        { brand: '중외제약', name: '생리식염수 (1000ml/20병/박스)', price: '32,000', thumbnail: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop' },
        { brand: 'Kovax', name: '의료용 일회용 주사기 5cc (100개입)', price: '9,500', thumbnail: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=400&fit=crop' },
        { brand: 'Hanil', name: '냉장 원심분리기 FLETA 5', price: '4,200,000', thumbnail: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=400&fit=crop' },
        { brand: 'LG전자', name: '퓨리케어 360 공기청정기 (대형/병원용)', price: '1,250,000', thumbnail: 'https://images.unsplash.com/photo-1599423300746-b62533397364?w=400&h=400&fit=crop' },
        { brand: 'Medicom', name: '의료용 멸균 거즈 4x4 (100포/박스)', price: '15,000', thumbnail: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop' },
    ];

    return (
        <section className="w-full bg-white pt-[40px] pb-0 overflow-hidden">
            <div className="w-[1800px] h-[350px] mx-auto relative flex flex-col">
                {/* 1. Section Title */}
                <div className="mb-[20px]">
                    <h2 className="text-[20px] font-bold text-[#000000] leading-none mb-0">{title}</h2>
                </div>

                {/* 2. Category Buttons: 6 Tabs, Color #FF8807 */}
                <div className="flex gap-[4px] w-full mb-0 border-b-[1px] border-[#FF8807]">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            style={{
                                width: '135px',
                                height: '36px',
                            }}
                            className={`flex items-center justify-center text-[15px] font-semibold tracking-normal transition-all duration-200 border-none outline-none ${activeTab === cat
                                ? 'bg-[#FF8807] text-white'
                                : 'bg-[#F0F0F0] text-[#333333] hover:bg-gray-200'
                                }`}
                        >
                            <span style={{ lineHeight: '16px' }} className="flex items-center justify-center h-full align-middle">
                                {cat}
                            </span>
                        </button>
                    ))}
                </div>

                {/* 3. Content Area with Orange Border (#FF8807) */}
                {/* h-[220px] 내부에 카드가 안착되도록 패딩을 px-[14px] py-[4px]로 조정하여 튀어나옴 방지 */}
                <div className="relative border-[1.5px] border-[#FF8807] px-[14px] bg-white mt-[-1px] h-[220px] flex items-center">
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

                    {/* Right Arrow */}
                    <button className="absolute -right-[16px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#000000]/30 flex items-center justify-center text-white text-xl z-20 hover:bg-black/50 transition-colors">
                        ›
                    </button>
                </div>
            </div>
        </section>
    );
}
