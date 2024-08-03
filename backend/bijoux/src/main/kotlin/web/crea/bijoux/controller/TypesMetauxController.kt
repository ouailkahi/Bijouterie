package web.crea.bijoux.controller

import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import web.crea.bijoux.dto.TotalWeightDto
import web.crea.bijoux.entity.TypeMetaux
import web.crea.bijoux.service.TypesMetauxService

@RestController
@RequestMapping("/typesMetaux")
class TypesMetauxController(private val service: TypesMetauxService) {

    @GetMapping
    fun getAllTypesMetaux(): Flux<TypeMetaux> = service.getAllTypesMetaux()

    @GetMapping("/{id}")
    fun getTypesMetauxById(@PathVariable id: Long): Mono<TypeMetaux> = service.getTypesMetauxById(id)

    @PostMapping
    fun createTypesMetaux(@RequestBody typesMetaux: TypeMetaux): Mono<TypeMetaux> = service.createTypesMetaux(typesMetaux)

    @PutMapping("/{id}")
    fun updateTypesMetaux(@PathVariable id: Long, @RequestBody typesMetaux: TypeMetaux): Mono<TypeMetaux> = service.updateTypesMetaux(id, typesMetaux)

    @DeleteMapping("/{id}")
    fun deleteTypesMetaux(@PathVariable id: Long): Mono<Void> = service.deleteTypesMetaux(id)

    @GetMapping("/total-weight")
    fun getTotalWeightPerMetal(): Flux<TotalWeightDto> {
        return service.getTotalWeightPerMetal()
    }
}
