import { Cliente } from 'app/models/clientes'
import { useFormik } from 'formik'
import { Input, InputCPF, InputDate, InputTelefone } from 'components'
import { validationSchema } from './validationShema'

interface ClienteFormProps{
    cliente: Cliente;
    onSubmit: (cliente: Cliente) => void;
}

const fromScheme: Cliente = {
    id: '',
    nome: '',
    endereco: '',
    email: '',
    telefone: '',
    cpf: '',
    dataNascimento: '',
    dataCadastro: ''
}

export const ClienteForm: React.FC<ClienteFormProps> = ({
    cliente,
    onSubmit
}) => {

    const formik = useFormik<Cliente>({
        initialValues: { ...fromScheme, ...cliente},
        onSubmit,
        enableReinitialize: true,
        validationSchema: validationSchema
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            {formik.values.id && 
                <div className='columns'>
                    <Input  id="id" 
                            name="id" 
                            label="Código: "
                            columnClasses="is-half"
                            autoComplete="off"
                            disabled
                            value={formik.values.id} />

                    <InputDate  id="dataCadastro" 
                                name="dataCadastro" 
                                label="Data Cadastro: "
                                columnClasses="is-half"
                                autoComplete="off"
                                disabled
                                //onChange={formik.handleChange}
                                value={formik.values.dataCadastro} />
                </div>
            }

                <div className='columns'>
                    <Input  id="nome" 
                            name="nome" 
                            label="Nome: *"
                            columnClasses="is-full"
                            autoComplete="off"
                            onChange={formik.handleChange} 
                            value={formik.values.nome} 
                            error={formik.errors.nome}/>
                </div>

                <div className='columns'>
                    <InputCPF  id="cpf" 
                            name="cpf" 
                            label="CPF: *"
                            columnClasses="is-half"
                            autoComplete="off"
                            onChange={formik.handleChange} 
                            value={formik.values.cpf} 
                            error={formik.errors.cpf}/>

                    <InputDate  id="dataNascimento" 
                                name="dataNascimento" 
                                label="Data Nascimento: "
                                columnClasses="is-half"
                                autoComplete="off"
                                onChange={formik.handleChange} 
                                value={formik.values.dataNascimento}
                                error={formik.errors.dataNascimento}/>
                </div>

                <div className='columns'>
                    <Input  id="endereco" 
                            name="endereco" 
                            label="Endereço: "
                            columnClasses="is-full"
                            autoComplete="off"
                            onChange={formik.handleChange} 
                            value={formik.values.endereco}
                            error={formik.errors.endereco}/>
                </div>

                <div className='columns'>
                    <Input  id="email" 
                            name="email" 
                            label="Email: "
                            columnClasses="is-half"
                            autoComplete="off"
                            onChange={formik.handleChange} 
                            value={formik.values.email}
                            error={formik.errors.email}/>

                    <InputTelefone  id="telefone" 
                            name="telefone" 
                            label="Telefone: "
                            columnClasses="is-half"
                            autoComplete="off"
                            onChange={formik.handleChange} 
                            value={formik.values.telefone}
                            error={formik.errors.telefone}/>
                </div>
                
                <div className="field is-grouped">        
                    <div className="control is-link">
                        <button type='submit' className='button'>
                            { formik.values.id ? "Atualizar" : "Salvar"}
                        </button>
                    </div>

                </div>

        </form>
    )
}