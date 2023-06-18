import { boot } from 'quasar/wrappers';
import { createAuth0 } from '@auth0/auth0-vue';

export default boot(({ app }) => {
  app.use(
    createAuth0({
      domain: 'dev-a1fcahydedpqoua2.us.auth0.com',
      clientId: 'tf1eJmIqj5aH8gWrP4quwDmfVfBF0SPj',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  );
});

