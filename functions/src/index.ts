import * as functions from "firebase-functions";

const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore();

export const getUserInfo = functions.https.onRequest(
  async (req, res) => {
    functions.logger.info("getUserInfo");
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST");

    try {
      const phone = typeof (req.body) === "string"
        ? JSON.parse(req.body).phone
        : req.body.phone;
      if (!phone) {
        functions.logger.info("missing params");
        res.sendStatus(400);
      } else {
        const userInfo = db.collection("user_info");
        const doc = await userInfo.doc(phone).get();
        if (!doc.exists) {
          functions.logger.info("no data");
          res.sendStatus(400);
        } else {
          const data = doc.data()
          functions.logger.info("data sent", data);
          res.send(data);
        }
      }
    } catch (error) {
      functions.logger.error(error);
      res.sendStatus(400);
    }
  },
);

export const updateUserInfo = functions.https.onRequest(
  async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST");

    functions.logger.info("updateUserInfo", req.body);
    try {
      const phone = typeof (req.body) === "string"
        ? JSON.parse(req.body).phone
        : req.body.phone;
      if (!phone) {
        functions.logger.info("missing params");
        res.sendStatus(400);
      } else {
        const userInfo = db.collection("user_info");
        const {name, email} = JSON.parse(req.body)        
        await userInfo.doc(phone).set({
          name,
          email,
        });
        res.sendStatus(200);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  },
);
