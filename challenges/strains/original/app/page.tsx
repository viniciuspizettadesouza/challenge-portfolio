import Banner from "./components/Banner";
import FilterStrains from "./components/FilterStrains";
import Header from "./components/Header";
import ListStrains from "./components/ListStrains";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between bg-white	">
        <Header />

        <Banner />

        <FilterStrains />

        <ListStrains />
      </main>
      <Footer />
    </>
  );
}
