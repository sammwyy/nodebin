const express = require('express');
const mongoose = require('mongoose');
const config = require('../../config.json');

const Entry = require('../models/entry.js');
const router = express.Router();

router.post("/add", async (req, res) => {
	const body = req.body;

	if (body.title == null || body.content == null || body.title == "" || body.content == "") {
		res.json({
			status: "Error",
			error: "Title or content is empty"
		})
	} else if (body.title.length > config.maxTitleCharacters) {
		res.json({
			status: "Error",
			error: `Title can't be longer than ${config.maxTitleCharacters} characters`
		})
	} else if (body.description.length > config.maxDescriptionCharacters) {
		res.json({
			status: "Error",
			error: `Description can't be longer than ${config.maxDescriptionCharacters} characters`
		})
	} else if (body.content.length > config.maxContentCharacters) {
		res.json({
			status: "Error",
			error: `Content can't be longer than ${config.maxContentCharacters} characters`
		})
	} else {
		const entry = new Entry(body);
		await entry.save();
		res.json({
			status: "OK",
			id: entry._id
		})
	}
});

router.get("/get/:id", async (req, res) => {
	const id = req.params.id;
	let entry = await Entry.findById(id).catch(err => {
    	return {status: "Error", error: "Error while fetching the data on the database"};
	});
	
	if (entry == null) entry = {status: "Error", error: "Entry not found"}
	res.json(entry)
});

module.exports = router;