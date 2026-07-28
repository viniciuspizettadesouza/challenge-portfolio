export interface Lead {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    city: string;
    street: string;
    suite: string;
    zipcode: string;
  };
  phone: string;
  website: string;
  company: {
    name: string;
    bs: string;
  };
}

export const leads: Lead[] = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      city: "Gwenborough",
      street: "Kulas Light",
      suite: "Apt. 556",
      zipcode: "92998-3874",
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: { name: "Romaguera-Crona", bs: "harness real-time e-markets" },
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    address: {
      city: "Wisokyburgh",
      street: "Victor Plains",
      suite: "Suite 879",
      zipcode: "90566-7771",
    },
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
    company: { name: "Deckow-Crist", bs: "synergize scalable supply-chains" },
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "Nathan@yesenia.net",
    address: {
      city: "McKenziehaven",
      street: "Douglas Extension",
      suite: "Suite 847",
      zipcode: "59590-4157",
    },
    phone: "1-463-123-4447",
    website: "ramiro.info",
    company: { name: "Romaguera-Jacobson", bs: "e-enable strategic applications" },
  },
  {
    id: 4,
    name: "Patricia Lebsack",
    username: "Karianne",
    email: "Julianne.OConner@kory.org",
    address: {
      city: "South Elvis",
      street: "Hoeger Mall",
      suite: "Apt. 692",
      zipcode: "53919-4257",
    },
    phone: "493-170-9623 x156",
    website: "kale.biz",
    company: { name: "Robel-Corkery", bs: "transition cutting-edge web services" },
  },
  {
    id: 5,
    name: "Chelsey Dietrich",
    username: "Kamren",
    email: "Lucio_Hettinger@annie.ca",
    address: {
      city: "Roscoeview",
      street: "Skiles Walks",
      suite: "Suite 351",
      zipcode: "33263",
    },
    phone: "(254)954-1289",
    website: "demarco.info",
    company: { name: "Keebler LLC", bs: "revolutionize end-to-end systems" },
  },
  {
    id: 6,
    name: "Mrs. Dennis Schulist",
    username: "Leopoldo_Corkery",
    email: "Karley_Dach@jasper.info",
    address: {
      city: "South Christy",
      street: "Norberto Crossing",
      suite: "Apt. 950",
      zipcode: "23505-1337",
    },
    phone: "1-477-935-8478 x6430",
    website: "ola.org",
    company: { name: "Considine-Lockman", bs: "e-enable innovative applications" },
  },
  {
    id: 7,
    name: "Kurtis Weissnat",
    username: "Elwyn.Skiles",
    email: "Telly.Hoeger@billy.biz",
    address: {
      city: "Howemouth",
      street: "Rex Trail",
      suite: "Suite 280",
      zipcode: "58804-1099",
    },
    phone: "210.067.6132",
    website: "elvis.io",
    company: { name: "Johns Group", bs: "generate enterprise e-tailers" },
  },
  {
    id: 8,
    name: "Nicholas Runolfsdottir V",
    username: "Maxime_Nienow",
    email: "Sherwood@rosamond.me",
    address: {
      city: "Aliyaview",
      street: "Ellsworth Summit",
      suite: "Suite 729",
      zipcode: "45169",
    },
    phone: "586.493.6943 x140",
    website: "jacynthe.com",
    company: { name: "Abernathy Group", bs: "e-enable extensible e-tailers" },
  },
  {
    id: 9,
    name: "Glenna Reichert",
    username: "Delphine",
    email: "Chaim_McDermott@dana.io",
    address: {
      city: "Bartholomebury",
      street: "Dayna Park",
      suite: "Suite 449",
      zipcode: "76495-3109",
    },
    phone: "(775)976-6794 x41206",
    website: "conrad.com",
    company: { name: "Yost and Sons", bs: "aggregate real-time technologies" },
  },
  {
    id: 10,
    name: "Clementina DuBuque",
    username: "Moriah.Stanton",
    email: "Rey.Padberg@karina.biz",
    address: {
      city: "Lebsackbury",
      street: "Kattie Turnpike",
      suite: "Suite 198",
      zipcode: "31428-2261",
    },
    phone: "024-648-3804",
    website: "ambrose.net",
    company: { name: "Hoeger LLC", bs: "target end-to-end models" },
  },
];

export function getCategoryOptions(items: Lead[]) {
  return [...new Set(items.flatMap(({ company }) => company.bs.split(/\s+/)))].sort();
}

export function filterLeads(items: Lead[], nameQuery: string, categories: string[]) {
  const normalizedQuery = nameQuery.trim().toLocaleLowerCase();

  return items.filter((lead) => {
    const matchesName = lead.name.toLocaleLowerCase().includes(normalizedQuery);
    const companyCategories = lead.company.bs.split(/\s+/);
    const matchesCategories = categories.every((category) =>
      companyCategories.includes(category),
    );

    return matchesName && matchesCategories;
  });
}
