import TVEpisodeLibraryDemo from "@challenge/tv-episode-library-demo";
import ConfigurableBookSortingDemo from "@challenge/configurable-book-sorting-demo";
import PeopleOperationsDemo from "@challenge/people-operations-demo";
import LagoasoftDemo from "@challenge/lagoasoft-demo";
import PipzDemo from "@challenge/pipz-demo";
import SalsifyDemo from "@challenge/salsify-demo";
import StrainsDemo from "@challenge/strains-demo";

const demos = {
  "tv-episode-library": TVEpisodeLibraryDemo,
  "people-operations": PeopleOperationsDemo,
  "social-feed-interactions": LagoasoftDemo,
  "film-crawl-experience": PipzDemo,
  "product-data-table": SalsifyDemo,
  "configurable-book-sorting": ConfigurableBookSortingDemo,
  "strain-directory": StrainsDemo,
};

export default function ReactDemoHost({ slug }: { slug: string }) {
  const Demo = demos[slug as keyof typeof demos];
  return Demo ? <Demo /> : null;
}
