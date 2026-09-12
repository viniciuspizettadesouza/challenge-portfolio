import challengeData from "./data.json";

export type ChallengeRenderer = "react" | "vue3" | "static" | "case-study";
export type MigrationStatus =
  "pending" | "in-progress" | "migrated" | "archived";

export interface ChallengeSource {
  slug: string;
  title: string;
  sourcePath: string;
  originalRepository: string;
  originalDefaultBranch: "main" | "master";
  originalHeadSha: string;
}

export interface Challenge {
  slug: string;
  title: string;
  themes: string[];
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
    | "consolidated"
    | "case-study"
    | "manual-review";
  sources: ChallengeSource[];
  aliases: string[];
  screenshot: string;
  featuredRank?: 1 | 2 | 3;
  demoPath?: string;
}

export const challenges = challengeData as Challenge[];

export function getChallenge(slug: string) {
  return challenges.find((challenge) => challenge.slug === slug);
}

export const challengeAliases = new Map(
  challenges.flatMap((challenge) =>
    challenge.aliases.map((alias) => [alias, challenge] as const),
  ),
);
