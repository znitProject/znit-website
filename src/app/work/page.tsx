"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import WorkLayout from "./components/WorkLayout";
import ProjectGrid from "./components/ProjectGrid";

interface Project {
  id: number;
  name: string;
  description: string;
  year: string;
  mainCategory: string;
  subCategory: string;
  image?: string;
}

export default function WorkPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selectedMainCategory, setSelectedMainCategory] = useState("ALL");
  const [selectedSubCategory, setSelectedSubCategory] = useState("ALL");
  const [visibleProjects, setVisibleProjects] = useState(4);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 다크모드 여부에 따른 배경색 결정
  const backgroundColor =
    mounted && theme === "dark" ? "bg-[#1F1F1F]" : "bg-white";

    const categories = [
      {
        value: "DESIGN",
        label: "DESIGN",
        subcategories: [
          { value: "INFOGRAPHIC", label: "인포그래픽" },
          { value: "MOTIONGRAPHIC", label: "모션그래픽" },
          { value: "CONCEPT_ART", label: "컨셉아트" },
          { value: "UIUX", label: "UI/UX" },
          { value: "PUBLIC_DESIGN", label: "공공디자인" }, // 키오스크 / 교통시설 포함
        ],
      },
      {
        value: "PUBLIC",
        label: "PUBLIC",
        subcategories: [
          {
            value: "OPEN_INFO_MAINT",
            label: "정보공개 시스템 유지보수",
          },
        ],
      },
    ];

    const projects: Project[] = [
      {
        id: 1,
        name: "Toss Banking App",
        description: "모바일 뱅킹 서비스의 UX/UI 리뉴얼 프로젝트",
        year: "2024",
        mainCategory: "DESIGN",
        subCategory: "UIUX",
      },
      {
        id: 2,
        name: "Coupang Fresh",
        description: "신선식품 배송 서비스 브랜딩 및 디자인",
        year: "2024",
        mainCategory: "DESIGN",
        subCategory: "BRANDING",
      },
      {
        id: 3,
        name: "KakaoTalk Plus",
        description: "카카오톡 플러스 기능 개발 및 디자인",
        year: "2023",
        mainCategory: "DESIGN",
        subCategory: "UIUX", // MOBILE 대신 UIUX에 포함
      },
      {
        id: 4,
        name: "Musinsa Platform",
        description: "패션 커머스 플랫폼 웹사이트 개발",
        year: "2023",
        mainCategory: "DESIGN",
        subCategory: "WEB",
      },
      {
        id: 5,
        name: "Kream Authentication",
        description: "스니커즈 커머스 인증 시스템 UX 개선",
        year: "2023",
        mainCategory: "DESIGN",
        subCategory: "UIUX",
      },
      {
        id: 6,
        name: "Toss Insurance",
        description: "보험 상품 추천 알고리즘 및 UI 개발",
        year: "2023",
        mainCategory: "DESIGN",
        subCategory: "UIUX", // STRATEGY보단 UIUX로 통일
      },
      {
        id: 7,
        name: "Coupang Pay",
        description: "결제 시스템 UX/UI 디자인",
        year: "2022",
        mainCategory: "DESIGN",
        subCategory: "UIUX",
      },
      {
        id: 8,
        name: "Kakao Mobility",
        description: "모빌리티 서비스 브랜딩 및 앱 디자인",
        year: "2022",
        mainCategory: "DESIGN",
        subCategory: "BRANDING", // 브랜딩과 UI 혼합 → 브랜딩 분류
      },
      {
        id: 9,
        name: "정보공개 시스템 유지보수",
        description: "행정안전부 정보공개포털 연간 운영 및 유지관리",
        year: "2024",
        mainCategory: "PUBLIC",
        subCategory: "OPEN_INFO_MAINT",
      },
    ];

  const filteredProjects = projects.filter((project) => {
    const mainMatch =
      selectedMainCategory === "ALL" || project.mainCategory === selectedMainCategory;
    const subMatch =
      selectedSubCategory === "ALL" || project.subCategory === selectedSubCategory;
    return mainMatch && subMatch;
  });

  const handleLoadMore = () => {
    setVisibleProjects((prev) => Math.min(prev + 4, filteredProjects.length));
  };

  const handleMainCategoryChange = (mainCategory: string) => {
    setSelectedMainCategory(mainCategory);
    setSelectedSubCategory("ALL"); // 메인 바뀌면 서브 초기화
    setVisibleProjects(4);
  };
  
  const handleSubCategoryChange = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
    setVisibleProjects(4);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div
      className={`min-h-screen ${backgroundColor} transition-colors duration-300`}
    >
      <WorkLayout
        selectedMainCategory={selectedMainCategory}
        selectedSubCategory={selectedSubCategory}
        isDropdownOpen={isDropdownOpen}
        onMainCategoryChange={handleMainCategoryChange}
        onSubCategoryChange={handleSubCategoryChange}
        onDropdownToggle={handleDropdownToggle}
        categories={categories}
      >
  <ProjectGrid
    projects={filteredProjects}
    visibleProjects={visibleProjects}
    onLoadMore={handleLoadMore}
  />
</WorkLayout>
    </div>
  );
}
