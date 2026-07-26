import CreateEpisodeForm from "@components/CreateEpisodeForm";
import Header from "@components/Header";

export default function CreateEpisode() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto mt-16 flex-grow">
        <article className="p-4">
          <CreateEpisodeForm />
        </article>
      </main>
    </div>
  );
}
