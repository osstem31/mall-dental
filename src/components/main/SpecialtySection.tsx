'use client';

interface SpecialtyStore {
    name: string;
    image: string;
}

interface SpecialtySectionProps {
    title: string;
}

export default function SpecialtySection({ title }: SpecialtySectionProps) {
    const stores: SpecialtyStore[] = [
        { name: '의약품 전문관', image: 'https://images.unsplash.com/photo-1576091160550-2173dad99988?w=500&h=500&fit=crop' },
        { name: '생활가전 전문관', image: 'https://images.unsplash.com/photo-1599423300746-b62533397364?w=500&h=500&fit=crop' },
        { name: 'IT 전문관', image: 'https://images.unsplash.com/photo-1573161158365-59ac0929239a?w=500&h=500&fit=crop' },
        { name: '병의원생활 전문관', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&h=500&fit=crop' },
        { name: '식품 전문관', image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=500&h=500&fit=crop' },
        { name: '병의원인포', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=500&fit=crop' },
        { name: '레저 전문관', image: 'https://images.unsplash.com/photo-1502129991214-e1bd3e72d342?w=500&h=500&fit=crop' },
    ];

    return (
        <section className="w-full bg-white pt-[40px] pb-0 overflow-hidden">
            <div className="w-[1800px] mx-auto flex flex-col">
                {/* Section Title */}
                <div className="mb-[20px]">
                    <h2 className="text-[20px] font-bold text-[#000000] leading-none">{title}</h2>
                </div>

                {/* 7-Column Grid: 252x7 + 6x6 = 1800px */}
                <div className="grid grid-cols-7 gap-x-[6px]">
                    {stores.map((store, i) => (
                        <div key={i} className="relative w-[252px] h-[252px] overflow-hidden group cursor-pointer">
                            {/* Background Placeholder (In real앱, use store.image) */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#125899] to-[#0D3B66] group-hover:scale-105 transition-transform duration-300">
                                {/* Use background image if provided, here we use generic colors for demo based on image colors */}
                                <div
                                    className="w-full h-full opacity-60 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${store.image})` }}
                                ></div>
                            </div>

                            {/* Overlay Content */}
                            <div className="absolute inset-0 p-5 flex flex-col items-start">
                                <h3 className="text-white text-[18px] font-bold mb-4 drop-shadow-sm">
                                    {store.name}
                                </h3>

                                <button className="h-[30px] px-4 border border-white text-white text-[13px] font-medium flex items-center justify-center hover:bg-white/20 transition-colors">
                                    바로가기
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
