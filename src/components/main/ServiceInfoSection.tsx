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
            label: '개원신청 상담', icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
            )
        },
        {
            label: '체어 구매 상담', icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 8a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v4"></path>
                    <path d="M22 15a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2"></path>
                    <line x1="12" y1="17" x2="12" y2="22"></line>
                    <line x1="7" y1="22" x2="17" y2="22"></line>
                    <path d="M8 8v4"></path>
                    <path d="M16 8v4"></path>
                </svg>
            )
        },
        {
            label: '영상장비 구매 상담', icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v4"></path>
                    <path d="M12 18v4"></path>
                    <path d="M4.93 4.93l2.83 2.83"></path>
                    <path d="M16.24 16.24l2.83 2.83"></path>
                    <path d="M2 12h4"></path>
                    <path d="M18 12h4"></path>
                    <path d="M4.93 19.07l2.83-2.83"></path>
                    <path d="M16.24 7.76l2.83-2.83"></path>
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
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
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0z"></path>
                    <path d="M12 14c-5.33 0-8 2.67-8 5v3h16v-3c0-2.33-2.67-5-8-5z"></path>
                    <circle cx="18" cy="8" r="3"></circle>
                    <path d="M22 16c0-1.8-1.5-3.3-3.5-4"></path>
                    <circle cx="6" cy="8" r="3"></circle>
                    <path d="M2 16c0-1.8 1.5-3.3 3.5-4"></path>
                </svg>
            )
        },
    ];

    return (
        <section className="w-full bg-[#EFF1F5] flex flex-col items-center overflow-x-hidden">
            <div className="w-full bg-white flex justify-center">
                <div className="w-[1800px] mx-auto">
                    <div className="grid grid-cols-[1.2fr_1.2fr_1.4fr] pt-[35px] pb-[22px]">
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
            </div>
        </section>
    );
}
