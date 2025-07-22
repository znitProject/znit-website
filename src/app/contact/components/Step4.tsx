import { FormData } from '../../../types/contact';

interface Step4Props {
  formData: FormData;
}

export default function Step4({ formData }: Step4Props) {
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-8 text-3xl font-bold">
        ✓
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">제출완료 !</h2>
      <p className="text-xl text-gray-600">곧 연락드릴께~</p>
    </div>
  );
} 