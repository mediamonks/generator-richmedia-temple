# generator-richmedia-temple documentation

## Contents

[Installation](#installations)

[Creating a new project](#creating-a-new-project)

[Adjusting a banner](#adjusting-a-banner)

[.richmediarc](#richmediarc)
- [Basic .richmediarc concepts](#basic-.richmediarc-concepts)
- [Advanced .richmediarc concepts](#advanced-.richmediarc-concepts)
  
[Google Sheets](#google-sheets)
  
[Running a development server locally](#running-a-development-server-locally)

[Build and upload your preview](#build-and-upload-your-preview)
- [Build](#build)
- [Upload](#upload)
  
[Types of banners](#types-of-banners)

[Package.json](#package.json)

## Installation

Software required

- Terminal i.e Windows Powershell, iTerm (Mac OS) etc

- Code editor, i.e. [VSCode](https://code.visualstudio.com/), [Webstorm](https://www.jetbrains.com/webstorm/) etc

- [NodeJS](https://nodejs.org/en/) V12 or higher

Now, open a terminal and do the following:

**Step 1** install [Yeoman](https://yeoman.io/) globally

$ `npm install -g yo`

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608809628/MM_Temple_Server_docs/Screenshot_yoeman_install.png" />
</div>  

**Step 2** Install Media Monks generator globally

$ `npm install -g generator-richmedia-temple`

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608809983/MM_Temple_Server_docs/Screenshot_install_generator.png" />
</div>   

Verify Yeoman is working globally by running the following command

$ `yo --version`

If it shows you the version number, continue to the next step

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608810170/MM_Temple_Server_docs/Screenshot_yo_--vesion.png" />
</div>  

# Creating a new project

In the terminal, make your way to a new project folder of your choosing, i.e. documents/work/my-banner-project

**Step 3** generate (scaffold) a new banner project. This will generate all the necessary files and folder structure
  you need for the project.

$ `yo richmedia-temple`

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608810960/MM_Temple_Server_docs/Screenshot_install_richmedia_scaffold.png" />
</div>  

If this is the first time you’re running this command, Yeoman will ask you the following:

We're constantly looking for ways to make yo better!

May we anonymously report usage statistics to improve the tool over time?

More info: https://github.com/yeoman/insight & http://yeoman.io

Up to you if you want to send them statistics. Hit either **Y** or **N**.

After you make your selection, the following menu appears

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608811575/MM_Temple_Server_docs/Screenshot_richmedia-welcome.png" />
</div> 

In this menu you can use the arrow keys to navigate the cursor.

**Step 4** We’re just going to create a standard banner in this guide, so in this case, just hit Enter to select
  ‘create a banner’.

Enter the name of the project or just hit enter to use the default, which is the folder name.

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608811916/MM_Temple_Server_docs/Screenshot_banner-name.png" />
</div>

**Step 5** Select the first unit you would like the generator to create. Use the arrow keys to navigate and hit Enter
  when ready.

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608812165/MM_Temple_Server_docs/Screenshot_select-unit-size.png" />
</div> 

Enter the directory where you wish the source files to be placed. Just hit enter to use the default, which is something
like “./src/{size}x{width}”

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608812294/MM_Temple_Server_docs/Screenshot_source-directory.png" />
</div>   

Select the type of banner (refer to [types of banners](#types-of-banners) for more info)

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608812407/MM_Temple_Server_docs/Screenshot_banner-type.png" />
</div>

For the purposes of this guide, select ‘plain’.

The generator will generate the basic template files and install the according node modules as well. This process will
take a minute.

When it’s done, you’ll end up with a directory looking something like this

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608814657/MM_Temple_Server_docs/Screenshot_project-structure.png" />
</div>

/node_modules/ /src

- /**300x250** (assuming you created a 300x250)

    - /**css**/
        - styles.css

    - /**img**/
        - 1x1_blank.png

    - /**script**/
        - Animation.js
        - Banner.js
        - main.js

    - /static/
        - 1x1_blank.png
    -
  .richmediarc ([more info](https://docs.google.com/document/d/18yvVCWTs0-tUXli90fnnok4tv4JzQVo3DLaQRDtSlIY/edit#heading=h.i6sft07plj7m))
    - index.html

.editorconfig

.gitignore

.prettierrc

package.json ([more info](https://docs.google.com/document/d/18yvVCWTs0-tUXli90fnnok4tv4JzQVo3DLaQRDtSlIY/edit#heading=h.uqdkj8lreb37))

package-lock.json

**Step 6** Make sure everything works by running

$ `npm run dev` ([more info](https://docs.google.com/document/d/18yvVCWTs0-tUXli90fnnok4tv4JzQVo3DLaQRDtSlIY/edit#heading=h.pbe720401c8i))

This will start the server. You’ll see something like


<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608814774/MM_Temple_Server_docs/Screenshot_run_dev_server.png" />
</div> 

Press **N**

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608814963/MM_Temple_Server_docs/Screenshot_localhost8000.png" />
</div>

Your primary browser will launch, opening [http://localhost:8000/](http://localhost:8000/)

In your terminal, you’ll be able to see the output of webpack, compiling the source code.

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608815327/MM_Temple_Server_docs/Screenshot_webpack-compiling.png" />
</div>  

In your browser, the preview environment will load along with a preview of the compiled version of the banner you just
created. The banner should display as a simple unit with a red background.

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608815492/MM_Temple_Server_docs/Screenshot_banner-browser.png" />
</div> 

If there are no javascript errors and everything works fine, that’s it!

## Adjusting a banner
Once you have a working banner project you can go ahead and make changes to 
it based on the design. You can learn more about changing banners [here](/adjust-a-banner.md)

## .richmediarc

The .richmediarc file is one of the files that gets generated when you start a new project.

You can find it in the root directory of your creative, i.e. /src/300x250.

> **_Important_** Each creative requires at least one .richmediarc file

In a freshly generated project, the .richmediarc will look something like this

```
{  
  "settings": {  
    "type": "plain",  
    "entry": {  
      "js": "./script/main.js",  
      "html": "./index.html"  
    },  
    "size": {  
      "width": 300,  
      "height": 250  
    }  
  },  
  "content": {  
    "text": "Welcome to this Banner!",  
    "cta": "Click here",  
    "bgcolor": "#FF0000"  
  }  
}
```

As you can see this file contains configuration settings for your creative, as well as key-value pairs which you can use
for content, styling or even functionality.

Size and height should already be set to the correct values based on the selection made during the generator process.

This file is parsed when you run “npm run dev”. Webpack grabs the values from this file and hardcodes them into the
compiled creative which you see in the preview.

It’s possible to make changes to this file while the preview server is running.

> **_Note:_** in older versions of generator-richmedia-temple changes made to  the 
.richmediarc file require stopping and restarting the dev server.

Go ahead and change content.bgcolor to something else and save the file. In the terminal, you’ll see the creative
getting recompiled. Once done, you can refresh the preview page and see the changes you made reflected in the preview
unit.

### Basic .richmediarc concepts

Below are some guides on how you can use these values in your creative.

#### Using .richmediarc values in HTML

In your index.html, you can retrieve .richmediarc values using the data-bind attribute on HTML elements. This is made
possible by the databind class which is imported by ./js/Banner.js.

For example:

In .richmediarc:

```
"content": {
...
  "cta": "Click here!"
}
```  

In index.html:

```html

<body>
  <div class="cta" data-bind="text: cta"></div>
</body>
``` 

and

In .richmediarc:

```
"content": {
  ...
  "bg-img-url": "../shared/images/background_300x250.jpg"
  ...
}
```

> **_Important:_** Paths are *ALWAYS* relative to the .richmediarc file

In index.html:

```html

<body>
  <img class="background-image" data-bind="src: bg-img-url"></div>
</body>
```  

#### Using .richmediarc values in CSS

In CSS, you can retrieve these values as follows:

```css
.someSelector {
  styleRule: var(--{node}-{childNode}-{childNode});
}
```

For example:

In .richmediarc:

```
"content": {
  ...
  "bgcolor": "#FFFFFF"
  ...
}
```

In style.css:

```css
body {
  background-color: var(--content-bgcolor);
}
``` 

and

In .richmediarc:

```
"settings": {
  "size": {
    "width": 300,
    "height": 250
  }
  ...
}
```

In style.css:

```css
.banner {
    width: var(--settings-size-width) px;
    height: var(--settings-size-height) px;
}
```

#### Using .richmediarc values in javascript

The main javascript file (conveniently named ./js/main.js) imports the .richmediarc files as follows:

```js
import config from "richmediaconfig";
```

and passes this object into the Banner constructor

```js
const banner = new Banner(config);
```

Which also passes the config object to the Animation constructor.

From there, you are able to retrieve pretty much every value from the .richmediarc.

Example:

In .richmediarc:

```
"content": {
  ...
  "intro": false
  ...
}
```  

In Animation.js:

```js
export default class Animation {
    constructor(container, config) {
        if (config.content.intro) {
            // play intro
        } else {
            // play main animation
        }
    }
}
```

## Advanced .richmediarc concepts

Below are advanced techniques you can use in the .richmediarc file.

### Inheritance

Sometimes you need to set up multiple .richmediarc files in the same creative. For example, when you’re working on a
multilingual project and you want the English version to say “Click Here”, whereas the French version says ‘Cliquez
Ici’.

In this case, the most elegant solution would be two .richmediarc files. For example:

`.richmediarc.en`

`.richmediarc.fr`

However, there will be a lot of overlap between these two files, if you’re only changing the copy - and not the
background colors, the width height, the entry files, etc.

Our system supports inheritance of values, by providing a ‘parent’ file from which to inherit all the values defined in
that file. The ‘child’ file can then overwrite only the needed values, thereby completely eliminating any overlap
between the parent and child files.

Example

.richmediarc.en (parent file):

```
{
  "settings": {
    "type": "plain",
	"entry": {
	  "js": "./script/main.js",
	  "html": "./index.html"
  },
  "size": {
    "width": 300,
    "height": 250
    }
  },
  "content": {
    "text": "Welcome!",
    "cta": "Click here",
    "bgcolor": "#FF0000",
    "bgimg": "./img/bgimage.jpg"
    }
}
```

.richmediarc.fr (child file):

```
{
  "parent": "./richmediarc.en",
  "content": {
    "text": "Bienvenue!",
    "cta": "Cliquez Ici"
    }
 }
```

As shown in the example above, in the French .richmediarc, we only specify the parent file, and the new values for text
and cta. Everything else is inherited from the parent file.

This method is very useful and scalable, should the need arise to add even more languages or versions.

### Google Sheets

Instead of having separate .richmediarc files for every version/language of your creative, it’s also possible to use
Google Sheets as a data source. When using this method, each row in your sheet (feed) will be seen as a new version.

To make this work, you will need to request a API key. Instructions to do this can be
found [here](https://developers.google.com/sheets/api/guides/authorizing#APIKey):

(this will only take you a couple of minutes).

In the .richmediarc, you can then add contentSource.url and contentSource.apiKey.

Example:

.richmediarc file:

```
{
  "settings": {
	"type": "plain",
	"entry": {
	  "js": "./script/main.js",
	  "html": "./index.html"
	},
	"size": {
	  "width": 300,
	  "height": 250
	},
	"contentSource": {
	  "url":"URL_TO_SPREADSHEET",
	  "apiKey": "API_KEY_PLACEHOLDER"
	}
  },
  "content": {
	"bgimg": "./img/bgimage.jpg",
	"copy": "Welcome",
	"cta": "Click here"
	}
}
```  

#### Google spreadsheet (dynamic feed):

<table style="width:100%">  
	<tr>  
      <th>bgimg</th>  
      <th>copy</th>  
      <th>cta</th>  
	</tr>  
	<tr>  
      <td>./img/bgimage.jpg</td>  
      <td>Welcome</td>  
      <td>Click Here</td>  
	</tr>  
	<tr>  
      <td>./img/bgimage_fr.jpg</td>  
      <td>Bienvenue</td>  
      <td>Cliquez Ici</td>  
	</tr> 
	<tr>  
      <td>./img/bgimage_nl.jpg</td>  
      <td>Welkom</td>  
      <td>Klik Hier</td>  
	</tr>  
</table>

## Running a development server locally

To start the dev server, type the following command in your terminal or console.

$ `npm run dev`

“Dev” is actually a script which is found in package.json, which in turn runs the command rds-dev. After you execute
this script, it will start searching for .richmediarc files in all the directories and subdirectories of your project.
You’ll see something like this:

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608819040/MM_Temple_Server_docs/Screenshot_npm-run-dev.png" />
</div> 

Here, you can select which units you wish to preview. Navigate with arrow keys and select (it’s possible to select
multiple values) with spacebar, then press enter to confirm your selection.

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608819367/MM_Temple_Server_docs/Screenshot_dev-server-open-browser.png" />
</div>

You can select whether or not to open a new browser window.

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608819470/MM_Temple_Server_docs/Screenshot_seperate-json.png" />
</div>

Use this option to save your selection as a separate command. If you select y, you’ll see something like this:

`? please provide a name for your command. You will type something like npm run dev:__NAME__`

No special chars, spaces, dashes just a single word.

You’ll have to give it a unique name, for example “selection”.

Now you will be able to run a dev server with the same selection simply by running

$ `npm run dev:selection`

It will now compile the banners you selected and start a local server on port 8000. You can see the preview
at [http://localhost:8000](http://localhost:8000).

(if port 8000 is busy, it will automatically use the next available port, 8001, 8002, etc)

> **_Note:_** You don’t have to restart the server if you make any changes to 
your banner’s code. It will automatically recompile your units when it detects changes in the source 
code.

## Build and upload your preview

### Build

To build your project, run the build script in your terminal or console.

$ `npm run build`

“build” is actually a script which is found in package.json, which in turn runs the command rds-build. After you execute
this script, it will start searching for .richmediarc files in all the directories and subdirectories of your project.
You’ll see something like this:


<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608825477/MM_Temple_Server_docs/Screenshot_npm-run-build.png" />
</div>  

Here, you can select which units you wish to build. Navigate with arrow keys and select (it’s possible to select
multiple values) with spacebar, then press enter to confirm your selection.

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608825601/MM_Temple_Server_docs/Screenshot_build-1.png" />
</div>

Use this option to save your selection as a separate command. If you select y, you’ll see something like this:

`? please provide a name for your command. You will type something like npm run build:__NAME__`

No special chars, spaces, dashes just a single word.

You’ll have to give it a unique name, for example “selection”.

Now you will be able to run a dev server with the same selection simply by running

$ `npm run build:selection`

It will now compile the banners you selected and then move these files to the ./build directory,

Along with zipped files which you can use for delivering files or uploading to certain previews.

### Upload

Uploading your banners to a preview can be done in a number of ways.

The easiest method is to use our tool called “henk”, which you can start by running the following command:

$ `npm run preview`

If it’s the first time you run this command, you’ll see something like this:

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608999231/MM_Temple_Server_docs/Screenshot_npm-run-preview.png" />
</div>  

Press **Y**. You’ll see the following options

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608999362/MM_Temple_Server_docs/Screenshot_preview-1.png" />
</div> 

Below are guides for uploading to an amazon s3 bucket. FYI MediaMonks Preview and Amazon S3 do practically the same
thing.

MediaMonks Preview

This will upload the entire build folder to a S3 bucket.

When you select this, you’ll have to enter a few things:

`? What directory you want to upload?`

Just enter `./build` here by default.

`? Please fill in the name for the S3 Bucket:`

`? Please fill in the accessKeyId for the S3 Bucket:`

`? Please fill in the secretAccessKey for the S3 Bucket:`

These values you can find in the pinned messages of our **`#wfh-aas-dev`** slack channel.

`? outputDir: (3334d7e2-3d58-4c84-aec7-4b6d4f50c7f0/)`

It will automatically generate a unique hash value as the directory name of the preview. Just press enter or add your
own value and then press enter.

It will then upload the contents of the ./build/ directory and show you a link to the preview, which should look
something like this:

`http://richmedia-previews-s3bucket-khpmpnjb2dya.s3.amazonaws.com/3334d7e2-3d58-4c84-aec7-4b6d4f50c7f0/index.html
`

## Types of banners

### Plain:

Template for standard IAB banners with a regular ‘clickTag’.

### Doubleclick:

Template for banners which are uploaded to Doubleclick Studio.

### Dynamic:

Needs description

### Plain with VueJS

Needs description

## Package.json

Below you will find the contents of the package.json file which gets generated in the root folder when you start a new
project with the generator:

```json
{
  "name": "",
  "version": "1.0.0",
  "description": "",
  "homepage": "",
  "author": "",
  "engines": {
    "npm": ">= 8.0.0"
  },
  "scripts": {
    "dev": "rds-dev",
    "build": "rds-build",
    "preview": "./node_modules/.bin/henk"
  },
  "license": "ISC",
  "dependencies": {
    "@mediamonks/henk": "^1.1.1",
    "@mediamonks/richmedia-temple-server": "^6.0",
    "@mediamonks/temple": "^4.0.0"
  }
}
```

You can run the commands under “scripts” in the following way: npm run dev, npm run build, etc

**"dev"**

Will compile your banners and start a preview server on localhost:8000 by default

[More info: Running a dev server](#running-a-development-server-locally)

**"build"**

Will compile your banners and place them in the /build directory as folders and zip files, ready for delivery.

[More info: Build and upload your preview](#build-and-upload-your-preview)

preview

Will upload your banners to a preview. The first time you run this command, you will have to configure the settings

[More info: Build and upload your preview](#build-and-upload-your-preview)

Under dependencies, you’ll see the 3 default dependencies needed to run dev/build/preview:

- `"@mediamonks/henk": "^1.1.1"`

- `"@mediamonks/richmedia-temple-server": "^6.0"`

- `"@mediamonks/temple": "^4.0.0"`

If these are missing, install them via (for example)

$ `npm install @mediamonks/temple`