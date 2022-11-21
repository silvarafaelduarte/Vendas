import * as Yup from 'yup'

const msgCampoObrigatorio = "Campo obrigatório!!";

export const validationSchema = Yup.object().shape({
    nome: Yup.string().trim().required(msgCampoObrigatorio),
    endereco: Yup.string().trim().required(msgCampoObrigatorio),
    email: Yup.string().trim().required(msgCampoObrigatorio).email("E-mail inválido"),
    telefone: Yup.string().trim().required(msgCampoObrigatorio),
    cpf: Yup.string().trim().required(msgCampoObrigatorio).length(14, "CPF invélido"),
    dataNascimento: Yup.string().trim().required(msgCampoObrigatorio).length(10, "Data inválida")
});