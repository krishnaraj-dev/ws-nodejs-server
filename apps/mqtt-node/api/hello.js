

const mqtt = require("mqtt");
// PEM certificate content (replace with your actual certificate content)
const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEpgIBAAKCAQEA3n6Z4iW7YvscbFmiQZzu/VH3pM00F16nv0h8ZxWiFR7nRKE6
cCxUsMYcVTB/3K52S2BIfCFUYR9oZz/dr3bhCwWBzPKIte2KgZ3k6xIGHh/SUrxz
PjrMHTikUmPfPLyObxSk8FYzvFCatZw3pC2k14E3fwNwTJb8shP3JxNWfQ48qJGw
e7gLEGTS/9EIq3sGj2KlLT+N2vVuJcKkDqdXJhzon9hbbCcrRoLhW8IjS94XtGjR
v2e9PRiJ+cwJRSYx6ypAu4+3qq7OPCdm/t2h7+nBs/44H3YsWVTYE2t2d5krnjLf
hhp4e9E+dJjBYVVhSnkWB+7vCGFAgp7fx/O+gwIDAQABAoIBAQCAsFUtOonB3GA6
QzXYIX8RwiEsjwv8IGGB/9kEfry63p8BUQfN7bYmcM/ebijmaXo+arhCI7z8WAA5
B/WfEXFkwJCtC/MK1xPvmHXZiRlEvz8VX66AZd29YQ+aH+304VK46QXlhNZzq2Nw
e6SrL0NS6ohAzKpdgk8yaN3hGgxCU6+aScWgtJKeqCJeCH08cCKj7gpZKTs7q5Dq
TRPuQ6G30IsxTE3R523YhfsafKaGaJF+23xfGHcXiAL5EM1VeP+t+aL+vpt9wjnT
GSBldX9VbzrwakL94VJanwPD8eD83hXzy3L3w/LsRm/tXA4bndZ6IyI3VBwJFoik
G9sHSxIxAoGBAPOZBLJ/lcVqU/quy8bKUn1kuS5X0zvpH+z3lPtYTQ4L3QAxXDV3
xL2tKmudDjynDZ6H62IS8leejjl/FUNCRy+OhlOcoxeQ74DDLI6lLGNfR6kAqnrj
z+O8521sdh+KDQbcVqEQZLINDBBGkAUkuXPZX/uYPV4bqtPXDyDgubblAoGBAOnS
h6hK617KZRF9q1GKn2QW16uLNFgSH8M+lusTvmMDTJ/0HTMHMQHhVuwy8kwB5dsQ
R9F5gRDZSei80beqMd4TQspIjk3CQ4NNjFHpB8dtFCXb2pIvV6u2hwKL5/Kegpof
CUxq/iQ5dki4/si/HXJIxLxNXrDcYPCd3Kkz/KFHAoGBALBOWrj6YKL+fwObyX76
ZlO9N84T4J2m7+Vpl9mGolZ9PZnrH8rPAYUqtN4oUOqTGedYhoN4JRBHgLaahQAm
EzGXXR9c6imfS8kM+c3QPF0707i886Z4BbnVukZXTvMqzpzdkpGGNOstSELrX0dp
uhPgC3kkSZ44Nh6Ws6tfGusFAoGBAK2rXnEkfF/iimEMa0PcZ3jq8nOKqG1FwOu+
wE+IUZ+vIqmnokx1afQQkARN7uN/gV9NX1p6GeAO1DOWk1oMgo+E1NX0QCYHRSfw
YGmyYMHCBfX8rwJnQYHbx7mfer8c9rpMlRZ6XZtARtfK+ArY0KFC5UVLXiqU9Tei
uPPAFkMfAoGBAJ8OltdpfoVh1yf0AqpQHFNZM3NeMUf8VX2qMesR8mBxsu42f0fd
sYXPuP+CnDcHXVXXva5SBJuCPj/DlQNWpGjS1LmptuxfX6uNr2nD4YDwR44Ma7WU
rw7omu811734RlEMVaKLBWeYO901Pw+DEQJpwz0oHL7BqO2r/fKL/R8l
-----END RSA PRIVATE KEY-----
`;

const certificate = `-----BEGIN CERTIFICATE-----
MIIDoDCCAoigAwIBAgIBADANBgkqhkiG9w0BAQsFADCBkDELMAkGA1UEBhMCR0Ix
FzAVBgNVBAgMDlVuaXRlZCBLaW5nZG9tMQ4wDAYDVQQHDAVEZXJieTESMBAGA1UE
CgwJTW9zcXVpdHRvMQswCQYDVQQLDAJDQTEWMBQGA1UEAwwNbW9zcXVpdHRvLm9y
ZzEfMB0GCSqGSIb3DQEJARYQcm9nZXJAYXRjaG9vLm9yZzAeFw0yNDAyMDExNzE0
NDBaFw0yNDA1MDExNzE0NDBaMHoxCzAJBgNVBAYTAklOMRIwEAYDVQQIDAlUYW1p
bG5hZHUxFTATBgNVBAoMDFRlc3QgcHZ0IGx0ZDEMMAoGA1UECwwDZGV2MQ4wDAYD
VQQDDAVzZXZlcjEiMCAGCSqGSIb3DQEJARYTdGVzdEBtYWlsaW5hdG9yLmNvbTCC
ASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAN5+meIlu2L7HGxZokGc7v1R
96TNNBdep79IfGcVohUe50ShOnAsVLDGHFUwf9yudktgSHwhVGEfaGc/3a924QsF
gczyiLXtioGd5OsSBh4f0lK8cz46zB04pFJj3zy8jm8UpPBWM7xQmrWcN6QtpNeB
N38DcEyW/LIT9ycTVn0OPKiRsHu4CxBk0v/RCKt7Bo9ipS0/jdr1biXCpA6nVyYc
6J/YW2wnK0aC4VvCI0veF7Ro0b9nvT0YifnMCUUmMesqQLuPt6quzjwnZv7doe/p
wbP+OB92LFlU2BNrdneZK54y34YaeHvRPnSYwWFVYUp5Fgfu7whhQIKe38fzvoMC
AwEAAaMaMBgwCQYDVR0TBAIwADALBgNVHQ8EBAMCBeAwDQYJKoZIhvcNAQELBQAD
ggEBAJ9BjV7vsxyAm9yY8E5upTniCGIo3pL1td7u3v0X1GgT6EQvtzcX1PKgsYlN
Gj/kazfc3dqJvL3bvIzv0Fe4ubcX3y79jYLLM7UoejgaDuF+xz00gwTMB1tQfi5y
RIU5alyfH8sZN1JEFUudUPxu4bbEjzbBu1e0BYFkl46qH2CPGsVa8GDjc6sXBC9c
Ney0iftpWP3xDfMPHpfhyO4GaHKQCkjcDOEoapX00KBO8tOZjC43+iVslxshtbC9
OK4WHa/oOyr2DHCvrbxWKsYXfnjWrcG/37rllizdUsAafyo8SvATNlxr4FL2ki9i
TkhIvW98uVMEUhaB6rlenyYYRCA=
-----END CERTIFICATE-----
`;

const caCertificates = [
  `-----BEGIN CERTIFICATE REQUEST-----
    MIIC1zCCAb8CAQAwejELMAkGA1UEBhMCSU4xEjAQBgNVBAgMCVRhbWlsbmFkdTEV
    MBMGA1UECgwMVGVzdCBwdnQgbHRkMQwwCgYDVQQLDANkZXYxDjAMBgNVBAMMBXNl
    dmVyMSIwIAYJKoZIhvcNAQkBFhN0ZXN0QG1haWxpbmF0b3IuY29tMIIBIjANBgkq
    hkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3n6Z4iW7YvscbFmiQZzu/VH3pM00F16n
    v0h8ZxWiFR7nRKE6cCxUsMYcVTB/3K52S2BIfCFUYR9oZz/dr3bhCwWBzPKIte2K
    gZ3k6xIGHh/SUrxzPjrMHTikUmPfPLyObxSk8FYzvFCatZw3pC2k14E3fwNwTJb8
    shP3JxNWfQ48qJGwe7gLEGTS/9EIq3sGj2KlLT+N2vVuJcKkDqdXJhzon9hbbCcr
    RoLhW8IjS94XtGjRv2e9PRiJ+cwJRSYx6ypAu4+3qq7OPCdm/t2h7+nBs/44H3Ys
    WVTYE2t2d5krnjLfhhp4e9E+dJjBYVVhSnkWB+7vCGFAgp7fx/O+gwIDAQABoBgw
    FgYJKoZIhvcNAQkHMQkMB2tleUAxMjMwDQYJKoZIhvcNAQELBQADggEBACuuTkvK
    Ju6PekaK37tdHQA5RJoKCGtFRSamZcJE/IK7hfexdydjsRvhJ5cOu4kvUbTGhMrX
    CYyjoynZbptuaDOFNOJzhcOW1LUeAS/bE6Punuln9hnW5hfx1YmNBuMofJ9u2X+c
    /aLsVfwkgbNiEfmDHaCAo+Xn2+e6LPXaWWeFTJUWD/i8uxTVs/9Xie2EXeTs5JGt
    8KWkbdF683po6m1UZeog3jH6+h69TuB5WTC/1ylZljAZim4iw6Nu/FZLxbkrG87k
    gOrSRn5Hsi4I++N0BGPtuaTBzwqMJHdNBW9Po015e0+05k4U+rpvEmmfXXPThmwz
    /8tvM54igLyLuy4=
    -----END CERTIFICATE REQUEST-----
    `,
  // Additional CA certificates if required
];

// Replace 'your-mqtt-broker-url' with the actual URL of your MQTT broker
const brokerUrl = "mqtts://test.mosquitto.org:8884";

async function initiateMQTT() {
  // Create an MQTT client
  const client = mqtt.connect(brokerUrl, {
    clientId: "default_client_id",
    clean: true,
    rejectUnauthorized: false,
    key: privateKey, // The private key
    cert: certificate, // The certificate
    ca: caCertificates, // Additional CA certificates
  });

  // Subscribe to a topic
  const topic = "mj/2C:54:91:88:C9:E3-node1";
  client.subscribe(topic, { qos: 0 }, (error) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (error) {
      return;
    }
  });

  // Handle incoming messages
  client.on("message", (receivedTopic, message) => {
    console.log(
      `Received message on topic '${receivedTopic}': ${message.toString()}`
    );
  });

  // Handle subscription events
  client.on("subscribe", (granted) => {
    console.log(`Subscribed to topic '${topic}' with QoS ${granted[0].qos}`);
  });

  // Handle connection events
  client.on("connect", () => {
    console.log("Connected to MQTT broker");
  });

  client.on("error", (error) => {
    console.error("MQTT connection error:", error);
  });

  client.on("close", () => {
    console.log("MQTT connection closed");
  });

  client.on("offline", () => {
    console.log("client go offline");
  });
}


export default async function handler(req, res) {
  const { name = "World" } = req.query;

  await initiateMQTT()
  return res.json({
    message: `Hello ${name}!`,
  });
}
