"use client";

import { FormData } from "../../../types/contact";

interface Step4Props {
  formData: FormData;
  onSubmit: () => void;
  loading: boolean;
}

export default function Step4({ formData, onSubmit, loading }: Step4Props) {
  return (
    <div className="space-y-6 px-4 sm:px-6 md:px-8">
      <h2 className="text-2xl font-bold text-gray-900">입력 내용 확인</h2>
      <table className="w-full text-left border-collapse">
        <tbody>
          <tr>
            <th className="py-2 border-b text-black">진행 프로젝트 유형</th>
            <td className="py-2 border-b text-black">
              {formData.projectType.join(", ")}
            </td>
          </tr>
          <tr>
            <th className="py-2 border-b text-black">프로젝트 제목</th>
            <td className="py-2 border-b text-black">
              {formData.projectTitle}
            </td>
          </tr>
          <tr>
            <th className="py-2 border-b text-black">프로젝트 설명</th>
            <td className="py-2 border-b text-black">
              {formData.projectDescription}
            </td>
          </tr>
          <tr>
            <th className="py-2 border-b text-black">회사명</th>
            <td className="py-2 border-b text-black">{formData.companyName}</td>
          </tr>
          <tr>
            <th className="py-2 border-b text-black">성함</th>
            <td className="py-2 border-b text-black">{formData.name}</td>
          </tr>
          <tr>
            <th className="py-2 border-b text-black">직함</th>
            <td className="py-2 border-b text-black">{formData.position}</td>
          </tr>
          <tr>
            <th className="py-2 border-b text-black">연락처</th>
            <td className="py-2 border-b text-black">{formData.phone}</td>
          </tr>
          <tr>
            <th className="py-2 border-b text-black">이메일</th>
            <td className="py-2 border-b text-black">{formData.email}</td>
          </tr>
          <tr>
            <th className="py-2 border-b text-black">첨부파일</th>
            <td className="py-2 border-b text-black">
              {formData.selectedFile ? formData.selectedFile.name : "없음"}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="text-center mt-6">
        <button
          onClick={onSubmit}
          disabled={loading}
          className="px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-700 disabled:opacity-50"
        >
          {loading ? "전송 중..." : "제출하기"}
        </button>
      </div>
    </div>
  );
}
