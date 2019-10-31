// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, async function (req, res) {
    let vocabListData = await db.VocabList.findAll({
      include: [
        {
          model: db.Vocab,
          include: [
            {
              model: db.Language,
              attributes: ['name']
            }
          ]
        },
        {
          model: db.User,
        }
      ]
    });
    
    let languageData = await db.Language.findAll();
    
    let hbsObject = {
      vocabLists: vocabListData,
      languages: languageData,
      username: vocabListData[0].dataValues.User.dataValues.username,
      userId: vocabListData[0].dataValues.User.dataValues.id,
    }
    res.render("members", hbsObject);
  });
  
};
