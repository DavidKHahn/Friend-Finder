var friends = require("../data/friends.js");

module.exports = function(app) {
    app.get("/app/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/app/friends", function(req, res) {

        var closeMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        console.log(req.body);
        var userData = req.body;
        var userTotal = userData.scores;

        var totalDifference = 0;

        for (var i=0; i <friends.length; i++) {

            console.log(friends[i]);
            totalDifference = 0;

            for(var j=0; j<friends.length; j++) {
                totalDifference += Math.abs(parseInt(userTotal[j]) - parseInt(friends[i].scores[j]));

                if (totalDifference <= closeMatch.friendDifference) {

                    closeMatch.name = friends[i].name;
                    closeMatch.photo = friends[i].photo;
                    closeMatch.friendDifference = totalDifference;
                }
                }
            }
            friends.push(userData);
            res.JSON(closeMatch);
    });
}