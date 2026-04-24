import ServiceInfoSection from '@/components/main/ServiceInfoSection';

export default function Footer() {
    return (
        <footer className="w-full bg-white pt-0 pb-20">
            {/* 0. 서비스 안내 영역 (공지사항, 이벤트, Mall 서비스) */}
            <ServiceInfoSection />

            {/* Links Bar */}
            <div className="w-full border-t border-b border-[#DCDCDC]">
                <div className="w-[1800px] mx-auto h-[46px] flex items-center gap-[36px] text-[14px] font-normal text-[#1E1E1E]">
                    <span style={{ fontFamily: 'Pretendard', lineHeight: '100%', letterSpacing: '-1.05px' }} className="cursor-pointer">회사소개</span>
                    <span style={{ fontFamily: 'Pretendard', lineHeight: '100%', letterSpacing: '-1.05px' }} className="cursor-pointer">이용약관</span>
                    <span style={{ fontFamily: 'Pretendard', lineHeight: '100%', letterSpacing: '-1.05px' }} className="cursor-pointer font-bold">개인정보처리방침</span>
                    <span style={{ fontFamily: 'Pretendard', lineHeight: '100%', letterSpacing: '-1.05px' }} className="cursor-pointer">입점문의</span>
                    <span style={{ fontFamily: 'Pretendard', lineHeight: '100%', letterSpacing: '-1.05px' }} className="cursor-pointer">고객센터</span>
                    <span style={{ fontFamily: 'Pretendard', lineHeight: '100%', letterSpacing: '-1.05px' }} className="cursor-pointer">뉴스제보</span>
                </div>
            </div>

            <div className="w-[1800px] mx-auto mt-[22px] flex items-start gap-12">
                {/* Left Logo */}
                <div className="flex-shrink-0 pt-1">
                    <img src="/images/logo_left.png" alt="OSSTEM IMPLANT" className="h-[40px] opacity-100" />
                </div>

                {/* Info Content */}
                <div className="flex-1">
                    <div
                        className="text-[12px] font-medium text-[#999999] break-keep"
                        style={{
                            fontFamily: 'Pretendard',
                            lineHeight: '22px',
                            letterSpacing: '-0.9px'
                        }}
                    >
                        대표 고객센터 TEL : 1588-7522 (상담가능시간 : 평일 09:00~18:00) 쇼핑몰 고객센터(전자금융거래분쟁처리담당) TEL : 1544-2275 (상담가능시간 : 평일 09:00~18:00) FAX : 070-4015-0184 E-mail : online@denall.com 오스템임플란트 주식회사 대표이사 : 김해성 사업자등록번호 : 112-81-47103 개인정보 보호책임자 : 이규업 이사 (arnold@osstem.com) 의료기기 판매업 신고번호 : 노원 제183호 의약품 도매상 허가번호 : 수원 권선 제2010-3740033-00002호 건강기능식품일반판매업 : 제2019-0084650호 통신판매업신고 : 서울강서 2751호 광고매체 심의번호 : 2011-110-09-0323 직업정보제공사업 신고번호 : 서울관악 제2012-22호 서울시 강서구 마곡중앙12로 3 오스템임플란트(주) 대표전화 : 02-2016-7000 FAX : 02-2016-7001
                    </div>
                    <div
                        className="text-[12px] font-medium text-[#999999] mt-4"
                        style={{
                            fontFamily: 'Pretendard',
                            lineHeight: '10px',
                            letterSpacing: '0px',
                            verticalAlign: 'middle'
                        }}
                    >
                        COPYRIGHT © OSSTEM IMPLANT CO., LTD. ALL RIGHTS RESERVED.
                    </div>
                </div>

                {/* Right Logo (Certifications) */}
                <div className="flex-shrink-0 pt-1">
                    <img src="/images/logo_right.png" alt="Certifications" className="h-[40px] opacity-100" />
                </div>
            </div>
        </footer>
    );
}
