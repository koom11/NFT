const fs = require('fs');
const myArgs = process.argv.slice(2);
const { createCanvas, loadImage } = require('canvas');
const { layers, width, height } = require('./input/config.js');
const console = require('console');
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');
const edition = myArgs.length > 0 ? Number(myArgs[0]) : 1;
let metaData = [];
let attributes = [];
let hash = [];
let decodedHash = [];

const saveLayer = (_canvas, _edition) => {
	fs.writeFileSync(`./output/${_edition}.png`, _canvas.toBuffer('image/png'));
	console.log('Image created!');
};

const addMetaData = (_edition) => {
	let dateTime = Date.now();
	let tempMetaData = {
		hash: hash.join(''),
		decodedHash: decodedHash,
		edition: _edition,
		date: dateTime,
		attributes: attributes
	};
	metaData.push(tempMetaData);
	attributes = [];
	hash = [];
	decodedHash = [];
};

const addAttributes = (_element, _layer) => {
	let tempAttr = {
		id: _element.id,
		layer: _layer.name,
		name: _element.name,
		rarity: _element.rarity
	};
	attributes.push(tempAttr);
	hash.push(_layer.id);
	hash.push(_element.id);
	decodedHash.push({ [_layer.id]: _element.id });
};

const drawLayer = async (_layer, _edition) => {
	let element = _layer.elements[Math.floor(Math.random() * _layer.elements.length)];
	addAttributes(element, _layer);
	const image = await loadImage(`${_layer.location}${element.fileName}`);
	ctx.drawImage(image, _layer.position.x, _layer.position.y, _layer.size.width, _layer.size.height);
	saveLayer(canvas, _edition);
};

for (let i = 1; i <= edition; i++) {
	layers.forEach((layer) => {
		drawLayer(layer, i);
	});
	addMetaData(i);
	console.log('Creating edition ' + i);
}

fs.readFile('./output/_metadata.json', (err, data) => {
	if (err) throw err;
	fs.writeFileSync('./output/_metadata.json', JSON.stringify(metaData));
});
