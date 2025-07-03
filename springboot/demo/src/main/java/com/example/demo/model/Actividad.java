package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Actividad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String email;
    private String celular;
    private String descripcion;
    private String sector;

    @ManyToOne
    @JoinColumn(name = "comuna_id")
    private Comuna comuna;

    @Column(name = "dia_hora_inicio")
    private LocalDateTime diaHoraInicio;

    @Column(name = "dia_hora_termino")
    private LocalDateTime diaHoraTermino;

    @OneToMany(mappedBy = "actividad", cascade = CascadeType.ALL)
    private List<ActividadTema> temas;

    @OneToMany(mappedBy = "actividad", cascade = CascadeType.ALL)
    private List<ContactarPor> contactos;

    @OneToMany(mappedBy = "actividad", cascade = CascadeType.ALL)
    private List<Foto> fotos;

    @OneToMany(mappedBy = "actividad", cascade = CascadeType.ALL)
    private List<Comentario> comentarios;

    @OneToMany(mappedBy = "actividad", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("actividad")
    private List<Nota> notas;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCelular() {
        return celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
    }

    public Comuna getComuna() {
        return comuna;
    }

    public void setComuna(Comuna comuna) {
        this.comuna = comuna;
    }

    public LocalDateTime getDiaHoraInicio() {
        return diaHoraInicio;
    }

    public void setDiaHoraInicio(LocalDateTime diaHoraInicio) {
        this.diaHoraInicio = diaHoraInicio;
    }

    public LocalDateTime getDiaHoraTermino() {
        return diaHoraTermino;
    }

    public void setDiaHoraTermino(LocalDateTime diaHoraTermino) {
        this.diaHoraTermino = diaHoraTermino;
    }

    public List<ActividadTema> getTemas() {
        return temas;
    }

    public void setTemas(List<ActividadTema> temas) {
        this.temas = temas;
    }

    public List<ContactarPor> getContactos() {
        return contactos;
    }

    public void setContactos(List<ContactarPor> contactos) {
        this.contactos = contactos;
    }

    public List<Foto> getFotos() {
        return fotos;
    }

    public void setFotos(List<Foto> fotos) {
        this.fotos = fotos;
    }

    public List<Comentario> getComentarios() {
        return comentarios;
    }

    public void setComentarios(List<Comentario> comentarios) {
        this.comentarios = comentarios;
    }

    public List<Nota> getNotas() {
        return notas;
    }

    public void setNotas(List<Nota> notas) {
        this.notas = notas;
    }


}
