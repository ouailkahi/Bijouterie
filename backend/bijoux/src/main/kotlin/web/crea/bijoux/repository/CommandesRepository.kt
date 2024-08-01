package web.crea.bijoux.repository

import org.springframework.data.domain.Pageable
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Flux
import web.crea.bijoux.entity.Commandes


@Repository
interface CommandesRepository : ReactiveCrudRepository<Commandes, Long>{
    fun findAllByOrderByDateCommandeDesc(): Flux<Commandes>


    fun findAllBy(pageable: Pageable): Flux<Commandes>
}
