# Research blog series implementation plan

**Goal:** Publish the four articles approved in conversation on the existing lab website.

**Architecture:** Static article pages share the existing stylesheet and navigation. The existing hash-routed Blog view lists the articles. Each article has its own directory URL, original SVG diagram, metadata, and links to the rest of the series. No new runtime or dependencies.

**Spec:** User-approved four-post outline and October 22 corrections in the authoring conversation. Batched learning is the chosen architecture; independent local learning followed by consolidation is discarded. Report the team-supplied 100% result across 25 games briefly, without fabricated data or an unseen-task claim.

## Tasks

- [x] Draft and editorially review four articles in parallel, approximately 700–1,200 words each.
- [x] Create `blog/{agents-shouldnt-start-over,recursive-language-models,learning-to-learn,learning-across-games}/index.html` with shared navigation, article metadata, and series links.
- [x] Add four figures to `assets/blog/`, link them from the articles, and add article/list styles to `styles.css`.
- [x] Replace the empty Blog view in `index.html` with four linked summaries. Preserve home and team behavior.
- [x] Check local links, HTML structure, figure assets, desktop/mobile layout, navigation, direct URLs, and JavaScript-disabled article access.
Publication procedure: commit only changed website files, publish to the existing GitHub Pages main branch under the user's publication authorization, and verify deployment and live article URLs.

## Review focus

- Direct article links must work independently of the home page's JavaScript router.
- Every image must have descriptive alternative text and remain accessible at narrow widths.
- Article titles, descriptions, and canonical URLs must identify the individual post.
- Existing home, team, and unknown-route behavior must remain intact.
- The prose must distinguish team-reported results, research proposals, and paper findings.

## Validation scope

This static website has no package manifest or npm check/test-policy scripts. Validate actual HTML/assets and browser behavior instead. No experiments are rerun; the supplied 25-game result has no local artifacts available for independent verification.
