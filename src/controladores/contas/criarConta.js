const { contas } = require("../../bancodedados");

let numeroConta = 1;

function criarConta(req, res) {
   const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

   let erroCampo = "";
   if (!nome) {
      erroCampo = "nome";
   } else if (!cpf) {
      erroCampo = "cpf";
   } else if (!data_nascimento) {
      erroCampo = "data_nascimento";
   } else if (!telefone) {
      erroCampo = "telefone";
   } else if (!email) {
      erroCampo = "email";
   } else if (!senha) {
      erroCampo = "senha";
   }

   if (erroCampo) {
      res.status(400).json({
         mensagem: `Campo '${erroCampo}' deve ser informado.'`,
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

module.exports = { criarConta };
