export default function SideFilter() {
    const filters = [
        { title: '브랜드', items: ['IVOCLAR (195)', 'GC (10)', '3M ESPE (27)', 'META BIOMED (4)', 'BISCO (29)', 'SHOFU (18)'] },
        { title: '속성', items: ['나사형', '비나사형', '원통형', '테이퍼형'] },
        { title: '가격', items: ['1만원 이하', '1만원 ~ 5만원', '5만원 ~ 10만원', '10만원 이상'] },
    ];

    return (
        <aside className="w-64 flex-shrink-0 hidden md:block">
            <div className="space-y-8">
                {filters.map((filter, i) => (
                    <div key={i} className="border-b border-gray-100 pb-6">
                        <h3 className="text-[15px] font-bold text-gray-900 mb-4 flex justify-between items-center cursor-pointer">
                            {filter.title}
                            <span className="text-gray-400 font-normal">−</span>
                        </h3>
                        <div className="space-y-2">
                            {filter.items.map((item, j) => (
                                <label key={j} className="flex items-center gap-2 cursor-pointer group">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-osstem-red focus:ring-osstem-red" />
                                    <span className="text-[13px] text-gray-600 group-hover:text-osstem-red transition-colors">{item}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
}
