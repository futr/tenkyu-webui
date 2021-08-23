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
var raRep = null;
var southOffX = null;
var southOffY = null;
var starColor = null;
var starNameColor = null;
var consteColor = null;
var messierColor = null;
var obsDate = null;
var obsLocalTime = null;
var offsetFromUTC = null;
var drawObsZenith = null;

window.addEventListener( "DOMContentLoaded", () => {
    // 初期化
    // Check IE
    var ua = window.navigator.userAgent.toLowerCase();

    if ( ua.indexOf( 'msie' ) >= 0 || ua.indexOf( 'trident' ) >= 0 ) {
        alert( "InternetExplorerでは動作しません" );
        return;
    }

    // Set current date
    let today = new Date();

    // Set date time info
    document.getElementById( "obsDate" ).value = getDateString( today );
    document.getElementById( "offsetUTCSpin" ).value = -today.getTimezoneOffset() / 60;

    // Set event handler
    document.getElementById( "generatePDFButton" ).onclick = generatePDF;
    document.getElementById( "locationButton" ).onclick = getLocation;
});

function readConfig()
{
    radius = document.getElementById( "radiusSpin" ).value;
    raSplit = document.getElementById( "splitSpin" ).value;
    obsLat = document.getElementById( "latSpin" ).value;
    obsLon = document.getElementById( "lonSpin" ).value;
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
    raRep = document.getElementById( "raRepSpin" ).value;
    southOffX = document.getElementById( "southOffXSpin" ).value;
    southOffY = document.getElementById( "southOffYSpin" ).value;
    starColor = document.getElementById( "starColor" ).value;
    consteColor = document.getElementById( "consteColor" ).value;
    messierColor = document.getElementById( "messierColor" ).value;
    obsDate = document.getElementById( "obsDate" ).value;
    obsLocalTime = document.getElementById( "obsLocalTime" ).value;
    offsetFromUTC = document.getElementById( "offsetUTCSpin" ).value;
    drawObsZenith = document.getElementById( "obsZenithCheck" ).checked;
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
        "l="        + encodeURIComponent( navigator.language ) + "&" +
        "radius="   + encodeURIComponent( radius ) + "&" +
        "split="    + encodeURIComponent( raSplit ) + "&" +
        "lat="      + encodeURIComponent( obsLat ) + "&" + 
        "lon="      + encodeURIComponent( obsLon ) + "&" + 
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
        "rarep="    + encodeURIComponent( raRep ) + "&" +
        "sofx="     + encodeURIComponent( southOffX ) + "&" +
        "sofy="     + encodeURIComponent( southOffY ) + "&" +
        "sclr="     + encodeURIComponent( starColor ) + "&" +
        "cclr="     + encodeURIComponent( consteColor ) + "&" +
        "mclr="     + encodeURIComponent( messierColor ) + "&" +
        "d="        + encodeURIComponent( obsDate ) + "&" +
        "t="        + encodeURIComponent( obsLocalTime ) + "&" +
        "tz="       + encodeURIComponent( offsetFromUTC ) + "&" +
        "zenith="   + encodeURIComponent( getBoolStr( drawObsZenith ) );

    window.location.href = baseURL + "?" + arg;
}

function getLocation()
{
    navigator.geolocation.getCurrentPosition( pos => {
        const crd = pos.coords;
        const lat = crd.latitude;
        const lon = crd.longitude;

        document.getElementById( "latSpin" ).value = lat.toFixed( 1 ).toString();
        document.getElementById( "lonSpin" ).value = lon.toFixed( 1 ).toString();
    } );
}

function getDateString( date )
{
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();

    return y.toString().padStart( 4, "0" ) + "-" + m.toString().padStart( 2, "0" ) + "-" + d.toString().padStart( 2, "0" );
}
