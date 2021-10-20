const { depositos, saques, transferencias } = require("../../bancodedados");
const { encontrarConta } = require("../../utils/encontrarConta");

function extrato(req, res) {
   const { numero_conta, senha } = req.query;

   if (!numero_conta || !senha) {
      res.status(400).json({
         mensagem: "É preciso informar o número da conta e a senha.",
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
         mensagem: "Senha incorreta",
      });
      return;
   }

   const depositosRealizados = depositos.filter(
      (deposito) => deposito.numero_conta == numero_conta
   );
   const saquesRealizados = saques.filter((saque) => saque.numero_conta == numero_conta);
   const transferenciasEnviadas = transferencias.filter(
      (transferencia) => transferencia.numero_conta_origem == numero_conta
   );
   const transferenciaRecebidas = transferencias.filter(
      (transferencia) => transferencia.numero_conta_destino == numero_conta
   );

   res.json({
      depositos: depositosRealizados,
      saques: saquesRealizados,
      transferenciasEnviadas: transferenciasEnviadas,
      transferenciasRecebidas: transferenciaRecebidas,
   });
}

module.exports = { extrato };
