import { useSubscription } from "@apollo/client";
import {
  ON_CREATE_EPISODE_SUBSCRIPTION,
  ON_DELETE_EPISODE_SUBSCRIPTION,
  ON_UPDATE_EPISODE_SUBSCRIPTION,
} from "@graphql/subscriptions";

export default function CheckSubscriptions() {
  const {
    data: createData,
    loading: createLoading,
    error: createError,
  } = useSubscription(ON_CREATE_EPISODE_SUBSCRIPTION);

  const {
    data: deleteData,
    loading: deleteLoading,
    error: deleteError,
  } = useSubscription(ON_DELETE_EPISODE_SUBSCRIPTION);

  const {
    data: updateData,
    loading: updateLoading,
    error: updateError,
  } = useSubscription(ON_UPDATE_EPISODE_SUBSCRIPTION);

  console.log("Create Data:", createData);
  console.log("Delete Data:", deleteData);
  console.log("Update Data:", updateData);

  if (createLoading || deleteLoading || updateLoading) {
    return <p>Loading...</p>;
  }

  if (createError || deleteError || updateError) {
    return (
      <div>
        <p>Error:</p>
        <p>{createError && createError.message}</p>
        <p>{deleteError && deleteError.message}</p>
        <p>{updateError && updateError.message}</p>
      </div>
    );
  }

  const newEpisode = createData?.onCreateEpisode;
  const deletedEpisodeId = deleteData?.onDeleteEpisode;
  const updatedEpisode = updateData?.onUpdateEpisode;

  if (!newEpisode && !deletedEpisodeId && !updatedEpisode) {
    return <p>No new episode data received.</p>;
  }

  return (
    <div>
      {newEpisode && (
        <div>
          <h2>New Episode Created:</h2>
          <p>Title: {newEpisode.title}</p>
          <p>Series: {newEpisode.series}</p>
        </div>
      )}
      {deletedEpisodeId && (
        <div>
          <h2>Episode Deleted:</h2>
          <p>Episode ID: {deletedEpisodeId}</p>
        </div>
      )}
      {updatedEpisode && (
        <div>
          <h2>Episode Updated:</h2>
          <p>Title: {updatedEpisode.title}</p>
          <p>Series: {updatedEpisode.series}</p>
        </div>
      )}
    </div>
  );
}
