'use client';

import React from 'react';

interface InfoItem {
    title: string;
    date: string;
}

interface ServiceItem {
    label: string;
    icon: React.ReactNode;
}

const ListSection = ({ title, items, gap = 8 }: { title: string, items: InfoItem[], gap?: number }) => (
    <div className="flex flex-col pr-10">
        <div className="flex justify-between items-center" style={{ marginBottom: `${gap}px` }}>
            <h3 className="text-[17px] font-bold text-[#1E1E1E] leading-none">{title}</h3>
            <button className="text-[14px] font-bold text-[#333333] flex items-center gap-1.5 hover:underline cursor-pointer border-none bg-transparent outline-none" style={{ fontFamily: 'Pretendard', lineHeight: '100%', letterSpacing: '-0.5px' }}>
                더보기
                <span className="relative flex items-center justify-center">
                    <span
                        className="inline-block border-t-[1.5px] border-r-[1.5px] border-[#1E1E1E]"
                        style={{
                            width: '6.5px',
                            height: '6.5px',
                            transform: 'rotate(45deg)',
                            marginTop: '-1px',
                            marginLeft: '0.28px'
                        }}
                    ></span>
                </span>
            </button>
        </div>
        <div className="flex flex-col">
            {items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center cursor-pointer">
                    <div className="flex items-center gap-1.5 overflow-hidden">
                        <span className="text-[#333333] text-[15px] flex-shrink-0">·</span>
                        <span
                            className="text-[14px] font-medium text-[#1E1E1E] truncate"
                            style={{
                                fontFamily: 'Pretendard',
                                lineHeight: '28px',
                                letterSpacing: '-0.5px'
                            }}
                        >
                            {item.title}
                        </span>
                    </div>
                    <span
                        className="text-[14px] font-normal text-[#999999] flex-shrink-0 ml-4"
                        style={{
                            fontFamily: 'Pretendard',
                            lineHeight: '28px',
                            letterSpacing: '-0.5px'
                        }}
                    >
                        {item.date}
                    </span>
                </div>
            ))}
        </div>
    </div>
);

export default function ServiceInfoSection() {
    const notices: InfoItem[] = [
        { title: '2026년 1월 5일 오스템몰 서버 교체 작업 공지', date: '2025-12-30' },
        { title: '설 연휴 배송 및 고객센터 운영 안내', date: '2025-12-24' },
        { title: '개인정보 처리방침 개정 및 시행 안내', date: '2025-12-15' },
        { title: '오스템몰 서비스 시스템 고도화 점검 공지', date: '2025-12-01' },
    ];

    const events: InfoItem[] = [
        { title: '뷰센 미백치약 첫 구매 5,000원 특가 이벤트', date: '2025-12-28' },
        { title: '신규 가입 웰컴 쿠폰팩 100% 증정', date: '2025-12-20' },
        { title: '이달의 베스트 리뷰어 포인트 지급 안내', date: '2025-12-10' },
        { title: '덴올 포인트 적립 및 사용 혜택 안내', date: '2025-11-25' },
    ];

    const services: ServiceItem[] = [
        {
            label: '배송 안내', icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
            )
        },
        {
            label: '장비 구매 상담', icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="1.6" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                    <path d="M17 9l-3 3-1.5-1.5" strokeWidth="2.5" />
                    <circle cx="12" cy="10" r="8" strokeOpacity="0.1" strokeWidth="1" />
                </svg>
            )
        },
        {
            label: '상품입점 문의', icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
            )
        },
        {
            label: '협력업체 문의', icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
            )
        },
        {
            label: '카드무이자 안내', icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                    <line x1="2" y1="10" x2="22" y2="10"></line>
                </svg>
            )
        },
    ];

    return (
        <section className="w-full bg-white flex flex-col items-center overflow-x-hidden">
            {/* Divider Line: Minimum 1920px width, centered */}
            <div className="w-full flex justify-center" style={{ marginTop: '30.36px', marginBottom: '35px' }}>
                <div className="min-w-[1920px] w-full h-[1px] bg-[#DCDCDC]"></div>
            </div>

            <div className="w-[1800px] mx-auto">
                <div className="grid grid-cols-[1.2fr_1.2fr_1.4fr] pb-[22px]">
                    {/* Column 1: 공지사항 */}
                    <div className="border-r border-[#EEEEEE]">
                        <ListSection title="공지사항" items={notices} gap={10} />
                    </div>

                    {/* Column 2: 이벤트 */}
                    <div className="px-10 border-r border-[#EEEEEE]">
                        <ListSection title="이벤트" items={events} gap={8} />
                    </div>

                    {/* Column 3: Mall 서비스 안내 */}
                    <div className="pl-14 flex flex-col">
                        <h3 className="text-[17px] font-bold text-[#1E1E1E] mb-8">Mall 서비스 안내</h3>
                        <div className="flex justify-between items-start">
                            {services.map((service, idx) => (
                                <div key={idx} className="flex flex-col items-center group cursor-pointer">
                                    <div className="w-[50px] h-[50px] flex items-center justify-center text-[#999999] group-hover:text-[#EB6100] transition-colors mb-2">
                                        {service.icon}
                                    </div>
                                    <span
                                        className="text-[14px] font-medium text-[#1E1E1E] text-center whitespace-nowrap"
                                        style={{
                                            fontFamily: 'Pretendard',
                                            lineHeight: '100%',
                                            letterSpacing: '-1.08px'
                                        }}
                                    >
                                        {service.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
