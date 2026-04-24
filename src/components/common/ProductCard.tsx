'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { formatRelatedCount } from '@/utils/format';

interface ProductCardProps {
    brand: string;
    name: string;
    price: string;
    thumbnail?: string;
    showBorder?: boolean;
    tags?: string[];
    relatedCount?: number;
}

export default function ProductCard({
    brand,
    name,
    price,
    thumbnail,
    showBorder = true,
    relatedCount = 12 // Default value for medical/hospital mall
}: ProductCardProps) {
    const router = useRouter();
    const productUrl = `/product?name=${encodeURIComponent(name)}&brand=${encodeURIComponent(brand)}&price=${encodeURIComponent(price)}&thumbnail=${encodeURIComponent(thumbnail || '')}`;

    const handleRelatedDataClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`${productUrl}#related-resources`);
    };

    // 0925 명세 통합 디자인 (박스 220px 내부에 안착되도록 높이를 유연하게 조절)
    return (
        <Link
            href={productUrl}
            className={`group relative flex flex-col bg-white border ${showBorder ? 'border-[#DEDEDE]' : 'border-transparent'} overflow-hidden transition-all`}
            style={{
                width: '100%',
                height: '210px', // 220px 박스 내부(보더 포함)에 안착되도록 살짝 줄임
                boxSizing: 'border-box'
            }}
        >
            {/* 카드 내부 컨텐츠 */}
            <div className="flex flex-col items-center p-0 w-full h-full">

                {/* 1. Thumbnail Area */}
                <div
                    className="flex flex-row justify-center items-center shrink-0 w-full"
                    style={{
                        height: '110px', // 기존 118px에서 보정
                        padding: '5px 8px 0px'
                    }}
                >
                    <div className="relative w-[110px] h-[110px] flex items-center justify-center shrink-0">
                        {thumbnail ? (
                            <img
                                src={thumbnail}
                                alt={name}
                                className="w-[110px] h-[110px] object-contain"
                                style={{ mixBlendMode: 'multiply' }}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop';
                                }}
                            />
                        ) : (
                            <div className="w-[110px] h-[110px] bg-[#FFFFFF]" />
                        )}
                    </div>
                </div>

                {/* 2. Product Info Area */}
                <div
                    className="flex flex-col items-center shrink-0 w-full"
                    style={{
                        height: '90px', // 기존 102px에서 보정
                        padding: '4px 8px 8px',
                        gap: '4px'
                    }}
                >
                    {/* Info Container */}
                    <div className="flex flex-col items-flex-start p-0 gap-[2px] w-[154px] h-[64px] shrink-0">
                        {/* 상품명 */}
                        <div className="w-[156px] h-[34px] shrink-0 overflow-hidden">
                            <h3
                                className="text-[14px] font-medium text-[#1E1E1E] leading-[16px] tracking-[-0.5px] line-clamp-2"
                                style={{ fontFamily: 'Pretendard' }}
                            >
                                {name}
                            </h3>
                        </div>

                        {/* 제조사 */}
                        <div className="w-[156px] h-[13px] shrink-0">
                            <p
                                className="text-[12px] font-medium text-[#999999] leading-[14px] tracking-[-0.5px] items-center flex"
                                style={{ fontFamily: 'Pretendard' }}
                            >
                                {brand}
                            </p>
                        </div>

                        {/* 가격 */}
                        <div className="flex flex-row items-center p-0 gap-[1px] w-[154px] h-[17px] shrink-0">
                            <span
                                className="text-[14px] font-medium text-[#1E1E1E] leading-[17px] tracking-[-0.04em] whitespace-nowrap"
                                style={{ fontFamily: 'Pretendard' }}
                            >
                                {price}
                            </span>
                            <span
                                className="text-[14px] font-medium text-[#1E1E1E] leading-[17px] whitespace-nowrap"
                                style={{ fontFamily: 'Pretendard' }}
                            >
                                원
                            </span>
                        </div>
                    </div>

                    {/* 태그 영역 */}
                    <div className="flex flex-row items-center p-0 gap-[2px] w-[154px] h-[18px] shrink-0">
                        {/* 관련자료 배지 */}
                        <div
                            onClick={handleRelatedDataClick}
                            className="h-[18px] bg-[#D6DCF0] px-[4px] flex items-center justify-center gap-[2px] cursor-pointer hover:bg-[#C5CCE6] transition-colors border-none outline-none"
                            style={{ width: 'fit-content' }}
                        >
                            <span
                                className="text-[11px] font-medium text-[#333333] items-center flex text-center whitespace-nowrap leading-none"
                                style={{ fontFamily: 'Pretendard' }}
                            >
                                관련자료
                            </span>
                            <span
                                className="text-[11px] font-semibold text-[#333333] items-center flex text-center whitespace-nowrap leading-none"
                                style={{ fontFamily: 'Pretendard' }}
                            >
                                {formatRelatedCount(Math.max(1, relatedCount))}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
