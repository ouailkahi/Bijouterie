package web.crea.bijoux.Entity

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Column
import org.springframework.data.relational.core.mapping.Table

@Table("TypesMetaux")
data class TypeMetaux(
    @Id
    @Column("id")
    val id: Long? = null,

    @Column("nom")
    val nom: String
)
