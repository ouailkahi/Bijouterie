package web.crea.bijoux.dto

import java.math.BigDecimal

data class ProfitPerMonth(
    val month: String,
    val totalProfit: BigDecimal
)
