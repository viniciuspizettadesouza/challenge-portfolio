export interface LeadLocation {
  city: string;
  address?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  categories: string[];
  cadence: string;
  createdAt: string;
  origin: "instruct" | "meetime" | "local";
  website?: string;
  location?: LeadLocation;
}

export interface LeadDraft {
  name: string;
  email: string;
  phone: string;
  company: string;
  categories: string[];
  cadence: string;
}

export const cadences = ["Outbound SMB", "Product Demo", "Enterprise Follow-up"] as const;

type InstructSeed = [string, string, string, string, string, string, string, string];

const instructSeeds: InstructSeed[] = [
  ["Leanne Graham", "Sincere@april.biz", "1-770-736-8031 x56442", "Romaguera-Crona", "harness real-time e-markets", "Gwenborough", "Kulas Light, Apt. 556", "hildegard.org"],
  ["Ervin Howell", "Shanna@melissa.tv", "010-692-6593 x09125", "Deckow-Crist", "synergize scalable supply-chains", "Wisokyburgh", "Victor Plains, Suite 879", "anastasia.net"],
  ["Clementine Bauch", "Nathan@yesenia.net", "1-463-123-4447", "Romaguera-Jacobson", "e-enable strategic applications", "McKenziehaven", "Douglas Extension, Suite 847", "ramiro.info"],
  ["Patricia Lebsack", "Julianne.OConner@kory.org", "493-170-9623 x156", "Robel-Corkery", "transition cutting-edge web services", "South Elvis", "Hoeger Mall, Apt. 692", "kale.biz"],
  ["Chelsey Dietrich", "Lucio_Hettinger@annie.ca", "(254)954-1289", "Keebler LLC", "revolutionize end-to-end systems", "Roscoeview", "Skiles Walks, Suite 351", "demarco.info"],
  ["Mrs. Dennis Schulist", "Karley_Dach@jasper.info", "1-477-935-8478 x6430", "Considine-Lockman", "e-enable innovative applications", "South Christy", "Norberto Crossing, Apt. 950", "ola.org"],
  ["Kurtis Weissnat", "Telly.Hoeger@billy.biz", "210.067.6132", "Johns Group", "generate enterprise e-tailers", "Howemouth", "Rex Trail, Suite 280", "elvis.io"],
  ["Nicholas Runolfsdottir V", "Sherwood@rosamond.me", "586.493.6943 x140", "Abernathy Group", "e-enable extensible e-tailers", "Aliyaview", "Ellsworth Summit, Suite 729", "jacynthe.com"],
  ["Glenna Reichert", "Chaim_McDermott@dana.io", "(775)976-6794 x41206", "Yost and Sons", "aggregate real-time technologies", "Bartholomebury", "Dayna Park, Suite 449", "conrad.com"],
  ["Clementina DuBuque", "Rey.Padberg@karina.biz", "024-648-3804", "Hoeger LLC", "target end-to-end models", "Lebsackbury", "Kattie Turnpike, Suite 198", "ambrose.net"],
];

export const instructLeads: Lead[] = instructSeeds.map((seed, index) => ({
  id: `instruct-${index + 1}`,
  name: seed[0], email: seed[1], phone: seed[2], company: seed[3],
  categories: seed[4].split(/\s+/),
  cadence: cadences[index % cadences.length],
  createdAt: `${18 - index} Jul 2026`, origin: "instruct",
  location: { city: seed[5], address: seed[6] }, website: seed[7],
}));

export const meetimeLeads: Lead[] = [
  { id: "meetime-1", name: "Mariana Costa", email: "mariana@example.com", phone: "+55 48 99123-4401", company: "Aurora Software", categories: ["saas", "product-led"], cadence: "Product Demo", createdAt: "28 Jul 2026", origin: "meetime" },
  { id: "meetime-2", name: "Daniel Brooks", email: "daniel@example.com", phone: "+44 20 7946 0182", company: "Northstar Systems", categories: ["enterprise", "technology"], cadence: "Enterprise Follow-up", createdAt: "27 Jul 2026", origin: "meetime" },
  { id: "meetime-3", name: "Sofia Martins", email: "sofia@example.com", phone: "+351 21 555 0188", company: "Lumen Commerce", categories: ["commerce", "smb"], cadence: "Outbound SMB", createdAt: "26 Jul 2026", origin: "meetime" },
];

export const initialLeads: Lead[] = [...instructLeads, ...meetimeLeads];
