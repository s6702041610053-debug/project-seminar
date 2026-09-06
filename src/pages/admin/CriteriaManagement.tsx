import React from 'react';
import { Settings, Save, AlertCircle } from 'lucide-react';

const CriteriaManagement: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto font-sans space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-[#063B78]">จัดการเกณฑ์ประเมิน</h1>
          <p className="text-gray-500 mt-1">ตั้งค่าเกณฑ์การให้คะแนนและคำนวณความเสี่ยง</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-[#063B78] text-white rounded-lg hover:bg-[#032A57] transition-colors">
          <Save className="w-5 h-5 mr-2" />
          บันทึกการเปลี่ยนแปลง
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progress Criteria */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
            <h2 className="font-bold text-gray-800 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-[#063B78]" />
              เกณฑ์ประเมิน Weekly Progress
            </h2>
            <span className="text-sm font-medium px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full">รวม 30 คะแนน</span>
          </div>
          <div className="p-5 space-y-4">
            {[
              { name: '1. ความเข้าใจในงานที่ทำ', score: 5 },
              { name: '2. ความก้าวหน้าของงานเปรียบเทียบกับแผน', score: 5 },
              { name: '3. การแก้ปัญหาเฉพาะหน้า', score: 5 },
              { name: '4. ความรับผิดชอบต่องานที่ได้รับมอบหมาย', score: 5 },
              { name: '5. การนำเสนอผลงาน (ความชัดเจน, เข้าใจง่าย)', score: 5 },
              { name: '6. การตรงต่อเวลา', score: 5 },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg border border-gray-100">
                <span className="text-sm text-gray-700">{item.name}</span>
                <div className="flex items-center gap-2">
                  <input type="number" defaultValue={item.score} className="w-16 text-center p-1 border border-gray-300 rounded" />
                  <span className="text-sm text-gray-500">คะแนน</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Presentation Rubric Criteria */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
            <h2 className="font-bold text-gray-800 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-[#063B78]" />
              เกณฑ์ประเมิน Presentation
            </h2>
            <span className="text-sm font-medium px-2.5 py-1 bg-purple-100 text-purple-800 rounded-full">รวม 25 คะแนน</span>
          </div>
          <div className="p-5 space-y-4">
            {[
              { name: '1. ความก้าวหน้าของระบบเทียบกับแผน', score: 5 },
              { name: '2. ความสมบูรณ์ของระบบในส่วนที่นำเสนอ', score: 5 },
              { name: '3. ความเข้าใจในระบบที่พัฒนา', score: 5 },
              { name: '4. การตอบคำถาม', score: 5 },
              { name: '5. การจัดทำเอกสาร/สไลด์นำเสนอ', score: 5 },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg border border-gray-100">
                <span className="text-sm text-gray-700">{item.name}</span>
                <div className="flex items-center gap-2">
                  <input type="number" defaultValue={item.score} className="w-16 text-center p-1 border border-gray-300 rounded" />
                  <span className="text-sm text-gray-500">คะแนน</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Score Weights */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden lg:col-span-2">
          <div className="p-5 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
            <h2 className="font-bold text-gray-800 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-orange-500" />
              น้ำหนักการคำนวณ Risk Score
            </h2>
            <span className="text-sm font-medium px-2.5 py-1 bg-orange-100 text-orange-800 rounded-full">รวม 100%</span>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'คะแนนความก้าวหน้า (Weekly)', weight: 30 },
              { name: 'คะแนนการนำเสนอ (Presentation)', weight: 30 },
              { name: 'การประเมินตนเองของนักศึกษา', weight: 15 },
              { name: 'การส่งเอกสาร', weight: 15 },
              { name: 'สถิติการเข้าพบที่ปรึกษา', weight: 10 },
            ].map((item, i) => (
              <div key={i} className="flex flex-col p-4 bg-white rounded-lg border border-gray-200">
                <span className="text-sm font-medium text-gray-700 mb-2">{item.name}</span>
                <div className="flex items-center gap-2 mt-auto">
                  <input type="number" defaultValue={item.weight} className="w-full p-2 border border-gray-300 rounded text-right" />
                  <span className="text-sm font-bold text-gray-500">%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriteriaManagement;
