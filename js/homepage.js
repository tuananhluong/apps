var txtSearch = document.getElementById("txt-search");
var delayTimer;

window.onload = function() {

    bindSectionAllApps();
    bindSectionPopular();

    // Event focusin Search textbox
    txtSearch.addEventListener('focusin', function(event) {
        getListAllApps(bindListAppsSearched);
    }, true);
    // Event keydown in Search textbox
    txtSearch.addEventListener('keydown', function(event) {
        if (event.keyCode == 40) {
            moveSelectedApp(event.keyCode);
        }
    }, true);
    // Event keyup in Search textbox
    txtSearch.addEventListener('keyup', function(event) {
        if (event.keyCode == 38) {
            moveSelectedApp(event.keyCode);
        }
        var key = event.which;
        // Don't search with control key
        if (!(key >= 65 && key <= 123) && (key != 32 && key != 0 && key != 8 && key != 127)) {
            event.preventDefault();

        }
        // Search with string input
        else {
            doSearch(this.value);
        }
    }, true);
    // Event enter key press in Search textbox
    txtSearch.addEventListener('keypress', function(event) {
        if (event.which == 13 || event.keyCode == 13) {
            selectAppByEnter();
        }
    }, true);
    // Hide search result box when click outside container
    document.body.addEventListener('click', function(event) {
        if (event.target.offsetParent.id != "search-result" &&
            event.target.id != "search-result" && event.target.id != "txt-search") {
            document.getElementById("search-result").classList.remove("open");
        }
    }, true);

}


// VIEW FUNCTIONS
// SECTION: SEARCH BOX
function doSearch(text) {
    clearTimeout(delayTimer);
    delayTimer = setTimeout(function() {
        getListAppsByName(text);
    }, 100);
}

function bindListAppsSearched(apps) {
    var html = "";
    if (apps.length != 0) {
        html = "<ul id='list-apps-search'>";
        for (var i = 0; i < apps.length; i++) {
            html += "<li tabindex='" + parseInt(i + 1) + "' rel='appId_" + apps[i].id + "'";
            html += "onclick='selectApp(this)'>";
            html += "<img src='" + apps[i].thumbnailPath + "' alt=" + apps[i].name + "/>";
            html += "<span class='appName'>" + apps[i].name + "</span></li>";
        }
        html += "</ul>";
    } else {
        html = "<p>Your search didn't match any applications</p>";
    }
    document.getElementById("search-result").innerHTML = html;
    resetSelectedApp();
    document.getElementById("search-result").classList.add("open");
}

function selectApp(appSelected) {
    var appName = appSelected.innerText;
    document.getElementById("txt-search").value = appName;

    var appId = appSelected.getAttribute("rel").split("_")[1];
    saveHistory(appId);
    getListPopular();

    resetSelectedApp(appSelected);
    document.getElementById("search-result").classList.remove("open");
}

function selectAppByEnter() {
    selectApp(document.getElementsByClassName("row-active")[0]);
}

function moveSelectedApp(keyCode) {
    var isExistsSelected = false;
    var oldPosition = 0;
    var apps = document.getElementById("list-apps-search").getElementsByTagName("li");
    for (var i = 0; i < apps.length; ++i) {
        if (apps[i].classList.contains("row-active")) {
            isExistsSelected = true;
            oldPosition = i;
        }
    }
    // empty active => set 1st
    if (isExistsSelected == false) {
        apps[0].setAttribute("class", "row-active");
    } else {
        // move down => remove old active => set active + 1
        // if move down and target is last-child => scroll up, set active 1st
        apps[oldPosition].classList.remove("row-active");
        apps[oldPosition].blur();
        if (keyCode == 40) {
            var newPosition = oldPosition + 1;
            if (newPosition != apps.length) {
                apps[newPosition].setAttribute("class", "row-active");
            } else {
                apps[0].setAttribute("class", "row-active");
                scrollTo(document.getElementById('search-result'), 0, 100)
            }
        }
        // move up => remove old active => set active - 1
        else if (keyCode == 38) {
            if (oldPosition != 0) {
                var newPosition = oldPosition - 1;
                apps[newPosition].setAttribute("class", "row-active");
            }

        } else {
            return false;
        }

    }

}

function resetSelectedApp() {
    var apps = document.getElementById("list-apps-search").getElementsByTagName("li");
    for (var i = 0; i < apps.length; ++i) {
        if (apps[i].classList.contains("row-active")) apps[i].classList.remove("row-active");
    }
}

function setHighlight(text) {
    var wrapstr = '<b class="hight-light">$1</b>';
    var regx = new RegExp("(" + text + ")", "i");
    var appNames = document.getElementById("list-apps-search").getElementsByClassName("appName");
    for (var i = 0; i < appNames.length; ++i) {
        var html = appNames[i].innerHTML.replace(regx, wrapstr);
        appNames[i].innerHTML = html;
    }
}

// SECTION: ALL APPLICATIONS
function bindSectionAllApps() {
    getListAllApps(function(apps) {
        document.getElementById("list-all-apps").innerHTML = listAppsTemplate(apps);
    });
}

// SECTION: POPULAR
function bindSectionPopular() {
    getListPopular();
}

function listAppsTemplate(apps) {
    var html = "<ul>";
    for (var i = 0; i < apps.length; i++) {
        html += "<li rel='" + apps[i].id + "'><a href=''>";
        html += "<img src='" + apps[i].thumbnailPath + "' alt=''/>";
        html += "<span>" + apps[i].name + "</span></a>";
        if (apps[i].times != undefined) {
            html += "<span>Total times search: " + apps[i].times + "</span>";
        }
        html += "</li>";
    }
    html += "</ul>";
    return html;
}