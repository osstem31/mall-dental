'use client';

import React from 'react';
import { useCart, CartItem } from '@/context/CartContext';

interface SelectedItem {
    id: string;
    code: string;
    name: string;
    quantity: number;
    price: number;
    isGift?: boolean;
}

interface ProductOption {
    id: string;
    code: string;
    name: string;
    price: number;
}

const PRODUCT_METADATA: Record<string, {
    promo: string;
    description: string;
    unit: string;
    manufacturer: string;
    options: ProductOption[];
}> = {
    'Bionet': {
        promo: '전 세계 전문가들이 선택한 정밀한 환자 감시 시스템',
        description: '고성능 환자 모니터링 시스템',
        unit: '1대',
        manufacturer: '바이오넷 / 대한민국',
        options: [
            { id: 'BM3_BASIC', code: 'BM3-001', name: 'BM3 본체 (기본형)', price: 2800000 },
            { id: 'BM3_PRO', code: 'BM3-002', name: 'BM3 프로 (Full Option)', price: 3500000 },
        ]
    },
    '3M': {
        promo: '신뢰의 3M 기술력이 선사하는 최상의 호흡기 보호',
        description: '의료용 고성능 N95 마스크',
        unit: '1박스 (20매입)',
        manufacturer: '3M / 한국',
        options: [
            { id: '3M_1860_S', code: '3M-1860S', name: '1860 Small Size', price: 28000 },
            { id: '3M_1860_R', code: '3M-1860R', name: '1860 Regular Size', price: 28000 },
        ]
    },
    'Ansell': {
        promo: '섬세한 터치감과 강력한 보호 성능의 조화',
        description: '라텍스 프리 프리미엄 니트릴 검진 장갑',
        unit: '1박스 (100매)',
        manufacturer: 'Ansell / 말레이시아',
        options: [
            { id: 'AF_S', code: 'AF-S', name: '니트릴 장갑 (S)', price: 12000 },
            { id: 'AF_M', code: 'AF-M', name: '니트릴 장갑 (M)', price: 12000 },
            { id: 'AF_L', code: 'AF-L', name: '니트릴 장갑 (L)', price: 12000 },
        ]
    },
    'Omron': {
        promo: '가정에서도 병원처럼, 정확한 혈압 관리의 시작',
        description: '전문가용 고정밀 자동 혈압계',
        unit: '1대',
        manufacturer: '오므론 / 일본',
        options: [
            { id: 'HEM_907', code: 'HEM-907', name: 'HEM-907 본체', price: 850000 },
            { id: 'CUFF_L', code: 'CUFF-L', name: '대형 커프 (별매)', price: 45000 },
        ]
    },
    'Osstem Implant': {
        promo: '세계가 인정한 오스템의 기술력, TS II SA Implant',
        description: '최적의 SA 표면 구현을 위한 최적의 나사산 디자인',
        unit: '1ea/pkg',
        manufacturer: '오스템임플란트 / 대한민국',
        options: [
            { id: 'TS3SA_40_10', code: 'TS3SA4010', name: 'TS II SA (D4.0, L10.0)', price: 53100 },
            { id: 'TS3SA_45_10', code: 'TS3SA4510', name: 'TS II SA (D4.5, L10.0)', price: 53100 },
            { id: 'TS3SA_50_10', code: 'TS3SA5010', name: 'TS II SA (D5.0, L10.0)', price: 53100 },
        ]
    }
};

const DEFAULT_METADATA = {
    promo: '프리미엄 미백 관리로 완성하는 자신감 있는 미소',
    description: '치아 착색 정도에 따른 맞춤형 미백 케어 세트',
    unit: '1세트 (80g x 4개입)',
    manufacturer: '오스템파마 / 대한민국',
    options: [
        { id: 'TPAA085', code: 'TPAA085', name: 'OSSTEM 2:2 DENTAL (I+G)', price: 15200 },
        { id: 'TPAA086', code: 'TPAA086', name: '2:2 DENTAL SET (I+C, 연아 칫솔)', price: 15200 },
        { id: 'TPAA087', code: 'TPAA087', name: '2:2 DENTAL SET (G+S, 파빨 칫솔)', price: 15200 },
        { id: 'TPAA088', code: 'TPAA088', name: '2:2 DENTAL SET (S+B, 쿨화이트 칫솔)', price: 15200 },
    ]
};

interface ProductInfoProps {
    name?: string;
    brand?: string;
    price?: string;
    thumbnail?: string;
}

