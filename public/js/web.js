var dataND = [0, 0];

var dataMN = [0, 0];

var categories = ['0h', '1h'];
var i = 0;

function myFunction() {
    i++;
    // var date=new Date();
    // categories.push(String(document.getElementById("time").innerHTML));
    // console.log(chartND.series[0]);
    var x = String(document.getElementById("time").innerHTML);
    categories.push(x);
    if (i < 5) {
        chartND.series[0].addPoint([x, parseFloat(document.getElementById("t1").innerHTML)]);
        chartDA.series[0].addPoint([x, parseFloat(document.getElementById("h1").innerHTML)]);
        chartPR.series[0].addPoint([x, parseFloat(document.getElementById("p1").innerHTML)]);
        chartGA.series[0].addPoint([x, parseFloat(document.getElementById("g1").innerHTML)]);
        chartUV.series[0].addPoint([x, parseFloat(document.getElementById("u1").innerHTML)]);
    }
    else {
        chartND.series[0].addPoint([x, parseFloat(document.getElementById("t1").innerHTML)]);
        chartDA.series[0].addPoint([x, parseFloat(document.getElementById("h1").innerHTML)]);
        chartPR.series[0].addPoint([x, parseFloat(document.getElementById("p1").innerHTML)]);
        chartGA.series[0].addPoint([x, parseFloat(document.getElementById("g1").innerHTML)]);
        chartUV.series[0].addPoint([x, parseFloat(document.getElementById("u1").innerHTML)]);
        chartND.series[0].removePoint(0);
        chartDA.series[0].removePoint(0);
        chartPR.series[0].removePoint(0);
        chartGA.series[0].removePoint(0);
        chartUV.series[0].removePoint(0);
    }
}
var hostname = "ngoinhaiot.com";

var port = 3333;

var clientId = "Web";

clientId += new Date().getUTCMilliseconds();

var user_mqtt = "hieu45678vip";

var pass_mqtt = "hieu45678vip";

var topicpub = "hieu45678vip/sub";

var topicsub = "hieu45678vip/pub";
mqttClient = new Paho.MQTT.Client(hostname, port, clientId);  // khai báo kết nối mqtt
mqttClient.onMessageArrived = MessageArrived; // nhận dữ liệu
mqttClient.onConnectionLost = ConnectionLost; // kiểm tra kết nối 
Connect();
function Connect() {
    mqttClient.connect({
        useSSL: true,
        userName: user_mqtt,
        password: pass_mqtt,
        onSuccess: Connected,
        onFailure: ConnectionFailed,
        keepAliveInterval: 10,
    });
}
function Connected() {
    console.log("Connected to mqtt.ngoinhaiot.com");
    mqttClient.subscribe(topicsub);
}
function ConnectionFailed(res) {
    console.log("Connect failed:" + res.errorMessage);
}
function ConnectionLost(res) {
    if (res.errorCode !== 0) {
        console.log("Connection lost:" + res.errorMessage);
        Connect();
    }
}
function MessageArrived(message) {
    console.log("Data STM-ESP :" + message.payloadString);
    // {"ND":"20","DA":"30","PR":"40","GA":"50","UV":"60"}
    // Kiểm tra JSON đó  lỗi ko ??
    // nếu ko lỗi thì xử lý  => hiển thị đúng vị trí trên giao diện mình thiết kế
    IsJsonString(message.payloadString)
    if (checkjson) {
        console.log("JSON OK!!!");
        var DataVDK = message.payloadString;
        var DataJson = JSON.parse(DataVDK);
        //DataJson {"ND":"20","DA":"30","PR":"40","GA":"50","UV":"60"}
        if (DataJson.ND != null) {
            document.getElementById("t1").innerHTML = parseFloat(DataJson.ND);
        }
        if (DataJson.DA != null) {
            document.getElementById("h1").innerHTML = parseFloat(DataJson.DA);
        }
        if (DataJson.PR != null) {
            document.getElementById("p1").innerHTML = parseFloat(DataJson.PR);
        }
        if (DataJson.GA != null) {
            document.getElementById("g1").innerHTML = parseFloat(DataJson.GA);
        }
        if (DataJson.UV != null) {
            document.getElementById("u1").innerHTML = parseFloat(DataJson.UV);
        }
        if (DataJson.OTA != null) {
            document.getElementById("buttonloading").style.display = "none";
            document.getElementById("buttonactive").style.display = "inline";
        }
        if (DataJson.time != null) {
            document.getElementById("time").innerHTML = DataJson.time;
        }
    }
    else {
        console.log("JSON Error!!!");
    }
    myFunction();
}
function IsJsonString(str) {
    try {
        JSON.parse(str);
    }
    catch (e) {
        checkjson = false;
        return false;
    }
    checkjson = true;
    return true;
}
function SendButtonControl() {
    var state = document.getElementById("bom").value;
    if (state == "OFF") {
        var DataSend = "{\"Bom\":\"" + 1 + "\"}";
        mqttClient.send(topicpub, DataSend);
        document.getElementById("bom").value = "ON";
        document.getElementById("bom").style.backgroundColor = "#33ff33";
        document.getElementById("bom").style.color = "black";
    }
    else {
        var DataSend = "{\"Bom\":\"" + 0 + "\"}";
        mqttClient.send(topicpub, DataSend);
        document.getElementById("bom").value = "OFF";
        document.getElementById("bom").style.backgroundColor = "#ff0000";
        document.getElementById("bom").style.color = "white";
    }
}
function button_active() {
    var DataSend = "{\"OTA\":\"1\"}";
    mqttClient.send(topicpub, DataSend);
    document.getElementById("buttonloading").style.display = "inline";
    document.getElementById("buttonactive").style.display = "none";
    document.getElementById("buttonloading").style.visibility = "visible";
    document.getElementById("buttonactive").style.display = "hidden";
}
