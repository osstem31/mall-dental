'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

import { CATEGORY_TOTALS } from '@/data/categoryData';

export default function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('name');
  const { openOrderSheet, items } = useCart();
  const cartCount = items.length;
  const [activeMenu1, setActiveMenu1] = useState('Mall');
  const [selectedMenu2, setSelectedMenu2] = useState<string | null>(null);

  // Derive activeMenu2 from pathname and user selection
  const activeMenu2 = (pathname === '/' && selectedMenu2 === null) ? '간편주문' : selectedMenu2;

  const menuGroup1 = ['BOOK', 'CRM', 'POST', 'JOB', 'MY PAGE'];
  const menuGroup2 = ['TV', 'Mall', 'Education', 'Software', 'Service', 'Interior', 'Conference', 'Map'];

  const categories = [
    { name: '임플란트', count: CATEGORY_TOTALS['임플란트']?.toLocaleString() || '0' },
    { name: '교정', count: CATEGORY_TOTALS['교정']?.toLocaleString() || '0' },
    { name: '수복/접착', count: CATEGORY_TOTALS['수복/접착']?.toLocaleString() || '0' },
    { name: '치과', count: CATEGORY_TOTALS['치과']?.toLocaleString() || '0' },
    { name: '위생용품', count: CATEGORY_TOTALS['위생용품']?.toLocaleString() || '0' },
    { name: '예방/구강', count: CATEGORY_TOTALS['예방/구강']?.toLocaleString() || '0' },
    { name: 'GBR', count: CATEGORY_TOTALS['GBR']?.toLocaleString() || '0' },
    { name: '기구', count: CATEGORY_TOTALS['기구']?.toLocaleString() || '0' },
    { name: '인상/부착', count: CATEGORY_TOTALS['인상/부착']?.toLocaleString() || '0' },
    { name: '발치/안전', count: CATEGORY_TOTALS['발치/안전']?.toLocaleString() || '0' },
    { name: '의약품', count: CATEGORY_TOTALS['의약품']?.toLocaleString() || '0' },
    { name: '장비', count: CATEGORY_TOTALS['장비']?.toLocaleString() || '0' },
    { name: '치주/근관', count: CATEGORY_TOTALS['치주/근관']?.toLocaleString() || '0' },
    { name: '생활가전', count: CATEGORY_TOTALS['생활가전']?.toLocaleString() || '0' },
    { name: '메디컬', count: CATEGORY_TOTALS['메디컬']?.toLocaleString() || '0' },
  ];

  return (
    <>
      {/* 1st Depth Layer: 50px Height - Scrolls away */}
      <div className="w-full bg-white border-b border-[#EB6100] font-pretendard">
        <div className="w-full px-[50px] flex items-center h-[50px] justify-between">
          <div className="flex items-center h-full gap-6">
            {/* Logo */}
            <Link
              href="/"
              onClick={() => setSelectedMenu2(null)}
              className="shrink-0 flex items-center"
            >
              <img
                src="https://denall-esg-jenkins.s3.ap-northeast-2.amazonaws.com/bi-denall-m.png"
                alt="DENALL"
                className="w-[92px] h-[22px] object-contain"
              />
            </Link>

            {/* Account Name */}
            <div className="text-[#333333] text-[16px] font-bold ml-1 flex items-center gap-[4px]">
              오스템병원
              <svg width="6" height="3" viewBox="0 0 6 3" fill="none" className="shrink-0">
                <path d="M3 3L0 0H6L3 3Z" fill="#EB6100" />
              </svg>
            </div>

            {/* Middle Menus */}
            <nav className="flex items-center h-full ml-4">
              {/* Group 1: BOOK ~ MY PAGE */}
              <div className="flex items-center gap-2 mr-4">
                {menuGroup1.map((item) => (
                  <button
                    key={item}
                    onClick={() => setActiveMenu1(item)}
                    className={`px-3 h-8 text-[16px] font-bold ${activeMenu1 === item
                      ? 'bg-[#EB6100] text-white rounded-[5px]'
                      : 'text-[#EB6100]'
                      }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Group 2: TV ~ Map */}
              <div className="flex items-center h-full">
                {menuGroup2.map((item) => (
                  <button
                    key={item}
                    onClick={() => setActiveMenu1(item)}
                    className={`px-[13px] h-[50px] relative text-[16px] font-bold transition-all flex items-center justify-center text-center align-middle leading-[28px] ${activeMenu1 === item
                      ? 'text-[#000000]'
                      : 'text-[#666666]'
                      }`}
                  >
                    {item}
                    {activeMenu1 === item && (
                      <div className="absolute bottom-0 left-0 right-0 h-[5px] bg-[#EB6100]"></div>
                    )}
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Right Area */}
          <div className="flex items-center gap-4">
            {/* About OSSTEM - No Box, Single Line, Detailed Style */}
            <Link href="/" className="flex items-center gap-[4px] font-pretendard font-[800] text-[14px] leading-[14px] tracking-[0%]">
              <span className="text-[#999999]">About</span>
              <span className="text-[#EB6100]">OSSTEM</span>
            </Link>

            {/* Customer Center */}
            <Link href="/" className="text-[#020202] text-[14px] font-medium">
              고객센터
            </Link>
          </div>
        </div>
      </div>

      {/* 2nd Depth Layer: 40px Height - Sticky to top */}
      <header className="w-full bg-white border-b border-[#E9E9E9] sticky top-0 z-[100] font-pretendard">
        <div className="w-full px-[50px] flex items-center h-[40px] justify-between">
          <div className="flex items-center h-full flex-1 min-w-0">
            {/* Quick Utility Menus */}
            <div className="flex items-center gap-[15px] pr-5 h-full shrink-0">
              <Link
                href="/"
                onClick={() => setSelectedMenu2(null)}
                className={`flex items-center gap-1.5 text-[13px] font-bold shrink-0 h-full ${activeMenu2 === '간편주문' ? 'text-[#EB6100]' : 'text-[#333333]'
                  }`}
              >
                {/* 간편주문 아이콘: 장바구니(쇼핑백) 모양 16x18px */}
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={activeMenu2 === '간편주문' ? 'text-[#EB6100]' : 'text-[#333333]'}>
                  <path d="M1 4.5L3.5 1h9L15 4.5" />
                  <rect x="1" y="4.5" width="14" height="12.5" rx="1" />
                  <path d="M1 4.5h14" />
                  <path d="M5.5 7.5C5.5 9.5 6.5 11 8 11s2.5-1.5 2.5-3.5" />
                </svg>
                <span>간편주문</span>
              </Link>
              <button
                onClick={() => setSelectedMenu2('정기배송')}
                className={`flex items-center gap-1.5 text-[13px] font-bold shrink-0 h-full ${activeMenu2 === '정기배송' ? 'text-[#EB6100]' : 'text-[#333333]'
                  }`}
              >
                {/* 정기배송 아이콘: 트럭 모양 20x17px */}
                <svg width="20" height="17" viewBox="0 0 20 17" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={activeMenu2 === '정기배송' ? 'text-[#EB6100]' : 'text-[#333333]'}>
                  <rect x="1" y="1" width="11" height="10" rx="1" />
                  <path d="M12 4h3.5l3.5 4v3a1 1 0 0 1-1 1h-1" />
                  <path d="M12 12H8" />
                  <circle cx="6" cy="13" r="2" />
                  <circle cx="16" cy="13" r="2" />
                </svg>
                <span>정기배송(DDS)</span>
              </button>
            </div>

            {/* Vertical Bar Divider */}
            <div className="w-[1px] h-[18px] bg-[#E5E5E5] shrink-0"></div>

            {/* Expanded Category List */}
            <div className="flex items-center h-full gap-6 px-6 overflow-x-auto scrollbar-hide flex-1 min-w-0">
              {categories.map((cat, i) => {
                const isSelected = activeCategory === cat.name;
                return (
                  <Link
                    key={i}
                    href={`/category?name=${encodeURIComponent(cat.name)}`}
                    className="flex flex-col items-center justify-center cursor-pointer group shrink-0 h-full min-w-[max-content]"
                  >
                    <span className={`text-[13px] font-bold group-hover:text-[#EB6100] leading-none transition-colors ${isSelected ? 'text-[#EB6100]' : 'text-[#333333]'}`}>
                      {cat.name}
                    </span>
                    <span className="text-[10px] text-[#999999] font-normal leading-none mt-0">
                      {cat.count}
                    </span>
                  </Link>
                );
              })}

              {/* Special Links after Medical */}
              <div className="w-[1px] h-[18px] bg-[#E5E5E5] shrink-0 mx-0"></div>
              <div className="flex items-center gap-6 shrink-0 h-full">
                <Link href="/" className="text-[13px] font-bold text-[#000000] hover:text-[#EB6100] transition-colors h-full flex items-center">라이브쇼</Link>
                <Link href="/" className="text-[13px] font-bold text-[#000000] hover:text-[#EB6100] transition-colors h-full flex items-center">기획전</Link>
              </div>
            </div>
          </div>

          {/* Search Area & My Mall */}
          <div className="flex items-center gap-[4px] pl-4 shrink-0 h-full">
            <div className="relative w-[250px]">
              <input
                type="text"
                placeholder="검색어를 입력하세요."
                className="w-full h-[32px] border border-[#000000] rounded-none pl-3 pr-8 text-[13px] outline-none placeholder:text-[#333333]"
              />
              <button className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#333333]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                </svg>
              </button>
            </div>

            <button
              onClick={openOrderSheet}
              className="flex items-center justify-center gap-2 w-[80px] h-[32px] bg-[#EB6100] text-white rounded-none border-none"
            >
              <span className="text-[13px] font-bold">주문서</span>
              {cartCount > 0 && (
                <span className="flex items-center justify-center min-w-[24px] h-[18px] bg-white text-[#EB6100] text-[11px] font-bold rounded-full px-1">
                  {cartCount}
                </span>
              )}
            </button>

            <Link href="/" className="bg-[#A5A5A5] text-white w-[71px] h-[32px] flex items-center justify-center text-[13px] font-bold rounded-none hover:bg-[#888888] transition-colors leading-none">
              My Mall
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
