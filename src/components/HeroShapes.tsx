import { cn } from "@/lib/utils";

type HeroShapesProps = {
  variant:
    | "home"
    | "kits"
    | "curriculum"
    | "curriculum-blue"
    | "curriculum-orange"
    | "curriculum-green"
    | "get-involved"
    | "about"
    | "contact";
};

const shapeMap: Record<HeroShapesProps["variant"], Array<{ className: string }>> = {
  home: [
    { className: "left-[-4rem] top-8 h-40 w-40 rounded-[2.6rem] bg-[#e3edff]" },
    { className: "left-[6%] bottom-10 h-24 w-24 rounded-full bg-[#e4f4c0]" },
    { className: "right-[8%] top-8 h-28 w-28 rounded-[1.8rem] rotate-12 bg-[#ffe0c9]" },
    { className: "right-[-4rem] bottom-0 h-48 w-48 rounded-full bg-[#eef4ff]" },
    { className: "left-[13%] top-[11.75rem] h-40 w-40 rounded-full bg-[#e4f4c0]" },
    { className: "left-[20%] bottom-[7.2rem] h-12 w-12 rounded-[1rem] bg-[#ffe0c9]" },
    { className: "right-[9%] top-[23.5rem] h-40 w-40 rounded-[2.4rem] bg-[#e4f4c0]" },
  ],
  kits: [
    { className: "left-[-4rem] top-16 h-36 w-36 rounded-full bg-[#eef4ff]" },
    { className: "left-[5%] bottom-8 h-48 w-48 rounded-[2.4rem] bg-[#e4f4c0]" },
    { className: "left-[10%] bottom-8 h-22 w-22 rounded-[1.5rem] rotate-6 bg-[#ffe7d3]" },
    { className: "right-[10%] top-10 h-20 w-20 rounded-full bg-[#e4f4c0]" },
    { className: "right-[-4rem] bottom-6 h-44 w-44 rounded-[2.4rem] -rotate-12 bg-[#ffe7d3]" },
  ],
  curriculum: [
    { className: "left-[-4rem] top-10 h-40 w-40 rounded-[2.8rem] bg-[#e3edff]" },
    { className: "left-[16%] top-6 h-20 w-20 rounded-full bg-[#ffe7d3]" },
    { className: "right-[12%] top-12 h-24 w-24 rounded-[1.5rem] bg-[#e4f4c0]" },
    { className: "right-[2rem] bottom-5 h-20 w-20 rounded-[1.5rem] bg-[#eef4ff]" },
  ],
  "curriculum-blue": [
    { className: "left-[-5rem] top-12 h-44 w-44 rounded-[2.8rem] bg-[#dce8ff]" },
    { className: "left-[10%] bottom-8 h-24 w-24 rounded-full bg-[#eef4ff]" },
    { className: "right-[12%] top-10 h-28 w-28 rounded-[1.7rem] rotate-6 bg-[#cfe0ff]" },
    { className: "right-[-5rem] bottom-8 h-48 w-48 rounded-full bg-[#f3f8ff]" },
  ],
  "curriculum-orange": [
    { className: "left-[-5rem] top-14 h-44 w-44 rounded-full bg-[#ffe7d3]" },
    { className: "left-[11%] bottom-10 h-24 w-24 rounded-[1.8rem] -rotate-6 bg-[#ffdcc2]" },
    { className: "right-[11%] top-8 h-28 w-28 rounded-[2.2rem] rotate-12 bg-[#fff0e3]" },
    { className: "right-[-5rem] bottom-6 h-48 w-48 rounded-[2.9rem] bg-[#fff8f1]" },
  ],
  "curriculum-green": [
    { className: "left-[-5rem] top-12 h-44 w-44 rounded-[2.7rem] bg-[#ddf1b8]" },
    { className: "left-[10%] bottom-8 h-24 w-24 rounded-full bg-[#eef8dc]" },
    { className: "right-[12%] top-10 h-28 w-28 rounded-[1.8rem] -rotate-12 bg-[#d2eaa2]" },
    { className: "right-[-5rem] bottom-8 h-48 w-48 rounded-full bg-[#f7fbef]" },
  ],
  "get-involved": [
    { className: "left-[-4rem] top-10 h-34 w-34 rounded-[2.2rem] rotate-6 bg-[#ffe7d3]" },
    { className: "left-[8%] bottom-10 h-24 w-24 rounded-[1.8rem] bg-[#e4f4c0]" },
    { className: "right-[12%] top-8 h-22 w-22 rounded-[1.6rem] bg-[#e3edff]" },
    { className: "right-[-4rem] bottom-4 h-46 w-46 rounded-[2.7rem] -rotate-6 bg-[#eef4ff]" },
    { className: "left-[18%] top-6 h-16 w-16 rounded-[1.2rem] bg-[#eef4ff]" },
    { className: "right-[24%] bottom-8 h-18 w-18 rounded-[1.3rem] rotate-12 bg-[#ffe7d3]" },
    { className: "left-[22%] top-[12.5rem] h-20 w-20 rounded-[1.5rem] -rotate-6 bg-[#ffe0c9]" },
    { className: "right-[19%] top-[11rem] h-14 w-14 rounded-[1rem] rotate-6 bg-[#e4f4c0]" },
    { className: "right-[6%] top-[15.5rem] h-44 w-44 rounded-full bg-[#ffe0c9]" },
  ],
  about: [
    { className: "left-[-4rem] top-14 h-36 w-36 rounded-full bg-[#e4f4c0]" },
    { className: "left-[10%] bottom-10 h-22 w-22 rounded-[1.7rem] bg-[#e3edff]" },
    { className: "right-[12%] top-14 h-20 w-20 rounded-full bg-[#ffe7d3]" },
    { className: "right-[-4rem] bottom-4 h-44 w-44 rounded-[2.4rem] bg-[#eef4ff]" },
  ],
  contact: [
    { className: "left-[-4rem] top-10 h-34 w-34 rounded-[2rem] -rotate-6 bg-[#e3edff]" },
    { className: "left-[8%] bottom-10 h-20 w-20 rounded-full bg-[#e4f4c0]" },
    { className: "right-[10%] top-12 h-24 w-24 rounded-[2rem] rotate-12 bg-[#ffe7d3]" },
    { className: "right-[-4rem] bottom-6 h-40 w-40 rounded-full bg-[#f2f7ff]" },
  ],
};

const HeroShapes = ({ variant }: HeroShapesProps) => {
  const motionClasses = ["hero-shape-a", "hero-shape-b", "hero-shape-c", "hero-shape-d"];

  return (
    <>
      <div className="absolute inset-0 grid-paper opacity-80" />
      {shapeMap[variant].map((shape, index) => (
        <div
          key={`${variant}-${index}`}
          className={cn(
            "absolute pointer-events-none will-change-transform border-2 border-foreground",
            motionClasses[index % motionClasses.length],
            shape.className,
          )}
        />
      ))}
    </>
  );
};

export default HeroShapes;
