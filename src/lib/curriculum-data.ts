import curriculaAi from "@/assets/curricula-ai.webp";
import curriculaRobotics from "@/assets/curricula-robotics.png";
import curriculaWebdev from "@/assets/curricula-webdev.png";
import curriculaPython from "@/assets/curricula-python.png";
import curriculaJava from "@/assets/curricula-java.png";
import curriculaR from "@/assets/curricula-r.png";
import kitChemistry from "@/assets/kit-chemistry.png";
import kitPhysics from "@/assets/kit-physics.png";
import kitRenewable from "@/assets/kit-renewable.png";

export type CurriculumTheme = "blue" | "orange" | "green";
export type CurriculumAgeBand = "Primary" | "Middle School" | "High School";
export type CurriculumAgeSlug = "primary" | "middle-school" | "high-school";

export type CurriculumSection = {
  id: string;
  title: string;
  summary: string;
  paragraphs: string[];
  bullets?: string[];
  tips?: string[];
};

export type CurriculumQuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type CurriculumEntry = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  ageBand: CurriculumAgeBand;
  ages: string;
  theme: CurriculumTheme;
  heroImage: string;
  cardImage: string;
  author: string;
  educationDirector: string;
  organization: string;
  readingTime: string;
  difficulty: string;
  overview: string;
  sectionIdsForBookmarks: string[];
  relatedKitLabel?: string;
  relatedKitHref?: string;
  sections: CurriculumSection[];
  assignments: string[];
  quiz: CurriculumQuizQuestion[];
};

export type CurriculumAgeGroup = {
  slug: CurriculumAgeSlug;
  ageBand: CurriculumAgeBand;
  title: string;
  ages: string;
  description: string;
  theme: CurriculumTheme;
};

const makeQuiz = (
  question: string,
  options: string[],
  correctIndex: number,
  explanation: string,
): CurriculumQuizQuestion => ({
  question,
  options,
  correctIndex,
  explanation,
});

