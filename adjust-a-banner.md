#  Adjust a Banner step by step

## Contents
[Installation](#installation)
- [Windows users](#/tree/gh-pageswindows-users.md)
- [MacOS users](https://assets-at-scale.gitbook.io/temple-suite/adjust-a-banner-step-by-step#macos-users)

[Installing packages](https://assets-at-scale.gitbook.io/temple-suite/adjust-a-banner-step-by-step#installing-packages)

[Viewing banners](#viewing-banners)
- [Start running the dev environment](#start-running-the-dev-environment)
- [Stop running the dev environment](https://assets-at-scale.gitbook.io/temple-suite/adjust-a-banner-step-by-step#stop-running-the-dev-environment)

[Changing assets](https://assets-at-scale.gitbook.io/temple-suite/adjust-a-banner-step-by-step#changing-assets)
- [Changing copy/images](https://assets-at-scale.gitbook.io/temple-suite/adjust-a-banner-step-by-step#changing-copy-images)
- [Changing styles](https://assets-at-scale.gitbook.io/temple-suite/adjust-a-banner-step-by-step#changing-styles)
- [Changing javascript (code)](https://assets-at-scale.gitbook.io/temple-suite/adjust-a-banner-step-by-step#changing-javascript-code)

[Build the banners](https://assets-at-scale.gitbook.io/temple-suite/adjust-a-banner-step-by-step#build-the-banners)

[Creating a new size](https://assets-at-scale.gitbook.io/temple-suite/adjust-a-banner-step-by-step#creating-a-new-size)
- [Changing the width and height](https://assets-at-scale.gitbook.io/temple-suite/adjust-a-banner-step-by-step#changing-the-width-and-height)
- [Creating a new build](https://assets-at-scale.gitbook.io/temple-suite/adjust-a-banner-step-by-step#creating-a-new-build)

When you get source files from an existing project and you want to make changes to it. But you never worked with the framework.

If you just want to get started and didn't recieve any delivered files [here](https://github.com/mediamonks/generator-richmedia-temple/blob/gh-pages/assets/example_banner.zip) are some example files to start with:


## [Installation](#installation)

### [Windows users](#windows-users)

If you are running Windows as your operating system please go to the [Windows page](/windows-users)

### [MacOS users](#macos-users)

If you are running MacOS as your operating system please go to the [MacOS page](/macos-users)

## [Installing packages](#installing-packages)

First we need to install the packages that are needed to display/change and build the files. When you do this, the Command Line Tool will display what will be installed. Make sure you are inside of your project directory. e.g `user/your_project_diretory/example_banner`

In your Command Line tool, having the path set to the unzipped folder type:

$ `npm install`

<div style="display: flex; justify-content: center">  
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1609159136/MM_Temple_Server_docs/adjust-banners/npm-install.jpg" />  
</div>

And press `Enter`

> **_NOTE:_** The installation can take a while and you might see some warnings e.g "Found 9 vulnerabilites" etc but that is something to not be worried about.**

<div style="display: flex; justify-content: center">  
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1609159462/MM_Temple_Server_docs/adjust-banners/npm-install-warnings.png" />  
</div>

<br>

<div style="display: flex; justify-content: center">  
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1609159568/MM_Temple_Server_docs/adjust-banners/npm-install-sucessful.jpg" />  
</div>

After installation your Command Line tool will look something like this. Besides this you can see that there has added a `node_modules` folder inside the unzipped folder.

<div style="display: flex; justify-content: center">  
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1609159682/MM_Temple_Server_docs/adjust-banners/node_modules.jpg" />  
</div>

## Viewing banners

### Start running the dev environment
<div style="display: flex; justify-content: center; width: 300px;">  
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1609160423/MM_Temple_Server_docs/adjust-banners/example_project.jpg" />  
</div>

*Start your Command Line Tool from the project folder*

> **_NOTE:_** To keep in mind. Each time you want to view your banners or make amends to them. **In order to run the commands via the command line tool. You need to be in your project directory where the banners are**. For example `"C:\Users\User_name\Desktop\example_banner"`. This is the only way the framework can run the banners. You can't run the framework on a specific file or folder inside the project folder.

Open your Powershell from the unzipped folder again if you closed your Command line tool.

