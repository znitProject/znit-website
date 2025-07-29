interface Project {
  id: number;
  name: string;
  description: string;
  year: string;
  mainCategory: string;
  subCategory: string;
  subSubCategory?: string;
  image?: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // 카테고리명을 한글로 변환하는 함수
  const getCategoryLabel = (categoryValue: string) => {
    const categoryLabels: { [key: string]: string } = {
      // 메인 카테고리
      'INFO_DESIGN': '정보디자인',
      'IT': 'IT',
      
      // 서브카테고리
      'INFOGRAPHIC': '인포그래픽',
      'MOTIONGRAPHIC': '모션그래픽',
      'CONCEPT_ART': '컨셉아트',
      'UIUX': 'UI/UX',
      'PUBLIC_DESIGN': '공공디자인',
      'PUBLIC_SYSTEM': '공공시스템',
      'WEB_DEVELOPMENT': '웹개발',
      'MOBILE_APP': '모바일앱',
      
      // 서브서브카테고리
      'PPT': 'PPT',
      'CONCEPT_GRAPHIC': '컨셉그래픽',
      '2D': '2D',
      '3D': '3D',
      'SKETCH': '스케치',
      'AI_SYNTHESIS': 'AI/합성',
      'WEB': 'WEB',
      'KIOSK': '키오스크 디자인',
      'TRANSPORTATION': '교통시설물 디자인'
    };
    
    return categoryLabels[categoryValue] || categoryValue;
  };

  // 프로젝트별 배경색
  const getBackgroundColor = (projectId: number) => {
    const colors = {
      1: '#3b82f6', // blue-500
      2: '#ec4899', // pink-500
      3: '#06b6d4', // cyan-500
      4: '#10b981', // green-500
      5: '#f43f5e', // rose-500
      6: '#5eead4', // teal-300
      7: '#f87171', // red-400
      8: '#fed7aa'  // orange-200
    };
    return colors[projectId as keyof typeof colors] || colors[1];
  };

  return (
    <div className="group relative overflow-hidden rounded-lg aspect-[4/3] cursor-pointer">
      {/* 프로젝트 배경 */}
      {project.image ? (
        <div 
          style={{ 
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
            backgroundImage: `url(${project.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
      ) : (
        <div 
          style={{ 
            backgroundColor: getBackgroundColor(project.id),
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1
          }}
        ></div>
      )}

      {/* 호버 오버레이 */}
      <div 
        className="absolute inset-0 transition-all duration-300 flex items-end" 
        style={{ 
          zIndex: 2,
          backgroundColor: 'transparent',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <div className="w-full p-6">
          {/* 프로젝트명과 설명 - 하단 오른쪽 정렬 */}
          <div className="text-right mb-4 transform translate-y-32 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-3xl font-bold text-white mb-3">{project.name}</h3>
            <p className="text-white text-base">{project.description}</p>
          </div>
          
          {/* 하단 정보 */}
          <div className="flex items-center justify-between transform translate-y-32 group-hover:translate-y-0 transition-transform duration-300 delay-100">
            <span className="text-white text-sm font-medium">{project.year}</span>
            <div className="flex items-center space-x-2">
              {project.subSubCategory && (
                <span className="text-white text-xs font-medium bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                  {getCategoryLabel(project.subSubCategory)}
                </span>
              )}
              <span className="text-white text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                {getCategoryLabel(project.subCategory)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 