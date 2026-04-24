'use client';

interface VideoCardProps {
    thumbnail: string;
    title: string;
    badge?: string;
}

function VideoCard({ thumbnail, title, badge }: VideoCardProps) {
    return (
        <div
            className="flex flex-col group cursor-pointer border border-[#D6D6D6] bg-white transition-opacity duration-200"
            style={{
                width: '293.33px',
                height: '254px',
                opacity: 0.5, // 기본 불투명도 0.5
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')} // 마우스 오버 시 불투명도 1
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.5')}
        >
            {/* Thumbnail Area */}
            <div className="relative aspect-video bg-gray-100 overflow-hidden border-b border-[#D6D6D6]">
                <img
                    src={thumbnail}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516549221187-dc721347a3ad?w=600&h=337&fit=crop';
                    }}
                />

                {/* Red Badge */}
                {badge && (
                    <div className="absolute top-0 left-0 bg-[#E31F26] text-white px-2 py-1 flex flex-col items-center leading-none z-10">
                        <span className="text-[10px] font-bold">라이브 쇼</span>
                        <span className="text-[12px] font-bold mt-1">병의원인포</span>
                    </div>
                )}

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-black/40 rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-110">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-[16px] flex flex-col flex-1">
                {/* 영상제목: Pretendard 14px, Medium(500), LH 20px, LS -0.5% */}
                <h3 className="text-[14px] font-medium text-[#1E1E1E] leading-[20px] tracking-[-0.07px] line-clamp-2 h-[40px] mb-[12px]">
                    {title}
                </h3>

                {/* 바로가기 버튼: 69x29, Border 1px solid #000000, Text 14px Medium */}
                <button
                    style={{
                        width: '69px',
                        height: '29px',
                        padding: '6px 10px',
                    }}
                    className="border border-[#000000] text-[14px] font-medium text-[#000000] leading-none flex items-center justify-center whitespace-nowrap"
                >
                    바로가기
                </button>
            </div>
        </div>
    );
}

interface VideoSectionProps {
    title: string;
}

export default function VideoSection({ title }: VideoSectionProps) {
    const dummyVideos = [
        { title: '[Hospital Care] 효율적인 병동 관리를 위한 환자 모니터링 시스템', thumbnail: 'https://images.unsplash.com/photo-1516549221187-dc721347a3ad?w=600&h=337&fit=crop', badge: '라이브쇼' },
        { title: '[Diagnostics] 초음파 진단기 성능 극대화 및 프로브 관리법', thumbnail: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&h=337&fit=crop', badge: '라이브쇼' },
        { title: '[Infection Control] 의료기관 내 감염 예방을 위한 소독 지침', thumbnail: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=600&h=337&fit=crop', badge: '라이브쇼' },
        { title: '[Equipment] 고성능 멸균기의 올바른 사용법과 정기 점검 가이드', thumbnail: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=600&h=337&fit=crop', badge: '라이브쇼' },
        { title: '[Software] 스마트 차트 도입을 통한 병원 업무 디지털 전환', thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dad99988?w=600&h=337&fit=crop', badge: '라이브쇼' },
        { title: '[Management] 병원 수익 개선을 위한 효율적인 재고 관리 전략', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=337&fit=crop', badge: '라이브쇼' }
    ];

    return (
        <section className="w-full bg-white pt-[40px] pb-[40px] overflow-hidden">
            <div className="w-[1800px] mx-auto relative flex flex-col">
                {/* Section Title */}
                <div className="mb-[20px]">
                    <h2 className="text-[20px] font-bold text-[#000000] leading-none">{title}</h2>
                </div>

                {/* 6-Column Grid: 293.33px items in 1800px width with 8px gaps */}
                <div className="flex flex-row justify-between w-full">
                    {dummyVideos.map((video, i) => (
                        <VideoCard key={i} {...video} />
                    ))}
                </div>
            </div>
        </section>
    );
}
