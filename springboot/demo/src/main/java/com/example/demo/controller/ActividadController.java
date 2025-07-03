package com.example.demo.controller;

import com.example.demo.model.*;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ActividadController {

    @Autowired
    private ActividadRepository actividadRepository;

    @Autowired
    private RegionRepository regionRepository;

    @Autowired
    private ComunaRepository comunaRepository;


    @Autowired
    private ComentarioRepository comentarioRepository;


    @Autowired
    private NotaRepository notaRepository;

    public static class NotaRequest {
        public Long actividadId;
        public int puntaje;
        public String descripcion;
    }

    @GetMapping("/actividades")
    public List<Actividad> getAllActividades() {
        return actividadRepository.findAll();
    }

    @GetMapping("/regiones")
    public List<Region> getAllRegiones() {
        return regionRepository.findAll();
    }

    @GetMapping("/comunas")
    public List<Comuna> getAllComunas() {
        return comunaRepository.findAll();
    }

    @GetMapping("/comentarios")
    public List<Comentario> getAllComentarios() {
        return comentarioRepository.findAll();
    }

    @PostMapping("/comentarios")
    public Comentario agregarComentario(@RequestBody Comentario comentario) {
        return comentarioRepository.save(comentario);
    }

    @PostMapping("/notas")
    public ResponseEntity<?> agregarNota(@RequestBody NotaRequest req) {
        Optional<Actividad> actividadOpt = actividadRepository.findById(req.actividadId);
        if (actividadOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Actividad no encontrada");
        }

        Nota nota = new Nota();
        nota.setNota(req.puntaje);
        nota.setActividad(actividadOpt.get());

        notaRepository.save(nota);
        return ResponseEntity.ok("Nota agregada");
    }

    @GetMapping("/notas")
    public List<Nota> getAllNotas() {
        return notaRepository.findAll();
    }


}
