package web.crea.bijoux.dto

import web.crea.bijoux.entity.Commandes
import java.math.BigDecimal

data class ProfitPerMonth(
    val month: String,
    val totalProfit: BigDecimal,
    val totalPrix: BigDecimal,
    val totalPoids: BigDecimal,

)
