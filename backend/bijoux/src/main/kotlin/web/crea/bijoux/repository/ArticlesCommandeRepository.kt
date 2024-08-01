package web.crea.bijoux.repository

import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Flux
import web.crea.bijoux.entity.ArticlesCommande

@Repository
interface ArticlesCommandeRepository : ReactiveCrudRepository<ArticlesCommande, Long>{
    fun findByCommandeId(commandId:Long) : Flux<ArticlesCommande>
}
