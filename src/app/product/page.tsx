import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import DetailTabs from '@/components/product/DetailTabs';
import RelatedResourcesSlider from '@/components/product/RelatedResourcesSlider';

// 상품 맞춤형 관련자료 생성을 위한 유틸리티 함수
function getRelatedResources(productName: string) {
    const isKS3 = productName === 'KS 3 SA Implant (NEW) NoMount';
    const isMaterial = productName.includes('덴탈 세트') || productName.includes('OSSTEM FAMILY');
    let resources = [];
    if (isKS3) {
        resources = [
            {
                id: 1,
                type: '동영상',
                badgeColor: '#EB6100',
                title: '[Implant] 한계를 넘어선 임플란트, New KS 3',
                source: '오스템임플란트',
                thumbnail: '/img/K2_thumb1.png',
                duration: '05:12',
                link: 'https://tv.denall.com/vod/play?id=8348'
            },
            {
                id: 2,
                type: '동영상',
                badgeColor: '#EB6100',
                title: '[Implant] New KS 3',
                source: '오스템임플란트',
                thumbnail: '/img/K2_thumb2.png',
                duration: '00:30',
                link: 'https://tv.denall.com/vod/play?id=8354'
            },
            {
                id: 3,
                type: '홍보자료',
                badgeColor: '#EB6100',
                title: 'KS 3 SA Implant',
                source: '오스템임플란트',
                thumbnail: '/img/K2_thumb3.png',
                link: 'https://prd-img-dnm.osstem.com/mall/files/etc/a3/202604/KS3_detail.png'
            },
            {
                id: 4,
                type: 'SNS',
                badgeColor: '#EB6100',
                title: 'Beyond limits, New KS 3',
                source: '오스템임플란트',
                thumbnail: '/img/K3_rel_1.png',
                link: 'https://www.instagram.com/p/DV71Lq9FfVI/?img_index=1'
            },
            {
                id: 5,
                type: '학술논문',
                badgeColor: '#EB6100',
                title: 'Immediate loading 부족한 성공률 5% 채우기',
                source: '오스템임플란트',
                thumbnail: '/img/K3_rel_2.png',
                link: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART001758243'
            },
            {
                id: 6,
                type: '학술논문',
                badgeColor: '#EB6100',
                title: 'IImmediate and early implant loading protocols: A literature review of clinical studies',
                source: '오스템임플란트',
                thumbnail: '/img/K3_rel_3.png',
                link: 'https://www.thejpd.org/article/S0022-3913(05)00240-4/abstract'
            },
            {
                id: 7,
                type: '뉴스',
                badgeColor: '#EB6100',
                title: '오스템임플란트, 즉시 로딩 특화 설계 ‘New KS 3’ 베일 벗는다',
                source: '오스템임플란트',
                thumbnail: '/img/K3_rel_4.jpg',
                link: 'https://www.dentalarirang.com/news/articleView.html?idxno=47075'
            },
            {
                id: 8,
                type: '뉴스',
                badgeColor: '#EB6100',
                title: '즉시 로딩 특화 설계 적용한 차세대 임플란트 ‘New KS 3’ 정식 론칭',
                source: '오스템임플란트',
                thumbnail: '/img/K3_rel_5.jpg',
                link: 'https://www.dentalnews1.com/news/articleView.html?idxno=24634'
            }
        ];
    } else if (isMaterial) {
        resources = [
            {
                id: 1,
                type: 'SNS',
                badgeColor: '#EB6100',
                title: '#구강관리 필수템',
                source: 'SNS',
                thumbnail: '/img/material_1.png'
            },
            {
                id: 2,
                type: '학술논문',
                badgeColor: '#EB6100',
                title: '구강관리행동과 구강환경에 의한 구취에 관한 연구',
                source: '한국산학기술회논문지',
                thumbnail: '/img/material_2.png'
            },
            {
                id: 3,
                type: '뉴스',
                badgeColor: '#EB6100',
                title: '[위클리 건강] "치아 1개는 1년 수명연장 가치...내게 맞는 제품 고르는 방법"',
                source: '연합뉴스',
                thumbnail: '/img/material_3.png'
            },
            {
                id: 4,
                type: '학술논문',
                badgeColor: '#EB6100',
                title: '치주염과 후성유전의 연관성 고찰',
                source: '전남대학교',
                thumbnail: '/img/material_4.png'
            },
            {
                id: 5,
                type: '동영상',
                badgeColor: '#EB6100',
                title: '충치에 대한 A to Z',
                source: '오스템임플란트',
                thumbnail: '/img/material_5.png',
                duration: '03:45',
                link: 'https://tv.denall.com/vod/play?id=8381'
            },
            {
                id: 6,
                type: '동영상',
                badgeColor: '#EB6100',
                title: '잇몸건강을 해치는 치주질환',
                source: '오스템임플란트',
                thumbnail: '/img/material_6.png',
                duration: '04:20'
            }
        ];
    } else {
        resources = [
            {
                id: 1,
                type: '동영상',
                badgeColor: '#EB6100',
                title: '[대한구강악안면임플란트학회] 임플란트 수술 시 발생하는 다양한 합병증의 예방 및 해결 전략 1부',
                source: '오스템임플란트',
                thumbnail: '/img/thumb_1.png',
                duration: '05:12',
                link: 'https://tv.denall.com/vod/play?id=8537'
            },
            {
                id: 2,
                type: '뉴스',
                badgeColor: '#EB6100',
                title: '오늘의 치과계 뉴스',
                source: '오스템임플란트',
                thumbnail: '/img/thumb_2.png'
            },
            {
                id: 3,
                type: 'SNS',
                badgeColor: '#EB6100',
                title: '임플란트 수술에 관한 궁금증',
                source: '오스템임플란트',
                thumbnail: '/img/thumb_3.png'
            },
            {
                id: 4,
                type: '학술논문',
                badgeColor: '#EB6100',
                title: 'SA 표면 임플란트의 자외선조사가 성견의 임플란트 골유착에 미치는 영향',
                source: '오스템임플란트',
                thumbnail: '/img/thumb_4.png'
            },
            {
                id: 5,
                type: '홍보자료',
                badgeColor: '#EB6100',
                title: 'TS II 브로셔',
                source: '오스템임플란트',
                thumbnail: '/img/thumb_5.png'
            },
            {
                id: 6,
                type: '동영상',
                badgeColor: '#EB6100',
                title: 'TS II SA 임플란트 시스템 정밀 식립 프로토콜 이해',
                source: '오스템임플란트',
                thumbnail: '/img/thumb_6.png',
                duration: '00:30'
            },
            {
                id: 7,
                type: '홍보자료',
                badgeColor: '#EB6100',
                title: 'TS II 임플란트 임상 케이스',
                source: '오스템임플란트',
                thumbnail: '/img/thumb_7.png'
            }
        ];
    }

    const order = ['동영상', 'SNS', '학술논문', '뉴스', '홍보자료'];
    return resources.sort((a, b) => {
        const indexA = order.indexOf(a.type);
        const indexB = order.indexOf(b.type);
        // If type is not in the array, put it at the end
        const finalIndexA = indexA === -1 ? 999 : indexA;
        const finalIndexB = indexB === -1 ? 999 : indexB;
        return finalIndexA - finalIndexB;
    });
}

