import React from "react";
import Image from "next/image";
import Breadcrumb from "./Breadcrumb";
import { CannabisPageProps } from "../interfaces/props.interface";

const CannabisPage: React.FC<CannabisPageProps> = ({ title }) => {
  const breadcrumbItems = ["Strain directory", "Cannabis Strains"];
  const aromas = ["Fruity", "Kush", "Orange", "Pugent", "Sweet"];
  const flavors = ["Fruity", "Citrus", "Lemon"];

  return (
    <div className="mx-auto grid w-full max-w-screen-2xl gap-y-10 px-5">
      <Breadcrumb items={breadcrumbItems} />

      <section className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <Image
            src="https://admin.leafwell.com/app/uploads/2023/01/marijuana-bud-general-2.jpeg"
            alt="image"
            width={278}
            height={278}
          />
        </div>
        <div className="col-span-2">
          <div className="col-span-2">
            <div className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-zinc-100 px-2.5 py-1">
              <div className="text-2.5 text-center font-normal leading-3 text-neutral-950">
                Hybrid
              </div>
            </div>
            <h1 className="font-heading font-sans text-3xl leading-tight sm:text-5xl ">
              {title}
            </h1>
            <article className="gap-10 font-sans text-current lg:columns-2">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                facilisis nibh non feugiat luctus. Morbi commodo porttitor nisl
                in viverra. Vivamus at tincidunt orci. Nulla non placerat massa.
                Aenean feugiat bibendum justo quis interdum.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                facilisis nibh non feugiat luctus. Morbi commodo porttitor nisl
                in viverra. Vivamus at tincidunt orci. Nulla non placerat massa.
                Aenean feugiat bibendum justo quis interdum.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                facilisis nibh non feugiat luctus. Morbi commodo porttitor nisl
                in viverra. Vivamus at tincidunt orci. Nulla non placerat massa.
                Aenean feugiat bibendum justo quis interdum.
              </p>
            </article>
          </div>
        </div>
      </section>

      <h2>Cannabinoids</h2>
      <section className="grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-violet-50">
          <p>Tetrahydrocannabinol</p>
          <p>THC</p>
          <p>18% - 25%</p>
          <p>Sometimes measuring higher</p>
        </div>
        <div className="rounded-lg bg-violet-50">
          <p>Cannabigerol</p>
          <p>CBG</p>
          <p>1%</p>
          <p>Approximately</p>
        </div>
        <div>
          <p>Strain type</p>
          <Image
            src="https://leafwell.com/chart.svg"
            alt="Image"
            width={47}
            height={47}
          />

          <div className="relative h-[72px] w-[343px]">
            <div className="absolute left-0 top-[45px] w-[227px] text-xs font-normal leading-relaxed text-neutral-950">
              Indica
            </div>
            <div className="absolute left-0 top-0 text-3xl font-normal leading-10 text-neutral-950">
              20.0%
            </div>
            <div className="absolute left-0 top-[46px] h-[0px] w-[343px] border border-zinc-100"></div>
            <div className="absolute left-0 top-[46px] h-[0px] w-10 border border-violet-300"></div>
          </div>

          <div className="relative h-[72px] w-[343px]">
            <div className="absolute left-0 top-[45px] w-[227px] text-xs font-normal leading-relaxed text-neutral-950">
              Sativa
            </div>
            <div className="absolute left-0 top-0 text-3xl font-normal leading-10 text-neutral-950">
              80.0%
            </div>
            <div className="absolute left-0 top-[46px] h-[0px] w-[343px] border border-zinc-100"></div>
            <div className="absolute left-0 top-[46px] h-[0px] w-[275px] border border-emerald-400"></div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <p>Aromas</p>
          {aromas.map((text, index) => (
            <React.Fragment key={index}>
              <span className="text-5xl leading-10 text-neutral-950">
                {text}
              </span>
              {index !== aromas.length - 1 && (
                <span className="text-5xl leading-10 text-zinc-400">/</span>
              )}
            </React.Fragment>
          ))}

          <div className="">
            <p>Flavours</p>
            <ul className="flex flex-wrap">
              {flavors.map((text, index) => (
                <React.Fragment key={index}>
                  <li className="font-heading my-reset prose font-sans text-3xl leading-tight sm:text-4xl">
                    {text}
                  </li>
                  {index !== flavors.length - 1 && (
                    <li
                      className="font-heading my-reset prose px-2 font-sans text-3xl leading-tight text-gray-400 sm:text-4xl"
                      aria-hidden="true"
                    >
                      /
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-span-2">
          <div className="text-lg font-normal leading-loose text-zinc-600">
            Acapulco Gold is highly sought after for good reason. Users
            experience one of the purest sativa highs known to cannabis. The
            high experienced is both motivating and energizing. The powerful
            cerebral high makes many feel euphoric and clear-headed. This makes
            Acapulco Gold a popular morning or daytime option. The high lasts
            around two hours or more for people with lower tolerance levels.
          </div>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <p>Aromas</p>
          <div className="inline-flex h-[120px] w-[276px] items-start justify-start rounded-lg border border border border border-zinc-100 p-[1px]">
            <div className="flex shrink grow basis-0 items-start justify-start self-stretch rounded-lg">
              <div className="flex w-2.5 items-start justify-start gap-2.5 self-stretch">
                <div className="w-2.5 self-stretch bg-orange-600" />
              </div>
              <div className="flex shrink grow basis-0 items-end justify-start gap-[25px] self-stretch rounded-lg px-[15px] py-2.5">
                <div className="text-lg font-normal leading-loose text-neutral-950">
                  Beta-Caryophyllene
                </div>
              </div>
            </div>
          </div>

          <div className="inline-flex h-[120px] w-[276px] items-start justify-start rounded-lg border border border border border-zinc-100 p-[1px]">
            <div className="flex shrink grow basis-0 items-start justify-start self-stretch rounded-lg">
              <div className="flex w-2.5 items-start justify-start gap-2.5 self-stretch">
                <div className="w-2.5 self-stretch bg-stone-500" />
              </div>
              <div className="flex shrink grow basis-0 items-end justify-start gap-[25px] self-stretch rounded-lg px-[15px] py-2.5">
                <div className="text-lg font-normal leading-loose text-neutral-950">
                  Camphene
                </div>
              </div>
            </div>
          </div>

          <div className="inline-flex h-[120px] w-[276px] items-start justify-start rounded-lg border border border border border-zinc-100 p-[1px]">
            <div className="flex shrink grow basis-0 items-start justify-start self-stretch rounded-lg">
              <div className="flex w-2.5 items-start justify-start gap-2.5 self-stretch">
                <div className="w-2.5 self-stretch bg-emerald-400" />
              </div>
              <div className="flex shrink grow basis-0 items-end justify-start gap-[25px] self-stretch rounded-lg px-[15px] py-2.5">
                <div className="text-lg font-normal leading-loose text-neutral-950">
                  Humulene
                </div>
              </div>
            </div>
          </div>

          <div className="inline-flex h-[120px] w-[276px] items-start justify-start rounded-lg border border border border border-zinc-100 p-[1px]">
            <div className="flex shrink grow basis-0 items-start justify-start self-stretch rounded-lg">
              <div className="flex w-2.5 items-start justify-start gap-2.5 self-stretch">
                <div className="w-2.5 self-stretch bg-green-500" />
              </div>
              <div className="flex shrink grow basis-0 items-end justify-start gap-[25px] self-stretch rounded-lg px-[15px] py-2.5">
                <div className="text-lg font-normal leading-loose text-neutral-950">
                  Pinene
                </div>
              </div>
            </div>
          </div>

          <div className="inline-flex h-[118px] w-[274px] items-start justify-start rounded-lg">
            <div className="flex w-2.5 items-start justify-start gap-2.5 self-stretch">
              <div className="w-2.5 self-stretch bg-amber-500" />
            </div>
            <div className="flex shrink grow basis-0 items-end justify-start gap-[25px] self-stretch rounded-lg px-[15px] py-2.5">
              <div className="text-lg font-normal leading-loose text-neutral-950">
                Valencene
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <p>Flavonoids</p>

        <div className="w-[1313px]">
          <span className="text-5xl font-normal leading-10 text-neutral-950">
            Flavonoids are rarely tested for in cannabis at the moment.
            Flavonoids in Strawberry Cough could include anthocyanins,
          </span>
          <span className="text-5xl font-normal leading-10 text-neutral-950 underline">
            quercetin
          </span>
          <span className="text-5xl font-normal leading-10 text-neutral-950"></span>
          <span className="text-5xl font-normal leading-10 text-neutral-950 underline">
            catechin
          </span>
          <span className="text-5xl font-normal leading-10 text-neutral-950">
            and
          </span>
          <span className="text-5xl font-normal leading-10 text-neutral-950 underline">
            kaempferol
          </span>
          <span className="text-5xl font-normal leading-10 text-neutral-950">
            a longside
          </span>
          <span className="text-5xl font-normal leading-10 text-neutral-950 underline">
            Cannflavin A and Cannflavin B
          </span>
          <span className="text-5xl font-normal leading-10 text-neutral-950">
            .<br />
          </span>
        </div>
      </section>
    </div>
  );
};

export default CannabisPage;
