'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { formatRelatedCount } from '@/utils/format';

interface NewProductsSectionProps {
    title: string;
}

export default function NewProductsSection({ title }: NewProductsSectionProps) {
    // 6 Categories synced with GNB
    // Categories aligned with Osstem Mall
    const categories = [
        '위생용품', '기구', '의약품', '장비', '메디컬', '생활가전'
    ];

    interface Product {
        brand: string;
        name: string;
        price: string;
        thumbnail: string;
        relatedCount: number;
    }

    const categoryProducts: { [key: string]: Product[] } = {
        '위생용품': [
            { brand: '3M', name: '3M 1860 N95 의료용 마스크 (20매입)', price: '28,000', thumbnail: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop', relatedCount: 85 },
            { brand: 'Ansell', name: 'Microflex 니트릴 검진 장갑 (Blue/100매)', price: '12,000', thumbnail: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=400&fit=crop', relatedCount: 42 },
            { brand: 'Medicom', name: '의료용 멸균 거즈 4x4 (100포/박스)', price: '15,000', thumbnail: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop', relatedCount: 50 },
        ],
        '기구': [
            { brand: 'Littmann', name: '리트만 클래식 III 청진기 (Black Edition)', price: '145,000', thumbnail: 'https://images.unsplash.com/photo-1584982324911-396564619932?w=400&h=400&fit=crop', relatedCount: 30 },
            { brand: 'Omron', name: '오므론 전문가용 자동혈압계 (HEM-907)', price: '850,000', thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dad99988?w=400&h=400&fit=crop', relatedCount: 99 },
            { brand: 'WelchAllyn', name: '웰치알렌 검이경/검안경 포켓 세트', price: '420,000', thumbnail: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=400&h=400&fit=crop', relatedCount: 15 },
        ],
        '의약품': [
            { brand: '중외제약', name: '생리식염수 (1000ml/20병/박스)', price: '32,000', thumbnail: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop', relatedCount: 45 },
            { brand: '유한양행', name: '포비돈 요오드 소독액 (500ml)', price: '8,500', thumbnail: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=400&fit=crop', relatedCount: 60 },
            { brand: '대웅제약', name: '이지덤 씬 (습윤드레싱) 10매입', price: '45,000', thumbnail: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop', relatedCount: 12 },
        ],
        '장비': [
            { brand: 'Bionet', name: '환자감시장치 BM3 (ECG, SpO2, NIBP)', price: '2,800,000', thumbnail: 'https://images.unsplash.com/photo-1516549221187-dc721347a3ad?w=400&h=400&fit=crop', relatedCount: 88 },
            { brand: 'Hanil', name: '냉장 원심분리기 FLETA 5', price: '4,200,000', thumbnail: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=400&fit=crop', relatedCount: 50 },
            { brand: 'LG전기', name: '의료용 LED 무영등 (Wall Type)', price: '3,500,000', thumbnail: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&h=400&fit=crop', relatedCount: 15 },
        ],
        '메디컬': [
            { brand: 'Kovax', name: '의료용 일회용 주사기 5cc (100개입)', price: '9,500', thumbnail: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=400&fit=crop', relatedCount: 88 },
            { brand: 'GreenCross', name: '수액 세트 (정밀조절기 부착형/50set)', price: '38,000', thumbnail: 'https://images.unsplash.com/photo-1615461066159-fea0960485d5?w=400&h=400&fit=crop', relatedCount: 65 },
            { brand: 'Coviden', name: '폴리 카테터 (2-Way/10ea)', price: '25,000', thumbnail: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=400&h=400&fit=crop', relatedCount: 20 },
        ],
        '생활가전': [
            { brand: 'LG전자', name: '퓨리케어 360 공기청정기 (대형/병원용)', price: '1,250,000', thumbnail: 'https://images.unsplash.com/photo-1599423300746-b62533397364?w=400&h=400&fit=crop', relatedCount: 5 },
            { brand: 'Philips', name: '소닉케어 프리미엄 전동칫솔 세트', price: '189,000', thumbnail: 'https://images.unsplash.com/photo-1559591937-293675cc5165?w=400&h=400&fit=crop', relatedCount: 99 },
            { brand: 'Cuckoo', name: '초음파 대용량 가습기 (입원실용)', price: '120,000', thumbnail: 'https://images.unsplash.com/photo-1585814514a60-9114b094602f?w=400&h=400&fit=crop', relatedCount: 12 },
        ],
    };

    // Interactive active category state
    const [activeCategory, setActiveCategory] = useState('위생용품');

    const router = useRouter();

    return (
        <section className="w-full bg-[#EFF1F5] pt-[40px] pb-[60px] overflow-hidden">
            <div className="w-[1800px] mx-auto flex flex-col">
                {/* Section Title */}
                <div className="mb-[20px]">
                    <h2 className="text-[20px] font-bold text-[#000000] leading-none">{title}</h2>
                </div>

                {/* 6-Column Layout */}
                <div className="grid grid-cols-6 gap-x-[9.6px]">
                    {categories.map((cat) => (
                        <div key={cat} className="flex flex-col w-full" style={{ gap: '0.86px' }}>
                            {/* Category Header: Clickable Button */}
                            <button
                                onClick={() => setActiveCategory(cat)}
                                className={`h-[36px] w-full flex items-center justify-center text-[15px] font-semibold text-center align-middle uppercase transition-colors outline-none border-none cursor-pointer ${cat === activeCategory
                                    ? 'bg-[#FF8807] text-white'
                                    : 'bg-[#DADEEB] text-[#333333] hover:bg-[#C8CDE0]'
                                    }`}
                                style={{
                                    lineHeight: '16px'
                                }}
                            >
                                {cat}
                            </button>

                            {/* Column of 3 Products */}
                            <div className={`flex flex-col gap-[1px] relative ${cat === activeCategory ? 'z-10' : ''}`}>
                                {/* Highlight Border for Active Category: Inclusive 292px width */}
                                {cat === activeCategory && (
                                    <div className="absolute inset-0 border-[1.5px] border-[#FF8807] pointer-events-none z-20" style={{ borderStyle: 'solid' }}></div>
                                )}

                                {categoryProducts[cat].map((product, rowIndex) => (
                                    <Link href="/product" key={rowIndex} className="w-full bg-white p-[8px] border border-[#EEEEEE] flex flex-col h-[224px] group cursor-pointer hover:shadow-sm">
                                        <div className="w-full h-[110px] mb-1 flex items-center justify-center">
                                            <img
                                                src={product.thumbnail}
                                                alt="prod"
                                                className="max-h-full object-contain transition-transform group-hover:scale-105"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=400&h=400&fit=crop';
                                                }}
                                            />
                                        </div>
                                        <h3
                                            className="text-[14px] font-medium text-[#1E1E1E] line-clamp-2 h-[40px] leading-[20px] tracking-[-0.5px] mb-[2px] transition-colors group-hover:text-[#EB6100]"
                                            style={{ fontFamily: 'Pretendard' }}
                                        >
                                            {product.name}
                                        </h3>

                                        {/* 제조사 레이아웃: Height 13 */}
                                        <div className="h-[13px] mb-[2px] flex items-center">
                                            <p className="text-[11px] text-[#999999] leading-none tracking-[-0.5px]">{product.brand}</p>
                                        </div>

                                        {/* 가격 레이아웃: Height 17, Gap 1px */}
                                        <div className="h-[17px] flex items-center gap-[1px] mb-[2px]">
                                            <span className="text-[14px] font-bold text-[#1E1E1E] leading-none tracking-[-0.56px]">{product.price}</span>
                                            <span className="text-[14px] font-medium text-[#1E1E1E] leading-none">원</span>
                                        </div>

                                        {/* 가격과 버튼 간격 2px */}
                                        <div className="mt-0 flex items-center justify-start">
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    router.push(`/product?name=${encodeURIComponent(product.name)}#related-resources`);
                                                }}
                                                className="h-[18px] bg-[#D6DCF0] px-[4px] flex items-center justify-center gap-[2px] border-none outline-none transition-colors hover:bg-[#C5CCE6]"
                                            >
                                                <span className="text-[11px] font-medium text-[#333333] leading-none">관련자료</span>
                                                <span className="text-[11px] font-semibold text-[#333333] leading-none">{formatRelatedCount(Math.max(1, product.relatedCount))}</span>
                                            </button>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
