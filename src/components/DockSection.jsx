import { useState } from 'react';
import Dock from './Dock';
import SkillContentPanel from './SkillContentPanel';

export default function DockSection() {
  const [selectedSkill, setSelectedSkill] = useState(null);

  return (
    <div className="w-full">
      <SkillContentPanel selectedSkill={selectedSkill} />
      <Dock setSelectedSkill={setSelectedSkill} />
    </div>
  );
}
