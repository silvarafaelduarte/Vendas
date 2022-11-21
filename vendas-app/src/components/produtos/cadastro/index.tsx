import { useState, useEffect } from 'react'
import { Layout, Input, InputMoney } from 'components'
import { useProdutoService } from 'app/services'
import { Produto } from 'app/models/produtos'
import { converterBigDecimal, formatReal } from 'app/util/money'
import { Alert } from 'components/common/message'
import { validationSchema } from './validationShema'
import { useRouter } from 'next/router'
import Link from 'next/link'

interface FormErros {
    sku?: string;
    nome?: string;
    descricao?: string;
    preco?: string;
}

export const CadastroProdutos: React.FC = () =>{

    const service = useProdutoService()
    const [ sku, setSku ] = useState<string>('')
    const [ nome, setNome ] = useState<string>('')
    const [ descricao, setDescricao ] = useState<string>('')
    const [ preco, setPreco ] = useState<string>('')
    const [ id, setId ] = useState<string>('')
    const [ cadastro, setCadastro ] = useState<string>('')
    const [ messages, setMessages ] = useState<Array<Alert>>([])
    const [ errors, setErrors ] = useState<FormErros>({})
    const router = useRouter();
    const { id: queryId } = router.query;

    useEffect( () => {

        if(queryId){
            service.carregarProduto(queryId).then(produtoEncontrado =>{
                setId(produtoEncontrado.id)
                setSku(produtoEncontrado.sku)
                setNome(produtoEncontrado.nome)
                setDescricao(produtoEncontrado.descricao)
                setPreco(formatReal(`${produtoEncontrado.preco}`))
                setCadastro(produtoEncontrado.cadastro || '')
            })
        }
    }, [ queryId ] )

    const submit = () => {
        const produto: Produto = {
            id,
            sku,
            nome,
            descricao,
            preco: converterBigDecimal(preco)
        }

        validationSchema.validate(produto).then(obj => {
            setErrors({})

            if (id){
                service
                    .atualizar(produto)
                    .then(response => {
                        setMessages([{
                            tipo: "success", texto: "Produto atualizado com sucesso!!"
                        }])
                    })
            } else {
                service
                    .salvar(produto)
                    .then(produtoResposta => {
                        setId(produtoResposta.id)
                        setCadastro(produtoResposta.cadastro)
                        setMessages([{
                            tipo: "success", texto: "Produto cadastrado com sucesso!!"
                        }])
                    })
            }
        }).catch(err => {
            const field = err.path;
            const message = err.message;

            setErrors({
                [field]: message
            })
        })
    }

    return (
        <Layout titulo="Cadastro de Produtos" mensagens={messages}>
            { id &&
                <div className="columns">
                    <Input label="Código:" 
                        columnClasses="is-one-fifth" 
                        value={id}
                        id="inputId"
                        disabled={true}
                        />

                    <Input label="Data Cadastro:" 
                        columnClasses="is-half" 
                        value={cadastro}
                        id="inputDataCadastro"
                        disabled
                        />
                </div>
            }

            <div className="columns">
                <Input  label="SKU: *"
                        columnClasses="is-one-fifth"
                        onChange={ e => setSku(e.target.value) }
                        value={sku}
                        id="inputCodigo"
                        placeholder="Digite o código"
                        error={errors.sku}
                        />
           </div>

            <div className="columns">
                <Input  label="Descrição: *"
                            columnClasses="is-full"
                            onChange={ e => setNome(e.target.value) }
                            value={nome}
                            id="inputNome"
                            placeholder="Digite a descrição do Produto"
                            error={errors.nome}
                />
            </div>

            <div className="columns">
                <div className="field column is-full">
                    <label className="label" htmlFor="inputDescricaoDetalhada">Detalhamento do Produto: *</label>
                    <div className="control">
                        <textarea className="textarea" 
                                id="inputDescricaoDetalhada" value={descricao}
                                onChange={ event => setDescricao(event.target.value) }
                                placeholder="Digite o detalhamento do Produto"/>
                        { errors.descricao && 
                            <p className="help is-danger">{errors.descricao}</p>
                        }
                    </div>
                </div>
            </div>

            <div className="columns">
                <InputMoney  label="Valor: *"
                                columnClasses="is-one-fifth"
                                onChange={ e => setPreco(e.target.value) }
                                value={preco}
                                id="InputMoney"
                                placeholder="Digite o valor"
                                maxLength={16}
                                error={errors.preco}/>
            </div>

            <div className="field is-grouped"> 
                <div className="control is-link is-light">
                    <button onClick={submit} className="button">
                        { id ? "Atualizar" : "Salvar" }
                    </button>
                </div>     
                <div className="control">
                    <Link href="/consultas/produtos">
                        <button className="button">Voltar</button>
                    </Link>
                </div>

            </div>

        </Layout>
    )
}