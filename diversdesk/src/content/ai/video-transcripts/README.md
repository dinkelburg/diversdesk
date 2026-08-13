# Private Video Transcripts

This directory is excluded from Starlight content and is never emitted as a public route, added to navigation, or shown as an AI source.

Create one Markdown file per video using the metadata below. Keep `index: false` until the transcript has been reviewed. Once enabled, every timestamp heading should use `## MM:SS` so the assistant can direct a user to the relevant moment while citing the matching public video page.

```md
---
title: Public video title
videoSlug: video-training/public-video-slug
index: false
---

## 00:00

Reviewed transcript text.
```