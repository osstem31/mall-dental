'use client';

import React from 'react';

interface ProductGalleryProps {
    thumbnail?: string;
    isImplant?: boolean;
    productName?: string;
}

export default function ProductGallery({ thumbnail, isImplant: propIsImplant, productName }: ProductGalleryProps) {
    const isImplant = propIsImplant ?? (thumbnail?.includes('imple_') || thumbnail?.includes('imple'));
    const isKS3 = productName === 'KS 3 SA Implant (NEW) NoMount';

    const impleImages = [
        "/img/imple_1.png",
        "/img/imple_2.png",
        "/img/default1.png",
        "/img/default1.png",
        "/img/default1.png"
    ];

    const totalImages = [
        "/img/total_1.png",
        "/img/total_2.png",
        "/img/total_3.png",
        "/img/total_4.png",
        "/img/total_5.png"
    ];

    const ks3Images = [
        "/img/K3_1.png",
        "/img/K3_2.png",
        "/img/K3_3.png",
        "/img/K3_4.png",
        "/img/K3_5.png"
    ];

    const actualImages = isKS3 ? ks3Images : (isImplant ? impleImages : totalImages);

    const [activeIndex, setActiveIndex] = React.useState(0);
    const mainImage = actualImages[activeIndex];

    // thumbnail 프롭이 바뀌면 해당 이미지로 포커스 (URL 파라미터 대응)
    React.useEffect(() => {
        if (thumbnail) {
            const index = actualImages.findIndex(img => img === thumbnail);
            if (index !== -1) {
                setActiveIndex(index);
            } else {
                setActiveIndex(0);
            }
        }
    }, [thumbnail, isImplant]);

    const handlePrev = () => {
        setActiveIndex(prev => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setActiveIndex(prev => Math.min(actualImages.length - 1, prev + 1));
    };

    return (
        <div className="flex gap-[10px] w-[542px] h-[450px] font-pretendard">
            {/* Vertical Thumbnail List - 82x82 */}
            <div className="flex flex-col gap-[10px] w-[82px] min-w-[82px]">
                {actualImages.map((img, idx) => {
                    const isDefault = img.includes('default1.png');
                    return (
                        <div
                            key={idx}
                            onClick={() => {
                                if (!img.includes('default1.png')) {
                                    setActiveIndex(idx);
                                }
                            }}
                            className={`w-[82px] h-[82px] min-w-[82px] min-h-[82px] border flex items-center justify-center overflow-hidden transition-all ${!img.includes('default1.png') ? 'cursor-pointer' : 'cursor-default'} ${activeIndex === idx ? 'border-[#EB6100]' : 'border-[#DEDEDE] bg-white'}`}
                        >
                            <img
                                src={img}
                                alt={`Thumbnail ${idx}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = "/img/default1.png";
                                }}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Main Image Container - 450x450 */}
            <div className="w-[450px] h-[450px] bg-white border border-[#DEDEDE] relative flex items-center justify-center">
                <img
                    src={mainImage}
                    alt="Product Image"
                    className="max-w-[400px] max-h-[400px] object-contain"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "/img/default.png";
                    }}
                />

                {/* Left Arrow Button */}
                {activeIndex > 0 && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2">
                        <button 
                            onClick={handlePrev}
                            className="w-[40px] h-[40px] bg-[#00000033] flex items-center justify-center text-white hover:bg-[#0000004d] transition-colors"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Right Arrow Button */}
                {activeIndex < actualImages.length - 1 && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2">
                        <button 
                            onClick={handleNext}
                            className="w-[40px] h-[40px] bg-[#00000033] flex items-center justify-center text-white hover:bg-[#0000004d] transition-colors"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Magnifying Glass Icon */}
                <div className="absolute bottom-4 right-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="opacity-60">
                        <circle cx="11" cy="11" r="8" stroke="#999999" strokeWidth="1.5" />
                        <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="#999999" strokeWidth="1.5" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
