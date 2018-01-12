# gzip-sizes

Wrapper around [`gzip-size`](https://github.com/sindresorhus/gzip-size) that lists the gzipped file size for all files in the current directory (or optional glob):

```bash
# list gzip-size of all files in this directory
$ gzip-sizes

# list gzip-size of all JS files in dist, including subfolders
$ gzip-sizes dist/**/*.js
```
