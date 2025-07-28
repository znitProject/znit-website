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
        value: "IT",
        label: "IT",
        subcategories: [
          {
            value: "public",
            label: "공공사업",
          },
        ],
      },
    ];

    const projects: Project[] = [
      {
        id: 1,
        name: "정보공개 시스템 유지보수",
        description: "통합 정보공개 시스템 유지보수 및 운영",
        year: "2016",
        mainCategory: "IT",
        subCategory: "PUBLIC",
        image: "/works/openGoKrImg.png",
      },
      {
        id: 2,
        name: "버스정류장 정보 시스템 디자인",
        description: "실시간 버스 정보를 제공하는 디지털 키오스크 UI/UX 디자인",
        year: "2024",
        mainCategory: "DESIGN",
        subCategory: "UIUX",
        image: "/works/busStationImg.jpeg",
      },
      {
        id: 3,
        name: "버스정류장 안내 시스템",
        description: "버스 정류장 내 안내 디스플레이 시스템 디자인 및 개발",
        year: "2024",
        mainCategory: "DESIGN",
        subCategory: "UIUX",
        image: "/works/busStopImg.jpeg",
      },
      {
        id: 4,
        name: "미래도시 시각화",
        description: "핸드 드로잉으로 스마트 미래 도시 컨셉아트 디자인",
        year: "2023",
        mainCategory: "DESIGN",
        subCategory: "CONCEPT_ART",
        image: "/works/conceptArtImg.jpeg",
      },
      {
        id: 5,
        name: "정보 안내 시스템",
        description: "공공시설 내 2D 정보 안내 시스템 디자인",
        year: "2023",
        mainCategory: "DESIGN",
        subCategory: "INFOGRAPHIC",
        image: "/works/info2DImg.jpeg",
      },
      {
        id: 6,
        name: "3D 인포그래픽",
        description: "3D 인포그래픽 디자인",
        year: "2023",
        mainCategory: "DESIGN",
        subCategory: "INFOGRAPHIC",
        image: "/works/Info3DImg.jpeg",
      },
      {
        id: 7,
        name: "모션그래픽 디자인",
        description: "브랜드 홍보를 위한 2D 모션그래픽 애니메이션 제작",
        year: "2023",
        mainCategory: "DESIGN",
        subCategory: "MOTIONGRAPHIC",
        image: "/works/motion2D.jpeg",
      },
      {
        id: 8,
        name: "융복합물류사업단 홍보영상",
        description: "2D 모션그래픽 애니메이션 및 컨셉 이미지 제작",
        year: "2022",
        mainCategory: "DESIGN",
        subCategory: "MOTIONGRAPHIC",
        image: "/works/motion2D2.jpeg",
      },
      {
        id: 9,
        name: "서울시 C-ITS 교통시스템 실증사업",
        description: "미래모빌리티센터 내 상황판 및 자율주행 버스/택시 단말기 UI 디자인",
        year: "2022",
        mainCategory: "DESIGN",
        subCategory: "UIUX",
        image: "/works/UIImg.jpeg",
      },
      {
        id: 10,
        name: "차세대 지능형 교통시스템 실증사업",
        description: "운영단말 UI 및 각종 보고자료,발표자료 디자인",
        year: "2024",
        mainCategory: "DESIGN",
        subCategory: "UIUX",
        image: "/works/UIImg2.jpeg",
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
