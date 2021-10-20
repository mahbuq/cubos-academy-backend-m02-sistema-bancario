const { saques } = require("../../bancodedados");
const { encontrarConta } = require("../../utils/encontrarConta");
const { format } = require("date-fns");

function sacar(req, res) {
   const { numero_conta, valor, senha } = req.body;

   if (!numero_conta || !senha) {
      res.status(400).json({
         mensagem: "É preciso informar o número da conta e a senha.",
      });
      return;
   }

   const conta = encontrarConta(numero_conta);
   if (!conta) {
      res.status(404).json({
         mensagem: "Não existe conta com esse número.",
      });
      return;
   }

   if (!valor || valor <= 0) {
      res.status(400).json({
         mensagem: "Informe um valor válido.",
      });
      return;
   }

   if (senha != conta.senha) {
      res.status(401).json({
         mensagem: "Senha incorreta.",
      });
      return;
   }

   if (conta.saldo < valor) {
      res.status(400).json({
         mensagem: "Saldo insuficiente.",
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

module.exports = { sacar };
