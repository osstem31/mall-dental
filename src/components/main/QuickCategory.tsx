export default function QuickCategory() {
    const categories = [
        { name: '임플란트', icon: '🦷' },
        { name: '장비/기구', icon: '⚙️' },
        { name: '수복/접착', icon: '🧪' },
        { name: '인상/교합', icon: '📏' },
        { name: '위생용품', icon: '🧼' },
        { name: '의약품', icon: '💊' },
        { name: '교육/세미나', icon: '🎓' },
        { name: '중고장터', icon: '📦' },
    ];

    return (
        <div className="bg-white py-10">
            <div className="container-custom">
                <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                    {categories.map((cat, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 cursor-pointer group">
                            <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center text-2xl group-hover:bg-osstem-red/10 transition-colors border border-gray-100">
                                {cat.icon}
                            </div>
                            <span className="text-[13px] font-medium text-gray-700">{cat.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
