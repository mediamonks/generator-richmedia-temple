First lets get started with something simple.

## Initial Setup

So for this you need [yeoman](https://yeoman.io/). [yeoman](https://yeoman.io/) is web scaffolding tool for modern webtools. Please go to there website if you want to know more.
Lets install yeoman globaly so its available in your terminal / command prompt as "yo"

`npm install -G yo`

_yeoman has been installed globally_

Now lets install the richmedia generator globally so yeoman can use this generator to start scaffolding you richmedia unit, used for scaffolding all your initial projects.

`npm install -G generator-richmedia-temple`

_richmedia-temple generator for yemoan has been installed globally_

## Lets get started

Its advisable when creating a new richmedia unit to first scaffold the initial project. This will save you a lot of time and effort.

Lets run the richmedia-temple generator.

`yo richmedia-temple`

_Your now running the richmedia-temple generator. generator-richmedia-temple._

And follow the instructions, like you see below. You can use the arrow keys and enter key on your keyboard to make choices.

```bash
Welcome to Richmedia Temple Generator v1.4.1
-
Create, change and start developing your richmedia units

? What do you want to do? (Use arrow keys)
❯ create a banner 
  edit a banner
```

```bash
I'm seeing you did not setup your project yet
? Your project name (yo-test)
```

```bash
Creating banner
? Please fill in size of banner (300x250) 
```

```bash
? Where do you want to put it? (./src/300x250/) 
```

```bash
? Type of banner is this (Use arrow keys)
  doubleclick 
  netflix 
❯ plain
```

## Building and Running.

You now should see a few files in the directory that you executed the generator on.

| Filename                     | Description                                                                                                                                                |
|------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| .editorconfig                | configuration file for you editor. So everyone atleasts uses the same basic settings.                                                                      |
| .gitignore                   | configuration file used by git so it knows which files to ignore.                                                                                          |
| .prettierrc                  | A configuration file for prettier printer                                                                                                                  |
| package.json                 | A configuration file for NPM / YARN, one of the most important files in your project.                                                                      |
| node_modules                 | all the packages / libraries your project uses.                                                                                                            |
| src/300x250/.richmediarc     | The configuration file for the richmedia-temple-server, This file is used so that the richmedia-temple-server knows what directories are richmedia units.  |
| src/300x250/script/main.js   | Javascript File this is referenced by the .richmediarc file.                                                                                               |
| src/300x250/script/Banner.js | The banner javascript code.                                                                                                                                |
| src/300x250/index.html       | Main html file, this file is referenced by the .richmediarc file.                                                                                          |

To start developing you need to run a server a webpack server. Setting up a webpack server is a bit of a hassle thats why the generator and the richmedia-temple-server do this for you in conjuction with the .richmediarc file.

You should now go to the documentation of the [@mediamonks/richmedia-temple-server](https://mediamonks.github.io/richmedia-temple-server/) https://mediamonks.github.io/richmedia-temple-server/