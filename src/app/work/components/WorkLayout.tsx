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
        {/* 타이틀 영역 */}
        <div className="relative mb-12">
          <WorkTitle />

          {/* 드롭다운 버튼 */}
          <div className="absolute top-0 right-0 z-20 mt-2 mr-2">
          <button
  onClick={onDropdownToggle}
  className="flex items-center space-x-2 px-6 py-3 text-gray-900 hover:text-gray-700 transition-colors bg-white/80 backdrop-blur-sm "
>
  <span className="font-bold text-2xl">
    {selectedMainCategory === "ALL"
      ? "ALL"
      : categories.find((cat) => cat.value === selectedMainCategory)?.label || selectedMainCategory}
  </span>
  <svg
    className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
</button>

            {/* 드롭다운 영역 */}
            <div className={`absolute top-full right-0 mt-2 bg-transparent z-10 w-fit flex flex-col items-end gap-2 transition-all duration-400 ease-in-out ${
              isDropdownOpen 
                ? "opacity-100 transform translate-y-0" 
                : "opacity-0 transform -translate-y-2 pointer-events-none"
            }`}>
                {/* ALL 버튼 */}
                <button
                  onClick={() => {
                    onMainCategoryChange("ALL");
                    onSubCategoryChange("ALL");
                    onDropdownToggle();
                  }}
                  className={`inline-block px-5 py-1.5 rounded-full text-xl font-bold transition ${
                    selectedMainCategory === "ALL"
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-900 hover:bg-gray-900 hover:text-white"
                  }`}
                >
                  ALL
                </button>

                {/* 메인 카테고리 + 서브카테고리 */}
                {categories.map((category) => (
                  <div key={category.value} className="flex flex-col items-end gap-1">
                    <button
                      onClick={() => {
                        // 같은 카테고리를 다시 클릭하면 해당 카테고리 유지
                        if (selectedMainCategory === category.value) {
                          // 이미 선택된 카테고리면 그대로 유지 (서브카테고리만 토글)
                          onMainCategoryChange(category.value);
                          onSubCategoryChange("ALL");
                        } else {
                          // 다른 카테고리면 새로 선택
                          onMainCategoryChange(category.value);
                          onSubCategoryChange("ALL");
                        }
                      }}
                      className={`inline-block px-5 py-1.5 rounded-full text-xl font-bold transition ${
                        selectedMainCategory === category.value
                          ? "bg-gray-900 text-white"
                          : "bg-white text-gray-900 hover:bg-gray-900 hover:text-white"
                      }`}
                    >
                      {category.label}
                    </button>

                    <div className={`flex flex-col items-end gap-1 transition-all duration-400 ease-in-out ${
                      selectedMainCategory === category.value
                        ? "opacity-100 transform translate-y-0 max-h-96"
                        : "opacity-0 transform -translate-y-2 max-h-0 overflow-hidden"
                    }`}>
                      {category.subcategories.map((sub) => (
                        <button
                          key={sub.value}
                          onClick={() => {
                            onSubCategoryChange(sub.value);
                            onDropdownToggle();
                          }}
                          className={`inline-block w-fit px-5 py-1 text-sm rounded-full transition ${
                            selectedSubCategory === sub.value
                              ? "bg-gray-800 text-white font-bold"
                              : "bg-white text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
          </div>
        </div>

        {/* 프로젝트 그리드 */}
        {children}
      </div>
    </div>
  );
}
