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

const owner = "viniciuspizettadesouza";

const definitions = [
  ["challenge-stormtech", "Stormtech", "master"],
  ["challenge-vue", "Vue", "main"],
  ["challenge-vuejs", "Vue.js", "main"],
  ["challenge-castlabs", "Castlabs", "main"],
  ["challenge-conaz", "Conaz", "master"],
  ["challenge-jexperts", "JExperts", "master"],
  ["challenge-zygo", "Zygo", "master"],
  ["challenge-salsify", "Salsify", "main"],
  ["challenge-climateseed", "ClimateSeed", "main"],
  ["challenge-lagoasoft", "Lagoasoft", "master"],
  ["challenge-devlandia", "Devlandia", "main"],
  ["challenge-meetime", "Meetime", "main"],
  ["challenge-instruct", "Instruct", "master"],
  ["challenge-blueticket", "Blueticket", "main"],
  ["challenge-swordhealth", "Sword Health", "main"],
  ["challenge-pipz", "Pipz", "master"],
  ["challenge-propertiag", "PropertiaG", "main"],
  ["challenge-fyld-hansecom", "FYLD / HanseCom", "main"],
  ["challenge-onsign-tv", "OnSign TV", "main"],
  ["challenge-ingenious-build-frontend", "Ingenious Build", "master"],
] as const;

export const challenges: Challenge[] = definitions.map(([slug, company, branch]) => ({
  slug,
  title: `${company} Challenge`,
  company,
  description:
    "Código de um desafio técnico preservado para consulta e apresentação no portfólio.",
  technologies: [],
  renderer: "case-study",
  migrationStatus: "pending",
  migrationStrategy: "manual-review",
  sourcePath: `challenges/${slug}/original`,
  originalRepository: `${owner}/${slug}`,
  originalDefaultBranch: branch,
  originalHeadSha: "",
}));

export function getChallenge(slug: string) {
  return challenges.find((challenge) => challenge.slug === slug);
}

