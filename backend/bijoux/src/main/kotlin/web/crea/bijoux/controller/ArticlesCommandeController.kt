package web.crea.bijoux.controller

import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import web.crea.bijoux.entity.ArticlesCommande
import web.crea.bijoux.service.ArticlesCommandeService

@RestController
@RequestMapping("/articlesCommande")
class ArticlesCommandeController(private val service: ArticlesCommandeService) {

    @GetMapping
    fun getAllArticlesCommande(): Flux<ArticlesCommande> = service.getAllArticlesCommande()

    @GetMapping("/{id}")
    fun getArticlesCommandeById(@PathVariable id: Long): Mono<ArticlesCommande> = service.getArticlesCommandeById(id)

    @PostMapping
    fun createArticlesCommande(@RequestBody articlesCommande: ArticlesCommande): Mono<ArticlesCommande> = service.createArticlesCommande(articlesCommande)

    @PostMapping("/all")
    fun createArticlesCommandes(@RequestBody articlesCommandes: ArrayList<ArticlesCommande>): Flux<ArticlesCommande> = service.createArticlesCommandes(articlesCommandes)


    @PutMapping("/{id}")
    fun updateArticlesCommande(@PathVariable id: Long, @RequestBody articlesCommande: ArticlesCommande): Mono<ArticlesCommande> = service.updateArticlesCommande(id, articlesCommande)

    @DeleteMapping("/{id}")
    fun deleteArticlesCommande(@PathVariable id: Long): Mono<Void> = service.deleteArticlesCommande(id)
}
