/**
 * Portfolio content lives here so details can be updated without changing components.
 * Only add a public profile URL after verifying it points to the right account.
 */
export const profile = {
  name: "Nayan",
  location: "Assam, India",
  role: "BCA student · software engineering & AI/ML",
};

export const links = {
  email: "mailto:nayanjyotigogoi176@gmail.com",
  github: null as string | null,
  linkedin: null as string | null,
  instagram: "https://www.instagram.com/urnayn",
};

export type Level = "using" | "building" | "learning" | "practising" | "exploring";

export const toolkit: { group: string; items: { name: string; level: Level }[] }[] = [
  {
    group: "Programming",
    items: [
      { name: "JavaScript", level: "learning" },
      { name: "Java", level: "learning" },
    ],
  },
  {
    group: "Frontend",
    items: [
      { name: "HTML", level: "building" },
      { name: "CSS / SCSS", level: "building" },
      { name: "React", level: "building" },
      { name: "Next.js", level: "building" },
      { name: "TypeScript", level: "learning" },
    ],
  },
  {
    group: "Tools & workflow",
    items: [
      { name: "Git & GitHub", level: "using" },
      { name: "AI-assisted development", level: "using" },
    ],
  },
  {
    group: "Creative & business",
    items: [
      { name: "Graphic and advertising design", level: "practising" },
      { name: "Customer outreach", level: "practising" },
      { name: "NFC business solutions", level: "exploring" },
    ],
  },
];

export const levelLabel: Record<Level, string> = {
  using: "Using",
  building: "Building with",
  learning: "Learning",
  practising: "Practising",
  exploring: "Exploring",
};

export const projects = [
  {
    id: "web",
    name: "Personal Portfolio",
    status: "Personal build",
    description:
      "A narrative-style portfolio built with the Next.js App Router. It combines component-based UI, SCSS Modules and restrained motion to present my work and direction.",
    problem: "A portfolio should make the work and the person behind it clear without feeling like a generic CV.",
    approach: "Built reusable page sections, a custom canvas visual, scroll-based reveals and a responsive layout. The next iteration is focused on stronger case studies and accessibility.",
    tools: ["Next.js", "React", "TypeScript", "SCSS Modules", "GSAP", "Framer Motion", "Lenis"],
    link: null as string | null,
  },
  {
    id: "nfc",
    name: "NFC Business Touchpoints",
    status: "Concept · validation",
    description:
      "Exploring simple NFC cards for local businesses that can open a Google review page, WhatsApp chat, Instagram profile or digital menu with a tap.",
    problem: "Customers should not have to search for a business's review page, contact details or menu after visiting.",
    approach: "Researching tag options and phone compatibility, mapping the setup flow, and testing how to explain the value clearly to local shop owners.",
    tools: ["NFC tags", "Link configuration", "Customer discovery", "Product presentation"],
    link: null as string | null,
  },
  {
    id: "design",
    name: "Visual Design Studies",
    status: "Ongoing practice",
    description:
      "Promotional design experiments for products and businesses, with an emphasis on clear hierarchy, confident typography and uncluttered composition.",
    problem: "Promotional graphics often compete with the product by adding too much copy and decoration.",
    approach: "Start with the product and one clear message, then refine spacing, contrast, type and composition around that priority.",
    tools: ["Typography", "Layout", "Composition", "Visual hierarchy"],
    link: null as string | null,
  },
];

export const origin = [
  { label: "Curiosity", text: "I started by wanting to understand how the things on a screen actually work, not just how to use them." },
  { label: "BCA", text: "Studying for a Bachelor of Computer Applications is giving that curiosity a more structured foundation in computing." },
  { label: "Learning by building", text: "I use small projects to turn concepts into something visible, testable and easier to learn from." },
  { label: "A real-world perspective", text: "Exploring NFC products and promotional design has pushed me to think about what local businesses need and how technology can make a simple task easier." },
];
