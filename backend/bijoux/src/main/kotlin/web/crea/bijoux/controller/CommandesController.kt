package web.crea.bijoux.Controller

import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import web.crea.bijoux.Entity.Commandes
import web.crea.bijoux.Service.CommandesService

@RestController
@RequestMapping("/commandes")
class CommandesController(private val service: CommandesService) {

    @GetMapping
    fun getAllCommandes(): Flux<Commandes> = service.getAllCommandes()

    @GetMapping("/{id}")
    fun getCommandesById(@PathVariable id: Long): Mono<Commandes> = service.getCommandesById(id)

    @PostMapping
    fun createCommandes(@RequestBody commandes: Commandes): Mono<Commandes> = service.createCommandes(commandes)

    @PutMapping("/{id}")
    fun updateCommandes(@PathVariable id: Long, @RequestBody commandes: Commandes): Mono<Commandes> = service.updateCommandes(id, commandes)

    @DeleteMapping("/{id}")
    fun deleteCommandes(@PathVariable id: Long): Mono<Void> = service.deleteCommandes(id)
}
