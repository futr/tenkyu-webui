const baseURL = "https://ik1-328-24359.vs.sakura.ne.jp/cgi-bin/tenkyu-cgi";
var radius = null;
var mirror = null;
var starSize = null;
var minMag = null;
var obsLat = null;
var decRepeat = null;
var southOffX = null;
var drawObsLine = null;
var drawName = null;
var drawConste = null;
var drawMessier = null;
var engMode = null;
var starNameSize = null;
var consteNameSize = null;
var messierNameSize = null;
var infoStrSize = null;
var raSplit = null;
var deRep = null;
var southOffX = null;
var southOffY = null;

window.addEventListener( "DOMContentLoaded", () => {
    // 初期化
    // Check IE
    var ua = window.navigator.userAgent.toLowerCase();

    if ( ua.indexOf( 'msie' ) >= 0 || ua.indexOf( 'trident' ) >= 0 ) {
        alert( "InternetExplorerでは動作しません" );
        return;
    }

    document.getElementById( "generatePDFButton" ).onclick = generatePDF;
});

function readConfig()
{
    radius = document.getElementById( "radiusSpin" ).value;
    raSplit = document.getElementById( "splitSpin" ).value;
    obsLat = document.getElementById( "latSpin" ).value;
    minMag = document.getElementById( "minMagSpin" ).value;
    starSize = document.getElementById( "starSizeSpin" ).value;
    starNameSize = document.getElementById( "starNameSize" ).value;
    consteNameSize = document.getElementById( "consteNameSize" ).value;
    messierNameSize = document.getElementById( "messierNameSize" ).value;
    infoStrSize = document.getElementById( "infoStrSize" ).value;
    mirror = document.getElementById( "mirrorCheck" ).checked;
    drawName = document.getElementById( "nameCheck" ).checked;
    drawConste = document.getElementById( "consteCheck" ).checked;
    drawMessier = document.getElementById( "messierCheck" ).checked;
    drawObsLine = document.getElementById( "obsLineCheck" ).checked;
    engMode = document.getElementById( "engModeCheck" ).checked;
    deRep = document.getElementById( "deRepCheck" ).checked;
    southOffX = document.getElementById( "southOffXSpin" ).value;
    southOffY = document.getElementById( "southOffYSpin" ).value;
}

function generatePDF()
{
    readConfig();

    const getBoolStr = ( b ) => {
        if ( b ) {
            return "1";
        } else {
            return "0";
        }
    };

    // Generate arg
    var arg = "";

    arg = arg +
        "radius="   + encodeURIComponent( radius ) + "&" +
        "split="    + encodeURIComponent( raSplit ) + "&" +
        "lat="      + encodeURIComponent( obsLat ) + "&" + 
        "mag="      + encodeURIComponent( minMag ) + "&" + 
        "ssize="    + encodeURIComponent( starSize ) + "&" + 
        "snsize="   + encodeURIComponent( starNameSize ) + "&" + 
        "cnsize="   + encodeURIComponent( consteNameSize ) + "&" + 
        "mnsize="   + encodeURIComponent( messierNameSize ) + "&" + 
        "infosize=" + encodeURIComponent( infoStrSize ) + "&" + 
        "mir="      + encodeURIComponent( getBoolStr( mirror ) ) + "&" + 
        "name="     + encodeURIComponent( getBoolStr( drawName ) ) + "&" + 
        "conste="   + encodeURIComponent( getBoolStr( drawConste ) ) + "&" + 
        "messier="  + encodeURIComponent( getBoolStr( drawMessier ) ) + "&" + 
        "obsline="  + encodeURIComponent( getBoolStr( drawObsLine ) ) + "&" + 
        "eng="      + encodeURIComponent( getBoolStr( engMode ) ) + "&" +
        "derep="    + encodeURIComponent( deRep ? "2" : "1" ) + "&" +
        "sofx="     + encodeURIComponent( southOffX ) + "&" +
        "sofy="     + encodeURIComponent( southOffY );

    window.location.href = baseURL + "?" + arg;
}