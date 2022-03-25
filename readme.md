# Blog

_Based on [nextjs-notion-starter-kit](https://github.com/transitive-bullshit/nextjs-notion-starter-kit)._

## Development

The workflow for working on this repo is a little strange, since it is based on top of another project. In order to keep linear history (and help prevent really bad merges from upstream), there's a lot of rebasing.

Essentially, rather than git keeping track of historical changes and using it to tell the story of the code, it's more keeping track of a set of ever-changing patches. One of which is large.

* The default branch of the repository (and the one you're looking at) is `blog.sthom.kiwi`.
* The `main` branch tracks the upstream repository, and shouldn't have any of my commits on it, unless it was merged to upstream (including this README). Basically, ignore the `main` branch.
* Most changes get amended into the latest commit in the `blog.sthom.kiwi` branch.
  * Some more isolated features get their own commits, which must be put below the mega commit.
  * These features are usually things I can anticipate getting removed at some point, so dropping the commit when rebasing is much easier than untangling beforehand.
  * Of course, this makes editing those features a bit harder, since you need to check out that point in time, and then rebase the rest on top again.
* This is all arbitrary and causes about as much pain as it solves.
