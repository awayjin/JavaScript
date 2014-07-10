[jQuery](http://jquery.com/) - New Wave JavaScript
==================================================

//贡献引导
Contribution Guides
--------------------------------------

//在开源软件发展的精神下,jQuery总是鼓励社区贡献代码. 帮你在开始跳到写代码之前，请务必阅读这些重要的指导方针
In the spirit of open source software development, jQuery always encourages community code contribution. To help you get started and before you jump into writing code, be sure to read these important contribution guidelines thoroughly:


1. [Getting Involved](http://contribute.jquery.org/) //参与
2. [Core Style Guide](http://contribute.jquery.org/style-guide/js/) //核心的风格指南
3. [Writing Code for jQuery Foundation Projects](http://contribute.jquery.org/code/) //为jQuery编写基础代码


//用jQuery的环境
Environments in which to use jQuery
--------------------------------------

//浏览器支持http://jquery.com/browser-support/ 不同的两个版本1.x-master和2.x-master分支， 2.x不支持老浏览器ie6-8.
//在node里用jQuery, 浏览器扩展,非浏览器环境里，仅支持2.x版本, 1.x不支持这些环境
- [Browser support](http://jquery.com/browser-support/) differs between the master (2.x) branch and the 1.x-master branch. Specifically, 2.x does not support legacy browsers such as IE6-8. The jQuery team continues to provide support for legacy browsers on the 1.x-master branch. Use the latest 1.x release if support for those browsers is required. See [browser support](http://jquery.com/browser-support/) for more info.
- To use jQuery in Node, browser extensions, and other non-browser environments, use only **2.x** releases. 1.x does not support these environments.



 //你需要建立自己的jQuery
What you need to build your own jQuery
--------------------------------------

//为了建立jQuery,你需要最新的Node.js和git 1.7以后的版本
In order to build jQuery, you need to have Node.js/npm latest and git 1.7 or later.
//早期版本也许能工作，但不能测试
(Earlier versions might work OK, but are not tested.)

For Windows you have to download and install [git](http://git-scm.com/downloads) and [Node.js](http://nodejs.org/download/).
//Windows下载git 和 Node.js

Mac OS users should install [Homebrew](http://mxcl.github.com/homebrew/). Once Homebrew is installed, run `brew install git` to install git,
and `brew install node` to install Node.js.
//Mac OS 下载git 和 Node.js

Linux/BSD users should use their appropriate package managers to install git and Node.js, or build from source
if you swing that way. Easy-peasy.
//Linux/BSD 下载git 和 Node.js


How to build your own jQuery //怎样建立自己的jQuery?
----------------------------

//复制一份主要的jQuery运行git仓库(repo)：
Clone a copy of the main jQuery git repo by running:

```bash
git clone git://github.com/jquery/jquery.git
```
//进入jquery目录，运行建立脚本：
Enter the jquery directory and run the build script:
```bash
cd jquery && npm run build
```
//jQuery构建的版本将在`dist/`子目录下, 里面有压缩的复制版和相关地图文件
The built version of jQuery will be put in the `dist/` subdirectory, along with the minified copy and associated map file.

//如果你想创建定制版 或者 帮助jQuery发展, 最好安装【grunt命令行界面】(https://github.com/gruntjs/grunt-cli)作为全局包
If you want create custom build or help with jQuery development, it would be better to install [grunt command line interface](https://github.com/gruntjs/grunt-cli) as a global package:

```
npm install -g grunt-cli
```
//确定你grunt安装是否正确
Make sure you have `grunt` installed by testing:
```

//grunt -v 要加npm,如:npm grunt
grunt -v
```

//在jquery目录下, 现在可以运行 grunt命令  ,你可以建立jQuery完整版，就好像 npm run build
Now by running `grunt` command, in the jquery directory, you could build full version of jQuery, just like with `npm run build` command:
```
grunt
```

//jQuery Core有许多别的可获得的任务
There are many other tasks available for jQuery Core:
```
grunt -help
```

### Modules


 //指定的创建可以排除jQuery子项功能
Special builds can be created that exclude subsets of jQuery functionality.
// 当创建者确认jQuery部分是不用的   允许创建较小的定制版
This allows for smaller custom builds when the builder is certain that those parts of jQuery are not being used.
//例如, 一个app仅仅用到 $.ajax()的JSONP,不需要计算元素的偏移位置 可以排除 偏移和AJAX/XHR模块
For example, an app that only used JSONP for `$.ajax()` and did not need to calculate offsets or positions of elements could exclude the offset and ajax/xhr modules.

//任何模块都可以排除，除了core和selector模块.排除了一个模块, 传递给相对路径src的文件夹(无.js扩展)
Any module may be excluded except for `core`, and `selector`. To exclude a module, pass its path relative to the `src` folder (without the `.js` extension).

//一些示例模块可以被排除的是:
Some example modules that can be excluded are:

// ajax: 所有AJAX功能 $.ajax()`, `$.get()`, `$.post()`, `$.ajaxSetup()`, `.load()`,传输, 和ajax简易事件 如ajaxStart()
- **ajax**: All AJAX functionality: `$.ajax()`, `$.get()`, `$.post()`, `$.ajaxSetup()`, `.load()`, transports, and ajax event shorthands such as `.ajaxStart()`.

// ajax/xhr: 仅传输AJAX的xhr
- **ajax/xhr**: The XMLHTTPRequest AJAX transport only.

// ajax/script: 仅传输AJAX的script, 用于检索脚本
- **ajax/script**: The `<script>` AJAX transport only; used to retrieve scripts.

// ajax/jsonp: 仅传输AJAX的JSONP, 依赖于ajax/script
- **ajax/jsonp**: The JSONP AJAX transport only; depends on the ajax/script transport.

- **css**: The `.css()` method plus non-animated `.show()`, `.hide()` and `.toggle()`. Also removes **all** modules depending on css (including **effects**, **dimensions**, and **offset**).
- **deprecated**: Methods documented as deprecated but not yet removed; currently only `.andSelf()`.
- **dimensions**: The `.width()` and `.height()` methods, including `inner-` and `outer-` variations.
- **effects**: The `.animate()` method and its shorthands such as `.slideUp()` or `.hide("slow")`.
- **event**: The `.on()` and `.off()` methods and all event functionality. Also removes `event/alias`.
- **event/alias**: All event attaching/triggering shorthands like `.click()` or `.mouseover()`.
- **offset**: The `.offset()`, `.position()`, `.offsetParent()`, `.scrollLeft()`, and `.scrollTop()` methods.
- **wrap**: The `.wrap()`, `.wrapAll()`, `.wrapInner()`, and `.unwrap()` methods.
- **core/ready**: Exclude the ready module if you place your scripts at the end of the body. Any ready callbacks bound with `jQuery()` will simply be called immediately. However, `jQuery(document).ready()` will not be a function and `.on("ready", ...)` or similar will not be triggered.
- **deferred**: Exclude jQuery.Deferred. This also removes jQuery.Callbacks. *Note* that modules that depend on jQuery.Deferred(AJAX, effects, core/ready) will not be removed and will still expect jQuery.Deferred to be there. Include your own jQuery.Deferred implementation or exclude those modules as well (`grunt custom:-deferred,-ajax,-effects,-core/ready`).
- **exports/global**: Exclude the attachment of global jQuery variables ($ and jQuery) to the window.
- **exports/amd**: Exclude the AMD definition.

Removing sizzle is not supported on the 1.x branch.

The build process shows a message for each dependent module it excludes or includes.

##### AMD name

As an option, you can set the module name for jQuery's AMD definition. By default, it is set to "jquery", which plays nicely with plugins and third-party libraries, but there may be cases where you'd like to change this. Simply set the `"amd"` option:

```bash
grunt custom --amd="custom-name"
```

Or, to define anonymously, set the name to an empty string.

```bash
grunt custom --amd=""
```

#### Custom Build Examples

To create a custom build of the latest stable version, first check out the version:

```bash
git pull; git checkout $(git describe --abbrev=0 --tags)
```

Then, make sure all Node dependencies are installed:

```bash
npm install
```

Create the custom build using the `grunt custom` option, listing the modules to be excluded.

Exclude all **ajax** functionality:

```bash
grunt custom:-ajax
```

Excluding **css** removes modules depending on CSS: **effects**, **offset**, **dimensions**.

```bash
grunt custom:-css
```

Exclude a bunch of modules:

```bash
grunt custom:-ajax,-css,-deprecated,-dimensions,-effects,-event/alias,-offset,-wrap
```

For questions or requests regarding custom builds, please start a thread on the [Developing jQuery Core](https://forum.jquery.com/developing-jquery-core) section of the forum. Due to the combinatorics and custom nature of these builds, they are not regularly tested in jQuery's unit test process.

Running the Unit Tests
--------------------------------------

Make sure you have the necessary dependencies:

```bash
npm install
```

Start `grunt watch` or `npm start` to auto-build jQuery as you work:

```bash
cd jquery && grunt watch
```


Run the unit tests with a local server that supports PHP. Ensure that you run the site from the root directory, not the "test" directory. No database is required. Pre-configured php local servers are available for Windows and Mac. Here are some options:

- Windows: [WAMP download](http://www.wampserver.com/en/)
- Mac: [MAMP download](http://www.mamp.info/en/index.html)
- Linux: [Setting up LAMP](https://www.linux.com/learn/tutorials/288158-easy-lamp-server-installation)
- [Mongoose (most platforms)](http://code.google.com/p/mongoose/)




Building to a different directory
---------------------------------

To copy the built jQuery files from `/dist` to another directory:

```bash
grunt && grunt dist:/path/to/special/location/
```
With this example, the output files would be:

```bash
/path/to/special/location/jquery.js
/path/to/special/location/jquery.min.js
```

To add a permanent copy destination, create a file in `dist/` called ".destination.json". Inside the file, paste and customize the following:

```json

{
  "/Absolute/path/to/other/destination": true
}
```

Additionally, both methods can be combined.



Essential Git
-------------

As the source code is handled by the Git version control system, it's useful to know some features used.

### Cleaning ###

If you want to purge your working directory back to the status of upstream, following commands can be used (remember everything you've worked on is gone after these):

```bash
git reset --hard upstream/master
git clean -fdx
```

### Rebasing ###

For feature/topic branches, you should always use the `--rebase` flag to `git pull`, or if you are usually handling many temporary "to be in a github pull request" branches, run following to automate this:

```bash
git config branch.autosetuprebase local
```
(see `man git-config` for more information)

### Handling merge conflicts ###

If you're getting merge conflicts when merging, instead of editing the conflicted files manually, you can use the feature
`git mergetool`. Even though the default tool `xxdiff` looks awful/old, it's rather useful.

Following are some commands that can be used there:

* `Ctrl + Alt + M` - automerge as much as possible
* `b` - jump to next merge conflict
* `s` - change the order of the conflicted lines
* `u` - undo a merge
* `left mouse button` - mark a block to be the winner
* `middle mouse button` - mark a line to be the winner
* `Ctrl + S` - save
* `Ctrl + Q` - quit

[QUnit](http://api.qunitjs.com) Reference
-----------------

### Test methods ###

```js
expect( numAssertions );
stop();
start();
```


Note: QUnit's eventual addition of an argument to stop/start is ignored in this test suite so that start and stop can be passed as callbacks without worrying about their parameters

### Test assertions ###


```js
ok( value, [message] );
equal( actual, expected, [message] );
notEqual( actual, expected, [message] );
deepEqual( actual, expected, [message] );
notDeepEqual( actual, expected, [message] );
strictEqual( actual, expected, [message] );
notStrictEqual( actual, expected, [message] );
throws( block, [expected], [message] );
```


Test Suite Convenience Methods Reference (See [test/data/testinit.js](https://github.com/jquery/jquery/blob/master/test/data/testinit.js))
------------------------------

### Returns an array of elements with the given IDs ###

```js
q( ... );
```

Example:

```js
q("main", "foo", "bar");

=> [ div#main, span#foo, input#bar ]
```

### Asserts that a selection matches the given IDs ###

```js
t( testName, selector, [ "array", "of", "ids" ] );
```

Example:

```js
t("Check for something", "//[a]", ["foo", "baar"]);
```



### Fires a native DOM event without going through jQuery ###

```js
fireNative( node, eventType )
```

Example:

```js
fireNative( jQuery("#elem")[0], "click" );
```

### Add random number to url to stop caching ###

```js
url( "some/url.php" );
```

Example:

```js
url("data/test.html");

=> "data/test.html?10538358428943"


url("data/test.php?foo=bar");

=> "data/test.php?foo=bar&10538358345554"
```


### Load tests in an iframe ###

Loads a given page constructing a url with fileName: `"./data/" + fileName + ".html"`
and fires the given callback on jQuery ready (using the jQuery loading from that page)
and passes the iFrame's jQuery to the callback.

```js
testIframe( fileName, testName, callback );
```

Callback arguments:

```js
callback( jQueryFromIFrame, iFrameWindow, iFrameDocument );
```

### Load tests in an iframe (window.iframeCallback) ###

Loads a given page constructing a url with fileName: `"./data/" + fileName + ".html"`
The given callback is fired when window.iframeCallback is called by the page.
The arguments passed to the callback are the same as the
arguments passed to window.iframeCallback, whatever that may be

```js
testIframeWithCallback( testName, fileName, callback );
```

Questions?
----------

If you have any questions, please feel free to ask on the
[Developing jQuery Core forum](http://forum.jquery.com/developing-jquery-core) or in #jquery on irc.freenode.net.
