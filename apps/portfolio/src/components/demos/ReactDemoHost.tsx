import CastlabsDemo from "@challenge/castlabs-demo";
import ConfigurableBookSortingDemo from "@challenge/configurable-book-sorting-demo";
import PeopleOperationsDemo from "@challenge/people-operations-demo";
import LagoasoftDemo from "@challenge/lagoasoft-demo";
import PipzDemo from "@challenge/pipz-demo";
import PropertiaGDemo from "@challenge/propertiag-demo";
import SalsifyDemo from "@challenge/salsify-demo";
import StrainsDemo from "@challenge/strains-demo";

const demos = {
  "episode-management": CastlabsDemo,
  "people-operations": PeopleOperationsDemo,
  "social-feed-interactions": LagoasoftDemo,
  "film-crawl-experience": PipzDemo,
  "roman-numeral-converter": PropertiaGDemo,
  "product-data-table": SalsifyDemo,
  "configurable-book-sorting": ConfigurableBookSortingDemo,
  "strain-directory": StrainsDemo,
};

export default function ReactDemoHost({ slug }: { slug: string }) {
  const Demo = demos[slug as keyof typeof demos];
  return Demo ? <Demo /> : null;
}
