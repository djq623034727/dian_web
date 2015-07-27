/**
 * Created by djq on 2015/6/22.
 */

/**
 Upload Portrait
 */
//触发遮罩
function coveron(){
    document.getElementById("Img_cover").style.display="block";
}
function coverout(){
    document.getElementById("Img_cover").style.display="none";
}
//供iframe调用
function photost(info,src) {
    if (info == "OK") {
        document.getElementById("viewImg").src=src;
        return;
    }
    else{
        alert(src);
    }
    $('#photoif').html(info);
}

/**
 Map
 */
var marker;
var map;
window.onload = function() {
    lat = 39.93;
    lng = 116.44;
    document.getElementById("longitude").innerHTML=lng;
    document.getElementById("latitude").innerHTML=lat;
    var myLatLng = new google.maps.LatLng(lat, lng);
    var myOptions = {
        zoom: 8,
        minZoom: 2,
        center: myLatLng,
        disableDefaultUI: true,               //取消默认的视图
        navigationControl: true,              //true表示显示控件
        mapTypeControl: false,                //false表示不显示控件
        scaleControl: true,
        disableGoogleBar: false,             //false表示显示控件
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map"), myOptions);

    var styles = [
        {
            "featureType": "road",
            "stylers": [
                { "visibility": "off" }
            ]
        },{
            "featureType": "poi",
            "stylers": [
                { "visibility": "off" }
            ]
        },{
            "featureType": "transit",
            "stylers": [
                { "visibility": "off" }
            ]
        },{
            "featureType": "landscape.man_made",
            "stylers": [
                { "visibility": "off" }
            ]
        },{
            "featureType": "landscape.natural.terrain",
            "stylers": [
                { "visibility": "off" }
            ]
        },{
            "featureType": "landscape.natural.landcover",
            "elementType": "geometry.fill",
            "stylers": [
                { "color": "#ffffff" }
            ]
        }
    ];

    map.setOptions({styles: styles});

    marker = new google.maps.Marker({
        position: myLatLng,
        draggable: true,
        title: "$address"
    });
    marker.setMap(map);//显示标签

    google.maps.event.addListener(map, 'click', function( event) {
        //placeMarker(event.latLng);
        var latlng=event.latLng;
        marker.setPosition(latlng);
        document.getElementById("longitude").innerHTML=latlng.lng().toFixed(2);
        document.getElementById("latitude").innerHTML=latlng.lat().toFixed(2);
    });
    google.maps.event.addListener(marker, 'drag', function( event) {
        //placeMarker(event.latLng);
        var latlng=event.latLng;
        marker.setPosition(latlng);
        document.getElementById("longitude").innerHTML=latlng.lng().toFixed(2);
        document.getElementById("latitude").innerHTML=latlng.lat().toFixed(2);
    });
}
/**
 检查填写完整性
 */
function exam() {
    try{
    var his_title = document.getElementsByClassName("his_new_input")[0];
    var his_intro = document.getElementsByClassName("his_new_input")[1];
    if(his_title.value.length>5) {
        alert("历史标题不得超过<br>5个字");
        return false;
    }
    else if(his_title.value.length<1){
        alert("历史标题不能为空");
        return false;
    }
    else if(his_intro.value.length>20){
        alert("历史简介不得超过<br>20个字");
        return false;
    }
    else if(his_intro.value.length<1){
        alert("历史简介不能为空");
        return false;
    };//历史
     }
    catch (hh) {}
    var evt_title = document.getElementsByClassName("evt_new_input")[0];
    var evt_intro = document.getElementsByClassName("evt_new_input")[1];
    if(evt_title.value.length>5) {
        alert("事件标题不得超过<br>5个字");
        return false;
    }
    else if(evt_title.value.length<1){
        alert("事件标题不能为空");
        return false;
    }
    else if(evt_intro.value.length>20){
        alert("事件标题不得超过<br>20个字");
        return false;
    }
    else if(evt_intro.value.length<1){
        alert("事件简介不能为空");
        return false;
    };//事件
}
/**
 *alert样式
 */
window.alert = function(txt)
{
    var shield = document.createElement("DIV");
    shield.id = "shield";
    shield.style.position = "absolute";
    shield.style.left = "0px";
    shield.style.top = "0px";
    shield.style.width = "100%";
    shield.style.height = document.body.scrollHeight+"px";
    shield.style.background = "transparent";
    shield.style.textAlign = "center";
    shield.style.zIndex = "10000";
    shield.style.filter = "alpha(opacity=0)";
    var alertFram = document.createElement("DIV");
    alertFram.id="alertFram";
    alertFram.style.position = "absolute";
    alertFram.style.left = "50%";
    alertFram.style.top = document.body.scrollTop + window.innerHeight/2 + "px";
    alertFram.style.marginLeft = "-200px";
    alertFram.style.marginTop = "-90px";
    alertFram.style.width = "400px";
    alertFram.style.height = "180px";
    alertFram.style.textAlign = "center";
    alertFram.style.zIndex = "10001";
    strHtml = '<ul style="list-style:none;margin:0px;padding:0px;width:100%;background:#f2f2f2;border-radius: 8px;"> ';
    strHtml += ' <li style="text-align:center;padding-top: 15px;;font:28px/50px 黑体;font-weight:bold;height:50px;">警告</li> ';
    strHtml += ' <li style="text-align:center;font:20px/24px 黑体;height: 48px;">'+txt+'</li>';
    strHtml += ' <li style="text-align:center;margin:8px 30px 0 30px;padding-bottom:16px;height:50px; border-top:2px solid #d2d5d5;"><input type="button" value="OK" onclick="doOk()" style="width:50%;height:100%;background:transparent;font:20px/50px 黑体;color:#0177f8;float:left;border-style: none;cursor:pointer;" /><input type="button" value="Cancel" onclick="doOk()" style="width:50%;height:100%;background:transparent;font:20px/50px 黑体;color:#0177f8;float:left;border-style: none;border-left:2px solid #d2d5d5;cursor:pointer;" /></li> ';
    strHtml += "</ul> ";
    alertFram.innerHTML = strHtml;
    document.body.appendChild(alertFram);
    document.body.appendChild(shield);
    var c = 0;
    this.doAlpha = function(){
        if (c++ > 20){clearInterval(ad);return 0;}
        shield.style.filter = "alpha(opacity="+c+");";
    }
    var ad = setInterval("doAlpha()",5);
    this.doOk = function(){
        alertFram.style.display = "none";
        shield.style.display = "none";
    }
    alertFram.focus();
    document.body.onselectstart = function(){return false;};
}