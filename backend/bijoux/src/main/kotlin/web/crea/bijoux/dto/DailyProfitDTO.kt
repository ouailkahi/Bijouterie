package web.crea.bijoux.dto

import java.math.BigDecimal
import java.time.LocalDate

data class DailyProfitDTO(
    val day: LocalDate,
    val totalProfit: BigDecimal,
    val totalPrix: BigDecimal,
    val totalPoids: BigDecimal
)
