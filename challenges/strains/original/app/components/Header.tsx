import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="mx-auto w-full gap-y-10 bg-white px-5">
      <section className="grid-cols-header-collapsed col-start-1 col-end-5 mx-auto grid w-full grid-flow-col items-center justify-between gap-x-6 gap-y-6 px-5 py-6">
        <Link className="inline-grid" href="/" title="Leafwell">
          <Image
            width="40"
            height="34"
            className="col-start-1 row-start-1 h-auto max-w-full md:hidden"
            src="/icon.svg"
            alt=""
          />
          <Image
            width="128"
            height="18"
            className="col-start-1 row-start-1 hidden h-auto max-w-full md:inline-grid"
            src="/icon-mobile.svg"
            alt=""
          />
        </Link>
        <nav className="mx-auto">
          <ul className="grid grid-flow-col items-center gap-4">
            <li>
              <Link href="/blog/" className="text-3.5 text-neutral-950">
                Medical cannabis
              </Link>
            </li>
            <li>
              <Link href="/research/" className="text-3.5 text-neutral-950">
                Learn with Leafwell
              </Link>
            </li>
            <li>
              <Link
                href="/partner-with-leafwell/"
                className="text-3.5 text-neutral-950"
              >
                Become a Partner
              </Link>
            </li>
          </ul>
        </nav>
        <button
          className="font-heading hover:border-green hover:bg-green p-reset inline-grid h-10 w-10 cursor-pointer select-none grid-flow-col items-center justify-center gap-x-2 justify-self-end rounded-full border border-white bg-white px-3 py-3 text-center text-sm leading-none outline-none transition-colors hover:text-black focus:outline-none"
          aria-label="Toggle Search"
        >
          <Image
            src="https://leafwell.com/search.svg"
            className="m-auto w-4"
            alt="Toggle Search"
            width="19"
            height="19"
          />
        </button>
        <Link
          className="underline-offset-small font-heading group relative inline-grid cursor-pointer grid-flow-col items-center justify-start gap-x-2 justify-self-center text-sm no-underline outline-none transition-all duration-200 hover:underline focus:outline-none"
          target="_blank"
          rel="noopener"
          href="https://medicalcard.io/patients/login"
        >
          Sign in
          <Image
            width="15"
            height="12"
            src="/arrow.svg"
            alt=""
            className="duration-500"
          />
        </Link>
        <Link
          className="cursor-pointer items-start justify-center gap-2.5 rounded-md bg-gradient-to-bl from-emerald-400 via-emerald-400 to-violet-300 px-6 py-3.5 hover:from-green-400 hover:to-green-400"
          href="/medical-card/"
        >
          <span className="text-3.5 text-center text-neutral-950">
            Get your card
          </span>
        </Link>
      </section>
    </header>
  );
};

export default Header;
