const { google } = require("googleapis");
const request = require("request");

const clientId = process.env.OAUTH_CLIENT_ID;
const clientSecret = process.env.OAUTH_CLIENT_SECRET;

const oAuth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  "http://localhost:8000/Callback"
);

// app.use(cors());

// app.get("/", (req, res) => {
//   const url = oAuth2Client.generateAuthUrl({
//     scope: [
//       "https://www.googleapis.com/auth/userinfo.profile",
//       "https://www.googleapis.com/auth/userinfo.email",
//     ],
//   });

//   res.redirect(url);
// });

// app.get("/Callback", async (req, res) => {
//   const { code } = req.query;

//   const { tokens } = await oAuth2Client.getToken(code);
//   const options = {
//     uri: "http://localhost:8080/api/auth/google",
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     form: {
//       token: tokens.access_token,
//       roleUser: "PENYEWA",
//     },
//   };
//   request(options, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       res.redirect("https://fsw-frontend.vercel.app/");
//     } else {
//       res.status(500).send(error);
//     }
//   });
// });

let userRole;
const oauthGoogle = (req, res, next) => {
  userRole = req.params.role;
  const url = oAuth2Client.generateAuthUrl({
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  });

  res.redirect(url);
};

const oauthCallback = async (req, res) => {
  const { code } = req.query;

  const { tokens } = await oAuth2Client.getToken(code);
  // console.log(tokens);
  const options = {
    uri: "https://be-naqos.up.railway.app/api/auth/google",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    form: {
      token: tokens.access_token,
      roleUser: userRole,
    },
  };
  // console.log(options.form);
  request(options, function (error, response, body) {
    if (error) {
      res.status(500).send(error);
    }
    // console.log(acc_tokens, typeof userRole);

    const access_token = JSON.parse(response.body).data.access_token;
    const refresh_token = JSON.parse(response.body).data.refresh_token;
    // console.log(access_token, refresh_token);

    res.redirect(
      `https://naqos.vercel.app/auth/oauth?acc=${access_token}&ref=${refresh_token}`
    );
  });
};

// const oauthGoogle = (req, res, next) => {
//   const url = oAuth2Client.generateAuthUrl({
//     scope: [
//       "https://www.googleapis.com/auth/userinfo.profile",
//       "https://www.googleapis.com/auth/userinfo.email",
//     ],
//   });

module.exports = { oauthGoogle, oauthCallback };
