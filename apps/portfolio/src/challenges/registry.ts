import challengeData from "./data.json";

export type ChallengeRenderer = "react" | "vue3" | "static" | "case-study";
export type MigrationStatus = "pending" | "in-progress" | "migrated" | "archived";

export interface Challenge {
  slug: string;
  title: string;
  company: string;
  description: string;
  technologies: string[];
  renderer: ChallengeRenderer;
  migrationStatus: MigrationStatus;
  migrationStrategy:
    | "native-react"
    | "native-vue3"
    | "static-embed"
    | "upgrade-vue2"
    | "upgrade-react"
    | "mock-backend"
    | "case-study"
    | "manual-review";
  sourcePath: string;
  originalRepository: string;
  originalDefaultBranch: "main" | "master";
  originalHeadSha: string;
  demoPath?: string;
  screenshot?: string;
}

export const challenges = challengeData as Challenge[];

export function getChallenge(slug: string) {
  return challenges.find((challenge) => challenge.slug === slug);
}
