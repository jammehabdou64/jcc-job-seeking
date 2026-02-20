export interface Job {
  id: string;
  title: string;
  slug?: string;
  description: string;
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  type: "fixed" | "hourly";
  category: {
    id: string;
    name: string;
    slug: string;
  };
  tags: string[];
  postedDate: Date;
  postedBy: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
  };
  applicants: number;
  featured?: boolean;
  created_at?: string;
}

export const jobsData: Job[] = [
  {
    id: "1",
    title: "Build React Dashboard with D3 Charts",
    description:
      "We need a skilled React developer to build an interactive dashboard with D3.js visualizations. The dashboard should display real-time analytics data with smooth animations and responsive design. Must have experience with React hooks, TypeScript, and D3.js",
    budget: { min: 2500, max: 5000, currency: "USD" },
    type: "fixed",
    category: {
      id: "1",
      name: "Frontend Development",
      slug: "frontend-development",
    },
    tags: ["React", "D3.js", "TypeScript", "Dashboard"],
    postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    postedBy: {
      id: "user-1",
      name: "Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      rating: 4.9,
    },
    applicants: 8,
    featured: true,
  },
  {
    id: "2",
    title: "Vue 3 E-Commerce Platform Frontend",
    description:
      "Complete frontend development for an e-commerce platform using Vue 3 and Tailwind CSS. Project includes product listings, shopping cart, checkout flow, and user authentication UI. Responsive design required for all screen sizes.",
    budget: { min: 3000, max: 6500, currency: "USD" },
    type: "fixed",
    category: {
      id: "1",
      name: "Frontend Development",
      slug: "frontend-development",
    },
    tags: ["Vue 3", "Tailwind CSS", "E-Commerce", "JavaScript"],
    postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    postedBy: {
      id: "user-2",
      name: "Marcus Johnson",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      rating: 4.8,
    },
    applicants: 12,
    featured: true,
  },
  {
    id: "3",
    title: "Mobile App UI/UX Design",
    description:
      "Design a beautiful and intuitive mobile app for a fitness tracking platform. Includes user onboarding screens, workout history, progress tracking, and social features. Must create both iOS and Android designs with design systems.",
    budget: { min: 1500, max: 3500, currency: "USD" },
    type: "fixed",
    category: {
      id: "2",
      name: "UI/UX Design",
      slug: "ui-ux-design",
    },
    tags: ["Figma", "Mobile Design", "User Experience", "Design System"],
    postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    postedBy: {
      id: "user-3",
      name: "Alex Rivera",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      rating: 4.7,
    },
    applicants: 15,
    featured: false,
  },
  {
    id: "4",
    title: "Node.js REST API Development",
    description:
      "Build a scalable REST API using Node.js, Express, and MongoDB. API should handle user authentication, database operations, and real-time notifications. Must include comprehensive API documentation and unit tests.",
    budget: { min: 45, max: 85, currency: "USD/hour" },
    type: "hourly",
    category: {
      id: "3",
      name: "Backend Development",
      slug: "backend-development",
    },
    tags: ["Node.js", "Express", "MongoDB", "REST API"],
    postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    postedBy: {
      id: "user-4",
      name: "Elena Müller",
      avatar:
        "https://images.unsplash.com/photo-1517849845537-1d51a20414de?w=400&h=400&fit=crop",
      rating: 5.0,
    },
    applicants: 5,
    featured: true,
  },
  {
    id: "5",
    title: "WordPress Theme Customization",
    description:
      "Customize an existing WordPress theme for a real estate agency. Includes homepage redesign, property listing templates, contact forms, and SEO optimization. Must be responsive and fast-loading.",
    budget: { min: 800, max: 1800, currency: "USD" },
    type: "fixed",
    category: {
      id: "4",
      name: "Web Development",
      slug: "web-development",
    },
    tags: ["WordPress", "PHP", "CSS", "Responsive Design"],
    postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    postedBy: {
      id: "user-5",
      name: "David Thompson",
      avatar:
        "https://images.unsplash.com/photo-1519085360771-9852ef9a0dda?w=400&h=400&fit=crop",
      rating: 4.6,
    },
    applicants: 7,
    featured: false,
  },
  {
    id: "6",
    title: "Python Data Analysis & Visualization",
    description:
      "Analyze large datasets and create interactive visualizations using Python, Pandas, and Matplotlib. Generate insights and create an interactive dashboard for business intelligence. Deliverable: Jupyter notebooks and Python scripts.",
    budget: { min: 2000, max: 4000, currency: "USD" },
    type: "fixed",
    category: {
      id: "5",
      name: "Data Science",
      slug: "data-science",
    },
    tags: ["Python", "Data Analysis", "Pandas", "Visualization"],
    postedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    postedBy: {
      id: "user-6",
      name: "Priya Patel",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      rating: 4.9,
    },
    applicants: 3,
    featured: false,
  },
  {
    id: "7",
    title: "iOS App Development (Swift)",
    description:
      "Develop an iOS application for task management with offline support. Must use SwiftUI, Core Data, and implement cloud synchronization. App should be published on the App Store with proper testing and documentation.",
    budget: { min: 4000, max: 8000, currency: "USD" },
    type: "fixed",
    category: {
      id: "6",
      name: "Mobile Development",
      slug: "mobile-development",
    },
    tags: ["Swift", "iOS", "SwiftUI", "App Store"],
    postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    postedBy: {
      id: "user-7",
      name: "James Wilson",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      rating: 4.8,
    },
    applicants: 4,
    featured: false,
  },
  {
    id: "8",
    title: "Technical Writing & Documentation",
    description:
      "Write comprehensive technical documentation for a developer toolkit. Includes API documentation, user guides, and code examples. Must be clear, accurate, and formatted in Markdown. SEO-optimized for discoverability.",
    budget: { min: 40, max: 70, currency: "USD/hour" },
    type: "hourly",
    category: {
      id: "7",
      name: "Writing & Translation",
      slug: "writing-translation",
    },
    tags: ["Technical Writing", "Documentation", "Markdown", "API"],
    postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    postedBy: {
      id: "user-8",
      name: "Lisa Anderson",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      rating: 4.7,
    },
    applicants: 2,
    featured: false,
  },
];

export const jobCategories = [
  {
    id: "frontend",
    name: "Frontend Development",
    icon: "🎨",
    jobCount: 234,
  },
  {
    id: "backend",
    name: "Backend Development",
    icon: "⚙️",
    jobCount: 189,
  },
  {
    id: "fullstack",
    name: "Full Stack",
    icon: "🔌",
    jobCount: 156,
  },
  {
    id: "mobile",
    name: "Mobile Development",
    icon: "📱",
    jobCount: 142,
  },
  {
    id: "design",
    name: "UI/UX Design",
    icon: "🎭",
    jobCount: 128,
  },
  {
    id: "data",
    name: "Data Science",
    icon: "📊",
    jobCount: 95,
  },
];

export const testimonials = [
  {
    id: "1",
    name: "Emma Rodriguez",
    role: "Freelance Designer",
    content:
      "This platform has been a game-changer for my freelance career. I found consistent work and grew my client base significantly. The tools and payment system are reliable.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    rating: 5,
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Software Engineer",
    content:
      "As a developer, I appreciate how easy it is to find quality projects. The filter options helped me focus on work that matches my skills and interests. Highly recommended!",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    rating: 5,
  },
  {
    id: "3",
    name: "Sarah Johnson",
    role: "Tech Recruiter",
    content:
      "Finding talented contractors for our projects has never been easier. The vetting process is smooth and we consistently find developers who exceed our expectations.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    rating: 5,
  },
];
