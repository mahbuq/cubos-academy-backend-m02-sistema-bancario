const express = require("express");
const controladores = require("./controladores/contas-bancarias");
const roteadores = express();

roteadores.get("/contas", controladores.listarTodasAsContas);
roteadores.post("/contas", controladores.criarConta);
roteadores.put("/contas/:numeroConta/usuario", controladores.atualizarConta);
roteadores.delete("/contas/:numeroConta", controladores.excluirConta);

roteadores.post("/transacoes/depositar", controladores.depositar);
roteadores.post("/transacoes/sacar", controladores.sacar);
roteadores.post("/transacoes/transferir", controladores.transferir);

roteadores.get("/contas/saldo", controladores.saldo);
roteadores.get("/contas/extrato", controladores.extrato);

module.exports = { roteadores };
