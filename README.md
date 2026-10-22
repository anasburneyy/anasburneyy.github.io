# Burney Games

The website for The Burney Squad and The Burney Family, at https://anasburneyy.github.io/.

- `/squad/` The Burney Squad
- `/family/` The Burney Family
- `/download/` the newest Android apps (BurneySquad.apk, BurneyFamily.apk) and `version.json`, which the apps read
  to offer an update

This repository only holds the built website. The apps are built from the private `burney-workspace` repository
(`huddle/`, `npm run build:site`). Each update replaces this repository's history with a single fresh commit, so the
APKs never pile up here.
