import React from "react";

const Banner = () => {
  return (
    <section className="mx-auto grid w-full max-w-3xl gap-y-10 px-5 py-10 text-center">
      <h1 className="text-center text-4xl leading-10 text-neutral-950">
        Cannabis Strain Directory
      </h1>

      <article className="text-center text-xs leading-relaxed text-neutral-950">
        <p>
          A marijuana strain is a classification that determines a plant’s
          chemotype (chemical profile), phenotype (physical appearance), and
          potential medical effects. Cannabis strains are sometimes referred to
          as cultivars, chemovars, chemotypes, or varieties. Strains come in
          different flavors, aromas, and levels of potency. From a botanical
          standpoint, marijuana strains are the ancestors of specific cannabis
          plants. The lineage of a marijuana strain lends insight into the
          strain’s unique effects and benefits.
        </p>
      </article>
    </section>
  );
};

export default Banner;
