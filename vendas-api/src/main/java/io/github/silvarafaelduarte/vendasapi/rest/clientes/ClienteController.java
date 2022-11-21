package io.github.silvarafaelduarte.vendasapi.rest.clientes;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.silvarafaelduarte.vendasapi.model.Cliente;
import io.github.silvarafaelduarte.vendasapi.model.repository.ClienteRepository;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin("*")
public class ClienteController {

    @Autowired
    private ClienteRepository repository;

    @PostMapping
	public ClienteFormRequest salvar( @RequestBody ClienteFormRequest cliente ) {
		Cliente entidadeCliente = cliente.toModel();
		repository.save(entidadeCliente);
		return ClienteFormRequest.fromModel(entidadeCliente);
	}
	
	@GetMapping
	public List<ClienteFormRequest> getLista(){
		return repository.findAll().stream()
					.map( ClienteFormRequest::fromModel )
					.collect(Collectors.toList());
	}

    @PutMapping("{id}")
	public ResponseEntity<Void> atualizar(
			@PathVariable Long id,
			@RequestBody ClienteFormRequest cliente) {
		
		Optional<Cliente> clienteExistente = repository.findById(id);
		if(clienteExistente.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		
		Cliente entidadeCliente = cliente.toModel();
		cliente.setId(id);
		repository.save(entidadeCliente);
		return ResponseEntity.noContent().build();
	}

    @GetMapping("{id}")
	public ResponseEntity<ClienteFormRequest> getById(@PathVariable Long id){
		return repository.findById(id)
				.map( ClienteFormRequest::fromModel )
				.map( clienteFR -> ResponseEntity.ok(clienteFR) )
				.orElseGet( () -> ResponseEntity.notFound().build()  );				
	}

    @DeleteMapping("{id}")
	public ResponseEntity<Object> delete(@PathVariable Long id){
		return repository
				.findById(id)
				.map( cliente -> {
					repository.delete(cliente);
					return ResponseEntity.noContent().build();
				})
				.orElseGet( () -> ResponseEntity.notFound().build()  );			
	}

}
