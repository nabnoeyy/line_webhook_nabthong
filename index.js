const express = require("express");
const bodyParser = require("body-parser");
const { WebhookClient, Payload } = require("dialogflow-fulfillment");
const port = 4000;

//create server
const app = express();

//middleware
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("<h1>Welcome, this is a webhook for SE NPRU Line Chatbot !!!</h1>");
});

app.post("/webhook", (req, res) => {
  //create webhook client
  const agent = new WebhookClient({
    request: req,
    response: res,
  });

  console.log(
    "Dialogflow Request headers: " + JSON.stringify(req.headers)
  );
  console.log("Dialogflow Request body: " + JSON.stringify(req.body));

  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  function calculateArea(agent) {
    let width = agent.parameters.width;
    let length = agent.parameters.length;
    let result = width * length;

    const flexMessage = {
      type: "flex",
      altText: "Flex Message",
      contents: {
        "type": "bubble",
        "hero": {
          "type": "image",
          "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSquHMaNnug3BPNukvxmRCNlZkCwydeH4mgNA&s",
          "size": "full",
          "aspectRatio": "20:13",
          "aspectMode": "cover",
          "action": {
            "type": "uri",
            "uri": "https://line.me/"
          }
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "พื้นที่รูปสี่เหลี่ยม" + result + "ตร.ซม.",
              "weight": "bold",
              "size": "md"
            },
            {
              "type": "box",
              "layout": "vertical",
              "margin": "lg",
              "spacing": "sm",
              "contents": [
                {
                  "type": "box",
                  "layout": "baseline",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "text",
                      "text": "ความยาว" + length + "ตร.ซม.",
                      "color": "#aaaaaa",
                      "size": "sm"
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "text",
                      "text": "ความกว้าง" + width + "ตร.ซม.",
                      "color": "#aaaaaa",
                      "size": "sm"
                    }
                  ]
                }
              ]
            }
          ]
        },
        "footer": {
          "type": "box",
          "layout": "vertical",
          "spacing": "sm",
          "contents": [
            {
              "type": "button",
              "style": "primary",
              "height": "sm",
              "action": {
                "type": "uri",
                "label": "WEBSITE",
                "uri": "https://www.greenygrass.co.th/calculation-area"
              }
            }
          ]
        }
      }
    }
    let payload = new Payload("LINE", flexMessage, { sendAsMessage: true });
    agent.add(payload);
  }


  function calculateCircleArea(agent) {
    let pi = Math.PI
    let r = agent.parameters.r
    let result = (pi * r ** 2).toFixed(2);

    const flexMessage = {
      type: "flex",
      altText: "Flex Message",
      contents: {
        "type": "bubble",
        "hero": {
          "type": "image",
          "url": "https://png.pngtree.com/png-clipart/20210311/original/pngtree-brush-circle-creative-brush-effect-png-image_6020152.jpg",
          "size": "full",
          "aspectRatio": "20:13",
          "aspectMode": "cover",
          "action": {
            "type": "uri",
            "uri": "https://line.me/"
          }
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "พื้นที่วงกลม :" + result + "ตร.ซม.",
              "weight": "bold",
              "size": "md"
            },
            {
              "type": "box",
              "layout": "vertical",
              "margin": "lg",
              "spacing": "sm",
              "contents": [
                {
                  "type": "box",
                  "layout": "baseline",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "text",
                      "text": "ความยาวรัศมี" + r + "ตร.ซม.",
                      "color": "#aaaaaa",
                      "size": "sm"
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "text",
                      "text": "ความยาวรัศมี" + r + "ตร.ซม.",
                      "color": "#aaaaaa",
                      "size": "sm"
                    }
                  ]
                }
              ]
            }
          ]
        },
        "footer": {
          "type": "box",
          "layout": "vertical",
          "spacing": "sm",
          "contents": [
            {
              "type": "button",
              "style": "primary",
              "height": "sm",
              "action": {
                "type": "uri",
                "label": "WEBSITE",
                "uri": "https://www.smartmathpro.com/article/circle-m3/"
              }
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [],
              "margin": "sm"
            }
          ]
        }
      }
    }
    let payload = new Payload("LINE", flexMessage, { sendAsMessage: true });
    agent.add(payload);
  }


  function calculateTriangleArea(agent) {
    let base = agent.parameters.base;
    let height = agent.parameters.height;
    let result = 0.5 * base * height;
    const flexMessage = {
      type: "flex",
      altText: "Flex Message",
      contents: {
        "type": "bubble",
        "hero": {
          "type": "image",
          "url": "https://png.pngtree.com/png-clipart/20200401/original/pngtree-3d-triangle-vector-with-six-different-colors-png-image_5336914.jpg",
          "size": "full",
          "aspectRatio": "20:13",
          "aspectMode": "cover",
          "action": {
            "type": "uri",
            "uri": "https://line.me/"
          }
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "พื้นที่สามเหลี่ยม :" + result + "ตร.ซม.",
              "weight": "bold",
              "size": "md"
            },
            {
              "type": "box",
              "layout": "vertical",
              "margin": "lg",
              "spacing": "sm",
              "contents": [
                {
                  "type": "box",
                  "layout": "baseline",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "text",
                      "text": "ฐาน" + base + "ตร.ซม.",
                      "color": "#aaaaaa",
                      "size": "sm"
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "text",
                      "text": "ความสูง" + height + "ตร.ซม.",
                      "color": "#aaaaaa",
                      "size": "sm"
                    }
                  ]
                }
              ]
            }
          ]
        },
        "footer": {
          "type": "box",
          "layout": "vertical",
          "spacing": "sm",
          "contents": [
            {
              "type": "button",
              "style": "primary",
              "height": "sm",
              "action": {
                "type": "uri",
                "label": "WEBSITE",
                "uri": "https://www.smartmathpro.com/article/circle-m3/"
              }
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [],
              "margin": "sm"
            }
          ]
        }
      }
    }
    let payload = new Payload("LINE", flexMessage, { sendAsMessage: true });
    agent.add(payload);
  }



  function bodyMassIndex(agent) {
    let weight = agent.parameters.weight;
    let height = agent.parameters.height / 100;
    let bmi = (weight / (height * height)).toFixed(2);

    let result = "ขออภัย หนูไม่เข้าใจ";

    if (bmi < 18.5) {
      result = "คุณผอมไป กินข้าวบ้างนะ";
    } else if (bmi >= 18.5 && bmi <= 22.9) {
      result = "คุณหุ่นดีจุงเบย";
    } else if (bmi >= 23 && bmi <= 24.9) {
      result = "คุณเริ่มจะท้วมแล้วนะ";
    } else if ((bmi >= 25.8) & (bmi <= 29.9)) {
      result = "คุณอ้วนละ ออกกำลังกายหน่อยนะ";
    } else if (bmi > 30) {
      result = "คุณอ้วนเกินไปละ หาหมอเหอะ";
    }
    const flexMessage = {
      type: "flex",
      altText: "Flex Message",
      contents: {
        type: "bubble",
        header: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: "BMI Calculation Result",
              weight: "bold",
              size: "lg",
              align: "center",
            },
          ],
        },
        hero: {
          type: "image",
          url: "https://lirp.cdn-website.com/69c0b277/dms3rep/multi/opt/BMI+levels-1920w.jpg",
          size: "full",
          aspectRatio: "20:13",
          aspectMode: "cover",
        },
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: "Your BMI Result",
              weight: "bold",
              size: "md",
              margin: "md",
            },
            {
              type: "text",
              text: "Height: " + height * 100 + " cm",
              size: "sm",
              margin: "sm",
            },
            {
              type: "text",
              text: "Weight: " + weight + " kg",
              size: "sm",
              margin: "sm",
            },
            {
              type: "separator",
              margin: "lg",
            },
            {
              type: "text",
              text: "BMI: " + bmi,
              weight: "bold",
              size: "xl",
              align: "center",
              margin: "lg",
              color: "#00b900",
            },
            {
              type: "text",
              text: result,
              align: "center",
              size: "sm",
              margin: "md",
            },
          ],
        },
        footer: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "button",
              action: {
                type: "uri",
                label: "รายละเอียดเพิ่มเติม",
                uri: "https://samitivejchinatown.com/th/article/health/BMI-calculator",
              },
              style: "primary",
              color: "#1DB446",
            },
          ],
        },
      },
    };

    let payload = new Payload("LINE", flexMessage, { sendAsMessage: true });
    agent.add(payload);
    // agent.add(result);
  }

  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", welcome);
  intentMap.set("Default Fallback Intent", fallback);
  intentMap.set("BMI - custom - yes", bodyMassIndex);
  intentMap.set("area - rectangle - custom - yes", calculateArea);
  intentMap.set("area - circle - custom - yes", calculateCircleArea);
  intentMap.set("area - Triangle - custom - yes", calculateTriangleArea);
  agent.handleRequest(intentMap);
}
);

app.listen(port, () => {
  console.log("Server is running at http://localhost:" + port);
});