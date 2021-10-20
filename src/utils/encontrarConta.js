const { contas } = require("../bancodedados");

function encontrarConta(numeroInformado) {
   const conta = contas.find((conta) => conta.numero == numeroInformado);
   return conta;
}

module.exports = { encontrarConta };
