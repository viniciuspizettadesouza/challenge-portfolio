import React from "react";
import { BreadcrumbProps } from "../interfaces/props.interface";

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="text-sm font-medium" aria-label="Breadcrumb">
      <ol className="inline-flex list-none p-0">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <li className="flex items-center">
                <span className="mx-2 leading-relaxed text-neutral-950">
                  {">"}
                </span>
              </li>
            )}
            <li className="flex items-center">
              <span
                className={
                  index === items.length - 1
                    ? "leading-relaxed text-neutral-950"
                    : "leading-relaxed text-stone-300"
                }
              >
                {item}
              </span>
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
