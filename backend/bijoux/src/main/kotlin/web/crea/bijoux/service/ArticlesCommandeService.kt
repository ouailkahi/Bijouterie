package web.crea.bijoux.Service

import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import web.crea.bijoux.Entity.ArticlesCommande
import web.crea.bijoux.Repository.ArticlesCommandeRepository

@Service
class ArticlesCommandeService(private val repository: ArticlesCommandeRepository) {

    fun getAllArticlesCommande(): Flux<ArticlesCommande> = repository.findAll()

    fun getArticlesCommandeById(id: Long): Mono<ArticlesCommande> = repository.findById(id)

    fun createArticlesCommande(articlesCommande: ArticlesCommande): Mono<ArticlesCommande> = repository.save(articlesCommande)

    fun updateArticlesCommande(id: Long, articlesCommande: ArticlesCommande): Mono<ArticlesCommande> {
        return repository.findById(id)
            .flatMap {
                val updatedArticlesCommande = it.copy(
                    commandeId = articlesCommande.commandeId,
                    typesMetaux = articlesCommande.typesMetaux,
                    prixArticle = articlesCommande.prixArticle,
                    profitArticle = articlesCommande.profitArticle,
                    poids = articlesCommande.poids
                )
                repository.save(updatedArticlesCommande)
            }
    }

    fun deleteArticlesCommande(id: Long): Mono<Void> = repository.deleteById(id)
}
