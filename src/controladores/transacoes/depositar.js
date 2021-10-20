const { depositos } = require("../../bancodedados");
const { encontrarConta } = require("../../utils/encontrarConta");
const { format } = require("date-fns");

function depositar(req, res) {
   const { numero_conta, valor } = req.body;

   if (!numero_conta) {
      res.status(400).json({
         mensagem: "É preciso informar o número da conta",
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

   conta.saldo += Number(req.body.valor);
   depositos.push({
      data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      ...req.body,
   });
   res.json({ mensagem: "Depósito realizado com sucesso!" });
}

module.exports = { depositar };
