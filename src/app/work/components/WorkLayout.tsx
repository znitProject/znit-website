import { ReactNode } from "react";
import WorkTitle from "./WorkTitle";

interface SubSubCategory {
  value: string;
  label: string;
}

interface SubCategory {
  value: string;
  label: string;
  subSubcategories?: SubSubCategory[];
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
  selectedSubSubCategory?: string;
  isDropdownOpen: boolean;
  onMainCategoryChange: (mainCategory: string) => void;
  onSubCategoryChange: (subCategory: string) => void;
  onSubSubCategoryChange?: (subSubCategory: string) => void;
  onDropdownToggle: () => void;
  categories: Category[];
}

export default function WorkLayout({
  children,
  selectedMainCategory,
  selectedSubCategory,
  selectedSubSubCategory,
  isDropdownOpen,
  onMainCategoryChange,
  onSubCategoryChange,
  onSubSubCategoryChange,
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
                      className={`inline-block px-6 py-2 rounded-full text-xl font-bold transition whitespace-nowrap ${
                        selectedMainCategory === category.value
                          ? category.value === "INFO_DESIGN" 
                            ? "bg-blue-700 text-white"
                            : category.value === "IT"
                            ? "bg-emerald-700 text-white"
                            : "bg-gray-900 text-white"
                          : category.value === "INFO_DESIGN"
                          ? "bg-white text-blue-700 hover:bg-blue-700 hover:text-white border-2 border-blue-700"
                          : category.value === "IT"
                          ? "bg-white text-emerald-700 hover:bg-emerald-700 hover:text-white border-2 border-emerald-700"
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
                        <div key={sub.value} className="flex flex-col items-end gap-1">
                          <button
                            onClick={() => {
                              onSubCategoryChange(sub.value);
                              if (onSubSubCategoryChange) {
                                onSubSubCategoryChange("ALL");
                              }
                            }}
                            className={`inline-block px-5 py-1 text-sm rounded-full transition whitespace-nowrap ${
                              selectedSubCategory === sub.value
                                ? sub.value === "INFOGRAPHIC"
                                  ? "bg-purple-600 text-white font-bold"
                                  : sub.value === "MOTIONGRAPHIC"
                                  ? "bg-pink-600 text-white font-bold"
                                  : sub.value === "CONCEPT_ART"
                                  ? "bg-orange-600 text-white font-bold"
                                  : sub.value === "UIUX"
                                  ? "bg-indigo-600 text-white font-bold"
                                  : sub.value === "PUBLIC_DESIGN"
                                  ? "bg-teal-600 text-white font-bold"
                                  : sub.value === "PUBLIC_SYSTEM"
                                  ? "bg-emerald-600 text-white font-bold"
                                  : sub.value === "WEB_DEVELOPMENT"
                                  ? "bg-cyan-600 text-white font-bold"
                                  : sub.value === "MOBILE_APP"
                                  ? "bg-lime-600 text-white font-bold"
                                  : "bg-gray-800 text-white font-bold"
                                : sub.value === "INFOGRAPHIC"
                                ? "bg-white text-purple-600 hover:bg-purple-600 hover:text-white border border-purple-600"
                                : sub.value === "MOTIONGRAPHIC"
                                ? "bg-white text-pink-600 hover:bg-pink-600 hover:text-white border border-pink-600"
                                : sub.value === "CONCEPT_ART"
                                ? "bg-white text-orange-600 hover:bg-orange-600 hover:text-white border border-orange-600"
                                : sub.value === "UIUX"
                                ? "bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white border border-indigo-600"
                                : sub.value === "PUBLIC_DESIGN"
                                ? "bg-white text-teal-600 hover:bg-teal-600 hover:text-white border border-teal-600"
                                : sub.value === "PUBLIC_SYSTEM"
                                ? "bg-white text-emerald-600 hover:bg-emerald-600 hover:text-white border border-emerald-600"
                                : sub.value === "WEB_DEVELOPMENT"
                                ? "bg-white text-cyan-600 hover:bg-cyan-600 hover:text-white border border-cyan-600"
                                : sub.value === "MOBILE_APP"
                                ? "bg-white text-lime-600 hover:bg-lime-600 hover:text-white border border-lime-600"
                                : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {sub.label}
                          </button>
                          
                          {/* 서브서브카테고리 */}
                          {sub.subSubcategories && (
                            <div className={`flex flex-col items-end gap-1 transition-all duration-400 ease-in-out ${
                              selectedSubCategory === sub.value
                                ? "opacity-100 transform translate-y-0 max-h-96"
                                : "opacity-0 transform -translate-y-2 max-h-0 overflow-hidden"
                            }`}>
                              {sub.subSubcategories.map((subSub) => (
                                <button
                                  key={subSub.value}
                                  onClick={() => {
                                    if (onSubSubCategoryChange) {
                                      onSubSubCategoryChange(subSub.value);
                                    }
                                    onDropdownToggle();
                                  }}
                                  className={`inline-block px-3 py-1 text-xs rounded-full transition whitespace-nowrap ${
                                    selectedSubSubCategory === subSub.value
                                      ? subSub.value === "PPT"
                                        ? "bg-purple-500 text-white font-bold"
                                        : subSub.value === "CONCEPT_GRAPHIC"
                                        ? "bg-pink-500 text-white font-bold"
                                        : subSub.value === "2D"
                                        ? "bg-orange-500 text-white font-bold"
                                        : subSub.value === "3D"
                                        ? "bg-indigo-500 text-white font-bold"
                                        : subSub.value === "SKETCH"
                                        ? "bg-teal-500 text-white font-bold"
                                        : subSub.value === "AI_SYNTHESIS"
                                        ? "bg-emerald-500 text-white font-bold"
                                        : subSub.value === "UIUX"
                                        ? "bg-cyan-500 text-white font-bold"
                                        : subSub.value === "WEB"
                                        ? "bg-lime-500 text-white font-bold"
                                        : subSub.value === "KIOSK"
                                        ? "bg-violet-500 text-white font-bold"
                                        : subSub.value === "TRANSPORTATION"
                                        ? "bg-rose-500 text-white font-bold"
                                        : "bg-gray-700 text-white font-bold"
                                      : subSub.value === "PPT"
                                      ? "bg-white text-purple-500 hover:bg-purple-500 hover:text-white border border-purple-500"
                                      : subSub.value === "CONCEPT_GRAPHIC"
                                      ? "bg-white text-pink-500 hover:bg-pink-500 hover:text-white border border-pink-500"
                                      : subSub.value === "2D"
                                      ? "bg-white text-orange-500 hover:bg-orange-500 hover:text-white border border-orange-500"
                                      : subSub.value === "3D"
                                      ? "bg-white text-indigo-500 hover:bg-indigo-500 hover:text-white border border-indigo-500"
                                      : subSub.value === "SKETCH"
                                      ? "bg-white text-teal-500 hover:bg-teal-500 hover:text-white border border-teal-500"
                                      : subSub.value === "AI_SYNTHESIS"
                                      ? "bg-white text-emerald-500 hover:bg-emerald-500 hover:text-white border border-emerald-500"
                                      : subSub.value === "UIUX"
                                      ? "bg-white text-cyan-500 hover:bg-cyan-500 hover:text-white border border-cyan-500"
                                      : subSub.value === "WEB"
                                      ? "bg-white text-lime-500 hover:bg-lime-500 hover:text-white border border-lime-500"
                                      : subSub.value === "KIOSK"
                                      ? "bg-white text-violet-500 hover:bg-violet-500 hover:text-white border border-violet-500"
                                      : subSub.value === "TRANSPORTATION"
                                      ? "bg-white text-rose-500 hover:bg-rose-500 hover:text-white border border-rose-500"
                                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                                  }`}
                                >
                                  {subSub.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
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
