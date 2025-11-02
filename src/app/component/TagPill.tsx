"use client";

import React from "react";

interface TagPillProps {
  tag: string;
}

const TagPill: React.FC<TagPillProps> = ({ tag }) => {
  return (
    <span className="text-xs bg-[#EEF2FF] text-[#1C2B3A] px-2 py-1 rounded-md">
      {tag}
    </span>
  );
};

export default TagPill;