export default async function ProductDetailPage({
    searchParams
}: {
    searchParams: Promise<{ name?: string; brand?: string; price?: string; thumbnail?: string; category?: string; subCategory?: string }>
}) {
    const params = await searchParams;
    const isImplant = (params.brand || 'Osstem Implant') === 'Osstem Implant';
    const rawName = params.name || (isImplant ? 'TS II SA Implant NoMount' : '[오스템x레오거] 2:2 덴탈 세트');
    const productName = rawName === 'OSSTEM FAMILY TRAVEL KIT (S+C+G+30)' ? '[오스템x레오거] 2:2 덴탈 세트' : rawName;
    const isKS3 = productName === 'KS 3 SA Implant (NEW) NoMount';
    const displayPrice = isKS3 ? '61,040' : (isImplant ? '53,100' : '15,200');
    const productData = {
        name: productName,
        brand: params.brand || 'Osstem Implant',
        price: displayPrice,
        thumbnail: isKS3 ? '/img/K3_1.png' : ((params.thumbnail && params.thumbnail !== '') ? params.thumbnail : (isImplant ? '/img/imple_1.png' : '/img/total_1.png')),
        category: params.category || (isImplant ? '임플란트' : '예방/구강'),
        subCategory: params.subCategory || (isImplant ? 'TS system' : '구강케어 SET')
    };

    const relatedResources = getRelatedResources(productData.name);

    return (
        <div className="bg-[#ffffff] min-h-screen font-pretendard">
            <div className="w-[1160px] max-w-[1160px] min-w-[1160px] mx-auto pt-[6px] pb-20">
                {/* Navi (Breadcrumb) */}
                <div className="flex items-center gap-[8px] h-[30px] mb-[6px]">
                    {isImplant ? (
                        <>
                            <div className="flex items-center gap-[6px]">
                                <span className="text-[13px] font-normal text-[#737373]">임플란트</span>
                                <button className="w-[15px] h-[15px] rounded-full border border-[#DEDEDE] flex items-center justify-center">
                                    <svg width="6" height="3" viewBox="0 0 24 12" fill="none" stroke="#999999" strokeWidth="5"><path d="M2 2L12 12L22 2" /></svg>
                                </button>
                            </div>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DEDEDE" strokeWidth="2"><path d="M9 5L16 12L9 19" /></svg>
                            
                            <div className="flex items-center gap-[6px]">
                                <span className="text-[13px] font-normal text-[#737373]">{isKS3 ? 'KS System' : 'TS system'}</span>
                                <button className="w-[15px] h-[15px] rounded-full border border-[#DEDEDE] flex items-center justify-center">
                                    <svg width="6" height="3" viewBox="0 0 24 12" fill="none" stroke="#999999" strokeWidth="5"><path d="M2 2L12 12L22 2" /></svg>
                                </button>
                            </div>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DEDEDE" strokeWidth="2"><path d="M9 5L16 12L9 19" /></svg>

                            <div className="flex items-center gap-[6px]">
                                <span className="text-[13px] font-normal text-[#737373]">Implant</span>
                                <button className="w-[15px] h-[15px] rounded-full border border-[#DEDEDE] flex items-center justify-center">
                                    <svg width="6" height="3" viewBox="0 0 24 12" fill="none" stroke="#999999" strokeWidth="5"><path d="M2 2L12 12L22 2" /></svg>
                                </button>
                            </div>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DEDEDE" strokeWidth="2"><path d="M9 5L16 12L9 19" /></svg>

                            <div className="flex items-center gap-[6px]">
                                <span className="text-[13px] font-normal text-[#737373]">{isKS3 ? 'KSIII' : 'TSII'}</span>
                                <button className="w-[15px] h-[15px] rounded-full border border-[#DEDEDE] flex items-center justify-center">
                                    <svg width="6" height="3" viewBox="0 0 24 12" fill="none" stroke="#999999" strokeWidth="5"><path d="M2 2L12 12L22 2" /></svg>
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-[6px]">
                                <span className="text-[13px] font-normal text-[#737373]">예방/구강</span>
                                <button className="w-[15px] h-[15px] rounded-full border border-[#DEDEDE] flex items-center justify-center">
                                    <svg width="6" height="3" viewBox="0 0 24 12" fill="none" stroke="#999999" strokeWidth="5"><path d="M2 2L12 12L22 2" /></svg>
                                </button>
                            </div>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DEDEDE" strokeWidth="2"><path d="M9 5L16 12L9 19" /></svg>
                            
                            <div className="flex items-center gap-[6px]">
                                <span className="text-[13px] font-normal text-[#737373]">구강케어 SET</span>
                                <button className="w-[15px] h-[15px] rounded-full border border-[#DEDEDE] flex items-center justify-center">
                                    <svg width="6" height="3" viewBox="0 0 24 12" fill="none" stroke="#999999" strokeWidth="5"><path d="M2 2L12 12L22 2" /></svg>
                                </button>
                            </div>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DEDEDE" strokeWidth="2"><path d="M9 5L16 12L9 19" /></svg>

                            <div className="flex items-center gap-[6px]">
                                <span className="text-[13px] font-normal text-[#737373]">덴탈 SET</span>
                                <button className="w-[15px] h-[15px] rounded-full border border-[#DEDEDE] flex items-center justify-center">
                                    <svg width="6" height="3" viewBox="0 0 24 12" fill="none" stroke="#999999" strokeWidth="5"><path d="M2 2L12 12L22 2" /></svg>
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* Top Content Area (Frame 14) */}
                <div className="flex gap-[30px] items-start mb-[50px]">
                    <div className="w-[542px]">
                        <ProductGallery 
                            thumbnail={productData.thumbnail} 
                            isImplant={isImplant}
                            productName={productData.name}
                        />
                    </div>
                    <div className="flex-1">
                        <ProductInfo
                            name={productData.name}
                            brand={productData.brand}
                            price={productData.price}
                            thumbnail={productData.thumbnail}
                        />
                    </div>
                </div>

                {/* 관련자료 Section (1160px 전체 너비 활용) */}
                <div id="related-resources" className="mt-0 mb-[50px] w-[1160px]">
                    <RelatedResourcesSlider resources={relatedResources} />
                </div>

                {/* Bottom Details Tabs */}
                <DetailTabs 
                    productName={productData.name} 
                    price={productData.price} 
                    thumbnail={productData.thumbnail} 
                />
            </div>
        </div>
    );
}
