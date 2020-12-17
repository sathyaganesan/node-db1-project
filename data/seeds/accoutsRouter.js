const express = require('express');
const db = require("../dbConfig");
// const accounts = require('./accounts')

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const accounts = await db
            .select("*")
            .from("accounts")
        res.json(accounts);
    } catch(err) {
        next(err)
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const [accounts] = await db
            .select("*")
            .from("accounts")
            .where("id", req.params.id)
            .limit(1) //to limit the number of results
        res.json(accounts);
        // res.json(accounts[0]); this also works to destructure from array.
    } catch (err) {
        next(err);
    }
})

router.post("/", async (req, res, next) => {
    try {
        const payload = {
            name: req.body.name,
            budget: req.body.budget
        }
        const [id] = await db.insert(payload).into("accounts");
        // const account = await db.first().from("accounts").where("id", id); //first() helps to limiting 1 and destructuring from array.
        // const account = await db("accounts").first("*").where("id", id); this also works
        const [account] = await db.select("*").from("accounts").where("id", id);
        // instead of select "First" helps to destructure the array
        res.status(201).json(account);
    } catch (err) {
        next(err);
    }
})

router.put("/:id", async (req, res, next) => {
    try {
        const payload = {
            name: req.body.name,
            budget: req.body.budget
        }
        await db("accounts").update(payload).where("id", req.params.id);
        const account = await db("accounts").where("id", req.params.id).first();
        res.json(account);
    } catch (err) {
        next(err);
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        await db("accounts").del().where("id", req.params.id)
        res.status(204).end();
    } catch (err) {
        next(err);
    }
})

module.exports = router;
