module.exports = function (app) {
//    console.log("appRoot " + app.get("appRoot"));
//    console.log("root " + app.get("root"));
//    console.log("__dirname " + __dirname);
    const database = rootRequire("api/database.js");

    app.get("/api/users/list", async (req, res) => {
//        console.log(app.get("appRoot"));
//        console.log(app.get("root"));
//        console.log(__dirname);
        let result = await database.call('SELECT id,name,location FROM users');
//        result.rows.push(app.get("appRoot"),app.get("root"),__dirname);
        return res.json(result.rows);
        /*
        res.json([
            { name: "William", location: "Abu Dhabi" },
            { name: "Chris", location: "Vegas" },
            { name: "Aaron", location: "Jupiter" },
            { name: "Jbo", location: "Umatilla" },
            { name: "Trenton", location: "WPB" }
        ]);
        */
    });

    app.post("/api/users/add", async (req, res) => {

    try {
        let result = await database.call('insert into users (name, location ) values ($1,$2)',[req.body.name,req.body.location]);
    } catch (ex) {
        return res.send({error:(ex.stack||ex)});
    }
    res.send({body:null});


    //  return res.json(result.rows);
    
    });
};
