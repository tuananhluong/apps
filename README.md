# [Apps Marketplace] &middot; Applications Search Website Template

This is a test for front-end developer.

## Overview

There are many apps in Apple Store, this site implement a suggest plugin for easier input of app names.

## Feature

### Search Textbox
* Suggest layer displayed when input is focused, and hidden when areas outside are clicked.
* Show all the matching items(if no input, show all the apps), with logo & name, at max height 400px.
* Clicking item(or pressing ENTER key when item is focused) update the input field with corresponding app name
* Support both keyboard & mouse selecting for PC browsers, and no conflict when using both

### Save History
* Save input history when suggested item is selected. 
* Manage input history in local browser(localStorage) 
* Display history items with higher priority 
* User can clear special search history item.

### Other
* Pure js implementation without any libraries or frameworks
* CSS preprocessor 
* Layout display full responsive in Chrome

## Structure Directory Layout
    
    ├── _layout                   # Demo html page work without extra setting	
    │   ├── _index.html           # Hompage search
    │   └── _history.html         # History page
	├── css                       # Style preprocessed
	│   │   
	│	├── style.css             # Main stylesheet
    │   └── common.css            # Common stylesheet
    ├── data                      # Default data for demo
	├── img                       # Images
    ├── js                        # Scripts
    ├── scss                      # Sass file
    ├── about.html                # About page
    ├── history.html              # History page
	├── index.html                # Hompage search
	├── LICENSES.txt              # Copyright and license notices
    └── README.md                 # Readme 

## Extra Setting

### How to run
To display page with default data, you run in a server. Example:
- From root folder, run Node terminal command: $ http-server -p 1212
- Open browser and go [http://localhost:1212/](http://localhost:1212/)

### Modify UI

Require Ruby and Sass

- Open your Terminal or Command Prompt.
- Install Sass: $ gem install sass
- Preprocessed Sass file: $ sass scss/style.scss css/style.css

## License

This template is MIT Licensed, read [LICENSES.txt]