package web.crea.bijoux.service

import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import web.crea.bijoux.dto.DailyProfitDTO
import web.crea.bijoux.dto.ProfitPerMonth
import web.crea.bijoux.entity.ArticlesCommande
import web.crea.bijoux.entity.Commandes
import web.crea.bijoux.repository.ArticlesCommandeRepository
import web.crea.bijoux.repository.CommandesRepository

@Service
class CommandesService(private val repository: CommandesRepository, private val articlesCommandeRepository: ArticlesCommandeRepository) {

    fun getAllCommandes(): Flux<Commandes> = repository.findAllByOrderByDateCommandeDesc()

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

    fun getAllCommandesWithPagination(page: Int, size: Int): Flux<Commandes> {
        val pageable: Pageable = PageRequest.of(page, size)
        return repository.findAllBy(pageable)
    }

    fun getCommandeDetail(id: Long): Mono<Pair<Commandes, List<ArticlesCommande>>> {
        // Fetch the Commandes entity by its ID
        val commandesMono = repository.findById(id)
            .switchIfEmpty(Mono.error(CommandesNotFoundException("Commandes with id $id not found")))

        // Fetch the ArticlesCommande entities associated with the Commandes
        val articlesCommandeMono = articlesCommandeRepository.findByCommandeId(id)
            .collectList()

        // Combine the results
        return Mono.zip(commandesMono, articlesCommandeMono) { commandes, articlesCommandes ->
            Pair(commandes, articlesCommandes)
        }
    }

    fun getTotalProfitPerMonth(): Flux<ProfitPerMonth> {
        return repository.findTotalProfitPerMonth()
    }

    fun getTotalProfitPerDay(): Flux<DailyProfitDTO> {
        return repository.findTotalProfitPerDay()
    }

    fun getTotalProfitPerDays(): Flux<DailyProfitDTO> {
        return repository.findTotalProfitPerDays()
    }

    fun getTotalProfitPerMonths(): Flux<ProfitPerMonth> {
        return repository.findTotalProfitPerMonths()
    }


}

class CommandesNotFoundException(message: String) : RuntimeException(message)


