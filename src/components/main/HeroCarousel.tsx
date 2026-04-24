export default function HeroCarousel() {
    return (
        <div className="w-full bg-[#f8f8f8] aspect-[21/9] md:aspect-[3/1] relative overflow-hidden">
            <div className="container-custom h-full flex items-center">
                <div className="max-w-md space-y-4">
                    <span className="bg-osstem-red text-white text-[11px] px-2 py-0.5 rounded-full font-bold">OCTOBER EVENT</span>
                    <h1 className="text-4xl font-bold leading-tight">
                        치과 재료의 완성,<br />
                        <span className="text-osstem-red">오스템 몰</span>에서 만나보세요
                    </h1>
                    <p className="text-gray-600 text-[14px]">
                        최고의 품질과 합리적인 가격,<br />
                        디지털 덴티스트리 통합 솔루션을 제공합니다.
                    </p>
                    <button className="btn-primary mt-4">자세히 보기 →</button>
                </div>
            </div>

            {/* Visual Element Placeholder */}
            <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-1/3 aspect-square bg-white rounded-full blur-3xl opacity-50 -z-0"></div>
        </div>
    );
}
