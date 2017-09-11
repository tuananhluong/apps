var applicationDataUrl = 'data/data.js';

// SERVICES
// Get all aplications 
function getListAllApps(postBackFunc) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            result = JSON.parse(this.responseText);
            postBackFunc(sortJSON(result, 'name', 'asc'));
        }
    };
    request.open("GET", applicationDataUrl, true);
    request.send();
}

// Get list aplications by name, filter by text contain
function getListAppsByName(text) {
    var results = [];
    getListAllApps(function(apps) {
        if (text !== '') {
            for (var i = 0; i < apps.length; i++) {
                if (apps[i].name.toUpperCase().indexOf(text.toUpperCase()) !== -1) {
                    results.push(apps[i]);
                }
            }
            bindListAppsSearched(results);
            setHighlight(text);
        } else {
            bindListAppsSearched(apps);
        }
    });
}

// Get all history
function getListAppsInHistory() {
    getListAllApps(function(apps) {
        var listAppsHistory = [];
        var historyValue = JSON.parse(getHistory());
        if (historyValue != null) {
            for (var i = 0; i < historyValue.length; i++) {
                var appId = historyValue[i].id;
                var searchTime = historyValue[i].searchTime;
                for (var j = 0; j < apps.length; j++) {
                    if (apps[j].id == appId) {
                        var appHistory = {};
                        appHistory["id"] = appId;
                        appHistory["name"] = apps[j].name;
                        appHistory["thumbnailPath"] = apps[j].thumbnailPath;
                        appHistory["searchTime"] = searchTime;
                        listAppsHistory.push(appHistory);
                    }
                }
            }
        }
        bindListAppsInHistory(sortJSON(listAppsHistory, 'searchTime', 'desc'));
    });
}

// Get popular aplications
function getListPopular() {
    getListAllApps(function(apps) {
        var historyValue = JSON.parse(getHistory());
        if (historyValue != null) {
            var uniqueId = [];
            for (var i = 0; i < historyValue.length; i++) {
                if (uniqueId.indexOf(historyValue[i].id) === -1) {
                    uniqueId.push(historyValue[i].id);
                }
            }
            var appsMap = [];
            for (var i = 0; i < uniqueId.length; i++) {
                var count = 0;
                for (var j = 0; j < historyValue.length; j++) {
                    if (historyValue[j].id == uniqueId[i]) {
                        count++;
                    }
                }
                var appMap = {};
                appMap["id"] = uniqueId[i];
                appMap["times"] = count;
                appsMap.push(appMap);
            }
            appsMap = sortJSON(appsMap, 'times', 'desc')
            var listAppsPopular = [];
            for (var i = 0; i < appsMap.length; i++) {
                if (i <= 5) {
                    var appId = appsMap[i].id;
                    var times = appsMap[i].times;

                    for (var j = 0; j < apps.length; j++) {
                        if (apps[j].id == appId) {
                            var appMap = {};
                            appMap["id"] = apps[j].id;
                            appMap["name"] = apps[j].name;
                            appMap["thumbnailPath"] = apps[j].thumbnailPath;
                            appMap["times"] = times;
                            listAppsPopular.push(appMap);
                        }
                    }
                }
            }
            document.getElementById("list-apps-popular").innerHTML = listAppsTemplate(listAppsPopular);
        }
    });
}

// DATA
// Get History
function getHistory() {
    return localStorage.getItem("appsHistory");
}

// Save History
function saveHistory(appId) {
    var item = {};
    item["id"] = appId;
    item["searchTime"] = new Date().getTime();

    var newValue = JSON.stringify(item);
    // Create    
    if (getHistory() == null) {
        localStorage.setItem("appsHistory", "[" + newValue + "]");
    }
    // Update
    else {
        var historyValue = JSON.parse(getHistory());
        historyValue.push(JSON.parse(newValue));
        var updateValue = JSON.stringify(historyValue);
        localStorage.setItem("appsHistory", updateValue);
    }

}
// Delete item in History
function deleteItemInHistory(app) {
    var appId = app.id.split("_")[1];
    var searchTime = parseInt(app.getAttribute("rel"));
    var historyValue = JSON.parse(getHistory());
    var historyUpdate = historyValue.filter(function(value) {
        return value.searchTime !== searchTime;
    });
    var updateValue = JSON.stringify(historyUpdate);
    localStorage.setItem("appsHistory", updateValue);
    getListAppsInHistory();
}
// Delete History
function clearHistory() {
    localStorage.clear();
    getListAppsInHistory();
}

// MICS
function scrollTo(element, to, duration) {
    if (duration < 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 2;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        scrollTo(element, to, duration - 2);
    }, 10);
}

function goBackHomePage() {
    window.location.href = "/";
}

function sortJSON(data, key, way) {
    return data.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        if (way === 'asc') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
        if (way === 'desc') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
    });
}

function getDateTime(date) {
    var date = new Date(date);
    var str = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() +
        " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return str;
}