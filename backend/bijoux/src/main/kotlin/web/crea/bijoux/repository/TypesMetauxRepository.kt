package web.crea.bijoux.repository

import org.springframework.data.r2dbc.repository.Query
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Flux
import web.crea.bijoux.dto.TotalWeightDto
import web.crea.bijoux.entity.TypeMetaux

@Repository
interface TypesMetauxRepository : ReactiveCrudRepository<TypeMetaux, Long>{
    @Query("SELECT * FROM get_total_weight_per_metal()")
    fun getTotalWeightPerMetal(): Flux<TotalWeightDto>
}

