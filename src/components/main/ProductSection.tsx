import ProductCard from '@/components/common/ProductCard';

interface ProductSectionProps {
    title: string;
    showArrows?: boolean;
    isDetail?: boolean;
}

export default function ProductSection({ title, showArrows = true, isDetail = false }: ProductSectionProps) {
    const dummyProducts = [
        { brand: 'Bionet', name: '환자감시장치 BM3 (ECG, SpO2, NIBP)', price: '2,800,000', tags: ['BEST'], thumbnail: 'https://images.unsplash.com/photo-1516549221187-dc721347a3ad?w=400&h=400&fit=crop', relatedCount: 7 },
        { brand: 'Omron', name: '오므론 전문가용 자동혈압계 (HEM-907)', price: '850,000', tags: ['인기'], thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dad99988?w=400&h=400&fit=crop', relatedCount: 3 },
        { brand: 'Littmann', name: '리트만 클래식 III 청진기 (Black Edition)', price: '145,000', tags: ['추천'], thumbnail: 'https://images.unsplash.com/photo-1584982324911-396564619932?w=400&h=400&fit=crop', relatedCount: 9 },
        { brand: '3M', name: '3M 1860 N95 의료용 마스크 (20매입)', price: '28,000', tags: ['BEST'], thumbnail: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop', relatedCount: 2 },
        { brand: 'Hanil', name: '냉장 원심분리기 FLETA 5', price: '4,200,000', tags: ['신제품'], thumbnail: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=400&fit=crop', relatedCount: 5 },
        { brand: 'Ansell', name: 'Microflex 니트릴 검진 장갑 (Blue/100매)', price: '12,000', tags: ['BEST'], thumbnail: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=400&fit=crop', relatedCount: 8 },
        { brand: 'WelchAllyn', name: '웰치알렌 검이경/검안경 포켓 세트', price: '420,000', tags: ['인기'], thumbnail: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=400&h=400&fit=crop', relatedCount: 4 },
        { brand: 'Kovax', name: '의료용 일회용 주사기 5cc (100개입)', price: '9,500', tags: ['BEST'], thumbnail: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=400&fit=crop', relatedCount: 10 },
        { brand: '중외제약', name: '생리식염수 (1000ml/20병/박스)', price: '32,000', tags: ['추천'], thumbnail: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop', relatedCount: 1 },
        { brand: 'LG전자', name: '퓨리케어 360 공기청정기 (대형/병원용)', price: '1,250,000', tags: ['BEST'], thumbnail: 'https://images.unsplash.com/photo-1599423300746-b62533397364?w=400&h=400&fit=crop', relatedCount: 6 },
    ];

    const displayProducts = isDetail ? dummyProducts.slice(0, 5) : dummyProducts;

    return (
        <section className="w-full bg-white pt-[40px] pb-[10px] overflow-hidden">
            <div className={`${isDetail ? 'w-[1160px] h-auto' : 'w-[1800px] h-[261px]'} mx-auto relative flex flex-col`}>
                {/* Section Header */}
                <div className="mb-[14px]">
                    <h2 className="text-[20px] font-bold text-[#000000] leading-none mb-0">{title}</h2>
                </div>

                {/* Grid with Arrows */}
                <div className="relative flex-1">
                    {/* Left Arrow */}
                    {showArrows && (
                        <button className="absolute -left-[16px] top-[93.86px] -translate-y-1/2 w-8 h-8 rounded-full bg-[#000000]/30 flex items-center justify-center text-white text-xl z-20 hover:bg-black/50 transition-colors">
                            ‹
                        </button>
                    )}

                    {/* Grid Layout: Adjusted based on isDetail */}
                    <div className={`grid ${isDetail ? 'grid-cols-5 gap-x-[15px]' : 'grid-cols-10 gap-x-[9px]'}`}>
                        {displayProducts.map((p, i) => (
                            <ProductCard
                                key={i}
                                {...p}
                            />
                        ))}
                    </div>

                    {/* Right Arrow */}
                    {showArrows && (
                        <button className="absolute -right-[16px] top-[93.86px] -translate-y-1/2 w-8 h-8 rounded-full bg-[#000000]/30 flex items-center justify-center text-white text-xl z-20 hover:bg-black/50 transition-colors">
                            ›
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}
