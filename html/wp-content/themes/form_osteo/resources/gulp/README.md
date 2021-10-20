## *** Install ***
#### ** OBSOLETE **
* Install via command : `npm install`
* Then you can uses the Tasks :
    - `gulp dev` -> on local (does not minify css and js) + watch
    - `gulp delivery` -> same + minify css/js
    - `gulp clear` -> clear cache
    - `gulp images` -> minify images
#### ** OBSOLETE **
#### Now we use Yarn (inside docker) so normally you don't have yo use any of those commands
* Install via command : `yarn install`
* Then you can uses the Tasks :
    - `gulp default` -> it watch and builds maps so you can read minified files
    - `gulp delivery` -> same + minify css/js

## *** Updating dependencies ***
* Install globally the npm-check-updates package via : `npm i -g npm-check-updates`
* then in you gulp folder in your project you can check for dependencies update :
* first you check for updates, then you install them.
* - `npm-check-updates -u`
* - `npm install`

## *** .gitignore dist ***
* Files generated goes in /public/dist/.
* A .gitignore files should be in the /dist/ folder and should ignore : /css/ & /js/
* Do not ignore /images/ folder since it won't be generated through the deploy

## *** Autoprefixer ***
* There's also the autoprefixer package which automatically adds vendor prefixes on your css rules.
* github link : https://github.com/postcss/autoprefixer
* It uses browserslist param which takes different queries. You can find some of them here : https://github.com/ai/browserslist#queries
* And you can test your queries here : http://browserl.ist/

## *** For Foreach etc. (less-plugin-lists) ***
* Less plugin for lists/arrays manipulation.
* https://github.com/seven-phases-max/less-plugin-lists#features
