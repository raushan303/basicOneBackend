const express = require('express');
const { subtopic } = require('../models/models');
const check = require('../middlewares/adminMiddleware');
const { CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN } = require('../SECRET_KEYS');

var Vimeo = require('vimeo').Vimeo;
const router = new express.Router();

router.post('/addSubtopic', async (req, res) => {
  try {
    // const itm1 = new subtopic(req.body);
    var client = new Vimeo(CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN);
    	// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
	let sampleFile = req.files.sampleFile;
	var ext = sampleFile.name.substr(sampleFile.name.lastIndexOf('.') + 1);

	// Use the mv() method to place the file somewhere on your server locally
	var newName=Date.now()+'.'+ext;
	sampleFile.mv('./'+newName,async function(err) {
		if (err)
		  return res.status(500).send(err);
      console.log(req.body,req.files,'/././')
      client.upload(
        './'+newName,
        function (uri) {
          console.log('File upload completed. Your Vimeo URI is:', uri)
        },
        function (bytesUploaded, bytesTotal) {
          var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2)
          console.log(bytesUploaded, bytesTotal, percentage + '%')
        },
        function (error) {
          console.log('Failed because: ' + error)
        }
      )

		res.send({message:'File uploaded!',name: newName});
	});



  } catch (e) {
    res.send(null);
  }
});

module.exports = router;