export const curriculumEntries: CurriculumEntry[] = [
  {
    slug: "biotech-explorers",
    title: "Biotech Explorers",
    shortTitle: "Biotech",
    summary: "A structured long-read introduction to biotech ideas for older learners.",
    ageBand: "High School",
    ages: "Ages 14-18",
    theme: "blue",
    heroImage: curriculaAi,
    cardImage: curriculaAi,
    author: "STEMise Curriculum Team",
    educationDirector: "Christopher Huang",
    organization: "STEMise",
    readingTime: "45-60 min",
    difficulty: "Intermediate",
    overview:
      "This open curriculum introduces biotech through real-world context, guided explanations, self-checks, and assignments. It is public and does not require an account.",
    sectionIdsForBookmarks: ["big-idea", "how-it-works", "case-studies", "ethics", "self-check"],
    relatedKitLabel: "View related chemistry kits",
    relatedKitHref: "/kits",
    sections: [
      {
        id: "big-idea",
        title: "What is biotech?",
        summary: "Biotech uses living systems and biological processes to solve human problems.",
        paragraphs: [
          "Biotech shows up in medicine, food, sustainability, and research. Students begin by defining the field in plain language before diving into examples.",
          "The goal is not to make the topic feel academic-only. It should feel connected to daily life and current innovation.",
        ],
        bullets: ["Healthcare and vaccines", "Agriculture and food systems", "Environmental cleanup"],
        tips: ["Ask learners to name one biotech example they have seen before.", "Use local examples when possible."],
      },
      {
        id: "how-it-works",
        title: "Core biotech tools",
        summary: "Introduce DNA, cells, sequencing, and bioengineering as a toolkit rather than isolated facts.",
        paragraphs: [
          "Learners move from concept to mechanism by looking at how DNA, proteins, and cell behavior connect to biotechnology methods.",
          "This section should feel structured and educationally sequenced, not blog-like.",
        ],
        bullets: ["DNA as information", "Cells as living systems", "Engineering for desired outcomes"],
      },
      {
        id: "case-studies",
        title: "Case studies and real examples",
        summary: "Concrete examples help older students connect biotech theory to impact.",
        paragraphs: [
          "This section works best with diagrams, guided examples, and clearly structured explanations.",
          "Case studies can be expanded later in edit mode without changing the page structure.",
        ],
        bullets: ["Vaccines", "CRISPR and gene editing", "Biomanufacturing"],
      },
      {
        id: "ethics",
        title: "Questions worth debating",
        summary: "Students should think critically, not only memorize.",
        paragraphs: [
          "Biotech raises questions about equity, safety, cost, and public trust. Learners should leave with both knowledge and judgment.",
          "Prompt discussion rather than forcing one final answer.",
        ],
        tips: ["What should be regulated?", "Who should access new biotech tools first?"],
      },
      {
        id: "self-check",
        title: "Self-check and reflection",
        summary: "Wrap up with a quiz and one small challenge.",
        paragraphs: [
          "The quiz below stays on the device and does not send data anywhere. It exists to support self-evaluation and reinforce learning.",
        ],
      },
    ],
    assignments: [
      "Make a one-page biotech concept map using three real-world examples.",
      "Compare one medical biotech use and one environmental biotech use.",
      "Write a short ethical response to one biotech debate question.",
    ],
    quiz: [
      makeQuiz("What is the main goal of biotechnology?", ["To decorate lab equipment", "To use biological systems to solve problems", "To replace all science classes", "To avoid experimentation"], 1, "Biotechnology applies biological systems and processes to real problems."),
      makeQuiz("Which topic belongs in biotech?", ["Sequencing DNA", "Painting robots", "Playing music", "Building roads"], 0, "DNA sequencing is a core biotech concept."),
      makeQuiz("Why include ethics in biotech?", ["Because the topic affects people and society", "Because quizzes need more questions", "Because it is only a legal issue", "Because it is easier than science"], 0, "Biotech decisions can affect access, safety, and fairness."),
    ],
  },
  {
    slug: "robotics-play-lab",
    title: "Robotics Play Lab",
    shortTitle: "Robotics",
    summary: "A playful robotics curriculum for younger learners with clear sections and activity prompts.",
    ageBand: "Primary",
    ages: "Ages 6-10",
    theme: "orange",
    heroImage: curriculaRobotics,
    cardImage: curriculaRobotics,
    author: "STEMise Curriculum Team",
    educationDirector: "Christopher Huang",
    organization: "STEMise",
    readingTime: "30-40 min",
    difficulty: "Beginner",
    overview:
      "This curriculum is designed to feel inviting and visual for children. It uses simple explanations, build-first learning, bookmarks, assignment ideas, and self-check prompts.",
    sectionIdsForBookmarks: ["meet-robots", "parts-and-motion", "sensors", "build-challenge", "self-check"],
    relatedKitLabel: "View related physics kits",
    relatedKitHref: "/kits",
    sections: [
      {
        id: "meet-robots",
        title: "Meet a robot",
        summary: "What makes a robot a robot?",
        paragraphs: [
          "Children start by noticing what robots can sense, decide, and do. The goal is to reduce intimidation and build curiosity.",
          "This section works well with visual references and simple classroom examples.",
        ],
        bullets: ["Robots can move", "Robots can sense", "Robots can follow instructions"],
      },
      {
        id: "parts-and-motion",
        title: "Parts and movement",
        summary: "Motors, wheels, and structure help robots act in the world.",
        paragraphs: [
          "Keep the writing short and paired with pictures or diagrams. Learners should be able to point at a part and explain what it helps the robot do.",
        ],
      },
      {
        id: "sensors",
        title: "Robots can sense",
        summary: "Children connect sensors to simple real-world actions.",
        paragraphs: [
          "This section introduces the idea that robots react to information from their environment.",
        ],
        bullets: ["Light sensors", "Touch sensors", "Distance sensing"],
      },
      {
        id: "build-challenge",
        title: "Mini build challenge",
        summary: "Students apply the lesson with a small build or paper-planning task.",
        paragraphs: [
          "The assignments below can connect to kits when the topic overlaps.",
        ],
      },
      {
        id: "self-check",
        title: "Self-check and reflection",
        summary: "A quick knowledge check finishes the lesson.",
        paragraphs: [
          "No account needed. Answers stay on the page and are only for self-learning.",
        ],
      },
    ],
    assignments: [
      "Draw a robot and label three parts.",
      "Explain what one sensor helps a robot do.",
      "Build a paper plan for a robot that solves a small classroom problem.",
    ],
    quiz: [
      makeQuiz("What helps a robot know what is around it?", ["A sensor", "A sticker", "A desk", "A backpack"], 0, "Sensors help robots detect information."),
      makeQuiz("What can a motor help a robot do?", ["Move", "Sleep", "Sing by itself", "Disappear"], 0, "Motors help create movement."),
      makeQuiz("Why do robots need instructions?", ["To know what to do", "To become pets", "To change color", "To become plants"], 0, "Instructions guide robot behavior."),
    ],
  },
  {
    slug: "web-makers-studio",
    title: "Web Makers Studio",
    shortTitle: "Web Development",
    summary: "A web development curriculum for middle school learners built around structure, design, and making.",
    ageBand: "Middle School",
    ages: "Ages 11-13",
    theme: "green",
    heroImage: curriculaWebdev,
    cardImage: curriculaWebdev,
    author: "STEMise Curriculum Team",
    educationDirector: "Christopher Huang",
    organization: "STEMise",
    readingTime: "40-50 min",
    difficulty: "Beginner to Intermediate",
    overview:
      "This page models a public curriculum with sections, bookmarks, assignments, and self-evaluation. It is designed to be editable later without rebuilding the page system.",
    sectionIdsForBookmarks: ["what-is-web", "html-css", "page-planning", "build-practice", "self-check"],
    sections: [
      {
        id: "what-is-web",
        title: "What is a website?",
        summary: "Start with what students already know from using the internet.",
        paragraphs: [
          "Web learning should begin with visible structure rather than abstract definitions.",
        ],
        bullets: ["Pages", "Links", "Images", "Content blocks"],
      },
      {
        id: "html-css",
        title: "HTML and CSS basics",
        summary: "Teach structure first, then appearance.",
        paragraphs: [
          "Students should see how content and style work together without getting overloaded.",
        ],
      },
      {
        id: "page-planning",
        title: "Planning a page",
        summary: "Good projects start with clear sections and hierarchy.",
        paragraphs: [
          "This section mirrors the same idea used in the site revamp: clarity first, then style.",
        ],
      },
      {
        id: "build-practice",
        title: "Build practice",
        summary: "One short project gives students a reason to apply the lesson.",
        paragraphs: [
          "Students can make a profile page, club page, or topic explainer.",
        ],
      },
      {
        id: "self-check",
        title: "Self-check and reflection",
        summary: "End with reflection and a short quiz.",
        paragraphs: ["The check is private and only for the learner."],
      },
    ],
    assignments: [
      "Sketch a homepage layout with three sections.",
      "Write one heading, one paragraph, and one call-to-action for a simple page.",
      "Build a mini webpage on paper or in a code editor.",
    ],
    quiz: [
      makeQuiz("What does HTML mainly control?", ["Page structure", "Internet speed", "Computer battery", "Sound volume"], 0, "HTML handles structure and content."),
      makeQuiz("What does CSS mainly control?", ["Styling and layout", "Email delivery", "Passwords", "Typing speed"], 0, "CSS controls the look of the page."),
      makeQuiz("Why plan a page before building?", ["To make the layout clearer", "To avoid using text", "To remove headings", "To skip design"], 0, "Planning improves hierarchy and clarity."),
    ],
  },
  {
    slug: "python-foundations",
    title: "Python Foundations",
    shortTitle: "Python",
    summary: "A clear Python path for middle school learners who want a strong coding base.",
    ageBand: "Middle School",
    ages: "Ages 11-13",
    theme: "blue",
    heroImage: curriculaPython,
    cardImage: curriculaPython,
    author: "STEMise Curriculum Team",
    educationDirector: "Christopher Huang",
    organization: "STEMise",
    readingTime: "35-45 min",
    difficulty: "Beginner",
    overview:
      "A data-driven curriculum page for Python basics, assignments, and self-evaluation.",
    sectionIdsForBookmarks: ["python-idea", "variables", "logic", "mini-project", "self-check"],
    sections: [
      {
        id: "python-idea",
        title: "Why Python?",
        summary: "Python is readable, useful, and a great beginner language.",
        paragraphs: ["Introduce Python through what students can make with it."],
      },
      {
        id: "variables",
        title: "Variables and inputs",
        summary: "Students learn how programs store and use information.",
        paragraphs: ["Keep examples small and easy to test."],
      },
      {
        id: "logic",
        title: "Logic and decisions",
        summary: "If-statements help programs react.",
        paragraphs: ["Use games and score examples when possible."],
      },
      {
        id: "mini-project",
        title: "Mini-project",
        summary: "Learners build something tiny but complete.",
        paragraphs: ["A quiz game or greeting generator works well."],
      },
      {
        id: "self-check",
        title: "Self-check and reflection",
        summary: "End with self-evaluation and one challenge.",
        paragraphs: ["The quiz stays private on the page."],
      },
    ],
    assignments: [
      "Make a simple greeting program.",
      "Add one if-statement to a mini program.",
      "Explain what a variable stores in your own words.",
    ],
    quiz: [
      makeQuiz("What does a variable do?", ["Stores information", "Deletes code", "Creates the internet", "Changes the keyboard"], 0, "Variables store values that a program can use."),
      makeQuiz("What does an if-statement help with?", ["Making decisions", "Charging a computer", "Drawing by hand", "Installing apps"], 0, "If-statements allow decision-making."),
      makeQuiz("Why is Python beginner-friendly?", ["Its syntax is readable", "It has no rules", "It is only for experts", "It removes logic"], 0, "Python is often easier to read than many languages."),
    ],
  },
  {
    slug: "java-and-software-logic",
    title: "Java and Software Logic",
    shortTitle: "Java",
    summary: "A high-school curriculum page focused on software structure and object-oriented thinking.",
    ageBand: "High School",
    ages: "Ages 14-18",
    theme: "orange",
    heroImage: curriculaJava,
    cardImage: curriculaJava,
    author: "STEMise Curriculum Team",
    educationDirector: "Christopher Huang",
    organization: "STEMise",
    readingTime: "45-60 min",
    difficulty: "Intermediate",
    overview:
      "This template shows how older-student curricula can keep the same structure while shifting tone and depth.",
    sectionIdsForBookmarks: ["java-role", "classes", "methods", "practice", "self-check"],
    sections: [
      {
        id: "java-role",
        title: "Where Java fits",
        summary: "Students see why Java matters in software learning.",
        paragraphs: ["Frame Java as a way to learn structure and object-oriented design."],
      },
      {
        id: "classes",
        title: "Classes and objects",
        summary: "Core OOP ideas should be explained visually and with examples.",
        paragraphs: ["Use real-world analogies before code examples."],
      },
      {
        id: "methods",
        title: "Methods and program flow",
        summary: "Programs are easier to understand when broken into purposeful pieces.",
        paragraphs: ["Students should connect functions and organization."],
      },
      {
        id: "practice",
        title: "Practice build",
        summary: "One small build gives the lesson shape.",
        paragraphs: ["A simple class-based app is enough for the template."],
      },
      {
        id: "self-check",
        title: "Self-check and reflection",
        summary: "End with confidence-building review.",
        paragraphs: ["The quiz stays local to the learner."],
      },
    ],
    assignments: [
      "Write one class with two properties.",
      "Explain the difference between a class and an object.",
      "Plan a tiny Java project with clear methods.",
    ],
    quiz: [
      makeQuiz("What is a class in Java?", ["A blueprint for objects", "A browser tab", "A math quiz", "A password"], 0, "A class is a blueprint."),
      makeQuiz("What is an object?", ["An instance of a class", "A folder", "A color theme", "A keyboard shortcut"], 0, "Objects are created from classes."),
      makeQuiz("Why use methods?", ["To organize behavior", "To remove all logic", "To hide the screen", "To rename Java"], 0, "Methods organize repeated or named actions."),
    ],
  },
  {
    slug: "data-and-research-tools",
    title: "Data and Research Tools",
    shortTitle: "Data Tools",
    summary: "A high-school curriculum introducing data thinking with research and storytelling.",
    ageBand: "High School",
    ages: "Ages 14-18",
    theme: "green",
    heroImage: curriculaR,
    cardImage: curriculaR,
    author: "STEMise Curriculum Team",
    educationDirector: "Christopher Huang",
    organization: "STEMise",
    readingTime: "40-55 min",
    difficulty: "Intermediate",
    overview:
      "This curriculum template shows how research-oriented topics can still feel structured, readable, and interactive.",
    sectionIdsForBookmarks: ["data-role", "questions", "patterns", "storytelling", "self-check"],
    sections: [
      {
        id: "data-role",
        title: "Why data matters",
        summary: "Data helps learners describe patterns and make better decisions.",
        paragraphs: ["Start with familiar examples like school, sports, or science observations."],
      },
      {
        id: "questions",
        title: "Ask better questions",
        summary: "Good data work starts with a clear question.",
        paragraphs: ["Students should learn to define the question before collecting data."],
      },
      {
        id: "patterns",
        title: "Look for patterns",
        summary: "Charts and comparisons make information easier to read.",
        paragraphs: ["This section can later expand with more examples, chart reading, and guided practice."],
      },
      {
        id: "storytelling",
        title: "Explain what the data says",
        summary: "A result matters only if someone can understand it.",
        paragraphs: ["Teach students to explain patterns in plain language."],
      },
      {
        id: "self-check",
        title: "Self-check and reflection",
        summary: "Wrap up with a few review questions and one mini task.",
        paragraphs: ["The final self-check stays private to the learner."],
      },
    ],
    assignments: [
      "Collect a tiny dataset from your daily life and summarize it.",
      "Turn one pattern into a short explanation.",
      "Compare two categories using a simple chart sketch.",
    ],
    quiz: [
      makeQuiz("What should come first in a data project?", ["A clear question", "A random chart", "A login system", "A long essay"], 0, "A clear question gives the project direction."),
      makeQuiz("Why use charts?", ["To make patterns easier to read", "To hide the answer", "To replace questions", "To avoid data"], 0, "Charts can help reveal patterns clearly."),
      makeQuiz("Why does explanation matter?", ["People need to understand the result", "Because data is never visual", "Because charts are bad", "Because research has no audience"], 0, "Data becomes more useful when it is explained well."),
    ],
  },
];

