const { encontrarConta } = require("../../utils/encontrarConta");

function saldo(req, res) {
   const { numero_conta, senha } = req.query;

   if (!numero_conta || !senha) {
      res.status(400).json({
         mensagem: "É preciso informar o número da conta e a senha",
      });
      return;
   }

   const conta = encontrarConta(numero_conta);
   if (!conta) {
      res.status(404).json({
         mensagem: "Não existe nenhuma conta com esse número.",
      });
      return;
   }

   if (senha != conta.senha) {
      res.status(401).json({
         mensagem: "Senha incorreta.",
      });
      return;
   }

   res.json({
      saldo: conta.saldo,
   });
}

module.exports = { saldo };
