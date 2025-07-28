import ProjectCard from './ProjectCard';

interface Project {
  id: number;
  name: string;
  description: string;
  year: string;
  mainCategory: string;
  subCategory: string;
  image?: string;
}

interface ProjectGridProps {
  projects: Project[];
  visibleProjects: number;
  onLoadMore: () => void;
}

export default function ProjectGrid({ projects, visibleProjects, onLoadMore }: ProjectGridProps) {
  const displayedProjects = projects.slice(0, visibleProjects);

  return (
    <>
      {/* 프로젝트 그리드 */}
      <div className="grid grid-cols-2 gap-4 mb-12">
        {displayedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Load More 버튼 */}
      {visibleProjects < projects.length && (
        <div className="text-center">
          <button
            onClick={onLoadMore}
            className="px-8 py-3 border-2 border-gray-900 rounded-full text-gray-900 font-medium hover:bg-gray-900 hover:text-white transition-all duration-200"
          >
            LOAD MORE
          </button>
        </div>
      )}
    </>
  );
} 