export default function ProductInfo({ name, brand, price, thumbnail }: ProductInfoProps) {
    const { addItemsToCart } = useCart();
    const metadata = (brand && PRODUCT_METADATA[brand]) || DEFAULT_METADATA;
    const isImplant = brand === 'Osstem Implant';
    const [selectedProducts, setSelectedProducts] = React.useState<SelectedItem[]>([]);

    const [selectedSpec, setSelectedSpec] = React.useState('');
    const [selectedDiameter, setSelectedDiameter] = React.useState('');
    const [selectedLength, setSelectedLength] = React.useState('');
    const [isPkgOpen, setIsPkgOpen] = React.useState(false);
    const [isInsurancePopupOpen, setIsInsurancePopupOpen] = React.useState(false);
    const [isOptionOpen, setIsOptionOpen] = React.useState(false);
    const [isComparisonModalOpen, setIsComparisonModalOpen] = React.useState(false);
    const [isModalDropdownOpen, setIsModalDropdownOpen] = React.useState(false);
    const [selectedModalPkg, setSelectedModalPkg] = React.useState('');
    const [showToast, setShowToast] = React.useState(false);

    React.useEffect(() => {
        if (isComparisonModalOpen) {
            setShowToast(true);
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isComparisonModalOpen]);

    React.useEffect(() => {
        if (selectedProducts.length === 0) {
            setSelectedSpec('');
            setSelectedDiameter('');
            setSelectedLength('');
        }
    }, [selectedProducts.length]);

    const handleImplantSelect = () => {
        const id = `TS3SA_${selectedDiameter.replace('mm', '')}_${selectedLength.replace('mm', '')}`;
        const code = `TS3SA${selectedDiameter.replace(/[\.mm]/g, '')}${selectedLength.replace(/[\.mm]/g, '')}`;
        const prodName = `TS II SA (D${selectedDiameter.replace('mm', '')}, L${selectedLength.replace('mm', '')})`;

        const exists = selectedProducts.find(item => item.name === prodName);
        if (exists) {
            updateQuantity(exists.id, 1);
        } else {
            setSelectedProducts(prev => [...prev, {
                id: id,
                code: code,
                name: prodName,
                quantity: 1,
                price: 53100
            }]);
        }
    };

    const handleProductSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const optionId = e.target.value;
        if (!optionId) return;
        const option = metadata.options.find(opt => opt.id === optionId);
        if (!option) return;

        const exists = selectedProducts.find(item => item.id === optionId);
        if (exists) {
            updateQuantity(optionId, 1);
        } else {
            setSelectedProducts(prev => [...prev, { ...option, quantity: 1 }]);
        }
        e.target.value = '';
    };

    const handleAddToCart = () => {
        if (selectedProducts.length === 0) {
            alert('상품을 선택해주세요.');
            return;
        }
        const cartItems: CartItem[] = selectedProducts.map(item => ({
            id: item.id,
            name: item.name,
            brand: brand || 'Osstem',
            price: item.price.toString(),
            quantity: item.quantity,
            thumbnail: thumbnail || (isImplant ? '/img/imple_1.png' : '/img/total_1.png'),
            code: item.code
        }));
        addItemsToCart(cartItems);
        setSelectedProducts([]);
    };

    const updateQuantity = (id: string, delta: number) => {
        setSelectedProducts(prev => prev.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        ));
    };

    const removeItem = (id: string) => {
        setSelectedProducts(prev => prev.filter(item => item.id !== id));
    };

    const totalQuantity = selectedProducts.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = selectedProducts.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const displayName = name || (isImplant ? 'TS II SA Implant NoMount' : '[오스템x레오거] 2:2 덴탈 세트');
    const displayPrice = isImplant ? '53,100' : '15,200';
    const displayThumbnail = thumbnail || (isImplant ? '/img/imple_1.png' : '/img/total_1.png');

    return (
        <div className="w-full flex flex-col font-pretendard text-[#1E1E1E] relative">
            <h1 className="text-[24px] font-bold mb-[1px] tracking-[-1px]">{displayName}</h1>
            <div className="flex items-center gap-[4px] mb-[20px]">
                <div className="flex text-[#EB6100]">
                    {[1, 2, 3, 4].map(i => (
                        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                        </svg>
                    ))}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#DEDEDE">
                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                    </svg>
                </div>
                <span className="text-[14px] font-bold text-[#666666] ml-1">4.0</span>
                <span className="text-[14px] text-[#999999]">(3건)</span>
            </div>

            {isImplant ? (
                <div className="w-[588px] flex items-center gap-[2px] mb-[20px] pb-[15px] border-b border-[#EEEEEE] relative">
                    <span className="text-[34px] font-bold text-[#1E1E1E] tracking-[-1px] leading-none">{displayPrice}</span>
                    <span className="text-[18px] font-bold text-[#1E1E1E] mr-[15px] leading-none">원</span>
                    
                    <div 
                        onClick={() => setIsPkgOpen(!isPkgOpen)}
                        className="flex items-center gap-[6px] group cursor-pointer"
                    >
                        <span className="text-[14px] font-bold text-[#424242] group-hover:text-[#EB6100] transition-colors">임플란트PKG</span>
                        <div className={`w-[14px] h-[14px] bg-[#424242] group-hover:bg-[#EB6100] rounded-full flex items-center justify-center transition-all ${isPkgOpen ? 'rotate-180' : ''}`}>
                            <svg width="8" height="4" viewBox="0 0 24 12" fill="none" stroke="white" strokeWidth="5">
                                <path d="M2 2L12 10L22 2" />
                            </svg>
                        </div>
                    </div>

                    {/* 가격비교 팝업 - 588px 중앙 정렬 */}
                    {isPkgOpen && (
                        <div className="absolute top-[100%] left-0 z-[100] w-[588px] bg-[#F8F8F8] border border-[#DDDDDD] p-[20px]" onClick={(e) => e.stopPropagation()}>
                            <div className="flex justify-between items-center mb-[15px]">
                                <h4 className="text-[18px] font-bold text-[#1E1E1E]">가격비교</h4>
                                <button onClick={() => setIsPkgOpen(false)} className="text-[#999999] hover:text-[#333333]">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 6L6 18M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex flex-col gap-[12px]">
                                <div className="flex justify-between items-baseline">
                                    <span className="text-[14px] text-[#1E1E1E] whitespace-nowrap">소비자가</span>
                                    <div className="flex items-baseline gap-[2px]">
                                        <span className="text-[16px] text-[#1E1E1E]">154,000</span>
                                        <span className="text-[14px] text-[#1E1E1E]">원</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-baseline">
                                    <span className="text-[14px] font-bold text-[#1e1e1e] whitespace-nowrap">임플란트PKG</span>
                                    <div className="flex items-baseline gap-[2px]">
                                        <span className="text-[18px] font-bold text-[#1E1E1E]">53,100</span>
                                        <span className="text-[14px] font-bold text-[#1E1E1E]">원</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="w-[588px] flex flex-col border-b border-[#EEEEEE] pb-[15px] mb-[20px] gap-[10px] relative">
                    <div className="flex items-center gap-[2px] justify-between">
                        <div className="flex items-center">
                            <span className="text-[34px] font-bold text-[#1E1E1E] tracking-[-1px] leading-none">{displayPrice}</span>
                            <span className="text-[18px] font-bold text-[#1E1E1E] mr-[15px] leading-none">원</span>
                            
                            <div 
                                onClick={() => setIsPkgOpen(!isPkgOpen)}
                                className="flex items-center gap-[6px] group cursor-pointer relative"
                            >
                                <span className="text-[14px] font-bold text-[#424242] group-hover:text-[#EB6100] transition-colors">토탈PKG</span>
                                <div className={`w-[14px] h-[14px] bg-[#424242] group-hover:bg-[#EB6100] rounded-full flex items-center justify-center transition-all ${isPkgOpen ? 'rotate-180' : ''}`}>
                                    <svg width="8" height="4" viewBox="0 0 24 12" fill="none" stroke="white" strokeWidth="5">
                                        <path d="M2 2L12 10L22 2" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        
                        <div 
                            onClick={() => setIsComparisonModalOpen(true)}
                            className="flex items-center gap-1 group cursor-pointer h-[14px]"
                        >
                            <span className="font-bold text-[#1E1E1E] text-[14px] tracking-[-0.5px] leading-none group-hover:text-[#EB6100]">패키지별 가격 비교표</span>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1E1E1E" strokeWidth="3" className="group-hover:stroke-[#EB6100]">
                                <path d="M9 18L15 12L9 6" />
                            </svg>
                        </div>
                        {isPkgOpen && (
                            <div className="absolute top-[100%] left-0 z-[100] w-[588px] bg-[#F8F8F8] border border-[#DDDDDD] p-[20px]" onClick={(e) => e.stopPropagation()}>
                                <div className="flex justify-between items-center mb-[15px]">
                                    <h4 className="text-[18px] font-bold text-[#1E1E1E]">가격비교</h4>
                                    <button onClick={() => setIsPkgOpen(false)} className="text-[#999999] hover:text-[#333333]">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M18 6L6 18M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex flex-col gap-[12px]">
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-[14px] text-[#1E1E1E] whitespace-nowrap">소비자가</span>
                                        <div className="flex items-baseline gap-[2px]">
                                            <span className="text-[16px] text-[#1E1E1E]">15,200</span>
                                            <span className="text-[14px] text-[#1E1E1E]">원</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-[14px] text-[#1E1E1E] whitespace-nowrap">회원가</span>
                                        <div className="flex items-baseline gap-[2px]">
                                            <span className="text-[16px] text-[#1E1E1E]">15,200</span>
                                            <span className="text-[14px] text-[#1E1E1E]">원</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-[14px] text-[#1E1E1E] whitespace-nowrap">재료PKG</span>
                                        <div className="flex items-baseline gap-[2px]">
                                            <span className="text-[16px] text-[#1E1E1E]">15,200</span>
                                            <span className="text-[14px] text-[#1E1E1E]">원</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-[14px] font-bold text-[#1e1e1e] whitespace-nowrap">토탈PKG</span>
                                        <div className="flex items-baseline gap-[2px]">
                                            <span className="text-[18px] font-bold text-[#1E1E1E]">15,200</span>
                                            <span className="text-[14px] font-bold text-[#1E1E1E]">원</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="w-[588px] grid grid-cols-[100px_1fr] gap-y-[12px] mb-[25px] relative">
                <span className="text-[#999999] font-semibold text-[14px] tracking-[-0.5px] leading-none flex items-center">상품설명</span>
                <span className="font-medium text-[#1E1E1E] text-[14px] tracking-[-0.5px] leading-none">
                    {isImplant ? metadata.description : '오스템 치약과 더블와이드 칫솔 SET상품'}
                </span>
                <span className="text-[#999999] font-semibold text-[14px] tracking-[-0.5px] leading-none flex items-center">판매단위</span>
                <span className="font-medium text-[#1E1E1E] text-[14px] tracking-[-0.5px] leading-none">
                    {isImplant ? metadata.unit : '1SET'}
                </span>
                <span className="text-[#999999] font-semibold text-[14px] tracking-[-0.5px] leading-none flex items-center">배송비</span>
                <span className="font-medium text-[#1E1E1E] text-[14px] tracking-[-0.5px] leading-none">
                    {isImplant ? '무료배송' : '유료배송 2,500원 (3만원이상 무료)'}
                </span>

                {isImplant && (
                    <>
                        <span className="text-[#999999] font-semibold text-[14px] tracking-[-0.5px] leading-none flex items-center">보험코드</span>
                        <div 
                            onClick={() => setIsInsurancePopupOpen(true)}
                            className="flex items-center gap-1 group cursor-pointer h-[14px]"
                        >
                            <span className="font-medium text-[#1E1E1E] text-[14px] tracking-[-0.5px] leading-none group-hover:text-[#EB6100]">보험코드 조회하기</span>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1E1E1E" strokeWidth="3" className="group-hover:stroke-[#EB6100]">
                                <path d="M9 18L15 12L9 6" />
                            </svg>
                        </div>
                    </>
                )}
            </div>

            <div className="w-[588px] flex flex-col gap-[10px] pt-[20px] border-t border-[#EEEEEE] flex-shrink-0">
                {isImplant ? (
                    <>
                        <h3 className="text-[14px] font-bold text-[#1E1E1E] mb-[5px]">규격선택</h3>
                        <div className="grid grid-cols-[100px_1fr] items-center h-[29px]">
                            <span className="font-bold text-[14px] text-[#1e1e1e] tracking-[-0.5px] leading-none">Size</span>
                            <div className="flex gap-[10px]">
                                {['Mini', 'Regular'].map(s => (
                                    <button
                                        key={s}
                                        onClick={() => {
                                            setSelectedSpec(s);
                                            setSelectedDiameter('');
                                            setSelectedLength('');
                                        }}
                                        className={`w-[57px] h-[29px] border text-[13px] transition-all leading-none inline-flex items-center justify-center ${selectedSpec === s ? 'bg-[#424242] border-[#424242] text-white font-bold' : 'border-[#DEDEDE] text-[#666666] bg-white hover:border-[#BBBBBB]'}`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-[100px_1fr] items-center h-[29px]">
                            <span className="font-bold text-[14px] text-[#1e1e1e] tracking-[-0.5px] leading-none">Diameter</span>
                            <div className="flex flex-wrap gap-[10px] h-[29px]">
                                {['DØ3.5', 'DØ4.0', 'DØ4.5', 'DØ5.0'].map(d => {
                                    const diaValue = d.replace('DØ','');
                                    let status: 'active' | 'inactive' | 'impossible' = 'inactive';
                                    
                                    if (!selectedSpec) status = 'inactive';
                                    else if (selectedSpec === 'Mini') {
                                        if (diaValue === '3.5') status = 'active';
                                        else status = 'impossible';
                                    } else {
                                        status = 'active';
                                    }

                                    const isSelected = selectedDiameter === diaValue;

                                    return (
                                        <button
                                            key={d}
                                            disabled={status !== 'active'}
                                            onClick={() => setSelectedDiameter(diaValue)}
                                            className={`relative w-[57px] h-[29px] border text-[13px] transition-all leading-none inline-flex items-center justify-center overflow-hidden
                                                ${status === 'impossible' ? 'border-[#DEDEDE] text-[#CECECE] bg-[#F7F7F7]' : 
                                                  status === 'inactive' ? 'border-[#EEEEEE] text-[#BBBBBB] bg-[#F8F8F8]' : 
                                                  isSelected ? 'bg-[#424242] border-[#424242] text-white font-bold' : 'border-[#DEDEDE] text-[#666666] bg-white hover:border-[#BBBBBB]'}`}
                                        >
                                            {status === 'impossible' && (
                                                <div className="absolute inset-0 pointer-events-none">
                                                    <svg width="100%" height="100%" viewBox="0 0 57 29" preserveAspectRatio="none">
                                                        <line x1="0" y1="0" x2="57" y2="29" stroke="#CECECE" strokeWidth="1" />
                                                        <line x1="57" y1="0" x2="0" y2="29" stroke="#CECECE" strokeWidth="1" />
                                                    </svg>
                                                </div>
                                            )}
                                            {d}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="grid grid-cols-[100px_1fr] items-center h-[29px]">
                            <span className="font-bold text-[14px] text-[#1e1e1e] tracking-[-0.5px] leading-none">Length</span>
                            <div className="flex flex-wrap gap-[10px] h-[29px]">
                                {['6.0mm', '7.0mm', '8.5mm', '10.0mm', '11.5mm', '13.0mm'].map((l) => {
                                    let status: 'active' | 'inactive' | 'impossible' = 'inactive';
                                    
                                    if (!selectedDiameter) status = 'inactive';
                                    else if (selectedDiameter === '3.5') {
                                        if (l === '6.0mm' || l === '7.0mm') status = 'impossible';
                                        else status = 'active';
                                    } else {
                                        status = 'active';
                                    }

                                    const isSelected = selectedLength === l;

                                    return (
                                        <button
                                            key={l}
                                            disabled={status !== 'active'}
                                            onClick={() => {
                                                setSelectedLength(l);
                                                const newItem = {
                                                    id: `TS2M35${l.replace('.0mm','').replace('mm','')}`,
                                                    name: `SA Implant (${selectedSpec}, DØ${selectedDiameter}, L${l})`,
                                                    price: 53100,
                                                    quantity: 1,
                                                    code: `TS2M35${l.replace('.0mm','').replace('mm','')}`
                                                };
                                                if (!selectedProducts.find(p => p.id === newItem.id)) {
                                                    setSelectedProducts([...selectedProducts, newItem]);
                                                }
                                            }}
                                            className={`relative w-[57px] h-[29px] border text-[13px] transition-all leading-none inline-flex items-center justify-center overflow-hidden
                                                ${status === 'impossible' ? 'border-[#DEDEDE] text-[#CECECE] bg-[#F7F7F7]' : 
                                                  status === 'inactive' ? 'border-[#EEEEEE] text-[#BBBBBB] bg-[#F8F8F8]' : 
                                                  isSelected ? 'bg-[#424242] border-[#424242] text-white font-bold' : 'border-[#DEDEDE] text-[#666666] bg-white hover:border-[#BBBBBB]'}`}
                                        >
                                            {status === 'impossible' && (
                                                <div className="absolute inset-0 pointer-events-none">
                                                    <svg width="100%" height="100%" viewBox="0 0 57 29" preserveAspectRatio="none">
                                                        <line x1="0" y1="0" x2="57" y2="29" stroke="#CECECE" strokeWidth="1" />
                                                        <line x1="57" y1="0" x2="0" y2="29" stroke="#CECECE" strokeWidth="1" />
                                                    </svg>
                                                </div>
                                            )}
                                            {l}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center h-[40px]">
                        <h3 className="text-[14px] font-bold text-[#1E1E1E] w-[120px] flex-shrink-0">옵션선택</h3>
                        <div className="relative flex-1">
                            {/* Custom Dropdown Trigger */}
                            <div 
                                onClick={() => setIsOptionOpen(!isOptionOpen)}
                                className={`w-full h-[40px] border px-[15px] flex items-center justify-between cursor-pointer bg-white transition-all ${
                                    isOptionOpen || selectedProducts.length > 0 ? 'border-[#EB6100]' : 'border-[#DEDEDE]'
                                }`}
                            >
                                <span className="text-[14px] text-[#333333]">
                                    {selectedProducts.length > 0 ? `${selectedProducts[selectedProducts.length - 1].name}` : '선택하세요'}
                                </span>
                                <div className={`transition-all ${isOptionOpen ? 'rotate-180' : ''}`}>
                                    <svg width="12" height="6" viewBox="0 0 24 12" fill="none" stroke={isOptionOpen || selectedProducts.length > 0 ? "#EB6100" : "#999999"} strokeWidth="3">
                                        <path d="M2 2L12 10L22 2" />
                                    </svg>
                                </div>
                            </div>

                            {/* Custom Dropdown List */}
                            {isOptionOpen && (
                                <div className="absolute top-[41px] left-0 w-full bg-white border border-[#DEDEDE] z-[110] shadow-lg max-h-[300px] overflow-y-auto custom-scrollbar">
                                    {metadata.options.map((opt) => (
                                        <div 
                                            key={opt.id}
                                            onClick={() => {
                                                handleProductSelect({ target: { value: opt.id } } as any);
                                                setIsOptionOpen(false);
                                            }}
                                            className="p-[15px] hover:bg-[#F8F8F8] cursor-pointer last:border-b-0 flex justify-between items-center"
                                        >
                                            <div className="flex flex-col gap-[4px]">
                                                <span className="text-[13px] font-normal text-[#999999] tracking-[-0.5px] leading-none">품목코드 : {opt.code}</span>
                                                <span className="text-[14px] font-normal text-[#1E1E1E] tracking-[-0.5px] leading-[20px]">{opt.name}</span>
                                            </div>
                                            <span className="text-[14px] font-normal text-[#1E1E1E] tracking-[-0.04em] leading-none">{(opt.price).toLocaleString()}원</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {selectedProducts.length > 0 && (
                <div className="w-[588px] mt-[20px] pt-[20px]">
                    <h3 className="text-[14px] font-bold text-[#1E1E1E] mb-[15px]">선택상품</h3>
                    <div>
                        <table className="w-full text-[13px] border-collapse">
                            <thead className="bg-[#A4A8B2] text-white">
                                <tr className="h-[32px]">
                                    <th className="px-[10px] py-0 font-bold text-center h-[32px] align-middle">품목코드</th>
                                    <th className="px-[10px] py-0 font-bold text-center h-[32px] align-middle">규격</th>
                                    <th className="px-[10px] py-0 font-bold text-center w-[100px] h-[32px] align-middle">수량</th>
                                    <th className="px-[10px] py-0 font-bold text-center w-[120px] h-[32px] align-middle">가격</th>
                                    <th className="px-[10px] py-0 font-bold text-center w-[60px] h-[32px] align-middle">삭제</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedProducts.map(item => (
                                    <tr key={item.id} className="h-[40px] border-b border-[#DEDEDE] hover:bg-gray-50 text-[13px]">
                                        <td className="p-[10px] text-center text-[#666666]">{item.code}</td>
                                        <td className="p-[10px] text-left text-[#1E1E1E] font-medium">{item.name}</td>
                                        <td className="p-[10px] text-center">
                                            <div className="flex items-center justify-center border border-[#DEDEDE] w-[66px] h-[22px] mx-auto bg-white overflow-hidden">
                                                <button onClick={() => updateQuantity(item.id, -1)} className="w-[22px] h-[22px] border-r border-[#DEDEDE] hover:bg-gray-100 flex items-center justify-center text-[16px] pb-[1px]">-</button>
                                                <span className="flex-1 text-center font-bold text-[13px]">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)} className="w-[22px] h-[22px] border-l border-[#DEDEDE] hover:bg-gray-100 flex items-center justify-center text-[16px] pb-[1px]">+</button>
                                            </div>
                                        </td>
                                        <td className="p-[10px] text-right font-bold text-[#1E1E1E]">
                                            {(item.price * item.quantity).toLocaleString()}원
                                        </td>
                                        <td className="p-[10px]">
                                            <div className="flex items-center justify-center w-full h-full">
                                                <button onClick={() => removeItem(item.id)} className="text-[#BBBBBB] hover:text-[#999999] transition-colors flex items-center justify-center">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M18 6L6 18M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Insurance Code Popup */}
            {isInsurancePopupOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="bg-white w-[640px] p-[25px] rounded-none shadow-2xl border border-[#DEDEDE]" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-[20px]">
                            <h3 className="text-[18px] font-bold text-[#1E1E1E]">보험코드 조회</h3>
                            <button onClick={() => setIsInsurancePopupOpen(false)} className="text-[#999999] hover:text-[#333333]">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="overflow-hidden border-t border-[#333333]">
                            <table className="w-full text-[13px] border-collapse">
                                <thead className="bg-[#F2F2F2]">
                                    <tr className="border-b border-[#333333]">
                                        <th className="py-[6px] px-[15px] text-center font-bold text-[#1E1E1E] w-[140px] h-[32px]">품목코드</th>
                                        <th className="py-[6px] px-[15px] text-center font-bold text-[#1E1E1E] h-[32px]">규격</th>
                                        <th className="py-[6px] px-[15px] text-center font-bold text-[#1E1E1E] w-[120px] h-[32px]">보험코드</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { code: 'TS2S4510SV6', spec: 'SA Implant (Regular, DØ4.5, L10.0mm)', insurance: 'L7502035' },
                                        { code: 'TS2S4510S', spec: 'TS II SA Implant (Regular, DØ4.5, 10.0mm)', insurance: 'L7502035' },
                                        { code: 'TS2M3508SV6', spec: 'SA Implant (Mini, DØ3.5, L8.5mm)', insurance: 'L7502035' },
                                        { code: 'TS2M3510SV6', spec: 'SA Implant (Mini, DØ3.5, L10.0mm)', insurance: 'L7502035' },
                                        { code: 'TS2M3511SV6', spec: 'SA Implant (Mini, DØ3.5, L11.5mm)', insurance: 'L7502035' },
                                        { code: 'TS2M3513SV5', spec: 'SA Implant (Mini, DØ3.5, L13.0mm)', insurance: 'L7502035' },
                                        { code: 'TS2M3515SV6', spec: 'SA Implant (Mini, DØ3.5, L15.0mm)', insurance: 'L7502035' },
                                        { code: 'TS2M3517SV6', spec: 'SA Implant (Mini, DØ3.5, L17.0mm)', insurance: 'L7502035' },
                                        { code: 'TS2M3519SV6', spec: 'SA Implant (Mini, DØ3.5, L19.0mm)', insurance: 'L7502035' },
                                        { code: 'TS2M3521SV6', spec: 'SA Implant (Mini, DØ3.5, L21.0mm)', insurance: 'L7502035' },
                                    ].map((row, idx, arr) => (
                                        <tr key={idx} className={`h-[32px] ${idx === arr.length - 1 ? 'border-b-[#DDDDDD] border-b' : 'border-b border-[#EEEEEE]'}`}>
                                            <td className="py-[4px] px-[15px] text-center text-[#1E1E1E]">{row.code}</td>
                                            <td className="py-[4px] px-[15px] text-left text-[#1E1E1E]">{row.spec}</td>
                                            <td className="py-[4px] px-[15px] text-center text-[#1E1E1E]">{row.insurance}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* Pagination */}
                        <div className="mt-[20px] mb-[20px] flex justify-center items-center gap-[15px]">
                            <button className="w-[30px] h-[30px] border border-[#DEDEDE] flex items-center justify-center hover:bg-gray-50">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999999" strokeWidth="2">
                                    <path d="M15 18L9 12L15 6" />
                                </svg>
                            </button>
                            <span className="text-[14px] text-[#1E1E1E]">1 / 3</span>
                            <button className="w-[30px] h-[30px] border border-[#DEDEDE] flex items-center justify-center hover:bg-gray-50">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999999" strokeWidth="2" className="rotate-180 origin-center">
                                    <path d="M15 18L9 12L15 6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Total Area */}
            <div className="flex items-end justify-between mt-[40px] mb-[15px]">
                <h2 className="text-[20px] font-bold">예상결제금액</h2>
                <div className="flex items-baseline gap-2">
                    <span className="text-[14px] text-[#666666]">총 수량 {totalQuantity}개</span>
                    <div className="flex items-baseline gap-[2px]">
                        <span className="text-[38px] font-bold text-[#1E1E1E]">{totalPrice.toLocaleString()}</span>
                        <span className="text-[18px] font-bold">원</span>
                    </div>
                </div>
            </div>

            {/* Bottom Buttons */}
            <div className="flex gap-[10px] h-[50px]">
                <button className="w-[180px] h-full border border-[#424242] bg-white flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#424242" strokeWidth="1.5">
                        <path d="M12 21L10.55 19.705C5.4 15.03 2 11.95 2 8.16C2 5.075 4.425 2.65 7.5 2.65C9.24 2.65 10.91 3.46 12 4.735C13.09 3.46 14.76 2.65 17.5 2.65C20.575 2.65 23 5.075 23 8.16C23 11.95 19.6 15.03 14.45 19.71L12 21Z" />
                    </svg>
                    <span className="text-[16px] text-[#424242] tracking-[-0.5%] leading-none">관심상품</span>
                </button>
                <button
                    onClick={handleAddToCart}
                    className={`flex-1 h-full font-bold text-[16px] tracking-[-0.5%] leading-none transition-colors ${
                        totalPrice > 0 ? 'bg-[#EB6100] text-white hover:bg-[#D45600]' : 'bg-[#B9B9B9] text-white cursor-not-allowed'
                    }`}
                >
                    주문서 담기
                </button>
            </div>

            {/* Comparison Modal */}
            {isComparisonModalOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center px-[20px] pointer-events-none">
                    <div className="bg-white w-full max-w-[800px] p-[25px] relative shadow-2xl border border-[#DEDEDE] animate-in fade-in zoom-in duration-200 pointer-events-auto">
                        <div className="flex justify-between items-center mb-[20px]">
                            <h2 className="text-[18px] font-bold text-[#1E1E1E]">패키지별 가격 비교표</h2>
                            <button 
                                onClick={() => setIsComparisonModalOpen(false)}
                                className="text-[#999999] hover:text-[#1E1E1E] transition-colors"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="border-t border-[#333333]">
                            <table className="w-full text-[13px] border-collapse">
                                <thead className="bg-[#F2F2F2]">
                                    <tr className="border-b border-[#333333]">
                                        <th className="py-[10px] px-[5px] text-center font-bold text-[#1E1E1E] w-[80px]">품목코드</th>
                                        <th className="py-[10px] px-[5px] text-center font-bold text-[#1E1E1E]">규격</th>
                                        <th className="py-[10px] px-[5px] text-center font-bold text-[#1E1E1E] w-[80px]">소비자가</th>
                                        <th className="py-[10px] px-[5px] text-center font-bold text-[#1E1E1E] w-[80px]">회원가</th>
                                        <th className="py-[0px] px-[0px] text-center font-bold text-[#1E1E1E] bg-white text-[#999999] w-[140px] relative">
                                            {/* Toast Notification */}
                                            {showToast && (
                                                <div className="absolute top-[-45px] left-1/2 -translate-x-1/2 bg-[#EB6100] text-white px-[12px] py-[6px] rounded-[4px] whitespace-nowrap text-[12px] font-medium animate-in fade-in slide-in-from-bottom-1 duration-300 z-[220]">
                                                    PKG를 선택해 할인가를 확인하세요.
                                                    <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#EB6100]"></div>
                                                </div>
                                            )}

                                            <div 
                                                className={`w-full h-full min-h-[38px] flex items-center justify-between px-3 border cursor-pointer ${
                                                    isModalDropdownOpen || selectedModalPkg ? 'border-[#EB6100]' : 'border-[#DEDEDE]'
                                                }`}
                                                onClick={() => {
                                                    setIsModalDropdownOpen(!isModalDropdownOpen);
                                                    setShowToast(false);
                                                }}
                                            >
                                                <span className={isModalDropdownOpen || selectedModalPkg ? 'text-[#1E1E1E]' : 'text-[#999999]'}>
                                                    {selectedModalPkg || '재료 PKG 선택'}
                                                </span>
                                                <svg width="10" height="6" viewBox="0 0 24 12" fill="none" stroke={isModalDropdownOpen || selectedModalPkg ? "#EB6100" : "#666666"} strokeWidth="3" className={isModalDropdownOpen ? 'rotate-180' : ''}>
                                                    <path d="M2 2L12 10L22 2" />
                                                </svg>
                                            </div>
                                            
                                            {isModalDropdownOpen && (
                                                <div className="absolute top-[37px] left-[-1px] w-[calc(100%+2px)] bg-white border border-[#DEDEDE] z-[210] shadow-xl text-left">
                                                    {['MP-50', 'MP-30', 'MP-20', 'MP-10', 'BONE2-10', 'MP-5', 'MP-3', 'MP-1'].map((item) => (
                                                        <div 
                                                            key={item}
                                                            className={`px-3 py-2 hover:bg-[#F8F8F8] text-[14px] font-normal cursor-pointer ${
                                                                selectedModalPkg === item ? 'text-[#EB6100] font-bold' : 'text-[#1E1E1E]'
                                                            }`}
                                                            onClick={() => {
                                                                setSelectedModalPkg(item);
                                                                setIsModalDropdownOpen(false);
                                                                setShowToast(false);
                                                            }}
                                                        >
                                                            {item}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </th>
                                        <th className="py-[10px] px-[5px] text-center font-bold text-[#1E1E1E] w-[80px]">토탈 PKG</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { code: 'TPAA085', spec: 'OSSTEM 2:2 DENTAL (I+G)', price: '15,200' },
                                        { code: 'TPAA086', spec: '2:2 DENTAL SET (I+C, 연아 칫솔)', price: '15,200' },
                                        { code: 'TPAA087', spec: '2:2 DENTAL SET (G+S, 파빨 칫솔)', price: '15,200' },
                                        { code: 'TPAA089', spec: '2:2 DENTAL SET (O+S, 연빨 칫솔)', price: '15,200' },
                                    ].map((row, idx, arr) => (
                                        <tr key={idx} className={`h-[48px] border-b ${idx === arr.length - 1 ? 'border-b-[#DDDDDD]' : 'border-b-[#EEEEEE]'}`}>
                                            <td className="text-center text-[#666666]">{row.code}</td>
                                            <td className="px-[10px] text-left text-[#1E1E1E]">{row.spec}</td>
                                            <td className="text-right px-[10px] text-[#1E1E1E]">{row.price}원</td>
                                            <td className="text-right px-[10px] text-[#1E1E1E]">{row.price}원</td>
                                            <td className="text-center text-[#1E1E1E]">-</td>
                                            <td className="text-right px-[10px] font-bold text-[#1E1E1E]">{row.price}원</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
