import { Project, Service, TimelineItem, FaqItem } from './types';
import siteContent from './siteContent.json';

export const PERSONAL_INFO = {
  ...siteContent
};

export const SERVICES: Service[] = [
  {
    id: 'ui-design',
    title: 'Ui Design',
    shortDesc: 'Designing high-converting digital product interfaces, responsive desktop web apps, and modern mobile app experiences.',
    fullDesc: 'From dark-mode SaaS dashboard interfaces and responsive web layouts to sleek iOS & Android mobile applications, I craft tailored UI design systems in Figma. Featuring clean typography, dark-mode elegance, intuitive user journeys, and pixel-perfect design tokens ready for development.',
    deliverables: ['Desktop & Mobile UI Design', 'SaaS Dashboard Interfaces', 'Responsive Web Layouts', 'Figma Interactive Prototypes'],
    tags: ['#UIDesign', '#WebDesign', '#MobileApp', '#Figma'],
    tools: ['Figma', 'Photoshop', 'Design Systems'],
    icon: 'layout',
    image: './services/ui-design.jpg'
  },
  {
    id: 'product-design',
    title: 'Product Design',
    shortDesc: 'Crafting luxury packaging, commercial 3D product visualizations, cosmetic labels, and premium merchandise suites.',
    fullDesc: 'Elevating physical and luxury retail products with commercial packaging, cosmetic skincare bottles, fragrance labeling, consumer tech gear, and tactile unboxing experiences. Designed with meticulous focus on materials, finishes, luxury typography, and premium branding that stand out on shelves and online.',
    deliverables: ['Packaging & Label Design', 'Luxury Cosmetics & Fragrance', 'Commercial Product Suites', '3D Visualizations & Mockups'],
    tags: ['#ProductDesign', '#Packaging', '#Branding', '#3DVisuals'],
    tools: ['Photoshop', 'Illustrator', '3D Mockups', 'Visual Arts'],
    icon: 'palette',
    image: './services/product-design.jpg'
  },
  {
    id: 'post-design',
    title: 'Post Design',
    shortDesc: 'Designing high-converting social media creatives, viral carousels, typographic posters, and promotional ad campaigns.',
    fullDesc: 'Custom visual storytelling and campaign artwork tailored for Instagram, LinkedIn, and commercial advertising. Specializing in high-impact carousel slides, event posters, promotional sales creatives, story assets, and editorial feed designs that command visual attention and drive engagement.',
    deliverables: ['Instagram Carousels & Posts', 'Promotional Ad Creatives', 'Typographic Wall Posters', 'Story & Reel Cover Graphics'],
    tags: ['#PostDesign', '#SocialMedia', '#Carousels', '#PosterArt'],
    tools: ['Photoshop', 'Figma', 'Illustrator', 'Capcut'],
    icon: 'smartphone',
    image: './services/post-design.jpg'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'product-design',
    title: 'Premium Product Design — Skincare & Fragrance Visuals',
    category: 'Product Design',
    tags: ['Product Design', 'Branding', 'Visual Identity'],
    description: 'High-end product design and visual branding for premium skincare and fragrance lines. Each piece features elegant typography, refined color palettes, and luxury aesthetics crafted to captivate and elevate brand perception.',
    client: 'Multiple Premium Brands',
    duration: 'Ongoing',
    tools: ['Photoshop', 'Figma'],
    accentColor: '#FF0000',
    type: 'product',
    images: [
      './product-design/product-design-1.jpg',
      './product-design/product-design-2.jpg',
      './product-design/product-design-3.jpg',
      './product-design/product-design-4.jpg'
    ]
  },
  {
    id: 'post-designs',
    title: 'Post Designs',
    category: 'Post Design',
    tags: ['Post Design', 'Social Media', 'Ad Creatives', 'Visual Branding'],
    description: 'A curated showcase of viral social media post creatives, commercial promotional ads, automotive sales flyers, and typographic sports posters engineered to captivate audiences and drive high engagement.',
    client: 'Various Global Brands & Creators',
    duration: 'Ongoing',
    tools: ['Photoshop', 'Illustrator', 'Figma'],
    accentColor: '#FF0000',
    type: 'post',
    images: [
      './post-design/post-design-1.jpg',
      './post-design/post-design-2.jpg',
      './post-design/post-design-3.jpg',
      './post-design/post-design-5.jpg',
      './post-design/post-design-4.jpg'
    ]
  },
  {
    id: 'brochures-carousels',
    title: 'Brochures / Carousels',
    category: 'Brochure & Carousel Design',
    tags: ['Carousels', 'Social Media', 'Visual Branding', 'Marketing Slides'],
    description: 'High-impact multi-slide carousel campaigns and editorial visual suites engineered for Instagram and LinkedIn. Features bold typography hierarchies, strategic visual storytelling, high-contrast dark & light aesthetics, and conversion-focused creative direction.',
    client: 'uzair.CREATES & Global Brands',
    duration: 'Ongoing',
    tools: ['Photoshop', 'Illustrator', 'Figma'],
    accentColor: '#FF0000',
    type: 'brochure',
    images: [
      './carousels/1.png',
      './brochures/brochure-1.jpg',
      './carousels/3.png',
      './carousels/4.png',
      './carousels/2.png',
      './carousels/5.png',
      './carousels/6.png',
      './carousels/7.png',
      './carousels/8.png'
    ]
  },
  {
    id: 'ui-web-design',
    title: 'Ui / Web Design',
    category: 'Ui / Web Design',
    tags: ['UI/UX Design', 'Web Design', 'Live Websites', 'Responsive UI'],
    description: 'High-converting modern UI/UX design and frontend web development crafted for premier hospitality destinations: The Last Tribe (Islamabad rooftop flame dining) and The Smokey Cauldron. Built with immersive dark aesthetics, clear typography hierarchies, and seamless responsiveness across all screen sizes.',
    client: 'The Last Tribe & The Smokey Cauldron',
    duration: 'Completed & Live',
    tools: ['Figma', 'React', 'TailwindCSS', 'Web UI'],
    accentColor: '#FF0000',
    type: 'web',
    images: [
      './web-design/tlt-hero-new.png',
      './web-design/cauldron-hero-new.png',
      './web-design/tlt-food-new.png',
      './web-design/cauldron-menu-new.png',
      './web-design/tlt-booking-new.png',
      './web-design/tlt-reviews-new.png'
    ],
    thumbnails: [
      './web-design/thumb-tlt-hero.png',
      './web-design/thumb-cauldron-hero.png',
      './web-design/thumb-tlt-food.png',
      './web-design/thumb-cauldron-menu.png',
      './web-design/thumb-tlt-booking.png',
      './web-design/thumb-tlt-reviews.png'
    ],
    liveUrls: [
      { label: 'The Last Tribe (Islamabad)', url: 'https://the-last-tribe-islamabad.vercel.app/' },
      { label: 'The Smokey Cauldron', url: 'https://the-smokey-cauldron.vercel.app/' }
    ]
  }
];

