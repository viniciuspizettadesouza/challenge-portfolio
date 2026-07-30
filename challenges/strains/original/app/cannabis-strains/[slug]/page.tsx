import CannabisPage from "@/app/components/CannabisPage";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between bg-white	">
        <Header />

        <CannabisPage title={params.slug} />
      </main>
      <Footer />
    </>
  );
}
