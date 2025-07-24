import { FormData, ProjectType } from '../../../types/contact';
import { motion } from 'framer-motion';

interface Step1Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export default function Step1({ formData, updateFormData }: Step1Props) {
  const projectTypes: ProjectType[] = [
    { value: 'brand', label: '프로젝트 브랜딩' },
    { value: 'strategy', label: '서비전략 & 유저보수' },
    { value: 'system', label: '사내 시스템 구축' },
    { value: 'uiux', label: 'UI/UX' },
    { value: 'dev', label: '프론트 개발' }
  ];

  const handleTagClick = (value: string) => {
    const currentTypes = formData.projectType;
    const isSelected = currentTypes.includes(value);
    
    if (isSelected) {
      // 이미 선택된 경우 제거
      updateFormData({ 
        projectType: currentTypes.filter(type => type !== value) 
      });
    } else {
      // 선택되지 않은 경우 추가
      updateFormData({ 
        projectType: [...currentTypes, value] 
      });
    }
  };

  return (
    <div className="py-8">
      <h2 className="text-4xl font-bold text-gray-900 mb-12">어떤 프로젝트를 진행하실 계획인가요?</h2>
      <div className="flex flex-wrap gap-4">
        {projectTypes.map((type, index) => (
          <motion.div
            key={type.value}
            className={`px-8 py-4 border-2 rounded-full cursor-pointer transition-all duration-200 text-lg font-medium ${
              formData.projectType.includes(type.value)
                ? 'bg-gray-900 text-white border-gray-900' 
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-900'
            }`}
            onClick={() => handleTagClick(type.value)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: index * 0.1,
              type: "spring", 
              stiffness: 300, 
              damping: 20 
            }}
          >
            {type.label}
          </motion.div>
        ))}
      </div>
    </div>
  );
} 