import * as Yup from 'yup'

const msgCampoObrigatorio = "Campo obrigatório!!";

export const validationSchema = Yup.object().shape({
    sku: Yup.string().trim().required(msgCampoObrigatorio),
    nome: Yup.string().trim().required(msgCampoObrigatorio),
    descricao: Yup.string().trim().required(msgCampoObrigatorio),
    preco: Yup.number().required(msgCampoObrigatorio).moreThan(0,"Valor deverá ser maior que zero.")
});