package web.crea.bijoux.Controller

import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import web.crea.bijoux.Entity.ArticlesCommande
import web.crea.bijoux.Service.ArticlesCommandeService

@RestController
@RequestMapping("/articlesCommande")
class ArticlesCommandeController(private val service: ArticlesCommandeService) {

    @GetMapping
    fun getAllArticlesCommande(): Flux<ArticlesCommande> = service.getAllArticlesCommande()

    @GetMapping("/{id}")
    fun getArticlesCommandeById(@PathVariable id: Long): Mono<ArticlesCommande> = service.getArticlesCommandeById(id)

    @PostMapping
    fun createArticlesCommande(@RequestBody articlesCommande: ArticlesCommande): Mono<ArticlesCommande> = service.createArticlesCommande(articlesCommande)

    @PutMapping("/{id}")
    fun updateArticlesCommande(@PathVariable id: Long, @RequestBody articlesCommande: ArticlesCommande): Mono<ArticlesCommande> = service.updateArticlesCommande(id, articlesCommande)

    @DeleteMapping("/{id}")
    fun deleteArticlesCommande(@PathVariable id: Long): Mono<Void> = service.deleteArticlesCommande(id)
}
