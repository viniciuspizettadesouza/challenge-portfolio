import Image from "next/image";
import StrainInterface from "../interfaces/strains.interface";
import Link from "next/link";

const CardStrains: React.FC<StrainInterface> = ({ strain }) => {
  return (
    <Link
      href={`${strain.uri}`}
      className="group rounded-2xl border border-white bg-white"
    >
      <div className="h-full w-full rounded-2xl bg-inherit bg-white transition duration-300 group-hover:scale-105 group-hover:shadow-lg">
        <div className="p-8">
          <span className="gap-2.5 rounded-3xl bg-gray-200 px-2 py-1 text-center text-xs text-black">
            {strain.strainTypes.nodes[0].name}
          </span>

          <Image
            width={200}
            height={200}
            className="mx-auto h-32 w-32"
            src="https://admin.leafwell.com/app/uploads/2022/09/marijuana-bud-general.jpg"
            alt="strain"
          />

          <div className="text-lg font-semibold leading-loose text-neutral-950">
            {strain.title}
          </div>
          <div className="text-sm leading-relaxed text-neutral-950">
            {strain.details.thc.quantityStart}%-{strain.details.thc.quantityEnd}
            % THC and {strain.details.cannabinoids[0].quantityStart}%-
            {strain.details.cannabinoids[0].quantityEnd}% CBD
            {strain.details.thc.quantityStart}%-{strain.details.thc.quantityEnd}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardStrains;
