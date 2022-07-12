# Project tree workflow

### How to use
**Example Workflow**
| key      | description                       | default value         |
|----------|-----------------------------------|-----------------------|
| title    | text to be replaced.              | ### Project Structure
```.
├── LICENSE
├── README.md
├── action.yml
├── dist
│   └── project
│       └── index.js
├── jest-config.js
├── package-lock.json
├── package.json
├── src
│   └── main.ts
└── tsconfig.json

3 directories, 9 files
``` |
| path     | file to be replaced text.         | README.md             |
| message  | commit message when text updated. | update: project tree  |
| email    | to be committed user email.       | none                  |
| username | to be committed user name.        | none                  |

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
```

### Project Structure
```.
├── LICENSE
├── README.md
├── action.yml
├── dist
│   └── project
│       └── index.js
├── jest-config.js
├── package-lock.json
├── package.json
├── src
│   └── main.ts
└── tsconfig.json

3 directories, 9 files
```
