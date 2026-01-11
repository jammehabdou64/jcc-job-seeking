import { bcrypt } from "jcc-express-mvc";
import { Job } from "../../app/Models/Job";
import { User } from "../../app/Models/User";
import { Category } from "../../app/Models/Category";

export class JobSeeder {
  async run() {
    // Get users and categories from database
    const users = await User.get();
    const categories = await Category.get();

    // Check if users exist, if not create a default user
    if (!users || users.length === 0) {
      const defaultUser = await User.create({
        name: "Job Poster",
        email: "poster@example.com",
        password: await bcrypt("password"),
      });
      users.push(defaultUser);
    }

    // Check if categories exist
    if (!categories || categories.length === 0) {
      console.log(
        "Warning: No categories found. Please run CategorySeeder first.",
      );
      return;
    }

    // Create a map of category names to IDs
    const categoryMap = new Map();
    categories.forEach((cat: any) => {
      categoryMap.set(cat.name, cat.id);
    });

    // Job data
    const jobs = [
      {
        title: "Build React Dashboard with D3 Charts",
        description:
          "We need a skilled React developer to build an interactive dashboard with D3.js visualizations. The dashboard should display real-time analytics data with smooth animations and responsive design. Must have experience with React hooks, TypeScript, and D3.js",
        budget_min: 2500,
        budget_max: 5000,
        type: "fixed",
        category_id: categoryMap.get("Frontend Development"),
        tags: JSON.stringify(["React", "D3.js", "TypeScript", "Dashboard"]),
        featured: true,
        status: "active",
        applicants_count: 8,
        views_count: 45,
        user_id: users[0]?.id,
      },
      {
        title: "Vue 3 E-Commerce Platform Frontend",
        description:
          "Complete frontend development for an e-commerce platform using Vue 3 and Tailwind CSS. Project includes product listings, shopping cart, checkout flow, and user authentication UI. Responsive design required for all screen sizes.",
        budget_min: 3000,
        budget_max: 6500,
        type: "fixed",
        category_id: categoryMap.get("Frontend Development"),
        tags: JSON.stringify([
          "Vue 3",
          "Tailwind CSS",
          "E-Commerce",
          "JavaScript",
        ]),
        featured: true,
        status: "active",
        applicants_count: 12,
        views_count: 67,
        user_id: users[1]?.id || users[0]?.id,
      },
      {
        title: "Mobile App UI/UX Design",
        description:
          "Design a beautiful and intuitive mobile app for a fitness tracking platform. Includes user onboarding screens, workout history, progress tracking, and social features. Must create both iOS and Android designs with design systems.",
        budget_min: 1500,
        budget_max: 3500,
        type: "fixed",
        category_id: categoryMap.get("UI/UX Design"),
        tags: JSON.stringify([
          "Figma",
          "Mobile Design",
          "User Experience",
          "Design System",
        ]),
        featured: false,
        status: "active",
        applicants_count: 15,
        views_count: 89,
        user_id: users[0]?.id,
      },
      {
        title: "Node.js REST API Development",
        description:
          "Build a scalable REST API using Node.js, Express, and MongoDB. API should handle user authentication, database operations, and real-time notifications. Must include comprehensive API documentation and unit tests.",
        budget_min: 45,
        budget_max: 85,
        type: "hourly",
        category_id: categoryMap.get("Backend Development"),
        tags: JSON.stringify(["Node.js", "Express", "MongoDB", "REST API"]),
        featured: true,
        status: "active",
        applicants_count: 5,
        views_count: 34,
        user_id: users[1]?.id || users[0]?.id,
      },
      {
        title: "WordPress Theme Customization",
        description:
          "Customize an existing WordPress theme for a real estate agency. Includes homepage redesign, property listing templates, contact forms, and SEO optimization. Must be responsive and fast-loading.",
        budget_min: 800,
        budget_max: 1800,
        type: "fixed",
        category_id: categoryMap.get("Web Development"),
        tags: JSON.stringify(["WordPress", "PHP", "CSS", "Responsive Design"]),
        featured: false,
        status: "active",
        applicants_count: 7,
        views_count: 52,
        user_id: users[0]?.id,
      },
      {
        title: "Python Data Analysis & Visualization",
        description:
          "Analyze large datasets and create interactive visualizations using Python, Pandas, and Matplotlib. Generate insights and create an interactive dashboard for business intelligence. Deliverable: Jupyter notebooks and Python scripts.",
        budget_min: 2000,
        budget_max: 4000,
        type: "fixed",
        category_id: categoryMap.get("Data Science"),
        tags: JSON.stringify([
          "Python",
          "Data Analysis",
          "Pandas",
          "Visualization",
        ]),
        featured: false,
        status: "active",
        applicants_count: 3,
        views_count: 28,
        user_id: users[1]?.id || users[0]?.id,
      },
      {
        title: "iOS App Development (Swift)",
        description:
          "Develop an iOS application for task management with offline support. Must use SwiftUI, Core Data, and implement cloud synchronization. App should be published on the App Store with proper testing and documentation.",
        budget_min: 4000,
        budget_max: 8000,
        type: "fixed",
        category_id: categoryMap.get("Mobile Development"),
        tags: JSON.stringify(["Swift", "iOS", "SwiftUI", "App Store"]),
        featured: false,
        status: "active",
        applicants_count: 4,
        views_count: 41,
        user_id: users[0]?.id,
      },
      {
        title: "Technical Writing & Documentation",
        description:
          "Write comprehensive technical documentation for a developer toolkit. Includes API documentation, user guides, and code examples. Must be clear, accurate, and formatted in Markdown. SEO-optimized for discoverability.",
        budget_min: 40,
        budget_max: 70,
        type: "hourly",
        category_id: categoryMap.get("Writing & Translation"),
        tags: JSON.stringify([
          "Technical Writing",
          "Documentation",
          "Markdown",
          "API",
        ]),
        featured: false,
        status: "active",
        applicants_count: 2,
        views_count: 19,
        user_id: users[1]?.id || users[0]?.id,
      },
    ];

    // Create jobs
    for (const job of jobs) {
      await Job.create(job);
    }
  }
}
