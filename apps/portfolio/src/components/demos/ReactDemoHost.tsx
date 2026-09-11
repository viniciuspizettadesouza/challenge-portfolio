import StructuredDataWorkbenchDemo from "@challenge/structured-data-workbench-demo";
import ScreenLibraryDemo from "@challenge/screen-library-demo";
import PeopleOperationsDemo from "@challenge/people-operations-demo";
import StrainsDemo from "@challenge/strains-demo";

const demos = {
  "screen-library": ScreenLibraryDemo,
  "people-operations": PeopleOperationsDemo,
  "structured-data-workbench": StructuredDataWorkbenchDemo,
  "strain-directory": StrainsDemo,
};

export default function ReactDemoHost({ slug }: { slug: string }) {
  const Demo = demos[slug as keyof typeof demos];
  return Demo ? <Demo /> : null;
}
