# Project tree workflow
## Introduction
Project tree workflow is automatically changes the project directory structure in your README.md or any text file.

## How to use
### Options
| Key             | Description                                 | Default value              |
|-----------------|---------------------------------------------|----------------------------|
| title           | text to be replaced.                        | Project Structure          |
| path            | file to be replaced text.                   | README.md                  |
| message         | commit message when text updated.           | update: project tree       |
| email           | to be committed user email.                 | none                       |
| username        | to be committed user name.                  | none                       |
| token           | repository token or user token.             | none                       |
| branches        | created branch's name for update.           |                            |
| target-branches | pr to target branches.                      | main                       |
| pr              | create pull request when branch is updated. |                            |
| pr-title        | pull request title                          | update: project structure. |


### Example Workflow
```yml
name: Update to README

on:
  push:
    branches: [ "main" ]

jobs:
  change-readme:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Insert project tree
        uses: smoothbear/project-tree-action@main
        with:
          email: to be committed email
          username: to be committed username
          token: ${{ secrets.GITHUB_TOKEN }}
```

### Project Structure
```.
├── LICENSE
├── README.md
├── action.yml
├── dist
│   └── project
│       └── index.js
├── jest-config.js
├── package-lock.json
├── package.json
├── src
│   └── main.ts
└── tsconfig.json

3 directories, 9 files
```