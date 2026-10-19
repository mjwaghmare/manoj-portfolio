# Manoj Waghmare — Portfolio

Personal portfolio site for Manoj Waghmare, Senior Flutter Developer. Built with Flutter Web, with light and dark themes and responsive layouts for mobile, tablet and desktop.

## Run locally

Requires the Flutter stable SDK (Dart 3.13+).

```sh
flutter pub get
flutter run -d chrome
```

Build for release (output in `build/web/`):

```sh
flutter build web --release
```

Checks:

```sh
flutter analyze
flutter test
```

## Editing content

All copy, links, experience and projects live in [`lib/data/portfolio_data.dart`](lib/data/portfolio_data.dart). Edit that file; the sections read from it.

| What | Where |
| --- | --- |
| Headline, summary, about text, contact links | `PortfolioData.profile` |
| Experience timeline | `PortfolioData.experiences` |
| Project cards (type, tags, image, link) | `PortfolioData.projects` |
| Tech stack tiles | `PortfolioData.techStack` |
| Resume download | replace `web/Manoj_Waghmare_Resume.pdf` |
| Portrait / logo | `assets/images/` (referenced from `profile`) |

Colors, gradients and type live in [`lib/core/theme/`](lib/core/theme/); spacing and breakpoints in [`lib/core/constants/app_constants.dart`](lib/core/constants/app_constants.dart).

## Project structure

```
lib/
  core/        theme (colors, fonts, light/dark), constants, theme persistence
  data/        portfolio content
  models/      content models
  sections/    page sections (hero, about, skills, experience, projects, contact, footer)
  widgets/     shared widgets (header, cards, buttons, links)
  main.dart    app entry; loads the saved theme before the first frame
web/           index.html (SEO metadata), icons, resume PDF
```

## Third-party assets

- Fonts: Plus Jakarta Sans, Bebas Neue, Playfair Display, Caveat — SIL Open Font License 1.1 (licenses in `assets/fonts/`). Fonts are subset to Latin to keep downloads small.
- Brand icons (GitHub, LinkedIn): Font Awesome Free — icons CC BY 4.0, font SIL OFL 1.1.
- Technology logos: [Devicon](https://devicon.dev) — MIT License.
