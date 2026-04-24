import ProductSection from '@/components/main/ProductSection';
import QuickOrderSection from '@/components/main/QuickOrderSection';
import RecommendedSection from '@/components/main/RecommendedSection';
import VideoSection from '@/components/main/VideoSection';
import NewProductsSection from '@/components/main/NewProductsSection';
import DiscountSection from '@/components/main/DiscountSection';
import SpecialtySection from '@/components/main/SpecialtySection';

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Quick Order History */}
      <QuickOrderSection />

      {/* 2. Product Sections */}
      <div className="bg-white">
        <ProductSection
          title="고객선택 BEST"
        />

        <RecommendedSection
          title="OSSTEM 추천상품"
        />

        <VideoSection
          title="추천 동영상"
        />

        <NewProductsSection
          title="품목별 신제품"
        />

        <DiscountSection
          title="할인 상품"
        />

        <SpecialtySection
          title="전문관"
        />
      </div>
    </div>
  );
}
