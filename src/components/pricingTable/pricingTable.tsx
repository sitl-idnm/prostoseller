import { FC } from 'react'

import styles from './pricingTable.module.scss'

const PricingTable: FC = () => {
	return (
		<div className={styles.tableContainer}>
			{/* Единая таблица с двумя секциями */}
			<table className={styles.table}>
				{/* Секция 1: Обзор планов */}
				<thead>
					<tr>
						<th colSpan={1}>Старт (Пробный период)</th>
						<th colSpan={2}>Базовый</th>
						<th colSpan={2}>Оптимальный</th>
					</tr>
					<tr>
						<th>4 дня</th>
						<th>1 месяц</th>
						<th>6 месяцев</th>
						<th>1 месяц</th>
						<th>6 месяцев</th>
					</tr>
					<tr>
						<th className={styles.price}>0₽</th>
						<th className={styles.price}>1.990₽/мес.</th>
						<th className={styles.price}>1.590₽/мес.</th>
						<th className={styles.price}>3.990₽/мес.</th>
						<th className={styles.price}>3.190₽/мес.</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Доступ к аналитике продаж за 1 текущий месяц</td>
						<td>Доступ к аналитике продаж за 1 текущий месяц и 1 предыдущий месяц</td>
						<td>Доступ к аналитике продаж за 1 текущий месяц и 5 предыдущих месяцев</td>
						<td>Доступ к аналитике продаж за 1 текущий месяц и 1 предыдущий месяц</td>
						<td>Доступ к аналитике продаж за 1 текущий месяц и 5 предыдущих месяцев</td>
					</tr>
					<tr>
						<td>1 магазин (личный кабинет)</td>
						<td colSpan={2}>до 2х магазинов (личных кабинетов)</td>
						<td colSpan={2}>до 4х магазинов (личных кабинетов)</td>
					</tr>
				</tbody>

				{/* Секция 2: Функции */}
				<thead>
					<tr>
						<th colSpan={1}>Старт</th>
						<th colSpan={2}>Базовый</th>
						<th colSpan={2}>Оптимальный</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Личные кабинеты OZON и WB</td>
						<td colSpan={2}>Личные кабинеты OZON и WB</td>
						<td colSpan={2}>Личные кабинеты OZON и WB</td>
					</tr>
					<tr>
						<td>Графики и дашборды</td>
						<td colSpan={2}>Графики и дашборды</td>
						<td colSpan={2}>Графики и дашборды</td>
					</tr>
					<tr>
						<td>Статусы товаров</td>
						<td colSpan={2}>Статусы товаров</td>
						<td colSpan={2}>Статусы товаров</td>
					</tr>
					<tr>
						<td>Импорт себестоимости</td>
						<td colSpan={2}>Импорт себестоимости</td>
						<td colSpan={2}>Импорт себестоимости</td>
					</tr>
					<tr>
						<td>Аналитика продаж</td>
						<td colSpan={2}>Аналитика продаж</td>
						<td colSpan={2}>Аналитика продаж</td>
					</tr>
					<tr>
						<td>Начисления</td>
						<td colSpan={2}>Начисления</td>
						<td colSpan={2}>Начисления</td>
					</tr>
					<tr>
						<td>Внесение дополнительных расходов</td>
						<td colSpan={2}>Внесение дополнительных расходов</td>
						<td colSpan={2}>Внесение дополнительных расходов</td>
					</tr>
					<tr>
						<td>Внесение и учет самовыкупов</td>
						<td colSpan={2}>Внесение и учет самовыкупов</td>
						<td colSpan={2}>Внесение и учет самовыкупов</td>
					</tr>
					<tr>
						<td>Капитализация складов</td>
						<td colSpan={2}>Капитализация складов</td>
						<td colSpan={2}>Капитализация складов</td>
					</tr>
					<tr>
						<td>Экспорт файлов</td>
						<td colSpan={2}>Экспорт файлов</td>
						<td colSpan={2}>Экспорт файлов</td>
					</tr>
					<tr>
						<td>Автоматизированная рассылка отчетов на Email</td>
						<td colSpan={2}>Автоматизированная рассылка отчетов на Email</td>
						<td colSpan={2}>Автоматизированная рассылка отчетов на Email</td>
					</tr>
					<tr>
						<td>Живая поддержка клиентов</td>
						<td colSpan={2}>Живая поддержка клиентов</td>
						<td colSpan={2}>Живая поддержка клиентов</td>
					</tr>
					<tr>
						<td>Управление планированием</td>
						<td colSpan={2}></td>
						<td colSpan={2}>Управление планированием</td>
					</tr>
					<tr>
						<td>Расчет оборачиваемости товаров и планирование поставок</td>
						<td colSpan={2}></td>
						<td colSpan={2}>Расчет оборачиваемости товаров и планирование поставок</td>
					</tr>
					<tr>
						<td>Расходы на рекламу (детализировано)</td>
						<td colSpan={2}></td>
						<td colSpan={2}>Расходы на рекламу (детализировано)</td>
					</tr>
					<tr>
						<td>Калькулятор цен и доходности</td>
						<td colSpan={2} className={styles.price}>калькулятор цен и доходности – 990 руб</td>
						<td colSpan={2}>Калькулятор цен и доходности</td>
					</tr>
					<tr>
						<td></td>
						<td colSpan={2} className={styles.price}>каждый дополнительный магазин 990 руб</td>
						<td colSpan={2} className={styles.price}>каждый дополнительный магазин 990 руб</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default PricingTable
