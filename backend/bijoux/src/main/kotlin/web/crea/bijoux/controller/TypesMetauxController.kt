package web.crea.bijoux.Controller

import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import web.crea.bijoux.Entity.TypesMetaux
import web.crea.bijoux.Service.TypesMetauxService

@RestController
@RequestMapping("/typesMetaux")
class TypesMetauxController(private val service: TypesMetauxService) {

    @GetMapping
    fun getAllTypesMetaux(): Flux<TypesMetaux> = service.getAllTypesMetaux()

    @GetMapping("/{id}")
    fun getTypesMetauxById(@PathVariable id: Long): Mono<TypesMetaux> = service.getTypesMetauxById(id)

    @PostMapping
    fun createTypesMetaux(@RequestBody typesMetaux: TypesMetaux): Mono<TypesMetaux> = service.createTypesMetaux(typesMetaux)

    @PutMapping("/{id}")
    fun updateTypesMetaux(@PathVariable id: Long, @RequestBody typesMetaux: TypesMetaux): Mono<TypesMetaux> = service.updateTypesMetaux(id, typesMetaux)

    @DeleteMapping("/{id}")
    fun deleteTypesMetaux(@PathVariable id: Long): Mono<Void> = service.deleteTypesMetaux(id)
}
