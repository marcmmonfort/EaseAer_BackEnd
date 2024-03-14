import "dotenv/config";
import express from "express";
import cors from "cors";
import dbInit from "./db/mongo";

// IMPORT ROUTES ...
import routeUser from "./route/user.route";
import routeLocation from "./route/location.route";
import routeRatings from "./route/ratings.route";
import routePreferences from "./route/preferences.route";
import routePrediction from "./route/prediction.route";
import routeFlight from "./route/flight.route";
import routeCard from "./route/card.route";
import routePrize from "./route/prize.route";
import routeService from "./route/service.route";
import routeShop from "./route/shop.route";
import routeLuggage from "./route/luggage.route";
import routeIncident from "./route/incident.route";
import routeOffer from "./route/offer.route";
import routeProduct from "./route/product.route";
import routeMatch from "./route/match.route";
import routeNews from "./route/news.route";
import routeBooking from "./route/booking.route";
import routeGame from "./route/game.route";
import routeQuestion from "./route/question.route";

import { deleteLocalFileUser, uploadUser } from "./controller/multer/userMulter.ctrl";
import { deleteLocalFilePublication, uploadPublication } from "./controller/multer/publicationMulter.ctrl";
import http from "http";
import { createServer } from "http";
import { Server } from "socket.io";
import socket from "./chat/server";

const porto=3000;
const host="147.83.7.158"
const corsOrigin = "*";
const app = express();
const appo=express();
const httpServer = createServer(appo);
app.use(cors());
app.use(express.json());

const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
});
const port = process.env.PORT || 3001;

app.use(uploadUser.single("photoUser"), routeUser);

// USE ROUTES ...
app.use(routeLocation);
app.use(routeRatings);
app.use(routePreferences);
app.use(routePrediction);
app.use(routeFlight);
app.use(routeCard);
app.use(routePrize);
app.use(routeService);
app.use(routeShop);
app.use(routeLuggage);
app.use(routeIncident);
app.use(routeOffer);
app.use(routeProduct);
app.use(routeMatch);
app.use(routeNews);
app.use(routeBooking);
app.use(routeGame);
app.use(routeQuestion);

dbInit().then(() => console.log("Connection to MongoDB is ready"));
app.listen(port, () => console.log(`Ready on port ${port}`));
httpServer.listen(9876, () => {
    console.log(`http://147.83.7.158:9876`);
    socket({ io });
});