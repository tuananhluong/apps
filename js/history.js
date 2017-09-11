getListAppsInHistory();

// VIEW FUNCTIONS
function bindListAppsInHistory(apps) {
    var html = "";
    if (apps.length != 0) {
        html = "<ul>";
        for (var i = 0; i < apps.length; i++) {

            var searchTime = getDateTime(apps[i].searchTime);

            html += "<li><div class='app-thumbnail'><img src='" + apps[i].thumbnailPath + "' alt=''></div>";
            html += "<div class='app-info'><a href=''>" + apps[i].name + "</a>";
            html += "<p>Last seach time: <span>" + searchTime + "</span></p>";
            html += "<button id='appId_" + apps[i].id + "' rel='" + apps[i].searchTime + "' class='btn btn-green' onclick='deleteItemInHistory(this)'>Delete</button></div>";
            html += "</li>";
        }
        html += "</ul>";
    } else {
        html = "<p>History empty ...</p>";
    }
    document.getElementById("list-app-history").innerHTML = html;
}