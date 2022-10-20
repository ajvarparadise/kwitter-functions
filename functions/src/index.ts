import * as functions from "firebase-functions";

const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const cors = require("cors")({ origin: true });

initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore();

export const getUserInfo = functions.https.onRequest((req, res) => {
  functions.logger.info("getUserInfo");
  cors(req, res, async () => {
    try {
      const { phone } = req.body;
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
          const data = doc.data();
          functions.logger.info("data sent", data);
          res.send(data);
        }
      }
    } catch (error) {
      functions.logger.error(error);
      res.sendStatus(400);
    }
  });
});

export const updateUserInfo = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    functions.logger.info("updateUserInfo", req.body);
    try {
      const { phone, name, email } = req.body;
      if (!phone) {
        functions.logger.info("missing params");
        res.sendStatus(400);
      } else {
        const userInfo = db.collection("user_info");
        await userInfo.doc(phone).set({
          name,
          email,
        });
        res.sendStatus(200);
      }
    } catch (error) {
      functions.logger.error(error);
      res.sendStatus(400);
    }
  });
});
