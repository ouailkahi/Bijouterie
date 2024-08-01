package web.crea.bijoux.entity

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Column
import org.springframework.data.relational.core.mapping.Table
import java.math.BigDecimal

@Table("ArticlesCommande")
data class ArticlesCommande(
    @Id
    @Column("id")
    val id: Long? = null,

    @Column("commande_id")
    val commandeId: Long,

    @Column("types_metaux")
    val typesMetaux: Long,

    @Column("prix_article")
    val prixArticle: BigDecimal,

    @Column("profit_article")
    val profitArticle: BigDecimal,

    @Column("poids")
    val poids: BigDecimal
)
