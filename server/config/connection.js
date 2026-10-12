import { Sequelize } from "sequelize";
import config from './config.json' assert{type:'json'};

const sequelize = new Sequelize(config.database,
config.username,
config.password,

{ host: config.host,
      dialect: config.dialect,

    //Disable timestamps by default for all models

    define: { timestamps: false }

  });