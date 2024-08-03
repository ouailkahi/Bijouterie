package web.crea.bijoux.controller

import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import web.crea.bijoux.dto.DailyProfitDTO
import web.crea.bijoux.dto.ProfitPerMonth
import web.crea.bijoux.entity.ArticlesCommande
import web.crea.bijoux.entity.Commandes
import web.crea.bijoux.service.CommandesService


@RestController
@RequestMapping("/commandes")
class CommandesController(private val service: CommandesService) {

    @GetMapping
    fun getAllCommandes(): Flux<Commandes> = service.getAllCommandes()

    @GetMapping("/pagination")
    fun getCommandes(
        @RequestParam(value = "page", defaultValue = "0") page: Int,
        @RequestParam(value = "size", defaultValue = "10") size: Int
    ): Flux<Commandes> {
        return service.getAllCommandesWithPagination(page, size)
    }

    @GetMapping("/{id}")
    fun getCommandesById(@PathVariable id: Long): Mono<Commandes> = service.getCommandesById(id)

    @GetMapping("/detail/{id}")
    fun getCommandeDetailById(@PathVariable id: Long): Mono<Pair<Commandes, List<ArticlesCommande>>> = service.getCommandeDetail(id)


    @PostMapping
    fun createCommandes(@RequestBody commandes: Commandes): Mono<Commandes> = service.createCommandes(commandes)

    @PutMapping("/{id}")
    fun updateCommandes(@PathVariable id: Long, @RequestBody commandes: Commandes): Mono<Commandes> = service.updateCommandes(id, commandes)

    @DeleteMapping("/{id}")
    fun deleteCommandes(@PathVariable id: Long): Mono<Void> = service.deleteCommandes(id)

    @GetMapping("/total/monthly")
    fun getTotalProfitPerMonth(): Flux<ProfitPerMonth> {
        return service.getTotalProfitPerMonth()
    }


    @GetMapping("/total/months")
    fun getTotalProfitPerMonths(): Flux<ProfitPerMonth> {
        return service.getTotalProfitPerMonths()
    }

    @GetMapping("/total/daily")
    fun getTotalProfitPerDay(): Flux<DailyProfitDTO> {
        return service.getTotalProfitPerDay()
    }

    @GetMapping("/total/days")
    fun getTotalProfitPerDays(): Flux<DailyProfitDTO> {
        return service.getTotalProfitPerDays()
    }
}