export const curriculumThemeClasses: Record<
  CurriculumTheme,
  {
    surface: string;
    panel: string;
    badge: string;
    outline: string;
    softOutline: string;
    heroVariant: "curriculum-blue" | "curriculum-orange" | "curriculum-green";
  }
> = {
  blue: {
    surface: "bg-[#edf4ff] border-foreground",
    panel: "panel-blue border-[#6d97f5]",
    badge: "bg-[#cfe0ff] text-[#17305e]",
    outline: "border-[#6d97f5]",
    softOutline: "border-[#c7d7fb]",
    heroVariant: "curriculum-blue",
  },
  orange: {
    surface: "bg-[#fff0e3] border-foreground",
    panel: "panel-orange border-[#f39b56]",
    badge: "bg-[#ffd3af] text-[#643216]",
    outline: "border-[#f39b56]",
    softOutline: "border-[#ffd7bc]",
    heroVariant: "curriculum-orange",
  },
  green: {
    surface: "bg-[#eef8dc] border-foreground",
    panel: "panel-lime border-[#8fc457]",
    badge: "bg-[#d2eaa2] text-[#304214]",
    outline: "border-[#8fc457]",
    softOutline: "border-[#cde6ab]",
    heroVariant: "curriculum-green",
  },
};

export const curriculumAgeGroups: CurriculumAgeGroup[] = [
  {
    slug: "primary",
    ageBand: "Primary",
    title: "Primary learners",
    ages: "Ages 6-10",
    description: "Playful, visual, and easy to follow for younger learners getting started with STEM.",
    theme: "orange",
  },
  {
    slug: "middle-school",
    ageBand: "Middle School",
    title: "Middle school learners",
    ages: "Ages 11-13",
    description: "Clear structure with stronger projects, more independence, and room to build confidence.",
    theme: "green",
  },
  {
    slug: "high-school",
    ageBand: "High School",
    title: "High school learners",
    ages: "Ages 14-18",
    description: "Longer, deeper curriculum paths for older students who want more technical direction.",
    theme: "blue",
  },
];

const ageBandToSlugMap: Record<CurriculumAgeBand, CurriculumAgeSlug> = {
  Primary: "primary",
  "Middle School": "middle-school",
  "High School": "high-school",
};

export const getCurriculumBySlug = (slug: string) =>
  curriculumEntries.find((entry) => entry.slug === slug);

export const getCurriculumAgeGroupBySlug = (slug: string) =>
  curriculumAgeGroups.find((group) => group.slug === slug);

export const getCurriculumAgeSlug = (ageBand: CurriculumAgeBand): CurriculumAgeSlug =>
  ageBandToSlugMap[ageBand];

export const getCurriculumEntriesByAgeSlug = (slug: CurriculumAgeSlug) => {
  const ageGroup = getCurriculumAgeGroupBySlug(slug);
  if (!ageGroup) {
    return [];
  }

  return curriculumEntries.filter((entry) => entry.ageBand === ageGroup.ageBand);
};
