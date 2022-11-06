const MONGO_DB_CODE = 11000;
const SECRET_JWT = '682a01abafa99278b4aa6564d008c7fa07e220521e731f703975530810abadef';
const regex = /https?:\/\/(www\.)?[-a-z0-9A-Z:%._~#=]{1,150}\.[a-z0-9A-Z()]{1,10}\b([-a-z0-9A-Z()@:%_.~#?&//=]*)/;

module.exports = {
  MONGO_DB_CODE,
  SECRET_JWT,
  regex,
};
