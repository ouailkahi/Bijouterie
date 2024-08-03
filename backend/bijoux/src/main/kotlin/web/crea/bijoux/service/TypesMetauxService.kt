package web.crea.bijoux.service

import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import web.crea.bijoux.dto.TotalWeightDto
import web.crea.bijoux.entity.TypeMetaux
import web.crea.bijoux.repository.TypesMetauxRepository

@Service
class TypesMetauxService(private val repository: TypesMetauxRepository) {

    fun getAllTypesMetaux(): Flux<TypeMetaux> = repository.findAll()

    fun getTypesMetauxById(id: Long): Mono<TypeMetaux> = repository.findById(id)

    fun createTypesMetaux(typesMetaux: TypeMetaux): Mono<TypeMetaux> = repository.save(typesMetaux)

    fun updateTypesMetaux(id: Long, typesMetaux: TypeMetaux): Mono<TypeMetaux> {
        return repository.findById(id)
            .flatMap {
                val updatedTypesMetaux = it.copy(nom = typesMetaux.nom)
                repository.save(updatedTypesMetaux)
            }
    }

    fun deleteTypesMetaux(id: Long): Mono<Void> = repository.deleteById(id)

    fun getTotalWeightPerMetal(): Flux<TotalWeightDto> {
        return repository.getTotalWeightPerMetal()
    }
}


