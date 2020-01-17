const mongoose = require('mongoose');

const EmpresaSchema = mongoose.Schema({
	nome: {
		type: String
	},
	morada: {
		type: String
	},
	codigo_postal: {
		type: String
	},
	telefone: {
		type: String
	},
	freguesia: {
		type: String
	},
	searched: {
		type: Number
	}
});

module.exports = mongoose.model('Empresa', EmpresaSchema);
