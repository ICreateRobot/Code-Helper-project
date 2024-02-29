# Helpers-for-API
For this project, you should know the following development techniques:
```sh
vue
```
```sh
nodejs
```
```sh
electron
```

## Interface description

### Software title bar

![image-20240229133501113](C:\Users\HASEE\AppData\Roaming\Typora\typora-user-images\image-20240229133501113.png)

### Software menu bar

![image-20240229134122613](C:\Users\HASEE\AppData\Roaming\Typora\typora-user-images\image-20240229134122613.png)

### Software agent

![image-20240229134556571](C:\Users\HASEE\AppData\Roaming\Typora\typora-user-images\image-20240229134556571.png)



## Use the steps Description：

### 一、Basic Usage

1、In the main window of the software, click the category name you want to view on the left, such as sensor, and the corresponding module is displayed on the right;

2、Click the corresponding module on the right, and expand the corresponding code and comment of the module below;

3、When the copy function is enabled in the software, drag the corresponding code to the third-party software (when the cursor moves with the mouse in the third-party software) and release the mouse, the code can be copied to the third-party editor.

### 二、Software operation

#### 1、Import configuration file

Click the "Import" button in the menu bar to open the "Import window", in the import window there are two options: "Import", "replace"

##### a. Import 

When you select Import, open the Select Local File dialog box, select the corresponding *.xml file, and click OK to import the corresponding data to the software.

==Annotation1：The imported file must be in xml format；==

==Annotation2：The software can import 5 files (including self-contained files (mode), which can be replaced)；==

==Annotation3：Name of the imported file. The default value is the software mode name.==

##### b. Replace

When selecting the Replace option, select the Replaced mode first and repeat the preceding steps.

==Annotation1：This operation deletes the replaced mode. Exercise caution when performing this operation.==

#### 2、Switching mode

Click the "Mode" button in the menu bar to open the "Switch mode window", select the mode to switch in the window, and click OK.

#### 3、Setting 

Click the "Setting" button in the menu bar to open the "Setting window", in which there are four modules: "Language", "style", "Version update" and "About Us".

##### a. Language

You can set two display languages: Chinese and English.

==Annotation 1: Only the title bar and menu bar are switched, and the imported content is not affected.==

##### b. Style

Set the page style, also known as the page theme, currently supports three style changes.

##### c. Version updating

The current version of the software is displayed here, as well as a button to check for updates (automatically detected when the software is started, if it is not the latest pop-up prompt, otherwise there is no information).

##### d. About Us

Displays the software name and provides "Learn More" and "Download template" buttons.

Learn More: Open your browser and go to the more information page.

Download Template: Download the imported information template to a local PC.

==Annotation 1 : After opening the downloaded template, open the table Macro feature to view the usage help.==

#### 4、Conceal functional

a. Quickly click the logo icon, when the software flashes, you can switch whether the code can be copied.

b. Click on the left and right sides of the page to modify the display ratio of categories and modules.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run electron:serve
```

### Compile and Minify for Production

```sh
npm run electron:build
```

