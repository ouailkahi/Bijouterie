package web.crea.bijoux.repository

import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository
import web.crea.bijoux.entity.TypeMetaux

@Repository
interface TypesMetauxRepository : ReactiveCrudRepository<TypeMetaux, Long>
