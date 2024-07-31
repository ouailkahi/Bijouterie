package web.crea.bijoux.Service

import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import web.crea.bijoux.Entity.Commandes
import web.crea.bijoux.Repository.CommandesRepository

@Service
class CommandesService(private val repository: CommandesRepository) {

    fun getAllCommandes(): Flux<Commandes> = repository.findAll()

    fun getCommandesById(id: Long): Mono<Commandes> = repository.findById(id)

    fun createCommandes(commandes: Commandes): Mono<Commandes> = repository.save(commandes)

    fun updateCommandes(id: Long, commandes: Commandes): Mono<Commandes> {
        return repository.findById(id)
            .flatMap {
                val updatedCommandes = it.copy(
                    dateCommande = commandes.dateCommande,
                    prixTotal = commandes.prixTotal,
                    statut = commandes.statut,
                    profitTotal = commandes.profitTotal
                )
                repository.save(updatedCommandes)
            }
    }

    fun deleteCommandes(id: Long): Mono<Void> = repository.deleteById(id)
}
