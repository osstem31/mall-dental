'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import CategoryHeader from '@/components/category/CategoryHeader';
import TopCategoryTabs from '@/components/category/TopCategoryTabs';
import ProductCard from '@/components/common/ProductCard';

import { CATEGORY_TOTALS, SUB_CATEGORY_COUNTS, BRAND_COUNTS } from '@/data/categoryData';

function CategoryContent() {
    const searchParams = useSearchParams();
    const categoryName = searchParams.get('name') || '위생용품';
    const [activePage, setActivePage] = useState(1);

    // 필션 상태 관리
    const [isCompanyOnly, setIsCompanyOnly] = useState(false);
    const [isInsuranceOnly, setIsInsuranceOnly] = useState(false);

    // 상단 탭 필터 상태 (TopCategoryTabs 연동용)
    const [viewType, setViewType] = useState<'brand' | 'category'>('category');
    const [activeSub, setActiveSub] = useState<string>('전체');
    const [activeBrand, setActiveBrand] = useState<string | null>(null);

    // 카테고리 전환 감지 및 상태 초기화 (렌더링 중 리셋 패턴)
    const [prevCategoryName, setPrevCategoryName] = useState(categoryName);
    if (categoryName !== prevCategoryName) {
        setPrevCategoryName(categoryName);
        setActiveSub('전체');
        setActiveBrand(null);
        setActivePage(1);
    }

    // 필터에 따른 총 개수 계산 (0개 방지)
    const getTotalCount = () => {
        const total = CATEGORY_TOTALS[categoryName] || 100;

        if (viewType === 'brand') {
            if (!activeBrand) return total;
            return BRAND_COUNTS[activeBrand] || 1;
        }

        if (viewType === 'category') {
            if (activeSub === '전체') return total;
            return SUB_CATEGORY_COUNTS[categoryName]?.[activeSub] || 1;
        }

        return total;
    };

    const totalCount = Math.max(1, getTotalCount());
    const itemsPerPage = 40;

    // 카테고리별 상품명 및 브랜드 패턴 정의
    const getCategoryData = (cat: string, index: number) => {
        const i = index + 1;
        const subName = activeSub !== '전체' ? activeSub : '전문 의료용품';
        const brandName = viewType === 'brand' && activeBrand ? activeBrand : 'Osstem';

        const patterns: Record<string, { brands: string[], items: string[] }> = {
            '위생용품': {
                brands: [brandName, '3M', 'Medicom', 'Ansell', 'Yuhan'],
                items: [subName + '-A', '의료용 마스크', '멸균 거즈 4x4', '니트릴 검진 장갑', '알코올 스왑 70%', '일회용 캡']
            },
            '예방/구강': {
                brands: ['Osstem', 'Vussen', 'Gunchi', 'Oral-B', 'Dr.Smith', 'Denbio'],
                items: [
                    '[오스템x레오거] 2:2 덴탈 세트',
                    'OSSTEM DOUBLE-WIDE TOOTHBRUSH 4P/12P',
                    'Vussen 뷰센 라이트 칫솔 4개입/12개입',
                    'DENTAL FLOSS 일반 200M 치실 1개입/12개묶음',
                    'NT VARNISH 32개입 (성인용/소아용)',
                    'Natural-F Fluoride Gel 500ml (딸기향/포도향)',
                    'SUPER FLOSS MINT 6팩',
                    '뷰센 치약&칫솔 세트 (S+C)',
                    'SS 진료용 치실 200M 1개입',
                    'COOL GARGLE 250ML'
                ]
            },
            '기구': {
                brands: [brandName, 'Littmann', 'Omron', 'Hu-Friedy', 'Osstem'],
                items: [subName + '-B', '클래식 청진기', '디지털 혈압계', '비접촉식 체온계', '치과용 핀셋', '구강 미러 Set', '스케일러 팁']
            },
            '의약품': {
                brands: [brandName, 'JW중외제약', '유한양행', '대웅제약', 'BC월드제약'],
                items: [subName + '-C', '생리식염수 1000ml', '포비돈 소독액', '국소 마취제 2%', '상처치료 연고', '멸균 생리식염수 20ml', '이지덤 씬']
            },
            '장비': {
                brands: [brandName, 'Bionet', 'Hanil', 'LG전기', 'Osstem'],
                items: [subName + '-D', '환자감시 장치 BM3', '냉장 원심분리기', '의료용 LED 무영등', '임플란트 모터', '광중합기', '디지털 구강스캐너']
            },
            '메디컬': {
                brands: [brandName, 'BD Medical', 'Kovax', 'Ansell', 'GreenCross'],
                items: [subName + '-E', '일회용 주사기 5cc', '수액 조절 세트', '아이비 카테터 22G', '나일론 봉합사 4-0', '외과용 메스 #11', '폴리 카테터']
            },
            '생활가전': {
                brands: [brandName, 'LG전자', 'Philips', 'Cuckoo', 'Samsung'],
                items: [subName + '-F', '퓨리케어 공기청정기', '소닉케어 전동칫솔', '초음파 가습기', '의료환경 전용 냉장고', '캡슐 커피 머신', '대용량 제습기']
            },
            '임플란트': {
                brands: ['Osstem Implant'],
                items: [
                    'TS III SA Implant NoMount',
                    'TS II SA Implant Pre-Mounted',
                    'TS II BA Implant NoMount',
                    'TS II BA Implant Pre-Mounted',
                    'TS III SA Implant Bevel Machined',
                    'TS III CA Implant NoMount',
                    'TS II SOI Implant NoMount',
                    'TS IV SA Implant NoMount',
                    'TS IV CA Implant NoMount',
                    'TS IV BA Implant NoMount',
                    'TS Link Abutment for Cerec',
                    'TS Stud Abutment',
                    'TS Locator Abutment',
                    'TS Port Abutment',
                    'TS Healing Abutment',
                    'TS Rigid Abutment',
                    'TS Transfer Abutment',
                    'TS Angled Abutment',
                    'TS NP-Cast Abutment',
                    'TS Temporary Abutment',
                    'TS Convertible Abutment',
                    'TS Custom Healing Abutment',
                    'TS Port Angled Abutment',
                    'TS Multi Abutment'
                ]
            }
        };

        const config = patterns[cat] || patterns['위생용품'];
        const brand = config.brands[index % config.brands.length];
        const item = config.items[index % config.items.length];

        const isImplant = cat === '임플란트';
        const isPrevention = cat === '예방/구강';
        
        let priceValue = 0;
        if (isImplant) {
            priceValue = 53100 + (index % 5) * 1000;
        } else if (isPrevention) {
            priceValue = 4200 + (index % 10) * 1100;
        } else {
            priceValue = 20000 + (index * 1500);
        }

        return {
            brand,
            name: (isImplant || isPrevention) ? item : `[${brand}] ${item} - 모델 Serial-${i.toString().padStart(3, '0')}`,
            price: priceValue.toLocaleString()
        };
    };

    // 의료 관련 이미지 배열 (Unsplash)
    const medicalImages = [
        'https://images.unsplash.com/photo-1583324113626-70df0f43bd5a?w=400&h=400&fit=crop', // Mask
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop', // Dental
        'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop', // Pills
        'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=400&h=400&fit=crop', // Dental tool
        'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop', // Mask
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop', // Dental
        'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=400&fit=crop', // Gloves
        'https://images.unsplash.com/photo-1576091160550-2173dad99988?w=400&h=400&fit=crop', // Stethoscope
        'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=400&fit=crop', // Meds
        'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=400&fit=crop', // Syringe
    ];

    // 구강용품 이미지 배열
    const oralCareImages = [
        'https://images.unsplash.com/photo-1559591937-e6205763df01?w=400&h=400&fit=crop', // Toothbrush
        'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop', // Bathroom/Clean
        'https://images.unsplash.com/photo-1606070397763-8d007f6bac35?w=400&h=400&fit=crop', // Toothpaste
        'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=400&h=400&fit=crop', // Dental
        'https://images.unsplash.com/photo-1559591937-e6205763df01?w=400&h=400&fit=crop', // Toothbrush
        'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop', // Bathroom
        'https://images.unsplash.com/photo-1606070397763-8d007f6bac35?w=400&h=400&fit=crop', // Toothpaste
    ];

    const products = Array(totalCount).fill(null).map((_, i) => {
        const { brand, name, price } = getCategoryData(categoryName, i);
        const images = categoryName === '예방/구강' ? oralCareImages : medicalImages;
        return {
            brand,
            name,
            price,
            tags: ['관련자료', 'Total 할인'],
            thumbnail: images[i % images.length],
            isCompany: i % 2 === 0,
            isInsurance: i % 4 === 0,
            relatedCount: Math.max(1, (i * 7) % 100)
        };
    });

    // 실제 데이터 필터링 로직 (체크박스 필터 추가 적용)
    const filteredProducts = products.filter(p => {
        if (isCompanyOnly && !p.isCompany) return false;
        if (isInsuranceOnly && !p.isInsurance) return false;
        return true;
    });

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    // 현재 페이지 데이터 계산
    const startIndex = (activePage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (pageNum: number) => {
        setActivePage(pageNum);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // 페이지네이션 그룹 계산 (10개 단위)
    const pagesPerGroup = 10;
    const currentGroup = Math.ceil(activePage / pagesPerGroup);
    const startPage = (currentGroup - 1) * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

    return (
        <div className="container-custom pb-[30px] flex flex-col items-center flex-1">
            {/* 1. 상단 2단계 카테고리 필터 */}
            <div className="w-full">
                <TopCategoryTabs
                    viewType={viewType}
                    setViewType={setViewType}
                    activeSub={activeSub}
                    setActiveSub={(v) => { setActiveSub(v); setActivePage(1); }}
                    activeBrand={activeBrand}
                    setActiveBrand={(v) => { setActiveBrand(v); setActivePage(1); }}
                />
            </div>

            {/* 2. 리스트 헤더 및 필터 */}
            <CategoryHeader
                totalCount={filteredProducts.length}
                filters={{ isCompanyOnly, isInsuranceOnly }}
                setFilters={{ setIsCompanyOnly, setIsInsuranceOnly }}
            />

            {/* 3. 제품 그리드 */}
            <div className="w-[1800px] mx-auto grid grid-cols-10 gap-[10px] mb-[60px]">
                {paginatedProducts.map((p, i) => (
                    <ProductCard key={i} {...p} />
                ))}
            </div>

            {/* 4. 페이지 네이션 */}
            <div className="flex justify-center items-center gap-[10px] mb-[101px]">
                {/* 좌측 네비게이션 그룹 */}
                <div className="flex border-t border-b border-l border-[#DEDEDE]">
                    <button
                        onClick={() => handlePageChange(1)}
                        disabled={activePage === 1}
                        className="w-[35px] h-[35px] border-r border-[#DEDEDE] bg-[#F9F9F9] flex items-center justify-center text-[#999999] hover:bg-gray-50 disabled:opacity-50"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="11 17 6 12 11 7" /><polyline points="18 17 13 12 18 7" /></svg>
                    </button>
                    <button
                        onClick={() => handlePageChange(Math.max(1, startPage - 1))}
                        disabled={startPage === 1}
                        className="w-[35px] h-[35px] border-r border-[#DEDEDE] bg-[#F9F9F9] flex items-center justify-center text-[#999999] hover:bg-gray-50 disabled:opacity-50"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                    </button>
                </div>

                {/* 페이지 번호 그룹 */}
                <div className="flex border-t border-b border-l border-[#DEDEDE]">
                    {Array.from({ length: endPage - startPage + 1 }).map((_, i) => {
                        const pageNum = startPage + i;
                        return (
                            <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`w-[35px] h-[35px] border-r border-[#DEDEDE] flex items-center justify-center text-[14px] font-medium transition-colors ${activePage === pageNum
                                    ? 'bg-[#424242] text-white border-[#424242]'
                                    : 'bg-white text-[#333333] hover:bg-gray-50'
                                    }`}
                                style={{ fontFamily: 'Pretendard' }}
                            >
                                {pageNum}
                            </button>
                        );
                    })}
                </div>

                {/* 우측 네비게이션 그룹 */}
                <div className="flex border-t border-b border-l border-[#DEDEDE]">
                    <button
                        onClick={() => handlePageChange(Math.min(totalPages, endPage + 1))}
                        disabled={endPage === totalPages}
                        className="w-[35px] h-[35px] border-r border-[#DEDEDE] bg-[#F9F9F9] flex items-center justify-center text-[#999999] hover:bg-gray-50 disabled:opacity-50"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                    </button>
                    <button
                        onClick={() => handlePageChange(totalPages)}
                        disabled={activePage === totalPages}
                        className="w-[35px] h-[35px] border-r border-[#DEDEDE] bg-[#F9F9F9] flex items-center justify-center text-[#999999] hover:bg-gray-50 disabled:opacity-50"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="13 17 18 12 13 7" /><polyline points="6 17 11 12 6 7" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function CategoryPage() {
    return (
        <div className="bg-white min-h-screen flex flex-col items-center">
            <Suspense fallback={<div className="w-[1800px] h-screen flex items-center justify-center">Loading...</div>}>
                <CategoryContent />
            </Suspense>
        </div>
    );
}
