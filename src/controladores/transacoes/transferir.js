const { format } = require("date-fns");
const { transferencias } = require("../../bancodedados");
const { encontrarConta } = require("../../utils/encontrarConta");

function transferir(req, res) {
   const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

   if (!numero_conta_origem || !numero_conta_destino || !senha) {
      res.status(400).json({
         mensagem:
            "É preciso informar o número da conta de origem e a de destino e a senha da conta de origem.",
      });
      return;
   }

   const contaOrigem = encontrarConta(numero_conta_origem);
   const contaDestino = encontrarConta(numero_conta_destino);

   if (!contaOrigem || !contaDestino) {
      res.status(404).json({
         mensagem:
            "Não existe conta de destino ou de origem com esse número. Confira os números informados.",
      });
      return;
   }

   if (!valor || valor <= 0) {
      res.status(400).json({
         mensagem: "Informe um valor válido.",
      });
      return;
   }

   if (senha != contaOrigem.senha) {
      res.status(401).json({
         mensagem: "Senha incorreta.",
      });
      return;
   }

   if (contaOrigem.saldo < valor) {
      res.status(400).json({
         mensagem: "Saldo insuficiente.",
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

module.exports = { transferir };
