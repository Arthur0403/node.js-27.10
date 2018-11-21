const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = Buffer.alloc(32);  // 32 bytes
const iv = Buffer.alloc(16);  // 16 bytes

exports.encrypt = (text) => {
	let cipher = crypto.createCipheriv(algorithm, key, iv);
	let encrypted = cipher.update(text);
	encrypted = Buffer.concat([encrypted, cipher.final()]);

	return iv.toString('hex') + ':' + encrypted.toString('hex');
};

exports.decrypt = (text) => {
	let textParts = text.split(':');
	let iv = new Buffer(textParts.shift(), 'hex');
	let encryptedText = new Buffer(textParts.join(':'), 'hex');
	let decipher = crypto.createDecipheriv(algorithm, key, iv);
	let decrypted = decipher.update(encryptedText);
	decrypted = Buffer.concat([decrypted, decipher.final()]);

	return decrypted.toString();
};
