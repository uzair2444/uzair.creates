export interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  client?: string;
  duration?: string;
  tools: string[];
  accentColor: string;
  type: 'mobile' | 'web' | 'branding' | 'product' | 'post' | 'brochure';
  images?: string[];
  thumbnails?: string[];
  liveUrls?: { label: string; url: string }[];
}

export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  tools: string[];
  icon: string;
  image?: string;
  tags?: string[];
}

export interface TimelineItem {
  period: string;
  institution: string;
  role: string;
  description: string;
  highlights?: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}
