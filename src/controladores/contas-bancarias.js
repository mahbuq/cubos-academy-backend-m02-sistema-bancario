const {
   banco,
   contas,
   depositos,
   saques,
   transferencias,
} = require("../bancodedados");
const verificar = require("../verificacoes/verificacoes");

const { format } = require("date-fns");

function listarTodasAsContas(req, res) {
   const erro = verificar.senha(req.query.senha_banco, banco);
   if (erro) {
      res.status(400).json({
         mensagem: erro,
      });
      return;
   }
   res.json(contas);
}

let numeroConta = 1;

function criarConta(req, res) {
   const erro =
      verificar.camposInformados(req) ||
      verificar.validadeDados(req) ||
      verificar.dadoRepetido(req);

   if (erro) {
      res.status(400).json({
         mensagem: erro,
      });
      return;
   }

   const novoCliente = {
      nome: req.body.nome,
      cpf: req.body.cpf,
      data_nascimento: req.body.data_nascimento,
      telefone: req.body.telefone,
      email: req.body.email,
      senha: req.body.senha,
   };

   contas.push({
      numero: numeroConta,
      saldo: 0,
      ...novoCliente,
   });

   res.status(201).json({
      numero: numeroConta,
      saldo: 0,
      usuario: {
         ...novoCliente,
      },
   });

   numeroConta++;
}

function encontrarConta(numeroInformado) {
   const conta = contas.find((conta) => conta.numero == numeroInformado);
   return conta;
}

function atualizarConta(req, res) {
   const conta = encontrarConta(req.params.numeroConta);
   const erro =
      verificar.camposInformados(req) ||
      verificar.dadoRepetido(req) ||
      verificar.existeContaInformada(conta);
   if (erro) {
      res.status(400).json({
         mensagem: erro,
      });
      return;
   }

   if (req.body.nome) {
      conta.nome = req.body.nome;
   }
   if (req.body.cpf) {
      conta.cpf = req.body.cpf;
   }
   if (req.body.data_nascimento) {
      conta.data_nascimento = req.body.data_nascimento;
   }
   if (req.body.telefone) {
      conta.telefone = req.body.telefone;
   }
   if (req.body.email) {
      conta.email = req.body.email;
   }
   if (req.body.senha) {
      conta.senha = req.body.senha;
   }

   res.json({
      mensagem: "Conta atualizada com sucesso!",
   });
}

function excluirConta(req, res) {
   const conta = encontrarConta(req.params.numeroConta);
   const erro = verificar.existeContaInformada(conta);

   if (erro) {
      res.status(404).json({
         mensagem: erro,
      });
      return;
   }

   if (conta.saldo != 0) {
      res.status(400).json({
         mensagem:
            "Conta possui saldo diferente de zero. Não é possível deletar conta.",
      });
      return;
   }

   contas.splice(contas.indexOf(conta), 1);
   res.json({
      mensagem: "Conta excluída com sucesso!",
   });
}

function depositar(req, res) {
   const conta = encontrarConta(req.body.numero_conta);
   const erro =
      verificar.numeroConta(req.body.numero_conta) ||
      verificar.valor(req.body.valor) ||
      verificar.existeContaInformada(conta);
   if (erro) {
      res.status(400).json({
         mensagem: erro,
      });
      return;
   }

   conta.saldo += Number(req.body.valor);
   depositos.push({
      data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      ...req.body,
   });
   res.json({ mensagem: "Depósito realizado com sucesso!" });
}

function sacar(req, res) {
   const conta = encontrarConta(req.body.numero_conta);
   const erro =
      verificar.numeroConta(req.body.numero_conta) ||
      verificar.existeContaInformada(conta) ||
      verificar.valor(req.body.valor) ||
      verificar.senha(req.body.senha, conta) ||
      verificar.saldo(req, conta);
   if (erro) {
      res.status(400).json({
         mensagem: erro,
      });
      return;
   }

   conta.saldo -= Number(req.body.valor);
   saques.push({
      data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      numero_conta: req.body.numero_conta,
      valor: req.body.valor,
   });
   res.json({ mensagem: "Saque realizado com sucesso!" });
}

function transferir(req, res) {
   const contaOrigem = encontrarConta(req.body.numero_conta_origem);
   const contaDestino = encontrarConta(req.body.numero_conta_destino);

   const erro =
      verificar.contasTransferencia(req) ||
      verificar.valor(req.body.valor) ||
      verificar.existeContaInformada(contaOrigem) ||
      verificar.existeContaInformada(contaDestino) ||
      verificar.senha(req.body.senha, contaOrigem) ||
      verificar.saldo(req, contaOrigem);

   if (erro) {
      res.status(400).json({
         mensagem: erro,
      });
      return;
   }

   contaOrigem.saldo -= Number(req.body.valor);
   contaDestino.saldo += Number(req.body.valor);

   transferencias.push({
      data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      numero_conta_origem: req.body.numero_conta_origem,
      numero_conta_destino: req.body.numero_conta_destino,
      valor: req.body.valor,
   });

   res.json({ mensagem: "Transferência realizada com sucesso!" });
}

function saldo(req, res) {
   const conta = encontrarConta(req.query.numero_conta);
   const erro =
      verificar.numeroConta(req.query.numero_conta) ||
      verificar.existeContaInformada(conta) ||
      verificar.senha(req.query.senha, conta);

   if (erro) {
      res.status(400).json({
         mensagem: erro,
      });
      return;
   }

   res.json({
      saldo: conta.saldo,
   });
}

function extrato(req, res) {
   const conta = encontrarConta(req.query.numero_conta);
   const numero = req.query.numero_conta;
   const erro =
      verificar.numeroConta(numero) ||
      verificar.existeContaInformada(conta) ||
      verificar.senha(req.query.senha, conta);
   if (erro) {
      res.status(400).json({
         mensagem: erro,
      });
      return;
   }

   const depositosRealizados = depositos.filter(
      (deposito) => deposito.numero_conta == numero
   );
   const saquesRealizados = saques.filter(
      (saque) => saque.numero_conta == numero
   );
   const transferenciasEnviadas = transferencias.filter(
      (transferencia) => transferencia.numero_conta_origem == numero
   );
   const transferenciaRecebidas = transferencias.filter(
      (transferencia) => transferencia.numero_conta_destino == numero
   );

   res.json({
      depositos: depositosRealizados,
      saques: saquesRealizados,
      transferenciasEnviadas: transferenciasEnviadas,
      transferenciasRecebidas: transferenciaRecebidas,
   });
}

module.exports = {
   listarTodasAsContas,
   criarConta,
   atualizarConta,
   excluirConta,
   depositar,
   sacar,
   transferir,
   saldo,
   extrato,
};
