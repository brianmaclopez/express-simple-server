const express = require('express');
const router = express.Router();
router.use(logger);


function logger(req, res, next) {
    console.log("Request IP: " + req.ip);
    console.log("Request Method: " + req.method);
    console.log("Request date: " + new Date());
    
    next(); // THIS IS IMPORTANT!
}
// Make sure dynamic route is below static routes, 
// otherwise the dynamic router will interpret the static route 
// param as a value.
router.get('/', (req, res) => {
    console.log(req.query.name)
    res.send("User List");
});

router.get('/new', logger, (req, res) => {
    res.render("users/new", {firstName: 'Test'});
});

router.post("/", logger, (req, res) => {
    const isValid = true;
    if (isValid) {
        users.push(req.body.firstName);
        res.redirect(`users/${users.length - 1}`);
        // Push to new array and redirect
    } else {
        console.log('Error');
        res.render('users/new', {firstName: req.body.firstName});

        // Log error, repopulate form with last input
    }
});

/*  === Patern Below is fairly common ===
 *  === Express abstracts it into a route() function ===
 * 
 * router.get("/:id", (req, res) => {
 *     res.send(`Get User With ID ${req.params.id}`);
 * });
 * 
 * router.put("/:id", (req, res) => {
 *     res.send(`Update User With ID ${req.params.id}`);
 * });
 * 
 * router.post("/:id", (req, res) => {
 *     res.send(`Delete User With ID ${req.params.id}`);
 * });
 */

/* ========= Above pattern abstracted into the `route()` method ========= */
router
    .route("/:id")
    .get((req, res) => {
        console.log(req.user)
        res.send(`Get User With ID ${req.params.id}`);
    })
    .put((req, res) => {
        res.send(`Update User With ID ${req.params.id}`);
    })
    .delete((req, res) => {
        res.send(`Delete User With ID ${req.params.id}`);
    })

const users = [{ name: "Kyle"}, {name: "Sally"}];
router.param("id", (req, res, next, id) => {
    req.user = users[id];
    next();
});

module.exports = router;