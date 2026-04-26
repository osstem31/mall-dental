'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { formatRelatedCount } from '@/utils/format';

interface QuickOrderItem {
    id: string;
    name: string;
    code: string;
    thumbnail: string;
    relatedCount: number;
}

export default function QuickOrderSection() {
    const { addToCart } = useCart();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('카테고리순');

    const tabs = ['카테고리순', '자주구매순', '최근주문서', '품목모드로 주문하기'];

    // Realistic data for general medical consumables
    const initialItems: QuickOrderItem[] = [
        { id: '1', name: '의료용 멸균 거즈 4x4 (100포)', code: 'MG-44-100', thumbnail: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=100&h=100&fit=crop', relatedCount: 5 },
        { id: '2', name: '알코올 스왑 70% (100매/박스)', code: 'AS-70-100', thumbnail: 'https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=100&h=100&fit=crop', relatedCount: 2 },
        { id: '3', name: '니트릴 검진 장갑 (M/100매)', code: 'NG-M-100', thumbnail: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=100&h=100&fit=crop', relatedCount: 8 },
        { id: '4', name: '일회용 주사기 5cc (100개입)', code: 'DS-5CC-100', thumbnail: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=100&h=100&fit=crop', relatedCount: 1 },
        { id: '5', name: '의료용 플래스터 (2.5cm x 5m)', code: 'MP-255-01', thumbnail: 'https://images.unsplash.com/photo-1590611380053-da6447021fbb?w=100&h=100&fit=crop', relatedCount: 4 },
        { id: '6', name: '기능성 상처 밴드 (혼합형/50매)', code: 'WB-MX-50', thumbnail: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=100&h=100&fit=crop', relatedCount: 6 },
        { id: '7', name: '탄력 붕대 4인치 (10롤)', code: 'EB-4I-10', thumbnail: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=100&h=100&fit=crop', relatedCount: 2 },
        { id: '8', name: '수액 세트 (표준형/50세트)', code: 'IS-STD-50', thumbnail: 'https://images.unsplash.com/photo-1615461066159-fea0960485d5?w=100&h=100&fit=crop', relatedCount: 9 },
        { id: '9', name: '아이비 카테터 22G (50개입)', code: 'IV-22G-50', thumbnail: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=100&h=100&fit=crop', relatedCount: 5 },
        { id: '10', name: '피부 소독용 포비돈 (500ml)', code: 'PI-500-01', thumbnail: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=100&h=100&fit=crop', relatedCount: 6 },
        { id: '11', name: '설압자 (나무/100개입)', code: 'TD-WD-100', thumbnail: 'https://images.unsplash.com/photo-1583321500900-82807e458f3c?w=100&h=100&fit=crop', relatedCount: 1 },
        { id: '12', name: '의료용 종이 반창고 (1.25cm)', code: 'PT-125-01', thumbnail: 'https://images.unsplash.com/photo-1590611380053-da6447021fbb?w=100&h=100&fit=crop', relatedCount: 2 },
        { id: '13', name: '일회용 주사침 23G (100개입)', code: 'DN-23G-100', thumbnail: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=100&h=100&fit=crop', relatedCount: 7 },
        { id: '14', name: '생리식염수 20ml (낱개포장/50개)', code: 'SS-20M-50', thumbnail: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop', relatedCount: 3 },
        { id: '15', name: '이지덤 습윤 드레싱 (10cmx10cm)', code: 'ED-1010-01', thumbnail: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=100&h=100&fit=crop', relatedCount: 8 },
        { id: '16', name: '의료용 가위 (직/14cm)', code: 'MS-ST-14', thumbnail: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=100&h=100&fit=crop', relatedCount: 5 },
        { id: '17', name: '봉합사 (나일론 4-0/12개입)', code: 'NS-40-12', thumbnail: 'https://images.unsplash.com/photo-1583911300263-d3910543f07a?w=100&h=100&fit=crop', relatedCount: 4 },
        { id: '18', name: '일회용 외과용 메스 #11 (10개입)', code: 'DS-11-10', thumbnail: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=100&h=100&fit=crop', relatedCount: 5 },
        { id: '19', name: '초음파 젤 (250ml) 3개입', code: 'UG-250-03', thumbnail: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=100&h=100&fit=crop', relatedCount: 9 },
        { id: '20', name: '신전용 반창고 5cm x 5m', code: 'KT-555-01', thumbnail: 'https://images.unsplash.com/photo-1590611380053-da6447021fbb?w=100&h=100&fit=crop', relatedCount: 6 },
        { id: '21', name: '의료용 핀셋 (무구/14cm)', code: 'MF-ST-14', thumbnail: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=100&h=100&fit=crop', relatedCount: 3 },
        { id: '22', name: '라텍스 검진 장갑 (S/100매)', code: 'LG-S-100', thumbnail: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=100&h=100&fit=crop', relatedCount: 7 },
        { id: '23', name: '수술용 모자 (일회용/100개)', code: 'SC-DP-100', thumbnail: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=100&h=100&fit=crop', relatedCount: 2 },
        { id: '24', name: '일회용 마스크 3중 (화이트/50매)', code: 'EM-WT-50', thumbnail: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=100&h=100&fit=crop', relatedCount: 1 },
    ];

    const [items, setItems] = useState<QuickOrderItem[]>(initialItems);

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const handleRelatedDataClick = (name: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/product?name=${encodeURIComponent(name)}#related-resources`);
    };

    return (
        <section className="bg-[#EFF1F5] flex flex-col items-center pt-[8px]">
            {/* Sorting Tabs Area: Fixed 1800px (Reverted to White Version) */}
            <div className="w-[1800px] h-[28px] flex flex-row items-center px-[10px] py-[4px] bg-white border-b border-[#E2E2E2]">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className="min-w-[85px] h-[20px] flex flex-col justify-center items-start px-[12px] gap-[12px] shrink-0"
                    >
                        <span className={`font-pretendard text-[13px] leading-[17px] flex items-center tracking-[-0.005em] whitespace-nowrap ${
                            activeTab === tab ? 'font-bold text-[#EB6100]' : 'font-medium text-[#999999]'
                        }`}>
                            {tab}
                        </span>
                    </button>
                ))}
            </div>

            {/* 6x4 Grid Area: Dynamic height with 8px bottom gap */}
            <div className="w-[1800px] pt-[6px] pb-[8px]">
                <div className="grid grid-cols-6 gap-x-[8px] gap-y-[8px]">
                    {items.map((item) => (
                        <div
                            onClick={() => addToCart({
                                id: item.id,
                                name: item.name,
                                code: item.code,
                                price: '181,000', // Mock price for medical items
                                quantity: 1,
                                thumbnail: item.thumbnail
                            })}
                            key={item.id}
                            className="w-[293px] h-[119px] border border-[#DEDEDE] bg-white cursor-pointer hover:border-[#EB6100] transition-all relative group overflow-hidden"
                        >
                            {/* Inner Layout based on Frame 3466661 */}
                            <div className="flex flex-col p-[12px] gap-[8px] h-full w-full">
                                {/* Top Content: Name, Code and Thumbnail (Frame 1430105685) */}
                                <div className="flex flex-row gap-[8px] items-start w-full">
                                    {/* Text Info (Frame 1430105686) */}
                                    <div className="flex flex-col gap-[4px] flex-1">
                                        <h3 className="text-[14px] font-semibold text-[#1E1E1E] leading-[140%] tracking-[-0.01em] line-clamp-2 h-[40px] group-hover:text-[#EB6100] transition-colors">
                                            {item.name}
                                        </h3>
                                        <p className="text-[14px] font-medium text-[#999999] leading-[17px] tracking-[-0.005em]">
                                            {item.code}
                                        </p>
                                    </div>
                                    {/* Thumbnail (img_50px) */}
                                    <div className="w-[50px] h-[50px] bg-[#F8F8F8] flex items-center justify-center shrink-0 overflow-hidden">
                                        <img
                                            src={item.thumbnail}
                                            alt=""
                                            className="w-full h-full object-contain"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=100&h=100&fit=crop';
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Bottom Content: Related Data Button (Dynamic Width) */}
                                <div className="mt-auto">
                                    <button
                                        onClick={(e) => handleRelatedDataClick(item.name, e)}
                                        className={`h-[26px] bg-[#EFF1F5] flex items-center px-[10px] py-[6px] gap-[2px] border-none outline-none transition-colors hover:bg-[#E5E7EB] ${
                                            item.relatedCount === 0 ? 'w-[73px]' : 
                                            item.relatedCount < 10 ? 'w-[82px]' : 
                                            'w-auto min-w-[90px]'
                                        }`}
                                    >
                                        <div className="flex flex-row items-center p-0 gap-[2px] h-[14px]">
                                            <span className="text-[12px] font-medium text-[#999999] leading-[14px] flex items-center whitespace-nowrap">관련자료</span>
                                            {item.relatedCount > 0 && (
                                                <span className="text-[12px] font-medium text-[#999999] leading-[14px] flex items-center whitespace-nowrap ml-[2px]">
                                                    {formatRelatedCount(item.relatedCount)}
                                                </span>
                                            )}
                                        </div>
                                        {/* Icon Container (Vector) */}
                                        <div className="w-[10px] h-[10px] flex items-center justify-center relative ml-auto">
                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                <path d="M4 3L7 5L4 7" stroke="#999999" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {/* Delete Text: Visible on hover, positioned like V1 but adjusted for new size */}
                            <div
                                onClick={(e) => handleDelete(item.id, e)}
                                className="absolute right-[12px] bottom-[12px] opacity-0 group-hover:opacity-100 transition-opacity underline text-[12px] font-medium text-[#000000] tracking-[-0.5px] leading-none whitespace-nowrap z-10"
                            >
                                삭제
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
