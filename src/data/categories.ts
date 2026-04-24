export interface Category {
    id: string;
    name: string;
    subCategories: string[];
}

export const CATEGORIES: Category[] = [
    {
        id: 'hygiene',
        name: '위생용품',
        subCategories: [
            '가운/진료복',
            '감염방지커버/베리어필름',
            '거즈/솜/에이프런/1회용품',
            '공포/소독포/수술용품',
            '글러브',
            '기타 위생용품/일반서적',
            '니들/주사기/수액세트/밴드',
            '마스크/페이스실드',
            '방사선 관련 용품',
            '봉합침/봉합사/스템플러',
            '석션팁/석션홀더',
            '소독비닐/테이프/실링기',
            '소독제/에탄올/액체류',
            '에이프런/에이프런홀더',
            '카트/수술준비대/수납장'
        ]
    },
    {
        id: 'instruments',
        name: '기구',
        subCategories: [
            '기구수납/기타',
            '수술기구 KIT',
            '외과용 기구',
            '진단용 기구'
        ]
    },
    {
        id: 'medicine',
        name: '의약품',
        subCategories: [
            '진통제/항생제/스테로이드',
            '지혈제',
            '연고류/크림류',
            '식염수/증류수/영양제',
            '시약/기타',
            '소독제/구내염/치주치료제',
            '보톡스/필러/피부미용',
            '미백제',
            '마취제/냉각spray/해독제'
        ]
    },
    {
        id: 'equipment',
        name: '장비',
        subCategories: [
            '혈당/혈압계',
            '현미경',
            '컴프레서/드라이어',
            '체온계',
            '체어용품/샤프닝',
            '전기 메스기/모터',
            '영상장비',
            '에어폴리셔',
            '수관세척기',
            '소독/세척기',
            '멸균기',
            '마취기',
            '루페/라이트/무영등',
            '레이저/턱관절',
            '기타',
            '공기 살균기',
            'PRF/PRP/생화학분석기',
            'AED/PMS'
        ]
    },
    {
        id: 'medical',
        name: '메디컬',
        subCategories: [
            '기구 및 병원용품',
            '원내의약품/에스테틱',
            '의료소모품',
            '의료장비'
        ]
    },
    {
        id: 'living',
        name: '생활가전',
        subCategories: [
            'IT/컴퓨터',
            '디지털/가전',
            '사무용품',
            '생활용품',
            '식품',
            '건강기능식품',
            '취미용품',
            '뷰티',
            '가구/침구',
            '패션/잡화',
            '유아용품',
            '반려동물용품'
        ]
    },
    {
        id: 'implant',
        name: '임플란트',
        subCategories: [
            'TS System',
            'KS System',
            'SS System',
            'US System',
            'MS System',
            'ET System',
            'KIT',
            'TOOL',
            'DR System',
            'one guide',
            'smartpeg'
        ]
    },
    {
        id: 'prevention',
        name: '예방/구강',
        subCategories: [
            '구강 보조 용품',
            '구강 예방 용품',
            '구강케어 SET',
            '기능성 구강관리용품',
            '뷰센 치약&칫솔',
            '성인용 칫솔/치약',
            '소아용 칫솔/치약',
            '악세사리/기타',
            '전동칫솔/구강세정기',
            '오스템 치약&칫솔'
        ]
    }
];
