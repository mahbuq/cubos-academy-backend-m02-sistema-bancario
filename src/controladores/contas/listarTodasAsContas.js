const { banco, contas } = require("../../bancodedados");

function listarTodasAsContas(req, res) {
   const { senha_banco } = req.query;

   if (!senha_banco) {
      res.status(401).json({
         mensagem: "É preciso informar a senha para acesso.",
      });
      return;
   }

   if (senha_banco !== banco.senha) {
      res.status(401).json({
         mensagem: "Senha incorreta.",
      });
      return;
   }

   res.json(contas);
}

module.exports = { listarTodasAsContas };
