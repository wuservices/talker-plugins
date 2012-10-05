# Talker plugins

Newsline's [Talker](http://talkerapp.com) plugins.

You have to manually install any plugins you want by copy-pasting the code from this repo.

## Available plugins

You can install one of the plugins by opening it's JavaScript source and copying it to a new plugin after logging in to Talker.

### Markup

Replaces things inside backticks with monospaced font. Just like Markdown.


### CI colorizer

Cleans up messages from our CI.

[![Screenshot](https://github.com/newsline/talker-plugins/raw/master/screenshots/ci_colorizer.png)](https://github.com/newsline/talker-plugins/raw/master/screenshots/ci_colorizer.png)


### Github Links

Makes links to Github look cooler and less noisy.

[![Screenshot](https://github.com/newsline/talker-plugins/raw/master/screenshots/github_links.png)](https://github.com/newsline/talker-plugins/raw/master/screenshots/github_links.png)

## Development

Install `npm` and `grunt`, then run `npm install` in the project root. You can then use `grunt` to compile the files:

```
$ brew install npm
$ npm install -g grunt
$ npm install
$ grunt
```

When developing you can use grunt to watch for changes and automatically compiling them:

```
$ grunt watch
```
