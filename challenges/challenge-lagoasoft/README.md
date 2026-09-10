# Lagoasoft Challenge

The complete sanitized history is preserved under `original/`. That directory
is historical evidence and must not be modified.

## Consolidated maintained demo

The social channel under `../content-platform/demo/` preserves the original
exercise:

- render five social posts from deterministic local data;
- keep like state independently for each post with React state;
- increment and restore each displayed count when its heart is toggled;
- keep all changes in the current browser session only.

The historical Instagram CDN URLs have expired and some contain invalid
multi-resolution strings. The maintained demo replaces those unavailable
images with local CSS artwork while retaining the original account, captions,
dates, starting counts, feed structure, and interaction.

The former `challenge-lagoasoft` and `social-feed-interactions` routes redirect
to the canonical `content-platform` entry. Status: consolidated and
automatically tested.
