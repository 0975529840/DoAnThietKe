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
    // {"ND":"0","DA":"0","DAD":"0","Bom":"0"}
    //{"T1":"30","H1":"20","M1":"20","T2":"20","H2":"20","M2":"20","T":"20","H":"30","M":"10","Bom":"0"}
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
    }
    else {
        console.log("JSON Error!!!");
    }
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
function button_active(){
    var DataSend = "{\"OTA\":\"1\"}";
    mqttClient.send(topicpub,DataSend);
    document.getElementById("buttonloading").style.display = "inline";
    document.getElementById("buttonactive").style.display = "none";
    document.getElementById("buttonloading").style.visibility = "visible";
    document.getElementById("buttonactive").style.display = "hidden";
}