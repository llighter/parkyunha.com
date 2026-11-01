export interface Project {
  name: string;
  href: string;
  icon: string;
  platforms: string[];
  status: "available" | "coming-soon";
  /** 문구 묶음 이름 — messages/*.json 의 `${taglineKey}.tagline` */
  taglineKey: string;
}

/** 프로젝트 목록 — /project · 홈 프로젝트 구역이 함께 쓴다 */
export const projects: Project[] = [
  {
    name: "StudyCard",
    href: "/studycard",
    icon: "/images/studycard-logo.png",
    platforms: ["iPhone", "iPad", "Mac", "Apple Watch"],
    status: "coming-soon",
    taglineKey: "studycard",
  },
];
