function parseQuery(a) {
    var b = "";
    if (!a) return b;
    for (var c = a.split(/[;&]/), d = 0; d < c.length; d++) {
        var e = c[d].split("=");
        if (e && 2 == e.length) {
            var f = unescape(e[0]),
                g = unescape(e[1]);
            g = g.replace(/\+/g, " "), b += f + '="' + g + '" ', "token" == f && (token = g), "domain" == f && (domain =
                1)
        }
    }
    return b
}
function GetQueryStringParams(a) {
    for (var b = 0; b < sURLVariables.length; b++) {
        var c = sURLVariables[b].split("=");
        if (c[0] == a) return c[1]
    }
}
var token = "",
    domain = "",
    sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split("&"),
    scripts = document.getElementsByTagName("script"),
    myScript = scripts[scripts.length - 1],
    queryString = myScript.src.replace(/^[^\?]+\??/, ""),
    params = parseQuery(queryString);
// browser compatibility: get method for event
// addEventListener(FF, Webkit, Opera, IE9+) and attachEvent(IE5-8)
var myEventMethod =
    window.addEventListener ? "addEventListener" : "attachEvent";
// create event listener
var myEventListener = window[myEventMethod];
// browser compatibility: attach event uses onmessage
var myEventMessage =
    myEventMethod == "attachEvent" ? "onmessage" : "message";
// register callback function on incoming message
myEventListener(myEventMessage, function (e) {
    // we will get a string (better browser support) and validate
    // if it is an int - set the height of the iframe #my-iframe-id
    if (e.data === parseInt(e.data))
        document.getElementById('repair-desk-widget').height = e.data + "px";
}, false);
if (token == '') {
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    var src = document.getElementById("repairdeskwidget").src;
    var token = getParameterByName('token', src);
    var domain = getParameterByName('token', domain);
    var params = 'width="100%" scrolling="yes"';
}
document.write(
    '<iframe id= \"repair-desk-widget\" frameborder="0" src="https://app.repairdesk.co/index.php?r=site/repairwidget&token=' +
    token + "&domain=" + domain + '"  ' + params + "></iframe>");