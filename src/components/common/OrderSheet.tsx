'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';

export default function OrderSheet() {
    const { isOrderSheetOpen, closeOrderSheet, items, updateQuantity, removeFromCart } = useCart();
    const [selectedOrderId, setSelectedOrderId] = React.useState<number>(0);
    const [selectedItemIds, setSelectedItemIds] = React.useState<string[]>([]);
    const [isOrderCompleted, setIsOrderCompleted] = React.useState<boolean>(false);
    const [paymentMethod, setPaymentMethod] = React.useState<'package' | 'card'>('package');

    // Recent orders state
    const [recentOrders, setRecentOrders] = React.useState([
        { id: 0, date: '2026. 02. 21', time: '12:20 주문' },
        { id: 1, date: '2026. 01. 15', time: '10:20 주문' },
        { id: 2, date: '2025. 12. 10', time: '17:45 주문' },
        { id: 3, date: '2025. 11. 05', time: '14:10 주문' },
        { id: 4, date: '2025. 10. 02', time: '09:30 주문' },
        { id: 5, date: '2025. 08. 28', time: '11:50 주문' },
        { id: 6, date: '2025. 07. 20', time: '16:20 주문' },
        { id: 7, date: '2025. 06. 15', time: '13:05 주문' },
        { id: 8, date: '2025. 05. 11', time: '10:15 주문' },
        { id: 10, date: '2025. 04. 05', time: '15:40 주문' },
        { id: 11, date: '2025. 03. 02', time: '12:00 주문' },
        { id: 12, date: '2025. 01. 25', time: '14:30 주문' },
    ]);

    // Snapshot of ordered items for the completion view
    const [orderedItemsSnapshot, setOrderedItemsSnapshot] = React.useState<typeof items>([]);
    const [orderSummarySnapshot, setOrderSummarySnapshot] = React.useState({
        productAmount: 0,
        discount: 0,
        delivery: 0,
        total: 0,
        paymentMethod: 'package' as 'package' | 'card'
    });

    const handleOrderSubmit = () => {
        if (selectedItemIds.length > 0) {
            const orderedItems = items.filter(item => selectedItemIds.includes(item.id));
            setOrderedItemsSnapshot(orderedItems);

            // Calculate totals for ordered items only
            const productConsumerAmount = orderedItems.reduce((acc, item) => {
                const isImplant = item.brand === 'Osstem Implant';
                const price = isImplant ? 154000 : 15200;
                return acc + price * item.quantity;
            }, 0);
            const productUnitAmount = orderedItems.reduce((acc, item) => {
                const isImplant = item.brand === 'Osstem Implant';
                const price = isImplant ? 53100 : 15200;
                return acc + price * item.quantity;
            }, 0);
            
            const discount = productConsumerAmount - productUnitAmount;
            const delivery = 2500;
            const total = productUnitAmount + delivery;

            setOrderSummarySnapshot({
                productAmount: productUnitAmount,
                discount,
                delivery,
                total,
                paymentMethod
            });

            // Add to recent orders
            const now = new Date();
            const newOrder = {
                id: Date.now(),
                date: now.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\.$/, ''),
                time: now.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false }) + ' 주문'
            };
            setRecentOrders(prev => [newOrder, ...prev]);
            setSelectedOrderId(newOrder.id);

            // Remove from cart
            selectedItemIds.forEach(id => removeFromCart(id));

            // Reset state
            setSelectedItemIds([]);
            setIsOrderCompleted(true);
        }
    };

    const handleDeleteSelected = () => {
        if (selectedItemIds.length === 0) return;
        if (confirm('선택한 상품을 삭제하시겠습니까?')) {
            selectedItemIds.forEach(id => removeFromCart(id));
            setSelectedItemIds([]);
        }
    };

    // Automatically select newly added items
    React.useEffect(() => {
        if (isOrderSheetOpen && items.length > 0) {
            setSelectedItemIds(prev => {
                const newItemIds = items.map(item => item.id);
                const updatedList = Array.from(new Set([...prev, ...newItemIds]));
                if (updatedList.length !== prev.length) {
                    return updatedList;
                }
                return prev;
            });
        }
    }, [isOrderSheetOpen, items]);

    const [position, setPosition] = React.useState({ x: 150, y: 100 });
    const [isDragging, setIsDragging] = React.useState(false);
    const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        // Only trigger drag on the header area (H1) or empty spaces in the header
        const target = e.target as HTMLElement;
        if (target.tagName === 'BUTTON' || target.closest('button')) return;
        
        setIsDragging(true);
        setDragStart({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragStart]);

    if (!isOrderSheetOpen) return null;

    const totalConsumerAmount = items.reduce((acc, item) => {
        const isImplant = item.brand === 'Osstem Implant';
        const price = isImplant ? 154000 : 15200;
        return acc + price * item.quantity;
    }, 0);

    const totalProductAmount = items.reduce((acc, item) => {
        const isImplant = item.brand === 'Osstem Implant';
        const price = isImplant ? 53100 : 15200;
        return acc + price * item.quantity;
    }, 0);

    const totalDiscount = totalConsumerAmount - totalProductAmount;
    const deliveryFee = items.length > 0 ? 2500 : 0;
    const totalPayment = totalProductAmount + deliveryFee;

    const toggleItemSelection = (id: string) => {
        setSelectedItemIds(prev =>
            prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
        );
    };

    const toggleAllSelection = () => {
        if (items.length === 0) return;
        const isAllSelected = items.length > 0 && items.every(item => selectedItemIds.includes(item.id));
        if (isAllSelected) {
            setSelectedItemIds([]);
        } else {
            setSelectedItemIds(items.map(item => item.id));
        }
    };



    return (
        <div className="fixed inset-0 z-[100] font-pretendard pointer-events-none">
            <div 
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                }}
                className="absolute bg-white w-[740px] h-[800px] shadow-[0px_4px_30px_rgba(0,0,0,0.18)] flex flex-col relative overflow-hidden pointer-events-auto border border-[#D7D7D7]"
            >
                <button
                    onClick={closeOrderSheet}
                    className="absolute top-[15px] right-[15px] w-[30px] h-[30px] flex items-center justify-center transition-colors hover:bg-[#F8F8F8] z-[120]"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#212529" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                {/* Main Content Area */}
                <div className="w-full h-full bg-white flex flex-col overflow-visible relative">
                    {!isOrderCompleted ? (
                        <>
                            <h1 
                                onMouseDown={handleMouseDown}
                                className="w-full h-[60px] flex items-center justify-center text-[22px] font-bold text-[#000000] font-pretendard shrink-0 cursor-move select-none"
                            >
                                주 문 서
                            </h1>

                            <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col">
                                {/* Delivery & Shipping Info */}
                                <div className="w-full h-[48px] flex items-center px-[15px] shrink-0 relative">
                                    <div className="w-[70px] h-[26px] mt-[4px] ml-[-1.5px] pr-[8px] pl-[8px] border-r border-[#E1E1E1] flex items-center shrink-0">
                                        <span className="text-[13px] font-semibold text-black leading-none tracking-[-0.5px]">배송지</span>
                                    </div>
                                    <div className="w-[392px] h-[33px] flex flex-col justify-center gap-[1px] ml-[10px] shrink-0">
                                        <p className="text-[13px] font-medium text-black leading-[16px] tracking-[-0.5px]">오스템치과</p>
                                        <p className="text-[13px] font-normal text-[#737373] leading-[16px] tracking-[-0.5px]">서울특별시 강서구 마곡동 760-1 힐스테이트에코 상가 라마다 앙코르호텔</p>
                                    </div>
                                    <div className="absolute left-[490.5px] top-[12px] h-[24px] flex items-center pr-[10px] pl-[20px] border-l border-[#E1E1E1]">
                                        <span className="text-[13px] font-normal text-black leading-none tracking-[-0.5px] whitespace-nowrap">오스템치과 (010-1234-4567)</span>
                                    </div>
                                    <button className="absolute right-[15px] top-[12px] w-[41px] h-[24px] border border-[#CCCCCC] bg-white flex items-center justify-center p-0 hover:bg-[#F8F8F8]">
                                        <span className="text-[12px] font-normal text-[#000000] leading-none tracking-[-0.5%]">변경</span>
                                    </button>
                                </div>

                                {/* Selection Controls - 담긴 품목이 있을 때만 노출 */}
                                {items.length > 0 && (
                                    <div className="flex justify-between items-center px-[15px] py-[10px]">
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                id="all-selection-checkbox"
                                                checked={items.length > 0 && items.every(item => selectedItemIds.includes(item.id))}
                                                onChange={toggleAllSelection}
                                                className="w-[14px] h-[14px] border border-[#C4C4C4] rounded-none outline-none accent-[#767676] cursor-pointer appearance-auto"
                                            />
                                            <span className="text-[14px] text-[#333333] select-none">전체선택</span>
                                        </label>
                                        <div className="flex gap-2">
                                            <button className="border border-[#CCCCCC] px-3 py-1 text-[12px] text-[#000000] bg-white hover:bg-[#F8F8F8]">선택 품목 결제수단 변경</button>
                                            <button
                                                onClick={handleDeleteSelected}
                                                className="border border-[#CCCCCC] px-3 py-1 text-[12px] text-[#000000] bg-white hover:bg-[#F8F8F8]"
                                            >
                                                선택 삭제
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Product Table */}
                                <div className="mx-[15px]">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-[#6E7483] text-white text-[13px] font-normal h-[34px]">
                                            <tr>
                                                <th className="w-[34px] text-center font-normal">NO</th>
                                                <th className="text-center font-normal">품목명</th>
                                                <th className="w-[95px] text-center font-normal">소비자가</th>
                                                <th className="w-[50px] text-center font-normal">할인</th>
                                                <th className="w-[95px] text-center font-normal">단가</th>
                                                <th className="w-[86px] text-center font-normal">수량</th>
                                                <th className="w-[95px] text-center font-normal">주문금액</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-[13px] text-[#333333]">
                                            {items.length === 0 ? (
                                                <tr>
                                                    <td colSpan={7} className="h-[200px] text-center text-[#9E9E9E]">주문서에 상품을 담아주세요.</td>
                                                </tr>
                                            ) : (
                                                /* 임플란트/재료 그룹별로 분리하여 각 그룹 하위에 합계행 표시 */
                                                (() => {
                                                    // 임플란트 품목과 재료 품목을 분리 (새 품목이 첫줄에 오도록 reverse)
                                                    const implantItems = [...items.filter(item => item.brand === 'Osstem Implant')].reverse();
                                                    const materialItems = [...items.filter(item => item.brand !== 'Osstem Implant')].reverse();

                                                    const getGroupTotal = (groupItems: typeof items, isImplant: boolean) => {
                                                        const count = groupItems.reduce((acc, item) => acc + item.quantity, 0);
                                                        // PKG 팝업 기준 단가로 합계 계산
                                                        const unitPrice = isImplant ? 53100 : 15200;
                                                        const amount = groupItems.reduce((acc, item) => {
                                                            return acc + (unitPrice * item.quantity);
                                                        }, 0);
                                                        return { count, amount };
                                                    };

                                                    // 개별 품목 행 렌더링 함수
                                                    const renderItemRow = (item: typeof items[0], rowIndex: number) => {
                                                        const isImplantItem = item.brand === 'Osstem Implant';
                                                        // 소비자가: PKG 팝업의 '소비자가' 기준
                                                        const consumerPrice = isImplantItem ? 154000 : 15200;
                                                        // 단가: PKG 팝업의 '가장 마지막 가격' 기준
                                                        const unitPrice = isImplantItem ? 53100 : 15200;
                                                        // 할인율: 소비자가 대비 단가 할인율 계산
                                                        const discountRate = consumerPrice > 0 ? Math.round((1 - unitPrice / consumerPrice) * 100) : 0;
                                                        const isSelected = selectedItemIds.includes(item.id);

                                                        return (
                                                            <tr key={item.id} className="h-[50px] border-b border-[#DEDEDE]">
                                                                <td className="text-center flex items-center justify-center h-[50px] bg-[#F8F8F8]">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={isSelected}
                                                                        onChange={() => toggleItemSelection(item.id)}
                                                                        className="w-[14px] h-[14px] border border-[#C4C4C4] rounded-none cursor-pointer accent-[#767676] appearance-auto"
                                                                    />
                                                                </td>
                                                                <td className="pl-4">
                                                                    <p className="font-normal text-[13px] leading-[18px] text-[#333333] line-clamp-2">{item.name}</p>
                                                                    <p className="text-[13px] text-[#333333] mt-0.5">({item.code || `CKS3S${7006 + rowIndex}S`})</p>
                                                                </td>
                                                                <td className="text-center bg-[#F8F8F8] text-[13px]">{consumerPrice.toLocaleString()}원</td>
                                                                <td className="text-center text-[13px]">{discountRate}%</td>
                                                                <td className="text-center bg-[#F8F8F8] text-[13px]">{unitPrice.toLocaleString()}원</td>
                                                                <td className="text-center">
                                                                    <div className="flex items-center justify-center">
                                                                        <button
                                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                            disabled={item.quantity <= 1}
                                                                            className={`w-6 h-6 border border-[#CCCCCC] flex items-center justify-center transition-colors ${
                                                                                item.quantity <= 1 ? 'text-[#CCCCCC] cursor-not-allowed' : 'text-[#666666] hover:bg-[#F8F8F8]'
                                                                            }`}
                                                                        >
                                                                            -
                                                                        </button>
                                                                        <div className="w-8 h-6 border-y border-[#CCCCCC] flex items-center justify-center text-[12px] font-bold text-[#333333]">
                                                                            {item.quantity}
                                                                        </div>
                                                                        <button
                                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                            className="w-6 h-6 border border-[#CCCCCC] flex items-center justify-center text-[#666666] hover:bg-[#F8F8F8] transition-colors"
                                                                        >
                                                                            +
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                                <td className="pr-4 text-right text-[13px] font-normal text-[#333333] tracking-[-0.5px] leading-none bg-[#F8F8F8]">
                                                                    {(unitPrice * item.quantity).toLocaleString()}원
                                                                </td>
                                                            </tr>
                                                        );
                                                    };

                                                    // 합계행 렌더링 함수 (연한 파란색 BG)
                                                    const renderSubtotalRow = (label: string, total: { count: number; amount: number }) => (
                                                        <tr className="bg-[#E7EFFF] h-[34px]">
                                                            <td colSpan={5} className="pl-[43px] text-[13px] font-semibold text-[#000000] border-b-[0.8px] border-dashed border-[#333333]">
                                                                {label} <span className="font-normal">({total.count})</span>
                                                            </td>
                                                            <td className="text-center border-b-[0.8px] border-dashed border-[#333333]">
                                                                <span className="text-[13px] font-semibold text-[#333333]">{total.count}</span>
                                                            </td>
                                                            <td className="pr-4 text-right border-b-[0.8px] border-dashed border-[#333333] pb-[2px]">
                                                                <span className="text-[15px] font-bold text-[#FF0009] tracking-[-0.5px] leading-[14px]">
                                                                    {total.amount.toLocaleString()}
                                                                </span>
                                                                <span className="text-[13px] font-normal text-[#333333] tracking-[-0.5px] leading-[14px] ml-[2px]">원</span>
                                                            </td>
                                                        </tr>
                                                    );

                                                    const implantTotal = getGroupTotal(implantItems, true);
                                                    const materialTotal = getGroupTotal(materialItems, false);
                                                    let rowCounter = 0;

                                                    return (
                                                        <>
                                                            {/* 임플란트 그룹 */}
                                                            {implantItems.map((item) => {
                                                                const row = renderItemRow(item, rowCounter);
                                                                rowCounter++;
                                                                return row;
                                                            })}
                                                            {implantItems.length > 0 && renderSubtotalRow('임플란트 합계', implantTotal)}

                                                            {/* 재료 그룹 */}
                                                            {materialItems.map((item) => {
                                                                const row = renderItemRow(item, rowCounter);
                                                                rowCounter++;
                                                                return row;
                                                            })}
                                                            {materialItems.length > 0 && renderSubtotalRow('재료 합계', materialTotal)}
                                                        </>
                                                    );
                                                })()
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* 결제수단 영역 - 담긴 품목이 있을 때만 노출, 타이틀 상단 + 임플란트/재료별 행 분리 */}
                                {items.length > 0 && (() => {
                                    const hasImplant = items.some(item => item.brand === 'Osstem Implant');
                                    const hasMaterial = items.some(item => item.brand !== 'Osstem Implant');
                                    // 임플란트 합계 금액
                                    const implantUsage = items.filter(i => i.brand === 'Osstem Implant').reduce((acc, item) => {
                                        const p = item.brand === 'Osstem Implant' ? 53100 : 15200;
                                        return acc + p * item.quantity;
                                    }, 0);
                                    // 재료 합계 금액
                                    const materialUsage = items.filter(i => i.brand !== 'Osstem Implant').reduce((acc, item) => {
                                        const p = 15200;
                                        return acc + p * item.quantity;
                                    }, 0);

                                    const rowCount = (hasImplant ? 1 : 0) + (hasMaterial ? 1 : 0);
                                    const containerHeight = rowCount === 2 ? 'h-[102px]' : 'h-[72px]';

                                    return (
                                        <div className={`flex flex-col items-start px-0 py-[10px] gap-0 w-[710px] ${containerHeight} bg-[#FAFAFA] shrink-0 mx-auto mt-0 mb-0`}>
                                            {/* 결제수단 타이틀 */}
                                            <div className="px-[10px]">
                                                <span className="text-[12px] font-bold text-[#000000] leading-none tracking-[-0.5px]">결제수단</span>
                                            </div>

                                            <div className="flex flex-col gap-[5px] w-full">
                                                {/* 임플란트 결제수단 행 */}
                                                {hasImplant && (
                                                    <div className="flex items-center gap-[8px] px-[10px]">
                                                        <span className="text-[12px] font-medium text-[#000000] w-[55px] shrink-0">임플란트</span>
                                                        <div className="relative">
                                                            <select className="w-[98px] h-[28px] px-[8px] border border-[#C4C4C4] bg-white text-[12px] text-[#000000] outline-none appearance-none cursor-pointer focus:border-[#EB6100]">
                                                                <option>패키지</option>
                                                            </select>
                                                            <div className="absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none">
                                                                <svg width="8" height="5" viewBox="0 0 8 5" fill="none"><path d="M1 1L4 4L7 1" stroke="#666666" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                            </div>
                                                        </div>
                                                        <div className="w-[135px] h-[18px] px-[10px] flex items-center text-[12px] text-[#000000]">
                                                            IP-50AM-25-0006
                                                        </div>
                                                        <button className="w-[32px] h-[18px] border border-[#CCCCCC] bg-white flex items-center justify-center text-[11px] text-[#333333] hover:bg-[#F8F8F8] shrink-0">
                                                            <span className="leading-none">변경</span>
                                                        </button>
                                                        <div className="ml-auto flex gap-[12px] shrink-0">
                                                            <span className="text-[12px] text-[#000000] whitespace-nowrap">보유 : 50,000,000원</span>
                                                            <span className="text-[12px] text-[#000000] whitespace-nowrap">사용 : {implantUsage.toLocaleString()}원</span>
                                                            <span className="text-[12px] text-[#000000] whitespace-nowrap">잔액 : {(50000000 - implantUsage).toLocaleString()}원</span>
                                                        </div>
                                                    </div>
                                                )}
                                                {/* 재료 결제수단 행 */}
                                                {hasMaterial && (
                                                    <div className="flex items-center gap-[8px] px-[10px]">
                                                        <span className="text-[12px] font-medium text-[#000000] w-[55px] shrink-0">재료</span>
                                                        <div className="relative">
                                                            <select className="w-[98px] h-[28px] px-[8px] border border-[#C4C4C4] bg-white text-[12px] text-[#000000] outline-none appearance-none cursor-pointer focus:border-[#EB6100]">
                                                                <option>패키지</option>
                                                                <option>일반결제</option>
                                                            </select>
                                                            <div className="absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none">
                                                                <svg width="8" height="5" viewBox="0 0 8 5" fill="none"><path d="M1 1L4 4L7 1" stroke="#666666" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                            </div>
                                                        </div>
                                                        <div className="w-[135px] h-[18px] px-[10px] flex items-center text-[12px] text-[#000000]">
                                                            MP-50-25-0159
                                                        </div>
                                                        <button className="w-[32px] h-[18px] border border-[#CCCCCC] bg-white flex items-center justify-center text-[11px] text-[#333333] hover:bg-[#F8F8F8] shrink-0">
                                                            <span className="leading-none">변경</span>
                                                        </button>
                                                        <div className="ml-auto flex gap-[12px] shrink-0">
                                                            <span className="text-[12px] text-[#000000] whitespace-nowrap">보유 : 50,000,000원</span>
                                                            <span className="text-[12px] text-[#000000] whitespace-nowrap">사용 : {materialUsage.toLocaleString()}원</span>
                                                            <span className="text-[12px] text-[#000000] whitespace-nowrap">잔액 : {(50000000 - materialUsage).toLocaleString()}원</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>

                            {/* Sticky Summary Section */}
                            <div className="shrink-0 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)] pt-[12px] px-[10px] pb-[20px] flex flex-col gap-[10px] relative z-10">
                                <div className="mx-[10px] flex items-center justify-between">
                                    <div className="flex items-center gap-[28px]">
                                        <div className="text-[14px] font-semibold text-[#020202] tracking-[-0.5px] whitespace-nowrap">
                                            총 {items.reduce((acc, item) => acc + item.quantity, 0)}개 품목
                                        </div>
                                        <div className="flex items-center gap-[5px]">
                                            <div className="flex items-center gap-[3px] shrink-0">
                                                <span className="text-[12px] font-normal text-[#333333] tracking-[-0.5px]">상품금액</span>
                                                <span className="text-[14px] font-normal text-[#020202] tracking-[-0.5px]">{totalConsumerAmount.toLocaleString()}</span>
                                                <span className="text-[12px] font-normal text-[#333333] tracking-[-0.5px]">원</span>
                                            </div>
                                            <div className="w-[8px] h-[1.5px] bg-[#B2B2B2] shrink-0 mx-1"></div>
                                            <div className="flex items-center gap-[3px] shrink-0">
                                                <span className="text-[12px] font-normal text-[#333333] tracking-[-0.5px]">할인금액</span>
                                                <span className="text-[14px] font-normal text-[#0073FF] tracking-[-0.5px]">{totalDiscount.toLocaleString()}</span>
                                                <span className="text-[12px] font-normal text-[#333333] tracking-[-0.7px]">원</span>
                                            </div>
                                            <div className="relative w-[8px] h-[8px] flex items-center justify-center shrink-0 mx-1">
                                                <div className="absolute w-[8px] h-[1.5px] bg-[#B2B2B2]"></div>
                                                <div className="absolute w-[1.5px] h-[8px] bg-[#B2B2B2]"></div>
                                            </div>
                                            <div className="flex items-center gap-[3px] shrink-0">
                                                <span className="text-[12px] font-normal text-[#333333] tracking-[-0.5px]">배송비</span>
                                                <span className="text-[14px] font-normal text-[#000000] tracking-[-0.44px]">{deliveryFee.toLocaleString()}</span>
                                                <span className="text-[12px] font-normal text-[#333333] tracking-[-0.5px]">원</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-[3px] shrink-0">
                                        <span className="text-[12px] font-medium text-[#333333] tracking-[-0.53px]">결제금액</span>
                                        <span className="text-[20px] font-semibold text-[#FF0009] tracking-[-0.5px] leading-none">
                                            {totalPayment.toLocaleString()}
                                        </span>
                                        <span className="text-[14px] font-bold text-[#333333] tracking-[-0.53px]">원</span>
                                    </div>
                                </div>
                                <div className="flex justify-center gap-[10px] mt-2 mb-1">
                                    <button
                                        onClick={closeOrderSheet}
                                        className="w-[152px] h-[40px] bg-[#424242] text-white text-[15px] font-bold flex items-center justify-center transition-colors hover:bg-[#333333]"
                                    >
                                        닫기
                                    </button>
                                    <button
                                        disabled={selectedItemIds.length === 0}
                                        onClick={handleOrderSubmit}
                                        className={`w-[152px] h-[40px] flex items-center justify-center text-[15px] font-bold transition-all ${selectedItemIds.length > 0
                                            ? 'bg-[#EB6100] text-[#ffffff]'
                                            : 'bg-[#F7F7F7] text-[#A3A3A3] border border-[#BBBBBB] cursor-not-allowed'
                                            }`}
                                    >
                                        주문하기
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col pt-0 px-[20px] pb-10 overflow-y-auto">
                            {/* Draggable Area for Completion View */}
                            <div 
                                onMouseDown={handleMouseDown}
                                className="w-full h-[60px] shrink-0 cursor-move select-none flex items-center justify-center"
                            />
                            
                            {/* Order Completion View */}
                            <div className="flex flex-col items-center gap-[10px] mb-[40px]">
                                <div className="w-[43px] h-[43px] bg-[#D7D7D7] rounded-full flex items-center justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <h1 className="text-[28px] font-bold text-[#333333] tracking-[-0.5px]">주문이 정상적으로 완료되었습니다.</h1>
                                <div className="flex items-center gap-2 text-[16px] font-medium">
                                    <span className="text-[#666666]">주문번호</span>
                                    <span className="text-[#0073FF] border-b border-[#0073FF]">T19121812345</span>
                                </div>
                            </div>

                            <div className="flex flex-col mb-[10px]">
                                <div className="flex h-[40px] bg-[#757B8A] items-center">
                                    <div className="flex-1 text-center text-white text-[14px] font-medium tracking-[-0.5px]">패키지 결제</div>
                                    <div className="flex-1 text-center text-white text-[14px] font-medium tracking-[-0.5px]">신용카드 결제</div>
                                    <div className="flex-1 text-center text-white text-[14px] font-medium tracking-[-0.5px]">적립금 사용</div>
                                </div>
                                <div className="flex h-[50px] bg-white border-x border-b border-[#E5E5E5] items-center">
                                    <div className="flex-1 text-center text-[#333333] text-[16px] font-semibold">
                                        {orderSummarySnapshot.paymentMethod === 'package' ? `${orderSummarySnapshot.total.toLocaleString()} 원` : '0 원'}
                                    </div>
                                    <div className="flex-1 text-center text-[#333333] text-[16px] font-semibold">
                                        {orderSummarySnapshot.paymentMethod === 'card' ? `${orderSummarySnapshot.total.toLocaleString()} 원` : '0 원'}
                                    </div>
                                    <div className="flex-1 text-center text-[#333333] text-[16px] font-semibold">0 원</div>
                                </div>
                            </div>

                            <div className="w-full h-[50px] bg-[#E7EFFF] flex items-center justify-center gap-3 mb-[30px]">
                                <span className="text-[14px] font-bold text-[#333333]">주문금액</span>
                                <span className="text-[20px] font-bold text-[#FF0009]">{orderSummarySnapshot.total.toLocaleString()}</span>
                                <span className="text-[14px] font-bold text-[#333333]">원</span>
                            </div>

                            <div className="flex flex-col gap-[30px] mb-[60px]">
                                <div>
                                    <h3 className="text-[14px] font-bold text-black mb-3">배송지1</h3>
                                    <div className="border-t border-[#E5E5E5]">
                                        <div className="flex border-b border-[#F2F2F2]">
                                            <div className="w-[120px] bg-[#F4F6F9] py-3 px-4 text-[13px] font-medium text-[#333333]">받는사람</div>
                                            <div className="flex-1 py-3 px-4 text-[13px] text-[#333333]">오스템치과</div>
                                        </div>
                                        <div className="flex border-b border-[#F2F2F2]">
                                            <div className="w-[120px] bg-[#F4F6F9] py-3 px-4 text-[13px] font-medium text-[#333333]">연락처</div>
                                            <div className="flex-1 py-3 px-4 text-[13px] text-[#333333]">오스템치과 (010-1234-4567)</div>
                                        </div>
                                        <div className="flex border-b border-[#F2F2F2]">
                                            <div className="w-[120px] bg-[#F4F6F9] py-3 px-4 text-[13px] font-medium text-[#333333]">배송지</div>
                                            <div className="flex-1 py-3 px-4 text-[13px] text-[#333333]">서울특별시 강서구 마곡동 760-1 힐스테이트에코 상가 라마다 앙코르호텔</div>
                                        </div>
                                        <div className="flex border-b border-[#F2F2F2]">
                                            <div className="w-[120px] bg-[#F4F6F9] py-3 px-4 text-[13px] font-medium text-[#333333]">주문상품</div>
                                            <div className="flex-1 py-3 px-4 text-[13px] text-[#333333]">
                                                {orderedItemsSnapshot[0]?.name} {orderedItemsSnapshot.length > 1 ? `포함 총 ${orderedItemsSnapshot.length}개` : ''}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {orderedItemsSnapshot.some(item =>
                                    item.name.toUpperCase().includes('LIDOCAINE') ||
                                    item.name.toUpperCase().includes('GEL') ||
                                    item.name.includes('의약품')
                                ) && (
                                        <div>
                                            <h3 className="text-[14px] font-bold text-black mb-3">의약품 배송지</h3>
                                            <div className="border-t border-[#E5E5E5]">
                                                <div className="flex border-b border-[#F2F2F2]">
                                                    <div className="w-[120px] bg-[#F4F6F9] py-3 px-4 text-[13px] font-medium text-[#333333]">받는사람</div>
                                                    <div className="flex-1 py-3 px-4 text-[13px] text-[#333333]">아름다운바른이치과교정치과의원</div>
                                                </div>
                                                <div className="flex border-b border-[#F2F2F2]">
                                                    <div className="w-[120px] bg-[#F4F6F9] py-3 px-4 text-[13px] font-medium text-[#333333]">연락처</div>
                                                    <div className="flex-1 py-3 px-4 text-[13px] text-[#333333]">홍길동 (000-0000-0000)</div>
                                                </div>
                                                <div className="flex border-b border-[#F2F2F2]">
                                                    <div className="w-[120px] bg-[#F4F6F9] py-3 px-4 text-[13px] font-medium text-[#333333]">배송지</div>
                                                    <div className="flex-1 py-3 px-4 text-[13px] text-[#333333]">서울특별시 서초구 강남대 605 (잠원동, 세양21세기휴먼TOWER 3층)</div>
                                                </div>
                                                <div className="flex border-b border-[#F2F2F2]">
                                                    <div className="w-[120px] bg-[#F4F6F9] py-3 px-4 text-[13px] font-medium text-[#333333]">주문상품</div>
                                                    <div className="flex-1 py-3 px-4 text-[13px] text-[#333333]">
                                                        {orderedItemsSnapshot.find(item =>
                                                            item.name.toUpperCase().includes('LIDOCAINE') ||
                                                            item.name.toUpperCase().includes('GEL') ||
                                                            item.name.includes('의약품')
                                                        )?.name} 포함 총 {orderedItemsSnapshot.filter(item =>
                                                            item.name.toUpperCase().includes('LIDOCAINE') ||
                                                            item.name.toUpperCase().includes('GEL') ||
                                                            item.name.includes('의약품')
                                                        ).length}개
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                            </div>

                            <div className="flex justify-center mt-auto border-t border-[#D7D7D7] pt-10">
                                <button
                                    onClick={() => {
                                        setIsOrderCompleted(false);
                                        closeOrderSheet();
                                    }}
                                    className="w-[250px] h-[50px] bg-[#EB6100] text-white text-[16px] font-bold flex items-center justify-center transition-colors hover:bg-[#d55800]"
                                >
                                    주문내역 보기
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
