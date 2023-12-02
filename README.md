# asdougl / tools

This is not an npm package, you are expected to copy and paste the code from the `index` into your own codebase and then modify it to your own needs. Each `notes.md` file will explain the dependencies needed to run the code, and alternatives that could work. It will also include suggested depenencies, which will likely be used inside the `demo`.

These components have worked for me in my own projects but your mileage may vary. Use at your own risk but if you find bugs and fix them please contribute.

## Attribution

I don't expect any attribution for the code here, it's free to use anywhere (just not for evil things). I highly suggest you link to this repo simply to know where your source code came from, and I'd appreciate a shoutout if you're so inclined.

## Contribution

If you want to modify or add a tool please make sure you respect the file structure. And please add your new tool to the App.tsx, this should showcase all the tools neatly so you can find cool stuff easily.

```
├── src
│   ├── category
│   │   ├── [tool name]
│   │   │   ├── index.{ts,tsx}
│   │   │   ├── demo.{ts,tsx}
│   │   │   ├── notes.md
│   │   │   ├── changelog.md
│   │   │   ├── [tool name].test.{ts,tsx}
```

### index

contains the code for the tool itself

### demo

contains a demonstration usage of the tool, potentially importing extra packages to do so.

### notes

contains usage notes for the tool, including any important notes on what sections do, any package depenencies and also optional depenency suggestions.

### Changelog

A log of all changes made to the tools to that users can check if their issue has been fixed and update if they wish to.

### test

Contains a vitest automated test, please make these thorough, they should exist solely to help build confidence that users grabbing the tool know they're grabbing well tested code. Users are also welcome to grab the automated tests for their own repos.

## Depenencies

Dependencies should be limited to well known and highly downloaded packages.

### Ok Packages

These are packages I think are acceptable to include, they are either standard or have an API that can easily be swapped out for an alternative.

- date-fns
- lodash (use per-method imports!)
- clsx
- tailwind-merge

### Banned Packages

These are either banned for having a bad DX/API or they already have an approved counterpart, e.g. I like dayjs but we use date-fns here because it's easy to swap out for dayjs.

- classNames (see: clsx)
- dayjs (see: date-fns)
- moment (see: deprecated also date-fns)
- luxon (see: date-fns)

## Q&A

**Q:** Will this be published as an npm package?

**A:** No. Never. Copy the code using <kbd>CTRL</kbd>/<kbd>CMD</kbd>+<kbd>C</kbd> and put it in your codebase with <kbd>CTRL</kbd>/<kbd>CMD</kbd>+<kbd>V</kbd>

**Q:** Why won't you make this an npm package?

**A:** Because then you and I have to maintain dependencies, or you just copy the code and you're off to the races, no dependency resolution needed.
