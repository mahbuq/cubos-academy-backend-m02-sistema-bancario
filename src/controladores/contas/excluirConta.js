const { contas } = require("../../bancodedados");

const { encontrarConta } = require("../../utils/encontrarConta");

function excluirConta(req, res) {
   const { numeroConta } = req.params;

   const conta = encontrarConta(numeroConta);
   if (!conta) {
      res.status(404).json({
         mensagem: "Não existe conta com esse número.",
      });
      return;
   }

   if (conta.saldo != 0) {
      res.status(400).json({
         mensagem: "Conta possui saldo diferente de zero. Não é possível deletar conta.",
      });
      return;
   }

   contas.splice(contas.indexOf(conta), 1);
   res.json({
      mensagem: "Conta excluída com sucesso!",
   });
}

module.exports = { excluirConta };
