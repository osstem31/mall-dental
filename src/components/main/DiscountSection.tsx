'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { formatRelatedCount } from '@/utils/format';

interface DiscountSectionProps {
    title: string;
}

export default function DiscountSection({ title }: DiscountSectionProps) {
    const router = useRouter();
    const dummyProducts = [
        { brand: 'Bio-Shield', name: '의료용 알코올 스왑 70% (100매입) 5개입', discount: '50%', price: '12,500', thumbnail: 'https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=400&h=400&fit=crop', relatedCount: 85 },
        { brand: 'Yuhan', name: '유한락스 의료용 살균소독제 (2L) 3개입', discount: '30%', price: '18,000', thumbnail: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=400&h=400&fit=crop', relatedCount: 42 },
        { brand: '3M', name: '넥스케어 고탄력 밴드 혼합형 (50매)', discount: '20%', price: '8,000', thumbnail: 'https://images.unsplash.com/photo-1590611380053-da6447021fbb?w=400&h=400&fit=crop', relatedCount: 99 },
        { brand: 'Medicom', name: '덴탈 마스크 (블루/50매입) 10개입', discount: '40%', price: '45,000', thumbnail: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop', relatedCount: 13 },
        { brand: 'Philips', name: '피립스 비접촉식 적외선 체온계', discount: '15%', price: '65,000', thumbnail: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&h=400&fit=crop', relatedCount: 50 },
        { brand: 'GreenCross', name: '멀티 비타민 미네랄 (병원전용) 3개월분', discount: '25%', price: '45,000', thumbnail: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=400&fit=crop', relatedCount: 30 },
        { brand: 'Osstem', name: '오스템 건강기능식품 선물세트 (종합)', discount: '10%', price: '55,000', thumbnail: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=400&h=400&fit=crop', relatedCount: 15 },
        { brand: 'Ansell', name: '니트릴 장갑 (화이트/S) 10박스 기획', discount: '50%', price: '95,000', thumbnail: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=400&fit=crop', relatedCount: 88 },
        { brand: '중외제약', name: '인공눈물 (무방부제/30개입) 4세트', discount: '20%', price: '28,000', thumbnail: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop', relatedCount: 20 },
        { brand: '대웅제약', name: '이지덤 습윤드레싱 베스트 셀러 세트', discount: '50%', price: '30,000', thumbnail: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&h=400&fit=crop', relatedCount: 65 },
    ];

    return (
        <section className="w-full bg-white pt-[40px] pb-[10px] overflow-hidden">
            <div className="w-[1800px] h-[261px] mx-auto relative flex flex-col">
                {/* Section Header */}
                <div className="mb-[14px]">
                    <h2 className="text-[20px] font-bold text-[#000000] leading-none mb-0">{title}</h2>
                </div>

                {/* Grid with Arrows */}
                <div className="relative flex-1">
                    {/* Left Arrow */}
                    <button className="absolute -left-[16px] top-[93.86px] -translate-y-1/2 w-8 h-8 rounded-full bg-[#000000]/30 flex items-center justify-center text-white text-xl z-10 hover:bg-black/50 transition-colors">
                        ‹
                    </button>

                    {/* 10-Column Grid: 9px Gaps to match ProductSection */}
                    <div className="grid grid-cols-10 gap-x-[9px] h-[221px]">
                        {dummyProducts.map((p, i) => (
                            <Link href="/product" key={i} className="group cursor-pointer border border-[#DEDEDE] bg-white flex flex-col w-[172.78px] h-[221px] transition-all overflow-hidden relative pb-[4px]">
                                {/* 1. Thumbnail: 110x110 */}
                                <div className="relative w-[110px] h-[110px] mx-auto mt-[4px] flex items-center justify-center">
                                    <img
                                        src={p.thumbnail}
                                        alt={p.name}
                                        className="w-full h-full object-contain transition-transform group-hover:scale-105"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop';
                                        }}
                                    />
                                </div>

                                {/* 2. Product Info Area */}
                                <div className="px-[8px] pt-[4px] flex flex-col items-center flex-1">
                                    {/* 상품명 레이아웃: Width 156, Height 32, Text Area Height 34 */}
                                    <div style={{ width: '156px', height: '32px' }} className="mb-[2px]">
                                        <h3
                                            className="text-[14px] font-medium text-[#1E1E1E] group-hover:text-[#EB6100] line-clamp-2 transition-colors overflow-hidden"
                                            style={{
                                                width: '156px',
                                                height: '34px',
                                                fontFamily: 'Pretendard',
                                                lineHeight: '17px',
                                                letterSpacing: '-0.5px'
                                            }}
                                        >
                                            {p.name}
                                        </h3>
                                    </div>

                                    {/* 제조사 레이아웃: Width 156, Height 14, Font 12px, Medium, LH 100%, LS -0.5px */}
                                    <div style={{ width: '156px', height: '14px' }} className="mb-[4px]">
                                        <p
                                            className="text-[12px] font-medium text-[#999999] truncate flex items-center"
                                            style={{
                                                fontFamily: 'Pretendard',
                                                lineHeight: '100%',
                                                letterSpacing: '-0.5px'
                                            }}
                                        >
                                            {p.brand}
                                        </p>
                                    </div>

                                    {/* 하단 가격 및 관련자료 그룹: 하단 8px, 좌측 8px 고정 */}
                                    <div
                                        className="absolute left-[8px] bottom-[8px] flex flex-col items-start"
                                        style={{ width: '156px' }}
                                    >
                                        {/* 가격+원 레이아웃: Width 154, Height 17, Gap 1px */}
                                        <div
                                            className="flex items-center gap-[1px] mb-[4px]"
                                            style={{
                                                width: '154px',
                                                height: '17px'
                                            }}
                                        >
                                            <span className="text-[14px] font-bold text-[#FF0000] leading-none tracking-[-0.56px] mr-[2px]">{p.discount}</span>
                                            <span
                                                className="text-[14px] font-medium text-[#1E1E1E]"
                                                style={{
                                                    fontFamily: 'Pretendard',
                                                    lineHeight: '100%',
                                                    letterSpacing: '-0.56px'
                                                }}
                                            >
                                                {p.price}
                                            </span>
                                            <span
                                                className="text-[14px] font-medium text-[#1E1E1E]"
                                                style={{
                                                    fontFamily: 'Pretendard',
                                                    lineHeight: '100%',
                                                    letterSpacing: '0%'
                                                }}
                                            >
                                                원
                                            </span>
                                        </div>

                                        {/* 관련자료 버튼 */}
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                router.push(`/product?name=${encodeURIComponent(p.name)}#related-resources`);
                                            }}
                                            className="h-[18px] bg-[#D6DCF0] px-[4px] flex items-center justify-center gap-[2px] border-none outline-none transition-colors hover:bg-[#C5CCE6]"
                                        >
                                            <span className="text-[11px] font-medium text-[#333333] leading-none">관련자료</span>
                                            <span className="text-[11px] font-semibold text-[#333333] leading-none">{formatRelatedCount(Math.max(1, p.relatedCount))}</span>
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Right Arrow */}
                    <button className="absolute -right-[16px] top-[93.86px] -translate-y-1/2 w-8 h-8 rounded-full bg-[#000000]/30 flex items-center justify-center text-white text-xl z-10 hover:bg-black/50 transition-colors">
                        ›
                    </button>
                </div>
            </div>
        </section>
    );
}
