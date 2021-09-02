const { banco, contas } = require("../bancodedados");

function camposInformados(req) {
   if (req.method === "POST") {
      if (!req.body.nome) return 'O campo "Nome" é obrigatório';
      if (!req.body.cpf) return 'O campo "CPF" é obrigatório';
      if (!req.body.data_nascimento)
         return 'O campo "Data de Nascimento" é obrigatório';
      if (!req.body.telefone) return 'O campo "Telefone" é obrigatório';
      if (!req.body.email) return 'O campo "E-mail" é obrigatório';
      if (!req.body.senha) return 'O campo "Senha" é obrigatório';
   } else {
      if (
         !req.body.nome &&
         !req.body.cpf &&
         !req.body.data_nascimento &&
         !req.body.telefone &&
         !req.body.email &&
         !req.body.senha
      )
         return "Pelo menos um dado deve ser alterado";
   }
}

function validadeDados(req) {
   if (req.body.cpf != Number(req.body.cpf))
      return "CPF inválido. Deve conter apenas números";
   if (req.body.telefone != Number(req.body.telefone))
      return "Telefone inválido. Deve conter apenas números";
   if (
      req.body.email.indexOf("@") === -1 ||
      req.body.email.lastIndexOf(".") < req.body.email.indexOf("@")
   )
      return "E-mail inválido";
}

function dadoRepetido(req) {
   const cpfRepetido = contas.find((conta) => conta.cpf == req.body.cpf);
   if (cpfRepetido)
      return 'Já existe uma conta criada com esse "CPF". Informe outro';
   const emailRepetido = contas.find((conta) => conta.email == req.body.email);
   if (emailRepetido)
      return 'Já existe uma conta criada com esse "Email". Informe outro';
}

function existeContaInformada(conta) {
   if (!conta)
      return "Não existe nenhuma conta com esse número. Informe outro.";
}

function numeroConta(numero) {
   if (!numero) return "É preciso informar o Número da Conta";
}

function valor(valor) {
   if (!valor || valor <= 0) return "Informe um valor válido";
}

function senha(senhaInformada, conta) {
   if (!senhaInformada) return "É preciso informar a senha";
   if (senhaInformada != conta.senha) return "Senha incorreta";
}

function saldo(req, conta) {
   if (conta.saldo < req.body.valor) return "Saldo insuficiente";
}

function contasTransferencia(req) {
   if (!req.body.numero_conta_origem)
      return "Informe uma conta de origem válida";
   if (!req.body.numero_conta_destino)
      return "Informe uma conta de destino válida";
}

module.exports = {
   camposInformados,
   validadeDados,
   dadoRepetido,
   existeContaInformada,
   numeroConta,
   valor,
   senha,
   saldo,
   contasTransferencia,
};
