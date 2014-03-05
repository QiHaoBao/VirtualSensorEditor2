define({
  ui: {
    datalink: {
      stroke: '#bbb'
    }
  },
  api: {
    hostname: 'http://einstein.sv.cmu.edu:9000'
  },
  sensors: [
    {'deviceURI': 'temp',
     'sensorCategory': 'bodevice',
     'sensorName': 'privateSensor1',
     'sensorType': 'motorola'},
    {'deviceURI': 'temp',
      'sensorCategory': 'bodevice',
      'sensorName': 'sensor1',
      'sensorType': 'motorola'},
    {'deviceURI': 'instrument',
      'sensorCategory': 'temp',
      'sensorName': 'sensor2',
      'sensorType': 'texas'},
    {'deviceURI': '23420ca4e4830bee',
      'sensorCategory': 'xAccelerometer',
      'sensorName': 'fireImpXAccelerometer23420ca4e4830bee',
      'sensorType': 'fireImpXAccelerometer'},
    {'deviceURI': '23420ca4e4830bee',
      'sensorCategory': 'yAccelerometer',
      'sensorName': 'fireImpYAccelerometer23420ca4e4830bee',
      'sensorType': 'fireImpYAccelerometer'},
    {'deviceURI': '23420ca4e4830bee',
      'sensorCategory': 'zAccelerometer',
      'sensorName': 'fireImpZAccelerometer23420ca4e4830bee',
      'sensorType': 'fireImpZAccelerometer'},
    {'deviceURI': '23420ca4e4830bee',
      'sensorCategory': 'motion',
      'sensorName': 'fireImpMotion23420ca4e4830bee',
      'sensorType': 'fireImpMotion'},
    {'deviceURI': '23420ca4e4830bee',
      'sensorCategory': 'digitalTemperature',
      'sensorName': 'fireImpDigitalTemperature23420ca4e4830bee',
      'sensorType': 'fireImpDigitalTemperature'},
    {'deviceURI': '23420ca4e4830bee',
      'sensorCategory': 'light',
      'sensorName': 'fireImpLight23420ca4e4830bee',
      'sensorType': 'fireImpLight'},
    {'deviceURI': '23420ca4e4830bee',
      'sensorCategory': 'pressure',
      'sensorName': 'fireImpPressure23420ca4e4830bee',
      'sensorType': 'fireImpPressure'},
    {'deviceURI': '23420ca4e4830bee',
      'sensorCategory': 'humidity',
      'sensorName': 'fireImpHumidity23420ca4e4830bee',
      'sensorType': 'fireImpHumidity'},
    {'deviceURI': 'B23_129',
      'sensorCategory': 'sensorCategory0228',
      'sensorName': '0228temp',
      'sensorType': 'tempSensor0228'},
    {'deviceURI': '356489052345324.androidIMEI',
      'sensorCategory': 'AndroidSensors',
      'sensorName': 'androidAccelerometer',
      'sensorType': 'androidMobile'},
    {'deviceURI': '356489052345324.androidIMEI',
      'sensorCategory': 'AndroidSensors',
      'sensorName': 'androidTemperature',
      'sensorType': 'androidMobile'},
    {'deviceURI': '356489052345324.androidIMEI',
      'sensorCategory': 'AndroidSensors',
      'sensorName': 'androidGravity',
      'sensorType': 'androidMobile'},
    {'deviceURI': '356489052345324.androidIMEI',
      'sensorCategory': 'AndroidSensors',
      'sensorName': 'androidGyroscope',
      'sensorType': 'androidMobile'},
    {'deviceURI': '356489052345324.androidIMEI',
      'sensorCategory': 'AndroidSensors',
      'sensorName': 'androidLight',
      'sensorType': 'androidMobile'},
    {'deviceURI': '356489052345324.androidIMEI',
      'sensorCategory': 'AndroidSensors',
      'sensorName': 'androidLinearAcceleration',
      'sensorType': 'androidMobile'},
    {'deviceURI': '356489052345324.androidIMEI',
      'sensorCategory': 'AndroidSensors',
      'sensorName': 'androidMageneticField',
      'sensorType': 'androidMobile'},
    {'deviceURI': '356489052345324.androidIMEI',
      'sensorCategory': 'AndroidSensors',
      'sensorName': 'androidProximity',
      'sensorType': 'androidMobile'},
    {'deviceURI': '356489052345324.androidIMEI',
      'sensorCategory': 'AndroidSensors',
      'sensorName': 'androidPressure',
      'sensorType': 'androidMobile'},
    {'deviceURI': '356489052345324.androidIMEI',
      'sensorCategory': 'AndroidSensors',
      'sensorName': 'androidHumidity',
      'sensorType': 'androidMobile'},
    {'deviceURI': '356489052345324.androidIMEI',
      'sensorCategory': 'AndroidSensors',
      'sensorName': 'androidRotationVector',
      'sensorType': 'androidMobile'},
    {'deviceURI': '356489052345324.androidIMEI',
      'sensorCategory': 'AndroidSensors',
      'sensorName': 'androidGameRotationVector',
      'sensorType': 'androidMobile'},
    {'deviceURI': '356489052345324.androidIMEI',
      'sensorCategory': 'AndroidSensors',
      'sensorName': 'androidOrientationVector',
      'sensorType': 'androidMobile'}
    ],
  //sensors: {
    //types: [
      //'temp',
      //'fireImpDigitalTemperature',
      //'light',
      //'pressure',
      //'humidity',
      //'motion',
      //'audio_p2p',
    //],
    //ids: [
      //"23420ca4e4830bee",
      //"17030003",
      //"17030002",
      //"17000006",
      //"17000005",
      //"17000004",
      //"17000002",
      //"17000003",
      //"17030008",
      //"17030007",
      //"17030004",
      //"17030006",
      //"17030005",
      //"17010003",
      //"17010002",
      //"17000009",
      //"17000007",
      //"17000008",
      //"17020003",
      //"17020004",
      //"17020005",
      //"17020007",
      //"17020006",
      //"17020002",
      //"17020008",
      //"17020009",
      //"17010005",
      //"17010006",
      //"17010004"
    //],
    //labelsMapping: {
      //"23420ca4e4830bee": 'fireImpDigitalTemperature23420ca4e4830bee',
      //"17030003":"B23_104",
      //"17030002":"B23_105B",
      //"17000006":"B23_107",
      //"17000005":"B23_109",
      //"17000004":"B23_110",
      //"17000002":"B23_115",
      //"17000003":"B23_116",
      //"17030008":"B23_120",
      //"17030007":"B23_122",
      //"17030004":"B23_123",
      //"17030006":"B23_124",
      //"17030005":"B23_126",
      //"17010003":"B23_129",
      //"17010002":"B23_129A",
      //"17000009":"B23_210",
      //"17000007":"B23_211",
      //"17000008":"B23_212",
      //"17020003":"B23_213",
      //"17020004":"B23_214",
      //"17020005":"B23_214B",
      //"17020007":"B23_215",
      //"17020006":"B23_215B",
      //"17020002":"B23_216",
      //"17020008":"B23_217A",
      //"17020009":"B23_217B",
      //"17010005":"B23_228",
      //"17010006":"B23_229"
    //}
  //}
});
