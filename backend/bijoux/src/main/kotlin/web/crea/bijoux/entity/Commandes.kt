package web.crea.bijoux.Entity

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Column
import org.springframework.data.relational.core.mapping.Table
import java.math.BigDecimal
import java.time.LocalDateTime

@Table("Commandes")
data class Commandes(
    @Id
    @Column("id")
    val id: Long? = null,

    @Column("date_commande")
    val dateCommande: LocalDateTime,

    @Column("prix_total")
    val prixTotal: BigDecimal? = null,

    @Column("statut")
    val statut: String = "confirmed",

    @Column("profit_total")
    val profitTotal: BigDecimal? = null
)
