package web.crea.bijoux.Service

import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import web.crea.bijoux.Entity.TypesMetaux
import web.crea.bijoux.Repository.TypesMetauxRepository

@Service
class TypesMetauxService(private val repository: TypesMetauxRepository) {

    fun getAllTypesMetaux(): Flux<TypesMetaux> = repository.findAll()

    fun getTypesMetauxById(id: Long): Mono<TypesMetaux> = repository.findById(id)

    fun createTypesMetaux(typesMetaux: TypesMetaux): Mono<TypesMetaux> = repository.save(typesMetaux)

    fun updateTypesMetaux(id: Long, typesMetaux: TypesMetaux): Mono<TypesMetaux> {
        return repository.findById(id)
            .flatMap {
                val updatedTypesMetaux = it.copy(nom = typesMetaux.nom)
                repository.save(updatedTypesMetaux)
            }
    }

    fun deleteTypesMetaux(id: Long): Mono<Void> = repository.deleteById(id)
}
