const { atualizarConta } = require("./contas/atualizarConta");
const { criarConta } = require("./contas/criarConta");
const { excluirConta } = require("./contas/excluirConta");
const { listarTodasAsContas } = require("./contas/listarTodasAsContas");

module.exports = {
   listarTodasAsContas,
   criarConta,
   atualizarConta,
   excluirConta,
};
