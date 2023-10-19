import express from "express";
import cors from 'cors';
import helmet from "helmet";

import tokenRouter from './routes/tokenRouter';
import userRouter from './routes/userRouter';
import homeRouter from './routes/homeRouter';
import studentRouter from './routes/studentRoute';

import dotenv from 'dotenv';
dotenv.config();

const whiteList = [
  "http://localhost:3000",
  "http://localhost:5173"
];

const corsOptions = {
  origin: function(origin, callback){
    if(whiteList.indexOf(origin) !== -1 || !origin){
      callback(null,true);
    }else{
      callback(new Error('Not allowed by CORS.'));
    }
  }

};

class App {
  constructor(){
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true}));
    this.app.use(express.json());
  }

  routes(){
    this.app.use("/", homeRouter);
    this.app.use('/token' , tokenRouter);
    this.app.use('/users' , userRouter);
    this.app.use('/students' , studentRouter);
  }
}

export default new App().app;
