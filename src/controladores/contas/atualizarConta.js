const { encontrarConta } = require("../../utils/encontrarConta");
const { contas } = require("../../bancodedados");

function atualizarConta(req, res) {
   const { numeroConta } = req.params;
   const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

   if (!nome && !cpf && !data_nascimento && !telefone && !email && !senha) {
      res.status(400).json({
         mensagem: "Pelo menos um campo deve ser alterado.",
      });
      return;
   }

   const conta = encontrarConta(numeroConta);

   if (!conta) {
      res.status(404).json({
         mensagem: "Não existe nenhuma conta com esse número.",
      });
      return;
   }

   const verificarCpf = contas.find((conta) => conta.cpf == cpf);
   if (verificarCpf) {
      res.status(400).json({
         mensagem: "Já existe uma conta criada com esse 'CPF'. Informe outro.",
      });
      return;
   }

   const verificarEmail = contas.find((conta) => conta.email == email);
   if (verificarEmail) {
      res.status(400).json({
         mensagem: "Já existe uma conta criada com esse 'EMAIL'. Informe outro.",
      });
      return;
   }

   if (nome) {
      conta.nome = nome;
   }
   if (cpf) {
      conta.cpf = cpf;
   }
   if (data_nascimento) {
      conta.data_nascimento = data_nascimento;
   }
   if (telefone) {
      conta.telefone = telefone;
   }
   if (email) {
      conta.email = email;
   }
   if (senha) {
      conta.senha = senha;
   }

   res.json({
      mensagem: "Conta atualizada com sucesso!",
   });
}

module.exports = { atualizarConta };
