import { ReactNode } from "react";
import WorkTitle from "./WorkTitle";

interface SubCategory {
  value: string;
  label: string;
}

interface Category {
  value: string;
  label: string;
  subcategories: SubCategory[];
}

interface WorkLayoutProps {
  children: ReactNode;
  selectedMainCategory: string;
  selectedSubCategory: string;
  isDropdownOpen: boolean;
  onMainCategoryChange: (mainCategory: string) => void;
  onSubCategoryChange: (subCategory: string) => void;
  onDropdownToggle: () => void;
  categories: Category[];
}

export default function WorkLayout({
  children,
  selectedMainCategory,
  selectedSubCategory,
  isDropdownOpen,
  onMainCategoryChange,
  onSubCategoryChange,
  onDropdownToggle,
  categories,
}: WorkLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* 메인 컨텐츠 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16">
        {/* 타이틀 영역 - 전체 너비 */}
        <div className="relative mb-12">
          <WorkTitle />
          {/* 분류 드롭다운 - 우측 상단 */}
          <div className="absolute top-0 right-0 z-20 mt-2 mr-2">
            <button
              onClick={onDropdownToggle}
              className="flex items-center space-x-1 sm:space-x-2 px-1 sm:px-2 md:px-4 py-1 sm:py-2 text-gray-900 hover:text-gray-700 transition-colors bg-white/80 backdrop-blur-sm rounded-lg"
            >
              <span className="font-bold text-xs sm:text-sm md:text-lg">
                {selectedMainCategory === "ALL" ? "ALL" : 
                 categories.find(cat => cat.value === selectedMainCategory)?.label || selectedMainCategory}
              </span>
              <svg
                className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 bg-transparent z-10 min-w-24 sm:min-w-32 md:min-w-48">
                {/* 전체 카테고리 */}
                <button
                  onClick={() => {
                    onMainCategoryChange("ALL");
                    onDropdownToggle();
                  }}
                  className={`w-full text-left px-2 sm:px-4 md:px-6 py-1 sm:py-2 md:py-3 mb-1 sm:mb-2 rounded-full border-2 transition-all duration-200 text-xs sm:text-sm md:text-base ${
                    selectedMainCategory === "ALL"
                      ? "bg-gray-900 text-white border-gray-900 font-bold"
                      : "bg-white text-gray-900 border-gray-900 hover:bg-gray-900 hover:text-white font-medium"
                  }`}
                >
                  전체
                </button>
                
                {/* 메인 카테고리들 */}
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => {
                      onMainCategoryChange(category.value);
                      onDropdownToggle();
                    }}
                    className={`w-full text-left px-2 sm:px-4 md:px-6 py-1 sm:py-2 md:py-3 mb-1 sm:mb-2 rounded-full border-2 transition-all duration-200 text-xs sm:text-sm md:text-base ${
                      selectedMainCategory === category.value
                        ? "bg-gray-900 text-white border-gray-900 font-bold"
                        : "bg-white text-gray-900 border-gray-900 hover:bg-gray-900 hover:text-white font-medium"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 프로젝트 그리드 */}
        {children}
      </div>
    </div>
  );
}
