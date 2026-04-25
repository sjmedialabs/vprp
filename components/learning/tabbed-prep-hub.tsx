"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TabUnderline } from "@/components/motion/tab-underline";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

type TopTab = "aptitude" | "programming" | "company" | "resources";

interface HubTopic {
  label: string;
  href: string;
}

interface HubSection {
  label: string;
  topics: HubTopic[];
}

interface HubConfig {
  sidebar: string[];
  sections: HubSection[];
}

const HUB_DATA: Record<TopTab, HubConfig> = {
  aptitude: {
    sidebar: [
      "Quantitative Aptitude",
      "Data Interpretation",
      "Logical Reasoning",
      "Verbal Reasoning",
      "Non-Verbal Reasoning",
      "Verbal Ability",
    ],
    sections: [
      {
        label: "Quantitative Aptitude",
        topics: [
          { label: "Percentages", href: "/aptitude/quantitative-aptitude/percentages" },
          { label: "Time & Work", href: "/aptitude/quantitative-aptitude/time-and-work" },
          { label: "Profit & Loss", href: "/aptitude/quantitative-aptitude/profit-and-loss" },
        ],
      },
      {
        label: "Logical Reasoning",
        topics: [
          { label: "Seating Arrangement", href: "/aptitude/logical-reasoning/seating-arrangement" },
          { label: "Blood Relations", href: "/aptitude/logical-reasoning/blood-relations" },
          { label: "Syllogisms", href: "/aptitude/logical-reasoning/syllogisms" },
        ],
      },
    ],
  },
  programming: {
    sidebar: ["Exercises", "Technical MCQs", "DSA Questions", "Interview Questions"],
    sections: [
      {
        label: "Exercises",
        topics: [
          { label: "Python", href: "/programming/exercises/python" },
          { label: "Java", href: "/programming/exercises/java" },
          { label: "JavaScript", href: "/programming/exercises/javascript" },
          { label: "React", href: "/programming/exercises/react" },
        ],
      },
      {
        label: "Technical MCQs",
        topics: [
          { label: "DBMS", href: "/programming/mcqs/dbms" },
          { label: "Operating Systems", href: "/programming/mcqs/os" },
          { label: "OOPS", href: "/programming/mcqs/oops" },
        ],
      },
      {
        label: "DSA Questions",
        topics: [
          { label: "Arrays", href: "/programming/dsa/arrays" },
          { label: "Linked List", href: "/programming/dsa/linked-list" },
          { label: "Dynamic Programming", href: "/programming/dsa/dynamic-programming" },
        ],
      },
      {
        label: "Interview Questions",
        topics: [
          { label: "AWS", href: "/programming/interview/aws" },
          { label: "System Design", href: "/programming/interview/system-design" },
          { label: "Spring", href: "/programming/interview/spring" },
        ],
      },
    ],
  },
  company: {
    sidebar: ["Aptitude Questions", "Placement Exams"],
    sections: [
      {
        label: "Company Aptitude",
        topics: [
          { label: "Accenture", href: "/company/accenture/aptitude" },
          { label: "TCS", href: "/company/tcs/aptitude" },
          { label: "Infosys", href: "/company/infosys/aptitude" },
          { label: "Zoho", href: "/company/zoho/aptitude" },
        ],
      },
      {
        label: "Placement Exams",
        topics: [
          { label: "Wipro", href: "/company/wipro/exam" },
          { label: "Capgemini", href: "/company/capgemini/exam" },
          { label: "Cognizant", href: "/company/cognizant/exam" },
        ],
      },
    ],
  },
  resources: {
    sidebar: ["Resources"],
    sections: [
      {
        label: "Resource Categories",
        topics: [
          { label: "For Colleges", href: "/resources/colleges" },
          { label: "Career Transition", href: "/resources/career" },
          { label: "Blog", href: "/blog" },
          { label: "Web Stories", href: "/stories" },
        ],
      },
    ],
  },
};

const TABS: Array<{ id: TopTab; label: string }> = [
  { id: "aptitude", label: "Aptitude" },
  { id: "programming", label: "Programming" },
  { id: "company", label: "Company Specific" },
  { id: "resources", label: "Resources" },
];

export function TabbedPrepHub() {
  const [activeTab, setActiveTab] = useState<TopTab>("aptitude");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const config = useMemo(() => HUB_DATA[activeTab], [activeTab]);

  const sidebarContent = (
    <div className="space-y-2">
      {config.sidebar.map((item) => (
        <div key={item} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm">
          {item}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <div className="inline-flex min-w-full gap-6 border-b border-white/10 px-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`relative pb-3 text-sm font-medium transition-colors duration-300 ${
                activeTab === tab.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
              <TabUnderline active={activeTab === tab.id} />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="grid gap-6 lg:grid-cols-[260px_1fr]"
        >
          <aside className="glass-card hidden rounded-2xl p-4 lg:block">
            <p className="mb-4 text-xs uppercase tracking-wider text-muted-foreground">Sections</p>
            {sidebarContent}
          </aside>

          <section className="glass-card rounded-2xl p-5">
            <div className="mb-4 lg:hidden">
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="neon-border">
                    <Menu className="mr-2 h-4 w-4" />
                    Sections
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-background">
                  <p className="mb-4 text-xs uppercase tracking-wider text-muted-foreground">Sections</p>
                  {sidebarContent}
                </SheetContent>
              </Sheet>
            </div>
            <div className="space-y-6">
              {config.sections.map((section) => (
                <div key={section.label}>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                    {section.label}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {section.topics.map((topic) => (
                      <motion.div
                        key={topic.href}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          href={topic.href}
                          className="chip-glow inline-flex rounded-full px-4 py-2 text-sm"
                        >
                          {topic.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
