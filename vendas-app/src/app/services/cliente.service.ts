import { httpClient } from "app/http";
import { Cliente } from "app/models/clientes";
import { AxiosResponse } from "axios";

const resouceURL: string = "/api/clientes"

export const useClienteService = () => {

    const salvar = async (cliente: Cliente) : Promise<Cliente> => {
        const response: AxiosResponse<Cliente> = await httpClient.post<Cliente>( resouceURL, cliente )
        return response.data;
    }

    const atualizar = async (cliente: Cliente) : Promise<void> => {
        const url: string = `${resouceURL}/${cliente.id}`
        await httpClient.put<Cliente>(url, cliente)
    }

    const carregarCliente = async (id) : Promise<Cliente> => {
        const url: string = `${resouceURL}/${id}`
        const response: AxiosResponse<Cliente> = await httpClient.get(url);
        return response.data; 
    }

    const deletar = async (id) : Promise<void> => {
        const url: string = `${resouceURL}/${id}`
        await httpClient.delete(url);
    }

    return { 
        salvar,
        atualizar,
        carregarCliente,
        deletar
    }

}