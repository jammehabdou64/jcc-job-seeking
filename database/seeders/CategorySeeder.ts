import { Category } from "../../app/Models/Category";

export class CategorySeeder {
  async run() {
    const categories = [
      {
        name: "Frontend Development",

        description:
          "Jobs related to frontend web development, UI/UX implementation, and client-side technologies",
        icon: "🎨",
        job_count: 0,
      },
      {
        name: "Backend Development",
        description:
          "Server-side development, APIs, databases, and backend infrastructure",
        icon: "⚙️",
        job_count: 0,
      },
      {
        name: "Full Stack",
        slug: "full-stack",
        description:
          "Complete web development covering both frontend and backend technologies",
        icon: "🔌",
        job_count: 0,
      },
      {
        name: "Mobile Development",
        description: "iOS, Android, and cross-platform mobile app development",
        icon: "📱",
        job_count: 0,
      },
      {
        name: "UI/UX Design",
        description:
          "User interface and user experience design, wireframing, and prototyping",
        icon: "🎭",
        job_count: 0,
      },
      {
        name: "Data Science",
        description:
          "Data analysis, machine learning, AI, and statistical modeling",
        icon: "📊",
        job_count: 0,
      },
      {
        name: "Web Development",
        description: "General web development projects and website creation",
        icon: "🌐",
        job_count: 0,
      },
      {
        name: "DevOps",
        description: "Infrastructure, deployment, CI/CD, and cloud services",
        icon: "🚀",
        job_count: 0,
      },
      {
        name: "Writing & Translation",
        description:
          "Content writing, technical writing, translation, and copywriting",
        icon: "✍️",
        job_count: 0,
      },
    ];
    for (const category of categories) {
      await Category.create(category);
    }
  }
}
