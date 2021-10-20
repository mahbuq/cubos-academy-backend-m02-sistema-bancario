const { depositar } = require("./transacoes/depositar");
const { extrato } = require("./transacoes/extrato");
const { sacar } = require("./transacoes/sacar");
const { saldo } = require("./transacoes/saldo");
const { transferir } = require("./transacoes/transferir");

module.exports = {
   depositar,
   extrato,
   sacar,
   saldo,
   transferir,
};
