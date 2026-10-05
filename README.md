<p align="center">
  <a href="https://www.gatsbyjs.com/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby Minimal TypeScript Starter
</h1>

## 🚀 Quick start

1.  **Create a Gatsby site.**

    Use the Gatsby CLI to create a new site, specifying the minimal TypeScript starter.

    ```shell
    # create a new Gatsby site using the minimal TypeScript starter
    npm init gatsby -- -ts
    ```

2.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd my-gatsby-site/
    npm run develop
    ```

3.  **Open the code and start customizing!**

    Your site is now running at http://localhost:8000!

    Edit `src/pages/index.tsx` to see your site update in real-time!

4.  **Learn more**

    - [Documentation](https://www.gatsbyjs.com/docs/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Tutorials](https://www.gatsbyjs.com/docs/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Guides](https://www.gatsbyjs.com/docs/how-to/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [API Reference](https://www.gatsbyjs.com/docs/api-reference/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Plugin Library](https://www.gatsbyjs.com/plugins?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Cheat Sheet](https://www.gatsbyjs.com/docs/cheat-sheet/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)

## 🚀 Quick start (Netlify)

Deploy this starter with one click on [Netlify](https://app.netlify.com/signup):

[<img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify" />](https://app.netlify.com/start/deploy?repository=https://github.com/gatsbyjs/gatsby-starter-minimal-ts)

## Episode Generator

Generate the next regular episode markdown file from the newest MP3 in `assets/episodes`:

```shell
npm run generate:episode
```

Preview without writing:

```shell
npm run generate:episode -- --dry-run
```

Optional: pass a custom audio folder path.

```shell
node scripts/generate-episode.js path/to/audio-folder
node scripts/generate-episode.js path/to/audio-folder --dry-run
```

Behavior:

- Picks the latest modified `.mp3` file in the audio folder.
- Finds the highest existing regular episode file in `src/episodes` (`NNN.md`) and creates the next one.
- Reads MP3 duration from macOS `afinfo` output.
- Reads MP3 title from `afinfo` when available, with macOS `mdls` fallback.
- Uses current local date for `date`.
- Prefills `type` as `"full"` and `explicit` as `"false"`.
- Prefills `audioUrl` as `https://storage.googleapis.com/board-game-okay-feed/NNN-board-game-okay.mp3`.

Requirements:

- macOS (script uses `afinfo`).
- MP3 title metadata must be set; otherwise generation fails.
