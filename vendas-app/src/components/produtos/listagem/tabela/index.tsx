import { Produto } from 'app/models/produtos'
import { useState } from 'react'

interface TabelaProdutosProps{
    produtos: Array<Produto>;
    onEdit: (produto) => void;
    onDelete: (produto) => void;
}

export const TabelaProdutos: React.FC<TabelaProdutosProps> = ({
    produtos,
    onEdit, 
    onDelete,
}) => {
    return (
        <table className="table is-hoverable">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Sku</th>
                    <th>Descrição</th>
                    <th>Detalhamento do Produto</th>
                    <th>Preço</th>
                    <th>Opções</th>
                </tr>
            </thead>
            <tbody>
                {
                    produtos.map(produto => 
                        <ProdutoRow onDelete={onDelete} 
                                    onEdit={onEdit} 
                                    key={produto.id} 
                                    produto = {produto} />)
                }
            </tbody>
        </table>
    )
}

interface ProdutoRowProps {
    produto: Produto;
    onEdit: (produto) => void;
    onDelete: (produto) => void; 
}

const ProdutoRow: React.FC<ProdutoRowProps> = ({produto, onEdit, onDelete}) =>{

    const [ deletando, setDeletando ] = useState<boolean>(false)

    const onDeleteClick = (produto: Produto) => {
        if(deletando){
            onDelete(produto)
            setDeletando(false)
        }else{
            setDeletando(true)
        }
    }

    const cancelaDelando = () => setDeletando(false)

    return (
        <tr>
            <td>{produto.id}</td>
            <td>{produto.sku}</td>
            <td>{produto.nome}</td>
            <td>{produto.descricao}</td>
            <td>{produto.preco}</td>
            <td>
                {!deletando &&
                    <button onClick={ e => onEdit(produto) } 
                            className="button is-success is-rounded is-small">
                        Editar
                    </button>

                }

                <button onClick={ e => onDeleteClick(produto) } 
                        className="button is-danger is-rounded is-small">
                    {deletando ? "Confirmar" : "Deletar"}
                </button>

                {deletando &&
                    <button onClick={cancelaDelando} 
                            className="button is-rounded is-small">
                        Cancelar
                    </button>

                }
            </td>
        </tr>
    )
}