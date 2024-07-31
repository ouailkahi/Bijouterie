package web.crea.bijoux.Repository

import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository
import web.crea.bijoux.Entity.ArticlesCommande

@Repository
interface ArticlesCommandeRepository : ReactiveCrudRepository<ArticlesCommande, Long>
