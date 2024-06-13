import { useSubscription } from "@apollo/client";
import { ON_CREATE_EPISODE_SUBSCRIPTION } from "@graphql/subscriptions";

export default function CheckSubscriptions() {
  const { data, loading, error } = useSubscription(
    ON_CREATE_EPISODE_SUBSCRIPTION,
  );

  console.log("Subscription data:", data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const newEpisode = data?.onCreateEpisode;

  if (!newEpisode) {
    return <p>No new episode data received.</p>;
  }

  return (
    <div>
      <h2>New Episode Created:</h2>
      <p>Title: {newEpisode.title}</p>
      <p>Series: {newEpisode.series}</p>
    </div>
  );
}
