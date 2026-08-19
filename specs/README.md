# Working with the Knowledge Bundle

`specs/` is the live OKF v0.2 Knowledge Bundle. Its root `index.md` declares the
format version. Each Issue workflow gets a directory named
`<issue>-<slug>` containing a reserved, frontmatter-free `index.md`, authoritative
`state.json`, and concept documents created only when their stages need them.

Do not copy the isolated demonstration in `examples/sample-feature/` into live
state unchanged. `$sdd-run issue #123` creates source-grounded artifacts, real
timestamps, and IDs correlated to that Issue.

The feature index is for discovery. It does not replace `state.json`. See
[`docs/okf.md`](../docs/okf.md) for metadata, provenance, lifecycle, actor,
cross-link, and verification rules.
