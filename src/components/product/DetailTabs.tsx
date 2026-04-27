'use client';

import React, { useState } from 'react';

interface DetailTabsProps {
    productName: string;
    price?: string;
    thumbnail?: string;
}

export default function DetailTabs({ 
    productName = 'TS II SA Implant NoMount', 
    price = '53,100', 
    thumbnail = '/img/imple_1.png' 
}: DetailTabsProps) {
    const [activeTab, setActiveTab] = useState(0);
    const [isSticky, setIsSticky] = useState(false);
    const [isDescriptionFolded, setIsDescriptionFolded] = useState(true);
    const [expandedReviews, setExpandedReviews] = useState<number[]>([]);
    const [reviewSort, setReviewSort] = useState<'latest' | 'high' | 'low'>('latest');

    const toggleReview = (index: number) => {
        setExpandedReviews(prev => 
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };
    
    const tabs = ['상품 상세 정보', '리뷰(3)', '배송/교환/반품 안내', '상품문의'];

    React.useEffect(() => {
        const handleScroll = () => {
            const tabsElement = document.getElementById('detail-tabs-wrapper');
            if (tabsElement) {
                const rect = tabsElement.getBoundingClientRect();
                setIsSticky(rect.top <= 40);

                // Update active tab based on scroll position (상품문의는 새창 링크이므로 제외)
                const sectionIds = ['section-0', 'section-1', 'section-2'];
                for (let i = sectionIds.length - 1; i >= 0; i--) {
                    const el = document.getElementById(sectionIds[i]);
                    if (el) {
                        const rect = el.getBoundingClientRect();
                        if (rect.top <= 180) { // Offset for sticky header
                            setActiveTab(i);
                            break;
                        }
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (index: number) => {
        const el = document.getElementById(`section-${index}`);
        if (el) {
            const offset = 169; // 40px header + 129px sticky product bar
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = el.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const isMaterial = productName.includes('덴탈 세트') || productName.includes('OSSTEM FAMILY');

    const renderDescription = () => (
        <div id="section-0" className="flex flex-col items-center scroll-mt-[169px] w-full">
            <div className={`w-full flex flex-col items-center bg-white overflow-hidden transition-all duration-500 ${isDescriptionFolded ? 'max-h-[800px]' : 'max-h-[10000px]'}`}>
                {/* Mandatory Info Table */}
                <div className="w-[1160px]">
                    <h3 className="text-[18px] font-bold mb-4">필수 표기 정보</h3>
                    <div className="border-t border-[#eeeeee]">
                        <div className="grid grid-cols-[224px_1fr_224px_1fr] border-b border-[#eeeeee] text-[14px]">
                            <div className="bg-[#FAFAFA] h-[45px] flex items-center p-4 font-medium text-[#333333]">상품코드</div>
                            <div className="h-[45px] flex items-center p-4 text-[#333333]">{isMaterial ? '23075989' : '17128012'}</div>
                            <div className="bg-[#FAFAFA] h-[45px] flex items-center p-4 font-medium text-[#333333]">브랜드</div>
                            <div className="h-[45px] flex items-center p-4 text-[#333333]">{isMaterial ? '오스템파마(주)' : '오스템임플란트'}</div>
                        </div>
                        <div className="grid grid-cols-[224px_1fr_224px_1fr] border-b border-[#eeeeee] text-[14px]">
                            <div className="bg-[#FAFAFA] h-[45px] flex items-center p-4 font-medium text-[#333333]">품목 및 모델명</div>
                            <div className="h-[45px] flex items-center p-4 text-[#333333]">상세 페이지 참조</div>
                            <div className="bg-[#FAFAFA] h-[45px] flex items-center p-4 font-medium text-[#333333]">의료기기법상 허가신호 번호</div>
                            <div className="h-[45px] flex items-center p-4 text-[#333333]">{isMaterial ? 'N' : 'Y'}</div>
                        </div>
                        <div className="grid grid-cols-[224px_1fr_224px_1fr] border-b border-[#eeeeee] text-[14px]">
                            <div className="bg-[#FAFAFA] h-[45px] flex items-center p-4 font-medium text-[#333333]">정격전압, 소비전력</div>
                            <div className="h-[45px] flex items-center p-4 text-[#333333]">상세 페이지 참조</div>
                            <div className="bg-[#FAFAFA] h-[45px] flex items-center p-4 font-medium text-[#333333]">동일모델의 출시연월</div>
                            <div className="h-[45px] flex items-center p-4 text-[#333333]">{isMaterial ? '2026.01' : '2011.10'}</div>
                        </div>
                        <div className="grid grid-cols-[224px_1fr_224px_1fr] border-b border-[#eeeeee] text-[14px]">
                            <div className="bg-[#FAFAFA] h-[45px] flex items-center p-4 font-medium text-[#333333]">제조자</div>
                            <div className="h-[45px] flex items-center p-4 text-[#333333]">오스템임플란트</div>
                            <div className="bg-[#FAFAFA] h-[45px] flex items-center p-4 font-medium text-[#333333]">제조국/원산지</div>
                            <div className="h-[45px] flex items-center p-4 text-[#333333]">한국, 베트남</div>
                        </div>
                        <div className="grid grid-cols-[224px_1fr_224px_1fr] border-b border-[#eeeeee] text-[14px]">
                            <div className="bg-[#FAFAFA] h-[45px] flex items-center p-4 font-medium text-[#333333]">제품의 사용목적 및 사용방법</div>
                            <div className="h-[45px] flex items-center p-4 text-[#333333]">상세 페이지 참조</div>
                            <div className="bg-[#FAFAFA] h-[45px] flex items-center p-4 font-medium text-[#333333]">취급시 주의사항</div>
                            <div className="h-[45px] flex items-center p-4 text-[#333333]">상세 페이지 참조</div>
                        </div>
                        <div className="grid grid-cols-[224px_1fr_224px_1fr] border-b border-[#eeeeee] text-[14px]">
                            <div className="bg-[#FAFAFA] h-[45px] flex items-center p-4 font-medium text-[#333333]">품질보증기준</div>
                            <div className="h-[45px] flex items-center p-4 text-[#333333]">상세 페이지 참조</div>
                            <div className="bg-[#FAFAFA] h-[45px] flex items-center p-4 font-medium text-[#333333]">AS 책임자 / 전화번호</div>
                            <div className="h-[45px] flex items-center p-4 text-[#333333]">{isMaterial ? '오스템파마 고객센터 / 02-555-5555' : '오스템임플란트 고객센터 / 02-555-5555'}</div>
                        </div>
                        <div className="grid grid-cols-[224px_1fr_224px_1fr] border-b border-[#eeeeee] text-[14px]">
                            <div className="bg-[#FAFAFA] h-[45px] flex items-center p-4 font-medium text-[#333333]">안전인증 대상</div>
                            <div className="h-[45px] flex items-center p-4 text-[#333333]">해당 없음</div>
                            <div className="bg-[#FAFAFA] h-[45px] flex items-center p-4"></div>
                            <div className="h-[45px] flex items-center p-4"></div>
                        </div>
                    </div>
                </div>

                {/* Detailed Image */}
                <div className="w-[1160px] flex justify-center">
                    <img 
                        src={isMaterial ? "/img/material_detail.jpg" : "/img/TSII_SA_Implant_상세_10.png"} 
                        alt="Product Detail" 
                        className="w-full h-auto"
                    />
                </div>
                

            </div>

            {/* Fold/Unfold Button - 유저 지정 스타일 */}
            <div className="w-full flex justify-center">
                <button 
                    onClick={() => setIsDescriptionFolded(!isDescriptionFolded)}
                    className="w-[1160px] h-[54px] border border-[#333333] bg-white flex items-center justify-center gap-2 font-pretendard font-medium text-[15px] leading-[100%] tracking-[-0.5px] text-center text-[#333333] transition-colors shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)]"
                >
                    {isDescriptionFolded ? '상세정보 더보기' : '상세정보 접기'}
                    <svg 
                        width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                        className={`transition-transform duration-300 ${isDescriptionFolded ? '' : 'rotate-180'}`}
                    >
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </button>
            </div>
        </div>
    );

    const renderReviews = () => (
        <div id="section-1" className="w-[1160px] mt-[50px] flex flex-col scroll-mt-[169px]">
            {/* 섹션 타이틀 */}
            <h2 className="text-[18px] font-bold text-[#000000] mb-6">상품리뷰</h2>

            {/* 요약 영역: #F8F8F8 배경 + 3컬럼 */}
            <div className="w-full h-[168px] bg-[#F8F8F8] flex items-center justify-center">
                {/* 사용자 평점 */}
                <div className="flex-1 flex flex-col items-center justify-center">
                    <p className="text-[14px] font-bold text-[#333333] mb-3">사용자 평점</p>
                    <div className="flex items-center gap-0.5 mb-2">
                        {[1, 2, 3, 4].map(s => (
                            <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill="#EB6100">
                                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                            </svg>
                        ))}
                        {/* 빈 별 (4.0이므로 5번째는 빈 별) */}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#DEDEDE">
                            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                        </svg>
                    </div>
                    <p className="text-[34px] font-bold leading-none text-[#333333]">4.0<span className="text-[18px] text-[#999999] font-normal ml-1">/ 5</span></p>
                </div>

                <div className="w-[1px] h-[80px] bg-[#DEDEDE]"></div>

                {/* 전체 사용 후기 수 */}
                <div className="flex-1 flex flex-col items-center justify-center">
                    <p className="text-[14px] font-bold text-[#333333] mb-3">전체 사용 후기 수</p>
                    <p className="text-[34px] font-bold leading-none mt-2 text-[#333333]">3<span className="text-[20px] font-normal ml-1 text-[#333333]">건</span></p>
                </div>

                <div className="w-[1px] h-[80px] bg-[#DEDEDE]"></div>

                {/* 평점비율 - 세로 막대 차트 */}
                <div className="flex-1 flex flex-col items-center justify-center px-8">
                    <p className="text-[14px] font-bold text-[#333333] mb-2">평점비율</p>
                    {/* 평균 점수 표시 */}
                    <p className="text-[#EB6100] text-[13px] font-bold mb-2">4.0</p>
                    {/* 세로 막대 차트 */}
                    <div className="flex items-end gap-[10px] h-[60px]">
                        {[
                            { label: '5점', height: 35 },
                            { label: '4점', height: 55 },
                            { label: '3점', height: 20 },
                            { label: '2점', height: 12 },
                            { label: '1점', height: 8 },
                        ].map(item => (
                            <div key={item.label} className="flex flex-col items-center gap-1">
                                <div
                                    className="w-[16px] rounded-t-[2px]"
                                    style={{
                                        height: `${item.height}px`,
                                        backgroundColor: item.label === '4점' ? '#EB6100' : '#CCCCCC'
                                    }}
                                ></div>
                                <span className="text-[10px] text-[#999999]">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 포토 & 동영상 섹션 */}
            <div className="mt-8">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-pretendard font-bold text-[16px] leading-[100%] tracking-[-0.5px] text-[#000000]">
                        포토 & 동영상 <span className="text-[#EB6100]">1</span>건
                    </h3>
                    {/* 좌우 이동 버튼 - 관련자료 보기와 동일 스타일 */}
                    <div className="flex items-center w-[93px] h-[24px]">
                        <button 
                            disabled={true}
                            className="w-[24px] h-[24px] border border-[#DEDEDE] flex items-center justify-center flex-none transition-colors bg-[#f7f7f7] cursor-not-allowed"
                        >
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                                <path d="M10 4L6 8L10 12" stroke="#DEDEDE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <div className="flex-1 h-[24px] flex items-center justify-center bg-transparent text-[14px] font-pretendard leading-[17px] tracking-[-0.5px] text-[#333333]">
                            1 / 1
                        </div>
                        <button 
                            disabled={true}
                            className="w-[24px] h-[24px] border border-[#DEDEDE] flex items-center justify-center flex-none transition-colors bg-[#f7f7f7] cursor-not-allowed"
                        >
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                                <path d="M6 4L10 8L6 12" stroke="#DEDEDE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
                {/* 썸네일 1개, 138x138px, 테두리 제거 */}
                <div className="flex gap-[6px]">
                    <div className="w-[138px] h-[138px] overflow-hidden shrink-0 cursor-pointer relative rounded-[4px]">
                        <img src={isMaterial ? "/img/total_2.png" : "/img/u74.png"} alt="리뷰 사진 1" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>

            {/* 사용후기 리스트 헤더 */}
            <div className="mt-10 flex items-center justify-between border-b border-[#DEDEDE] pb-3">
                <h3 className="font-pretendard font-bold text-[16px] leading-[100%] tracking-[-0.5px] text-[#000000]">
                    사용후기 <span className="text-[#EB6100]">3</span>건
                </h3>
                <div className="flex items-center gap-[10px]">
                    <div 
                        onClick={() => setReviewSort('latest')}
                        className={`flex items-center gap-1 cursor-pointer font-pretendard text-[14px] leading-none tracking-[-0.5px] ${reviewSort === 'latest' ? 'text-[#000000] font-bold' : 'text-[#999999] font-normal hover:text-[#333333]'}`}
                    >
                        {reviewSort === 'latest' && (
                            <svg width="12" height="9" viewBox="0 0 12 9" fill="none" className="shrink-0 mt-[1px]">
                                <path d="M1 4L4.5 7.5L11 1" stroke="#EB6100" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        )}
                        <span>최신순</span>
                    </div>
                    <span className="text-[#DEDEDE] text-[10px]">|</span>
                    <div 
                        onClick={() => setReviewSort('high')}
                        className={`flex items-center gap-1 cursor-pointer font-pretendard text-[14px] leading-none tracking-[-0.5px] ${reviewSort === 'high' ? 'text-[#000000] font-bold' : 'text-[#999999] font-normal hover:text-[#333333]'}`}
                    >
                        {reviewSort === 'high' && (
                            <svg width="12" height="9" viewBox="0 0 12 9" fill="none" className="shrink-0 mt-[1px]">
                                <path d="M1 4L4.5 7.5L11 1" stroke="#EB6100" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        )}
                        <span>평점 높은순</span>
                    </div>
                    <span className="text-[#DEDEDE] text-[10px]">|</span>
                    <div 
                        onClick={() => setReviewSort('low')}
                        className={`flex items-center gap-1 cursor-pointer font-pretendard text-[14px] leading-none tracking-[-0.5px] ${reviewSort === 'low' ? 'text-[#000000] font-bold' : 'text-[#999999] font-normal hover:text-[#333333]'}`}
                    >
                        {reviewSort === 'low' && (
                            <svg width="12" height="9" viewBox="0 0 12 9" fill="none" className="shrink-0 mt-[1px]">
                                <path d="M1 4L4.5 7.5L11 1" stroke="#EB6100" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        )}
                        <span>평점 낮은순</span>
                    </div>
                </div>
            </div>

            {/* 리뷰 목록 */}
            <div>
                {[
                    {
                        id: 0,
                        user: 'na******',
                        date: '2025.07.13',
                        rating: 5,
                        content: '오스템 미백치약을 써봤는데<br/>개인 치아상태에 따라 다르겠으나<br/>제 경험에는 효과도 좋고 입안이 깔끔한 느낌이 좋아<br/>요번엔 충치로 주문해봤습니다.<br/>믿고 쓰겠습니다!',
                        image: isMaterial ? "/img/total_2.png" : "/img/u74.png",
                        sellerReply: {
                            user: '판매자',
                            date: '2025.07.14',
                            content: '안녕하세요 덴올몰 관리자입니다^^ 소중한 사용후기 감사합니다~<br/>현재 해당 제품에 대한 기획전이 진행중입니다. 더 합리적인 가격으로 구매가 가능하오니 해당 화면 오른쪽 상단의 기획전 참고 부탁드립니다. 감사합니다.'
                        }
                    },
                    {
                        id: 1,
                        user: 'ba*****',
                        date: '2025.06.28',
                        rating: 4,
                        content: '임플란트 시술중인 남편이 치과에서 받아와서 하나 쓰고<br/>다 써가기에 구매했습니다.<br/>혼자 써도 빨리 닳는 편이네요. 다 쓰고 또 구매하겠습니다.<br/>제품 퀄리티가 아주 만족스럽고 배송도 생각보다 빨랐습니다.<br/>다음에 또 필요하면 여기서 주문할게요!',
                        sellerReply: {
                            user: '판매자',
                            date: '2025.06.29',
                            content: '안녕하세요 덴올몰 관리자입니다^^ 소중한 사용후기 감사합니다~<br/>패키지 관련 피드백 전달드리겠습니다. 더 나은 서비스로 보답하겠습니다. 감사합니다.'
                        }
                    },
                    {
                        id: 2,
                        user: 'de*****',
                        date: '2025.06.15',
                        rating: 5,
                        content: '가격 대비 성능이 매우 뛰어납니다.<br/>처음 써보는 브랜드인데 신뢰가 가네요.<br/>앞으로 정착할 것 같습니다. 감사합니다.',
                    }
                ].sort((a, b) => {
                    if (reviewSort === 'latest') return new Date(b.date).getTime() - new Date(a.date).getTime();
                    if (reviewSort === 'high') return b.rating - a.rating;
                    if (reviewSort === 'low') return a.rating - b.rating;
                    return 0;
                }).map((review) => (
                    <div key={review.id} className={`py-7 border-b border-[#DEDEDE] transition-colors px-5 ${expandedReviews.includes(review.id) ? 'bg-[#F9F9F9]' : ''}`}>
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3 text-[13px]">
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map(s => (
                                        <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={s <= review.rating ? "#EB6100" : "#DEDEDE"}>
                                            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="font-bold text-[#333333]">{review.user}</span>
                                <span className="text-[#999999]">{review.date}</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <div 
                                    className={`font-pretendard font-normal text-[14px] leading-[22px] tracking-[-0.5px] text-[#333333] ${expandedReviews.includes(review.id) ? '' : 'line-clamp-3'}`}
                                    dangerouslySetInnerHTML={{ __html: review.content }}
                                />
                                {(review.image || review.content.split('<br/>').length > 3) && (
                                    <button 
                                        onClick={() => toggleReview(review.id)}
                                        className="mt-2 flex items-center gap-1 font-pretendard font-normal text-[14px] leading-none tracking-[-0.5px] text-[#333333]"
                                    >
                                        {expandedReviews.includes(review.id) ? '접기' : '더보기'}
                                        <svg 
                                            width="10" height="6" viewBox="0 0 10 6" fill="none" 
                                            className={`transition-transform ${expandedReviews.includes(review.id) ? 'rotate-180' : ''}`}
                                        >
                                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                )}
                                
                                {review.image && expandedReviews.includes(review.id) && (
                                    <div className="mt-4 w-full">
                                        <img src={review.image} alt="리뷰 상세 이미지" className="w-full max-w-[500px] h-auto" />
                                    </div>
                                )}
                            </div>
                            {review.image && (
                                <div className="w-[100px] h-[100px] overflow-hidden shrink-0">
                                    <img src={review.image} alt="리뷰 이미지" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                        {/* 판매자 답변 */}
                        {review.sellerReply && (
                            <div className="mt-4">
                                <div className="flex items-center gap-2 mb-2 text-[13px]">
                                    <span className="text-[#333333]">└ <span className="font-bold">{review.sellerReply.user}</span></span>
                                    <span className="text-[#DEDEDE]">|</span>
                                    <span className="text-[#999999]">{review.sellerReply.date}</span>
                                </div>
                                <p 
                                    className="font-pretendard font-normal text-[14px] leading-[22px] tracking-[-0.5px] text-[#333333]"
                                    dangerouslySetInnerHTML={{ __html: review.sellerReply.content }}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderDelivery = () => (
        <div id="section-2" className="w-[1160px] mt-[50px] scroll-mt-[169px]">
            <h2 className="text-[18px] font-bold text-[#000000] mb-6">배송/교환/반품 안내</h2>
            
            {/* 배송정보 */}
            <div className="mb-10">
                <h3 className="text-[16px] font-bold text-[#000000] mb-[12px]">배송정보</h3>
                <div className="border-t border-[#DEDEDE]">
                    <div className="grid grid-cols-[200px_1fr] border-b border-[#EEEEEE]">
                        <div className="bg-[#F8F8F8] p-5 flex items-center justify-center font-bold text-[14px] text-[#333333]">배송업체</div>
                        <div className="p-5 text-[14px] text-[#333333] leading-[22px]">
                            우체국택배 / 의약품배송 : 용마, 현대, 고려택배 (의약품 지정 택배) / 사무소모품 : 현대택배
                        </div>
                    </div>
                    <div className="grid grid-cols-[200px_1fr] border-b border-[#EEEEEE]">
                        <div className="bg-[#F8F8F8] p-5 flex items-center justify-center font-bold text-[14px] text-[#333333]">배송비</div>
                        <div className="p-5 text-[14px] text-[#333333] leading-[22px]">
                            3만원이상 주문시에는 무료배송이며, 3만원 이하일 경우 1Box 기준 2,500원 배송비가 부과됩니다.
                        </div>
                    </div>
                    <div className="grid grid-cols-[200px_1fr] border-b border-[#EEEEEE]">
                        <div className="bg-[#F8F8F8] p-5 flex items-center justify-center font-bold text-[14px] text-[#333333]">배송안내</div>
                        <div className="p-5 text-[14px] text-[#333333] leading-[22px]">
                            <ol className="list-decimal ml-4 space-y-1">
                                <li><span className="text-[#EB6100] font-bold">당사</span> 당사제품: 당사상품만 구매 시 15시(오후3시) 입금 확인 건에 한해 당일 출고됩니다. (단, 의약품은 오후 1시 주문 마감)</li>
                                <li><span className="text-[#005BAB] font-bold">외부</span> 외부상품: 외부상품만 구매 시 24시(오후0시) 입금 확인 건에 한해 익일 출고됩니다.</li>
                                <li>당사+외부상품 주문 시 배송기간이 1~2일 더 소요될 수 있습니다. (긴급한 경우 외부상품과 당사상품을 별도 주문해 주세요)</li>
                                <li>의약품은 합배송이 불가하며, 의약품 전문 배송업체에서 배송하므로 입금 확인 후 3~4일 정도 소요 됩니다.</li>
                                <li>당일배송은 서울, 경기 권(인천포함/일부구역 제외)만 가능하며, 오전 11시 50분까지 자사상품만 구매하였을 시 배송됩니다.</li>
                            </ol>
                            <p className="mt-4 text-[#999999]">* 상품 부피가 크거나 중량이 무거운 경우 또한 치과용 장비 등은 배송이 지연될 수 있으며, 직접배송, 설치 등을 지원하고 있습니다.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 배송절차 */}
            <div className="mb-10">
                <h3 className="text-[16px] font-bold text-[#000000] mb-[12px]">배송절차</h3>
                <div className="flex items-start gap-2">
                    {[
                        { title: '주문접수', desc: '결제이전의 주문접수 상태입니다.(예:무통장입금으로 주문시) 이상태는 주문이 완료 되지 않은 상태이며 따라서 배송이 이루어지지 않습니다.' },
                        { title: '결제완료', desc: '주문 결제가 완료된 상태로 이 상태부터 배송 준비가 이루어집니다.' },
                        { title: '배송준비중', desc: '해당협력업체에서 상품 배 송을 위해 주문을 확인하고 배 송을 준비하는 과정입니다.' },
                        { title: '배송중', desc: '상품이 발송되어 고객님께 배송중인 상태입니다.' },
                        { title: '배송완료', desc: '상품이 고객님께 전달되어 배송이 완료된 상태입니다.' },
                    ].map((step, idx) => (
                        <React.Fragment key={idx}>
                            <div className="flex-1 border border-[#DEDEDE] min-h-[160px]">
                                <div className="bg-[#D36F61] h-[45px] flex items-center justify-center text-white font-bold text-[15px] relative">
                                    {step.title}
                                    {idx < 4 && (
                                        <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 z-10">
                                            <svg width="10" height="20" viewBox="0 0 10 20" fill="none">
                                                <path d="M0 0L10 10L0 20" fill="#D36F61" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <div className="p-4 text-[13px] text-[#666666] leading-[20px]">
                                    {step.desc}
                                </div>
                            </div>
                            {idx < 4 && <div className="w-1"></div>}
                        </React.Fragment>
                    ))}
                </div>
                <p className="mt-4 text-[13px] text-[#666666]">
                    • 주문 &gt; 결제 &gt; 배송 절차에 따라 진행되며 ‘마이페이지 &gt; 주문/배송 정보’ 에서 진행사항을 확인 하실 수 있습니다.
                </p>
            </div>

            {/* 교환/반품 */}
            <div className="mb-10">
                <h3 className="text-[16px] font-bold text-[#000000] mb-[12px]">교환/반품</h3>
                <div className="border-t border-[#DEDEDE]">
                    <div className="grid grid-cols-[200px_1fr] border-b border-[#EEEEEE]">
                        <div className="bg-[#F8F8F8] p-5 flex items-center justify-center font-bold text-[14px] text-[#333333]">교환 / 반품 안내</div>
                        <div className="p-5 text-[14px] text-[#333333] leading-[22px]">
                            <p className="font-bold mb-2">다음과 같은 경우 교환 및 반품이 가능합니다.</p>
                            <ol className="list-decimal ml-4 space-y-1">
                                <li>배송된 상품 자체에 하자가 있거나, 배송중에 상품이 손상된 경우 반품/교환 하실 수 있습니다.</li>
                                <li>주문하신 상품을 실제 받으신 날로부터 7일 이내에 요청하실 수 있습니다.</li>
                                <li>상품설명, 광고 및 주문내용과 다를 경우 30일 이내에 요청하실 경우 교환 및 반품이 가능합니다. 단, 고객변심에 의한 반품/교환시 배송비는 고객부담 하셔야 합니다. (반품 배송비 : 2,500원, 교환 배송비(왕복) 5,000원)</li>
                                <li>교환시에는 동일상품으로 1:1 교환이 가능하며, 다른 상품으로 교환은 불가합니다.</li>
                                <li>반품 신청시 상품 수거 및 상품 확인 후 환불처리 됩니다. (수거일로부터 3일이내(토,공휴일제외) 환불 처리되며, 카드사 사정에 따라 카드취소는 시일이 소요될 수 있습니다.)</li>
                                <li>반품 접수 후 영업일 기준 2~5일(토,공휴일 제외) 이내에 직접 방문하여 상품을 수거합니다. (배송업체 또는 담당지역 영업사원)</li>
                                <li>주문취소시간은 평일 : 오후 3시까지 / 토요일 : 오전 11시까지. 그 이후의 취소는 불가능하니 고객센터로 문의주시길 바랍니다.</li>
                                <li>제품의 교환 및 반품시 주의사항</li>
                            </ol>
                            <div className="flex gap-10 mt-6 mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-[60px] h-[60px] rounded-full border-2 border-[#EB6100] flex items-center justify-center">
                                        <div className="w-8 h-8 border-2 border-[#EB6100] rounded-sm"></div>
                                    </div>
                                    <div>
                                        <p className="text-[#EB6100] font-bold">반품시 올바른 포장방법</p>
                                        <p className="text-[#666666]">빈 박스에 포장</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-[60px] h-[60px] rounded-full border-2 border-[#DEDEDE] flex items-center justify-center text-[30px] text-[#D36F61]">✕</div>
                                    <div>
                                        <p className="text-[#D36F61] font-bold">잘못된 포장방법</p>
                                        <p className="text-[#666666]">쇼핑백이나 상품자체만 보낸경우</p>
                                    </div>
                                </div>
                            </div>
                            <ul className="list-disc ml-4 space-y-1 text-[#D36F61]">
                                <li>반드시 제품 자체 포장 및 내용물이 훼손되지 않도록 택배박스를 이용해 포장을 준비해주시기 바랍니다.</li>
                                <li>제품 자체 박스(포장)에 직접송장을 붙여 상품이 훼손되어 재판매가 불가능한 경우에는 반품 및 교환처리가 되지 않습니다. 이점 주의하시기 바랍니다.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="grid grid-cols-[200px_1fr] border-b border-[#EEEEEE]">
                        <div className="bg-[#F8F8F8] p-5 flex items-center justify-center font-bold text-[14px] text-[#333333]">교환 / 반품<br/>불가사유 안내</div>
                        <div className="p-5 text-[14px] text-[#333333] leading-[22px]">
                            <p className="font-bold mb-2">다음과 같은 경우 교환 및 반품을 하실 수 없습니다.</p>
                            <ol className="list-decimal ml-4 space-y-1">
                                <li>교환/반품 가능 기간을 초과하였을 경우에는 교환/반품이 불가합니다.</li>
                                <li>상품 및 구성품을 분실하였거나 취급부주의로 인한 파손/고장/오염된 경우에는 교환/반품이 불가합니다. (단, 상품의 내용을 확인하기 위하여 포장 등을 개봉한 경우에는 교환/반품이 가능합니다.)</li>
                                <li>상품 포장을 개봉하여 사용하거나 일부 소비하여 상품 등의 가치가 크게 감소한 경우에는 교환/반품이 불가합니다.</li>
                                <li>설치가 완료된 장비 등은 상품의 가치가 훼손된 경우로 교환/반품이 불가합니다.</li>
                                <li>시간이 경과되어 재판매가 곤란할 정도로 상품 등의 가치가 크게 감소한 경우 교환/반품이 불가합니다.</li>
                            </ol>
                        </div>
                    </div>
                    <div className="grid grid-cols-[200px_1fr] border-b border-[#EEEEEE]">
                        <div className="bg-[#F8F8F8] p-5 flex items-center justify-center font-bold text-[14px] text-[#333333]">교환 / 반품 방법</div>
                        <div className="p-5 text-[14px] text-[#333333] leading-[22px]">
                            <ol className="list-decimal ml-4 space-y-1">
                                <li>덴몰 “마이페이지 &gt; 최근 구매내역조회” 메뉴를 통해 신청하실 수 있습니다.</li>
                                <li>고객센터 (1544-2275)를 통해 신청하실 수 있습니다.</li>
                                <li>교환/반품/환불에 대한 궁금하신 점은 FAQ 또는 1:1 상담 게시판을 이용해주세요.</li>
                            </ol>
                            <ul className="mt-4 space-y-1 text-[#999999]">
                                <li>* 전자상거래 등에서의 소비자보호에 관한 법률에 의한 반품규정이 상품공급업체가 지정한 반품조건보다 우선합니다.</li>
                                <li>* 상품의 불량에 의한 교환 / 반품 / 환불 / A/S 등에 관한 사항은 소비자 분쟁해결기준(공정거래위원회고시)에 따라 받으실 수 있습니다.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );



    return (
        <div id="detail-tabs-wrapper" className="mt-[50px] w-full overflow-visible pb-0">
            {/* Sticky Container */}
            <div className={`w-full bg-white z-[90] box-border ${isSticky ? 'fixed top-[40px] left-0 shadow-[0_1px_0_0_#c4c4c4] h-[129px]' : ''}`}>
                <div className="w-[1160px] mx-auto">
                    {/* Product Info Section (Visible only when sticky) */}
                    {isSticky && (
                        <div className="w-full h-[79px] flex items-center justify-between px-0 bg-white">
                            <div className="flex items-center gap-4">
                                <div className="w-[50px] h-[50px] flex items-center justify-center p-1 shrink-0 border border-[#E9E9E9]">
                                    <img 
                                        src={thumbnail || (isMaterial ? '/img/total_1.png' : '/img/imple_1.png')} 
                                        alt={productName} 
                                        className="w-full h-full object-contain" 
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = isMaterial ? "/img/total_1.png" : "/img/imple_1.png";
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-[16px] font-bold text-[#333333] leading-none mb-2">{productName}</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="bg-[#dadada] text-[#333333] text-[12px] px-1.5 py-0.5 font-bold leading-none">임플란트PKG</span>
                                        <div className="flex items-baseline gap-[2px]">
                                            <span className="text-[22px] font-extrabold text-[#000000] leading-none">{price}</span>
                                            <span className="text-[16px] font-bold text-[#000000]">원</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={() => {
                                    const el = document.getElementById('add-to-cart-section');
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="w-[340px] h-[50px] bg-[#EB6100] text-white text-[15px] font-bold hover:bg-[#d55700] transition-colors leading-none"
                            >
                                주문서 담기
                            </button>
                        </div>
                    )}

                    {/* Tabs Header */}
                    <div className="flex flex-row justify-center items-center p-0 w-[1160px] h-[50px] relative bg-white overflow-hidden">
                        {tabs.map((tab, i) => {
                            const isInquiry = tab === '상품문의';
                            return (
                                <div
                                    key={i}
                                    onClick={() => {
                                        if (isInquiry) {
                                            const inquiryUrl = isMaterial 
                                                ? 'https://voc.denall.com/qna/input?channel=mall&goodsNo=23075848'
                                                : 'https://voc.denall.com/qna/input?channel=mall&goodsNo=17128012';
                                            window.open(inquiryUrl, '_blank');
                                        } else {
                                            scrollToSection(i);
                                        }
                                    }}
                                    className={`relative flex-1 h-[50px] flex items-center justify-center cursor-pointer font-pretendard font-semibold text-[16px] leading-[19px] tracking-[-0.5px] border border-[#DEDEDE] -ml-[1px] first:ml-0 transition-colors
                                        ${isInquiry
                                            ? 'bg-white text-[#333333] hover:bg-[#F8F8F8]'
                                            : activeTab === i ? 'bg-[#424242] text-white border-[#424242] z-20' : 'bg-white text-[#333333] hover:bg-[#F8F8F8]'
                                        }
                                        ${isSticky ? 'border-b-0 h-[50px]' : ''}`}
                                >
                                    <div className="flex items-center gap-1.5">
                                        {tab}
                                        {/* 상품문의: 새창 링크 아이콘 */}
                                        {isInquiry && (
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                <polyline points="15 3 21 3 21 9" />
                                                <line x1="10" y1="14" x2="21" y2="3" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {isSticky && <div className="h-[129px]"></div>}

            <div className="w-[1160px] mx-auto bg-white pt-10 flex flex-col">
                {renderDescription()}
                {renderReviews()}
                {renderDelivery()}
            </div>

            {/* 연관상품 섹션 (탭 영역과 분리) */}
            <div className="w-[1160px] mx-auto mt-0 mb-0">
                <h3 className="text-[20px] font-bold text-[#000000] mb-[12px]">연관상품</h3>
                <div className="grid grid-cols-7 gap-[10px]">
                    {isMaterial ? (
                        [
                            { name: 'OSSTEM 2:2 DENTAL SET (S+C)', price: '15,200', img: '/img/M_rel_1.png', brand: '오스템파마' },
                            { name: 'OSSTEM FAMILY TRAVEL KIT (S+C+G+30)', price: '13,500', img: '/img/M_rel_2.png', brand: '오스템파마' },
                            { name: 'OSSTEM DOUBLE-WIDE TOOTHBRUSH 4P/12P', price: '9,000', img: '/img/M_rel_3.png', brand: '오스템파마' },
                            { name: '[오스템x레오거] 오스템 30 미백 치약 80G 10개입', price: '54,000', img: '/img/M_rel_4.jpg', brand: '오스템파마' },
                            { name: '[오스템x레오거] 1:1 덴탈 세트 (오스템30)', price: '7,600', img: '/img/M_rel_5.jpg', brand: '오스템파마' },
                            { name: '[오스템] 오스템x레오거 쇼핑백 (중) 100매입', price: '140,000', img: '/img/M_rel_6.png', brand: '오스템파마' },
                            { name: '[오스템] 레오거 풍선 키링', price: '15,000', img: '/img/M_rel_7.png', brand: '오스템파마' },
                        ].map((item, idx) => (
                            <div key={idx} className="border border-[#DEDEDE] hover:border-[#EB6100] flex flex-col group cursor-pointer bg-white h-[222px] transition-colors">
                                <div className="w-full h-[120px] overflow-hidden flex items-center justify-center p-2 bg-transparent">
                                    <img src={item.img} alt={item.name} className="w-full h-full object-contain transform group-hover:scale-105 transition-transform" />
                                </div>
                                <div className="p-3 flex flex-col flex-1">
                                    <p className="font-pretendard font-medium text-[14px] text-[#1E1E1E] group-hover:text-[#EB6100] leading-[15px] tracking-[-0.5px] mb-2 line-clamp-2 h-[30px] overflow-hidden transition-colors">
                                        {item.name}
                                    </p>
                                    <p className="font-pretendard font-medium text-[11px] text-[#999999] leading-none tracking-[-0.5px] mb-1">
                                        {item.brand}
                                    </p>
                                    <p className="font-pretendard font-medium text-[14px] text-[#1E1E1E] leading-none tracking-[-0.04em]">
                                        {item.price}원
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        [
                            { name: 'TS II SA Implant Bevel Machined', price: '164,000', img: '/img/Rel_1.png' },
                            { name: 'TS TI Multi Base Screw', price: '22,000', img: '/img/Rel_2.png' },
                            { name: 'TS Transfer Implant Pick-up Guide Pin', price: '16,500', img: '/img/Rel_3.png' },
                            { name: 'TS II SOI Implant Pre-Mounted', price: '201,000', img: '/img/Rel_4.png' },
                            { name: 'TS GBR Cover Screw', price: '11,000', img: '/img/Rel_5.png' },
                            { name: 'TS Scan Healing Abutment', price: '44,000', img: '/img/Rel_6.png' },
                            { name: 'TS Digital Lab Analog', price: '19,800', img: '/img/Rel_7.png' },
                        ].map((item, idx) => (
                            <div key={idx} className="border border-[#DEDEDE] hover:border-[#EB6100] flex flex-col group cursor-pointer bg-white h-[222px] transition-colors">
                                <div className="w-full h-[120px] overflow-hidden flex items-center justify-center p-2 bg-transparent">
                                    <img src={item.img} alt={item.name} className="w-full h-full object-contain transform group-hover:scale-105 transition-transform" />
                                </div>
                                <div className="p-3 flex flex-col flex-1">
                                    <p className="font-pretendard font-medium text-[14px] text-[#1E1E1E] group-hover:text-[#EB6100] leading-[15px] tracking-[-0.5px] mb-2 line-clamp-2 h-[30px] overflow-hidden transition-colors">
                                        {item.name}
                                    </p>
                                    <p className="font-pretendard font-medium text-[11px] text-[#999999] leading-none tracking-[-0.5px] mb-1">
                                        오스템임플란트
                                    </p>
                                    <p className="font-pretendard font-medium text-[14px] text-[#1E1E1E] leading-none tracking-[-0.04em]">
                                        {item.price}원
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
