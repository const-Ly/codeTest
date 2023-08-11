const express = require('express');
const fs = require('fs');
const speechSdk = require('microsoft-cognitiveservices-speech-sdk');

console.log(speechSdk.AudioConfig.fromStreamOutput)
const app = express();
const port = 3006;


app.all('*', function(req, res, next) {
	console.log(req.method);
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Headers',
		'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, Content-Disposition, Accept-Ranges'
	);
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
	res.header('Access-Control-Max-Age', 1728000); //预请求缓存20天

	next();
});

app.use(express.json());

const speechConfig = speechSdk.SpeechConfig.fromSubscription("5a2f07658b8142a3a1208786dc69e706", "eastasia");

app.post('/text-to-speech', (req, res) => {
	const {
		text
	} = req.body;
	if (!text) {
		return res.status(400).json({
			error: 'Text parameter is missing.'
		});
	}

	const audioConfig = speechSdk.AudioConfig.fromAudioFileOutput("./output.wav");
	const synthesizer = new speechSdk.SpeechSynthesizer(speechConfig, audioConfig);

	synthesizer.speakTextAsync(
		text,
		result => {
			if (result.reason === speechSdk.ResultReason.SynthesizingAudioCompleted) {
				const audioStream = fs.createReadStream("./output.wav");
				res.set({
					'Content-Type': 'audio/wav',
					'Accept-Ranges': 'bytes',
				});
				audioStream.pipe(res);
			} else {
				console.error(`Error synthesizing speech: ${result.errorDetails}`);
				res.status(500).json({
					error: 'Error synthesizing speech.'
				});
			}
		},
		error => {
			console.error(`Error synthesizing speech: ${error}`);
			res.status(500).json({
				error: 'Error synthesizing speech.'
			});
		}
	);
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});