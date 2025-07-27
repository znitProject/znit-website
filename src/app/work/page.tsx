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
  category: string;
  image?: string;
}

export default function WorkPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [visibleProjects, setVisibleProjects] = useState(4);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 다크모드 여부에 따른 배경색 결정
  const backgroundColor =
    mounted && theme === "dark" ? "bg-[#1F1F1F]" : "bg-white";

  const categories = [
    { value: "ALL", label: "ALL" },
    { value: "UI/UX", label: "UI/UX DESIGN" },
    { value: "BRANDING", label: "BRANDING" },
    { value: "WEB", label: "WEB DEVELOPMENT" },
    { value: "MOBILE", label: "MOBILE APP" },
    { value: "STRATEGY", label: "STRATEGY" },
  ];

  const projects: Project[] = [
    {
      id: 1,
      name: "Toss Banking App",
      description: "모바일 뱅킹 서비스의 UX/UI 리뉴얼 프로젝트",
      year: "2024",
      category: "UI/UX",
    },
    {
      id: 2,
      name: "Coupang Fresh",
      description: "신선식품 배송 서비스 브랜딩 및 디자인",
      year: "2024",
      category: "BRANDING",
    },
    {
      id: 3,
      name: "KakaoTalk Plus",
      description: "카카오톡 플러스 기능 개발 및 디자인",
      year: "2023",
      category: "MOBILE",
    },
    {
      id: 4,
      name: "Musinsa Platform",
      description: "패션 커머스 플랫폼 웹사이트 개발",
      year: "2023",
      category: "WEB",
    },
    {
      id: 5,
      name: "Kream Authentication",
      description: "스니커즈 커머스 인증 시스템 UX 개선",
      year: "2023",
      category: "UI/UX",
    },
    {
      id: 6,
      name: "Toss Insurance",
      description: "보험 상품 추천 알고리즘 및 UI 개발",
      year: "2023",
      category: "STRATEGY",
    },
    {
      id: 7,
      name: "Coupang Pay",
      description: "결제 시스템 UX/UI 디자인",
      year: "2022",
      category: "UI/UX",
    },
    {
      id: 8,
      name: "Kakao Mobility",
      description: "모빌리티 서비스 브랜딩 및 앱 디자인",
      year: "2022",
      category: "MOBILE",
    },
  ];

  const filteredProjects =
    selectedCategory === "ALL"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const handleLoadMore = () => {
    setVisibleProjects((prev) => Math.min(prev + 4, filteredProjects.length));
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
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
        selectedCategory={selectedCategory}
        isDropdownOpen={isDropdownOpen}
        onCategoryChange={handleCategoryChange}
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
