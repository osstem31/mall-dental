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

    const tabs = ['카테고리순', '자주구매순', '최근주문서'];

    // Realistic data for general medical consumables
    const initialItems: QuickOrderItem[] = [
        { id: '1', name: '의료용 멸균 거즈 4x4 (100포)', code: 'MG-44-100', thumbnail: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=100&h=100&fit=crop', relatedCount: 85 },
        { id: '2', name: '알코올 스왑 70% (100매/박스)', code: 'AS-70-100', thumbnail: 'https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=100&h=100&fit=crop', relatedCount: 42 },
        { id: '3', name: '니트릴 검진 장갑 (M/100매)', code: 'NG-M-100', thumbnail: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=100&h=100&fit=crop', relatedCount: 68 },
        { id: '4', name: '일회용 주사기 5cc (100개입)', code: 'DS-5CC-100', thumbnail: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=100&h=100&fit=crop', relatedCount: 25 },
        { id: '5', name: '의료용 플래스터 (2.5cm x 5m)', code: 'MP-255-01', thumbnail: 'https://images.unsplash.com/photo-1590611380053-da6447021fbb?w=100&h=100&fit=crop', relatedCount: 54 },
        { id: '6', name: '기능성 상처 밴드 (혼합형/50매)', code: 'WB-MX-50', thumbnail: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=100&h=100&fit=crop', relatedCount: 36 },
        { id: '7', name: '탄력 붕대 4인치 (10롤)', code: 'EB-4I-10', thumbnail: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=100&h=100&fit=crop', relatedCount: 12 },
        { id: '8', name: '수액 세트 (표준형/50세트)', code: 'IS-STD-50', thumbnail: 'https://images.unsplash.com/photo-1615461066159-fea0960485d5?w=100&h=100&fit=crop', relatedCount: 99 },
        { id: '9', name: '아이비 카테터 22G (50개입)', code: 'IV-22G-50', thumbnail: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=100&h=100&fit=crop', relatedCount: 45 },
        { id: '10', name: '피부 소독용 포비돈 (500ml)', code: 'PI-500-01', thumbnail: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=100&h=100&fit=crop', relatedCount: 60 },
        { id: '11', name: '설압자 (나무/100개입)', code: 'TD-WD-100', thumbnail: 'https://images.unsplash.com/photo-1583321500900-82807e458f3c?w=100&h=100&fit=crop', relatedCount: 15 },
        { id: '12', name: '의료용 종이 반창고 (1.25cm)', code: 'PT-125-01', thumbnail: 'https://images.unsplash.com/photo-1590611380053-da6447021fbb?w=100&h=100&fit=crop', relatedCount: 20 },
        { id: '13', name: '일회용 주사침 23G (100개입)', code: 'DN-23G-100', thumbnail: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=100&h=100&fit=crop', relatedCount: 77 },
        { id: '14', name: '생리식염수 20ml (낱개포장/50개)', code: 'SS-20M-50', thumbnail: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop', relatedCount: 33 },
        { id: '15', name: '이지덤 습윤 드레싱 (10cmx10cm)', code: 'ED-1010-01', thumbnail: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=100&h=100&fit=crop', relatedCount: 88 },
        { id: '16', name: '의료용 가위 (직/14cm)', code: 'MS-ST-14', thumbnail: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=100&h=100&fit=crop', relatedCount: 5 },
        { id: '17', name: '봉합사 (나일론 4-0/12개입)', code: 'NS-40-12', thumbnail: 'https://images.unsplash.com/photo-1583911300263-d3910543f07a?w=100&h=100&fit=crop', relatedCount: 40 },
        { id: '18', name: '일회용 외과용 메스 #11 (10개입)', code: 'DS-11-10', thumbnail: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=100&h=100&fit=crop', relatedCount: 55 },
        { id: '19', name: '초음파 젤 (250ml) 3개입', code: 'UG-250-03', thumbnail: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=100&h=100&fit=crop', relatedCount: 90 },
        { id: '20', name: '신전용 반창고 5cm x 5m', code: 'KT-555-01', thumbnail: 'https://images.unsplash.com/photo-1590611380053-da6447021fbb?w=100&h=100&fit=crop', relatedCount: 65 },
        { id: '21', name: '의료용 핀셋 (무구/14cm)', code: 'MF-ST-14', thumbnail: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=100&h=100&fit=crop', relatedCount: 32 },
        { id: '22', name: '라텍스 검진 장갑 (S/100매)', code: 'LG-S-100', thumbnail: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=100&h=100&fit=crop', relatedCount: 78 },
        { id: '23', name: '수술용 모자 (일회용/100개)', code: 'SC-DP-100', thumbnail: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=100&h=100&fit=crop', relatedCount: 24 },
        { id: '24', name: '일회용 마스크 3중 (화이트/50매)', code: 'EM-WT-50', thumbnail: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=100&h=100&fit=crop', relatedCount: 13 },
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
        <section className="bg-[#EFF1F5] flex flex-col items-center pt-[10px]">
            {/* Sorting Tabs Area: Fixed 1800px (Reverted to White Version) */}
            <div className="w-[1800px] h-[28px] flex items-center gap-8 border-b border-[#E2E2E2] px-[10px] py-[4px] bg-white">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`text-[12px] font-bold relative transition-colors h-full flex items-center ${activeTab === tab ? 'text-[#EB6100]' : 'text-[#666666]'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* 8x3 Grid Area: Reverted to 8px/4px gaps and 1800px width */}
            <div className="w-[1800px] pt-[6px] pb-[30px]">
                <div className="grid grid-cols-8 gap-x-[8px] gap-y-[4px]">
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
                            className="w-[218px] h-[128px] border border-[#E2E2E2] p-[15px] flex flex-col justify-between bg-white cursor-pointer hover:border-[2px] hover:border-[#EB6100] transition-all relative group"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1 pr-2">
                                    <h3 className="text-[14px] font-semibold text-[#1E1E1E] group-hover:text-[#EB6100] leading-[18px] tracking-[-0.5px] line-clamp-2 h-[36px] transition-colors">
                                        {item.name}
                                    </h3>
                                    <p className="text-[11px] text-[#9E9E9E] mt-1 font-medium">{item.code}</p>
                                </div>
                                <div className="w-[49px] h-[49px] flex items-center justify-center shrink-0">
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

                            <div className="mt-auto">
                                <button
                                    onClick={(e) => handleRelatedDataClick(item.name, e)}
                                    className="h-[18px] bg-[#D6DCF0] px-[4px] flex items-center justify-center gap-[2px] border-none outline-none transition-colors hover:bg-[#C5CCE6]"
                                >
                                    <span className="text-[11px] font-medium text-[#333333] leading-none">관련자료</span>
                                    <span className="text-[11px] font-semibold text-[#333333] leading-none">{formatRelatedCount(Math.max(1, item.relatedCount))}</span>
                                </button>
                            </div>
                            {/* Delete Text: Visible on hover, precisely positioned */}
                            <div
                                onClick={(e) => handleDelete(item.id, e)}
                                className="absolute right-[12.5px] bottom-[16px] opacity-0 group-hover:opacity-100 transition-opacity underline text-[12px] font-medium text-[#000000] tracking-[-0.5px] leading-none whitespace-nowrap z-10"
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