export const EDUCATION_ITEMS: TimelineItem[] = [
  {
    period: '2020 – 2024',
    institution: 'UET Peshawar',
    role: 'B.Sc in Computer System Engineering',
    description: 'Studied system engineering fundamentals, user interface logic, algorithmic problem solving, and multimedia computing.'
  },
  {
    period: '2018 – 2020',
    institution: 'Edwardes College',
    role: 'FSc in Pre-Engineering',
    description: 'Rigorous foundation in mathematics, physics, and analytical design theory.'
  }
];

export const WORK_ITEMS: TimelineItem[] = [
  {
    period: '2024 – 2025',
    institution: 'Orbitors, Peshawar',
    role: 'Graphic Designer',
    description: 'Led visual design initiatives, social media campaigns, brand marketing assets, and product presentation materials across multiple corporate clients.'
  },
  {
    period: '2022 – 2024',
    institution: 'Tutify, Islamabad',
    role: 'Graphic Designer',
    description: 'Designed educational UI kits, engaging advertising creatives, website banners, and brand assets for ed-tech platforms.'
  }
];

export const FAQS: FaqItem[] = [
  {
    question: 'What tools do you use for your design work?',
    answer: 'I use Photoshop, Figma, Premier Pro and Capcut for my design work. These tools help me create visually attractive and effective designs tailored for both print and digital platforms.'
  },
  {
    question: 'Can I download your resume/CV for information?',
    answer: 'Certainly! You can download my resume/CV directly from this website. It provides a comprehensive overview of my education, work experience, and design achievements.'
  },
  {
    question: 'What experience do you have in graphic design?',
    answer: 'I have worked as a graphic designer at Tutify (2022-2024) and currently at Orbitors (2024-2025). I specialize in creating impactful creative designs with a passion for providing visually appealing and effective solutions.'
  },
  {
    question: 'What is your educational background?',
    answer: 'I completed my B.Sc in Computer System Engineering from UET Peshawar (2020-2024) and my FSc in Pre-Engineering from Edwardes College (2018-2020).'
  }
];
