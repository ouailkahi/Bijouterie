package web.crea.bijoux.Repository

import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository
import web.crea.bijoux.Entity.TypesMetaux

@Repository
interface TypesMetauxRepository : ReactiveCrudRepository<TypesMetaux, Long>
