const dir = __dirname;
const width = 64;
const height = 64;
const fs = require('fs');

const rarity = [
	{
		key: '',
		val: 'original',
		key: '_r',
		val: 'rare',
		key: '_sr',
		val: 'super rare'
	}
];

const addRarity = (_str) => {
	let itemRarity;
	rarity.forEach((r) => {
		if (_str.includes(r.key)) {
			itemRarity = r.val;
		}
	});
	return itemRarity;
};

const cleanName = (_str) => {
	let name = _str.slice(0, -4);
	rarity.forEach((r) => {
		name = name.replace(r.key, '');
	});
	return name;
};

const getElements = (path) => {
	return fs.readdirSync(path).filter((item) => !/(^|\/)\.[^\/\.]/g.test(item)).map((i, index) => {
		return {
			id: index + 1,
			name: cleanName(i),
			fileName: i,
			rarity: addRarity(i)
		};
	});
};

const layers = [
	{
		id: 1,
		name: 'backgrounds',
		location: `${dir}/backgrounds/`,
		position: { x: 0, y: 0 },
		elements: getElements(`${dir}/backgrounds/`),
		size: { width: width, height: height }
	},
	/* {
		id: 2,
		name: 'colorsRight',
		location: `${dir}/colorsRight/`,
		position: { x: 0, y: 0 },
		elements: getElements(`${dir}/colorsRight/`),
		size: { width: width, height: height }
	},
	{
		id: 3,
		name: 'colorsLeft',
		location: `${dir}/colorsLeft/`,
		position: { x: 0, y: 0 },
		elements: getElements(`${dir}/colorsLeft/`),
		size: { width: width, height: height }
	},
	{
		id: 4,
		name: 'colorsBottom',
		location: `${dir}/colorsBottom/`,
		position: { x: 0, y: 0 },
		elements: getElements(`${dir}/colorsBottom/`),
		size: { width: width, height: height }
	}, */
	{
		id: 6,
		name: 'outlines',
		location: `${dir}/outlines/`,
		position: { x: 0, y: 0 },
		elements: getElements(`${dir}/outlines/`),
		size: { width: width, height: height }
	}
];

module.exports = { layers, width, height };
