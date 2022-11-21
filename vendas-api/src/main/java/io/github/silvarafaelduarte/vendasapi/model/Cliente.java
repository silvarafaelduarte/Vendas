package io.github.silvarafaelduarte.vendasapi.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;

@Entity
@Table(name="cliente")
public class Cliente {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "cpf", length = 14)
    private String cpf;

    @Column(name = "nome", length = 100)
    private String nome;

    @Column(name = "endereco", length = 255)
    private String endereco;

    @Column(name = "telefone", length = 14)
    private String telefone;

    @Column(name = "email")
	private String email;

    @Column(name = "nascimento", length = 10)
    private LocalDate nascimento;
    
    @Column(name = "data_cadastro", updatable = false)
    private LocalDate dataCadastro;

    public Cliente(){
        super();
    }

    public Cliente(Long id, String nome, String cpf, LocalDate nascimento, 
        String endereco, String email, String telefone, LocalDate dataCadastro) {
        super();
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.nascimento = nascimento;
        this.endereco = endereco;
        this.email = email;
        this.telefone = telefone;
        this.dataCadastro = dataCadastro;
    }
    
    public Cliente(String nome, String cpf, LocalDate nascimento, String endereco, String email,
            String telefone, LocalDate dataCadastro) {
        this.nome = nome;
        this.cpf = cpf;
        this.nascimento = nascimento;
        this.endereco = endereco;
        this.email = email;
        this.telefone = telefone;
        this.dataCadastro = dataCadastro;
    }

    @PrePersist
	public void prePersist() {
		setDataCadastro(LocalDate.now());
	}

	@PreUpdate
	public void PreUpdate() {
		getDataCadastro();
	}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getNascimento() {
        return nascimento;
    }

    public void setNascimento(LocalDate nascimento) {
        this.nascimento = nascimento;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDate dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    @Override
    public String toString() {
        return "Cliente [ nome=" + nome + ", cpf=" + cpf + ", nascimento=" + nascimento + ", endereco=" + endereco + ", email=" + email + ", telefone=" + telefone + ", dataCadastro=" + dataCadastro + ", id=" + id + "]";
    }

        
    
}
