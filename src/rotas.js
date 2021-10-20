const express = require("express");
const contas = require("./controladores/contas");
const transacoes = require("./controladores/transacoes");

const roteadores = express();

roteadores.get("/contas", contas.listarTodasAsContas);
roteadores.post("/contas", contas.criarConta);
roteadores.put("/contas/:numeroConta/usuario", contas.atualizarConta);
roteadores.delete("/contas/:numeroConta", contas.excluirConta);

roteadores.post("/transacoes/depositar", transacoes.depositar);
roteadores.post("/transacoes/sacar", transacoes.sacar);
roteadores.post("/transacoes/transferir", transacoes.transferir);

roteadores.get("/contas/saldo", transacoes.saldo);
roteadores.get("/contas/extrato", transacoes.extrato);

module.exports = { roteadores };
