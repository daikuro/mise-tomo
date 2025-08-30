<script lang="ts">
	import { 
		TrendingUp, Calendar, Filter, Download, 
		DollarSign, Users, ShoppingCart, Clock,
		ArrowUp, ArrowDown, BarChart3
	} from 'lucide-svelte';

	let selectedPeriod = $state('month');
	let selectedCategory = $state('all');
	let compareMode = $state(true);

	const periodOptions = [
		{ value: 'today', label: '今日' },
		{ value: 'week', label: '今週' },
		{ value: 'month', label: '今月' },
		{ value: 'quarter', label: '四半期' },
		{ value: 'year', label: '年間' }
	];

	const summaryData = {
		revenue: { 
			current: '¥8,456,000', 
			previous: '¥7,234,000', 
			change: '+16.9%',
			trend: 'up'
		},
		customers: { 
			current: '3,456', 
			previous: '3,123', 
			change: '+10.7%',
			trend: 'up'
		},
		avgCheck: { 
			current: '¥2,450', 
			previous: '¥2,315', 
			change: '+5.8%',
			trend: 'up'
		},
		orders: { 
			current: '4,234', 
			previous: '4,567', 
			change: '-7.3%',
			trend: 'down'
		}
	};

	const dailyRevenue = [
		{ date: '1日', revenue: 285000, orders: 142, customers: 138 },
		{ date: '2日', revenue: 312000, orders: 156, customers: 150 },
		{ date: '3日', revenue: 298000, orders: 149, customers: 145 },
		{ date: '4日', revenue: 276000, orders: 138, customers: 132 },
		{ date: '5日', revenue: 342000, orders: 171, customers: 165 },
		{ date: '6日', revenue: 389000, orders: 195, customers: 188 },
		{ date: '7日', revenue: 401000, orders: 201, customers: 195 }
	];

	const categoryRevenue = [
		{ category: '定食', revenue: 2450000, ratio: 29, change: '+12%' },
		{ category: '一品料理', revenue: 1890000, ratio: 22, change: '+8%' },
		{ category: '飲み物', revenue: 1260000, ratio: 15, change: '+18%' },
		{ category: 'コース料理', revenue: 1680000, ratio: 20, change: '-5%' },
		{ category: 'デザート', revenue: 756000, ratio: 9, change: '+22%' },
		{ category: 'その他', revenue: 420000, ratio: 5, change: '+3%' }
	];

	const timeAnalysis = [
		{ time: '11-12時', revenue: 450000, customers: 180, occupancy: 45 },
		{ time: '12-13時', revenue: 980000, customers: 392, occupancy: 98 },
		{ time: '13-14時', revenue: 620000, customers: 248, occupancy: 62 },
		{ time: '14-15時', revenue: 280000, customers: 112, occupancy: 28 },
		{ time: '17-18時', revenue: 420000, customers: 168, occupancy: 42 },
		{ time: '18-19時', revenue: 890000, customers: 356, occupancy: 89 },
		{ time: '19-20時', revenue: 1120000, customers: 448, occupancy: 112 },
		{ time: '20-21時', revenue: 780000, customers: 312, occupancy: 78 }
	];

	const topMenuItems = [
		{ name: '日替わり定食', orders: 892, revenue: 803000, avgPrice: 900 },
		{ name: '唐揚げ定食', orders: 756, revenue: 680000, avgPrice: 900 },
		{ name: '刺身盛り合わせ', orders: 423, revenue: 592000, avgPrice: 1400 },
		{ name: '天ぷら定食', orders: 512, revenue: 563000, avgPrice: 1100 },
		{ name: '焼き魚定食', orders: 489, revenue: 391000, avgPrice: 800 }
	];

	const customerAnalysis = {
		new: { count: 892, ratio: 26, revenue: 2140000 },
		returning: { count: 2564, ratio: 74, revenue: 6316000 },
		frequency: [
			{ type: '週1回以上', count: 456, ratio: 13 },
			{ type: '月2-3回', count: 892, ratio: 26 },
			{ type: '月1回', count: 1234, ratio: 36 },
			{ type: '初回・不定期', count: 874, ratio: 25 }
		]
	};

	function getMaxRevenue() {
		return Math.max(...dailyRevenue.map(d => d.revenue));
	}
</script>

<div class="analytics">
	<div class="page-header">
		<div>
			<h1>売上分析</h1>
			<p class="page-description">詳細な売上データと傾向分析</p>
		</div>
		<div class="header-actions">
			<select bind:value={selectedPeriod} class="period-select">
				{#each periodOptions as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
			<button class="button-secondary">
				<Calendar size={16} />
				期間指定
			</button>
			<button class="button-primary">
				<Download size={16} />
				レポート出力
			</button>
		</div>
	</div>

	<div class="summary-cards">
		<div class="summary-card">
			<div class="summary-icon">
				<DollarSign size={24} />
			</div>
			<div class="summary-content">
				<div class="summary-label">売上高</div>
				<div class="summary-value">{summaryData.revenue.current}</div>
				<div class="summary-compare">
					<span class="compare-label">前期比</span>
					<span class="compare-value {summaryData.revenue.trend}">
						{#if summaryData.revenue.trend === 'up'}
							<ArrowUp size={14} />
						{:else}
							<ArrowDown size={14} />
						{/if}
						{summaryData.revenue.change}
					</span>
				</div>
			</div>
		</div>

		<div class="summary-card">
			<div class="summary-icon">
				<Users size={24} />
			</div>
			<div class="summary-content">
				<div class="summary-label">来客数</div>
				<div class="summary-value">{summaryData.customers.current}</div>
				<div class="summary-compare">
					<span class="compare-label">前期比</span>
					<span class="compare-value {summaryData.customers.trend}">
						{#if summaryData.customers.trend === 'up'}
							<ArrowUp size={14} />
						{:else}
							<ArrowDown size={14} />
						{/if}
						{summaryData.customers.change}
					</span>
				</div>
			</div>
		</div>

		<div class="summary-card">
			<div class="summary-icon">
				<ShoppingCart size={24} />
			</div>
			<div class="summary-content">
				<div class="summary-label">平均客単価</div>
				<div class="summary-value">{summaryData.avgCheck.current}</div>
				<div class="summary-compare">
					<span class="compare-label">前期比</span>
					<span class="compare-value {summaryData.avgCheck.trend}">
						{#if summaryData.avgCheck.trend === 'up'}
							<ArrowUp size={14} />
						{:else}
							<ArrowDown size={14} />
						{/if}
						{summaryData.avgCheck.change}
					</span>
				</div>
			</div>
		</div>

		<div class="summary-card">
			<div class="summary-icon">
				<BarChart3 size={24} />
			</div>
			<div class="summary-content">
				<div class="summary-label">注文数</div>
				<div class="summary-value">{summaryData.orders.current}</div>
				<div class="summary-compare">
					<span class="compare-label">前期比</span>
					<span class="compare-value {summaryData.orders.trend}">
						{#if summaryData.orders.trend === 'up'}
							<ArrowUp size={14} />
						{:else}
							<ArrowDown size={14} />
						{/if}
						{summaryData.orders.change}
					</span>
				</div>
			</div>
		</div>
	</div>

	<div class="analytics-grid">
		<div class="card chart-card">
			<div class="card-header">
				<h2>日別売上推移</h2>
				<div class="chart-controls">
					<label class="compare-toggle">
						<input type="checkbox" bind:checked={compareMode} />
						<span>前期比較</span>
					</label>
				</div>
			</div>
			<div class="daily-chart">
				<div class="chart-container">
					{#each dailyRevenue as day}
						<div class="chart-day">
							<div class="chart-bars-container">
								<div 
									class="chart-bar primary" 
									style="height: {(day.revenue / getMaxRevenue()) * 100}%"
								>
									<div class="bar-tooltip">
										¥{(day.revenue / 1000).toFixed(0)}k
									</div>
								</div>
								{#if compareMode}
									<div 
										class="chart-bar secondary" 
										style="height: {(day.revenue * 0.85 / getMaxRevenue()) * 100}%"
									></div>
								{/if}
							</div>
							<div class="chart-day-label">{day.date}</div>
							<div class="chart-day-info">
								<span>{day.customers}名</span>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<div class="card">
			<div class="card-header">
				<h2>カテゴリー別売上</h2>
			</div>
			<div class="category-list">
				{#each categoryRevenue as category}
					<div class="category-item">
						<div class="category-info">
							<div class="category-name">{category.category}</div>
							<div class="category-revenue">¥{(category.revenue / 1000000).toFixed(1)}M</div>
						</div>
						<div class="category-bar-container">
							<div class="category-bar" style="width: {category.ratio * 3}px"></div>
							<span class="category-ratio">{category.ratio}%</span>
						</div>
						<div class="category-change {category.change.startsWith('+') ? 'positive' : 'negative'}">
							{category.change}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<div class="analytics-grid">
		<div class="card">
			<div class="card-header">
				<h2>時間帯別分析</h2>
			</div>
			<div class="time-analysis">
				{#each timeAnalysis as slot}
					<div class="time-slot">
						<div class="time-label">{slot.time}</div>
						<div class="time-metrics">
							<div class="metric">
								<span class="metric-label">売上</span>
								<span class="metric-value">¥{(slot.revenue / 1000).toFixed(0)}k</span>
							</div>
							<div class="metric">
								<span class="metric-label">来客</span>
								<span class="metric-value">{slot.customers}名</span>
							</div>
							<div class="metric">
								<span class="metric-label">稼働率</span>
								<div class="occupancy-bar">
									<div 
										class="occupancy-fill" 
										style="width: {slot.occupancy}%"
										class:high={slot.occupancy > 80}
										class:medium={slot.occupancy > 50 && slot.occupancy <= 80}
									></div>
								</div>
								<span class="metric-value">{slot.occupancy}%</span>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="card">
			<div class="card-header">
				<h2>人気メニューTOP5</h2>
			</div>
			<table class="menu-table">
				<thead>
					<tr>
						<th>メニュー名</th>
						<th>注文数</th>
						<th>売上</th>
						<th>平均単価</th>
					</tr>
				</thead>
				<tbody>
					{#each topMenuItems as item, i}
						<tr>
							<td>
								<div class="menu-name-cell">
									<span class="menu-rank">#{i + 1}</span>
									{item.name}
								</div>
							</td>
							<td>{item.orders}</td>
							<td>¥{item.revenue.toLocaleString()}</td>
							<td>¥{item.avgPrice}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<div class="card customer-card">
		<div class="card-header">
			<h2>顧客分析</h2>
		</div>
		<div class="customer-grid">
			<div class="customer-segment">
				<h3>新規 vs リピーター</h3>
				<div class="segment-chart">
					<div class="donut-chart">
						<div class="donut-hole">
							<div class="donut-value">{customerAnalysis.returning.ratio}%</div>
							<div class="donut-label">リピート率</div>
						</div>
					</div>
					<div class="segment-legend">
						<div class="legend-item">
							<span class="legend-dot new"></span>
							<div>
								<div class="legend-label">新規顧客</div>
								<div class="legend-value">{customerAnalysis.new.count}名 ({customerAnalysis.new.ratio}%)</div>
								<div class="legend-revenue">¥{(customerAnalysis.new.revenue / 1000000).toFixed(1)}M</div>
							</div>
						</div>
						<div class="legend-item">
							<span class="legend-dot returning"></span>
							<div>
								<div class="legend-label">リピーター</div>
								<div class="legend-value">{customerAnalysis.returning.count}名 ({customerAnalysis.returning.ratio}%)</div>
								<div class="legend-revenue">¥{(customerAnalysis.returning.revenue / 1000000).toFixed(1)}M</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="customer-frequency">
				<h3>来店頻度分布</h3>
				<div class="frequency-bars">
					{#each customerAnalysis.frequency as freq}
						<div class="frequency-item">
							<div class="frequency-label">{freq.type}</div>
							<div class="frequency-bar-container">
								<div class="frequency-bar" style="width: {freq.ratio * 2}px"></div>
								<span class="frequency-value">{freq.count}名 ({freq.ratio}%)</span>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.analytics {
		max-width: 1400px;
		margin: 0 auto;
	}

	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 24px;
	}

	.page-header h1 {
		margin: 0 0 4px 0;
		font-size: 28px;
		color: #172b4d;
	}

	.page-description {
		color: #5e6c84;
		font-size: 14px;
	}

	.header-actions {
		display: flex;
		gap: 12px;
	}

	.period-select {
		padding: 8px 12px;
		border: 1px solid #dfe1e6;
		border-radius: 4px;
		background: white;
		color: #172b4d;
		font-size: 14px;
	}

	.button-secondary,
	.button-primary {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 8px 16px;
		border-radius: 4px;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.button-secondary {
		background: white;
		border: 1px solid #dfe1e6;
		color: #42526e;
	}

	.button-secondary:hover {
		background: #f4f5f7;
	}

	.button-primary {
		background: #0052cc;
		border: none;
		color: white;
	}

	.button-primary:hover {
		background: #0065ff;
	}

	.summary-cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 20px;
		margin-bottom: 24px;
	}

	.summary-card {
		background: white;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		display: flex;
		gap: 16px;
	}

	.summary-icon {
		width: 48px;
		height: 48px;
		background: linear-gradient(135deg, #667eea, #764ba2);
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
	}

	.summary-content {
		flex: 1;
	}

	.summary-label {
		font-size: 13px;
		color: #5e6c84;
		margin-bottom: 4px;
	}

	.summary-value {
		font-size: 24px;
		font-weight: 700;
		color: #172b4d;
		margin-bottom: 8px;
	}

	.summary-compare {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 13px;
	}

	.compare-label {
		color: #5e6c84;
	}

	.compare-value {
		display: flex;
		align-items: center;
		gap: 2px;
		font-weight: 600;
	}

	.compare-value.up {
		color: #00875a;
	}

	.compare-value.down {
		color: #de350b;
	}

	.analytics-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
		gap: 20px;
		margin-bottom: 20px;
	}

	.card {
		background: white;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
	}

	.card-header h2 {
		margin: 0;
		font-size: 18px;
		color: #172b4d;
	}

	.chart-controls {
		display: flex;
		gap: 12px;
	}

	.compare-toggle {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 13px;
		color: #5e6c84;
		cursor: pointer;
	}

	.daily-chart {
		height: 300px;
	}

	.chart-container {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		height: 250px;
		gap: 12px;
	}

	.chart-day {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.chart-bars-container {
		display: flex;
		align-items: flex-end;
		gap: 4px;
		height: 200px;
		width: 100%;
	}

	.chart-bar {
		flex: 1;
		border-radius: 4px 4px 0 0;
		position: relative;
		transition: all 0.3s;
	}

	.chart-bar.primary {
		background: linear-gradient(to top, #0052cc, #0065ff);
	}

	.chart-bar.secondary {
		background: #dfe1e6;
	}

	.bar-tooltip {
		position: absolute;
		top: -20px;
		left: 50%;
		transform: translateX(-50%);
		font-size: 11px;
		font-weight: 600;
		color: #172b4d;
		white-space: nowrap;
	}

	.chart-day-label {
		margin-top: 8px;
		font-size: 12px;
		font-weight: 600;
		color: #172b4d;
	}

	.chart-day-info {
		font-size: 11px;
		color: #5e6c84;
	}

	.category-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.category-item {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 12px;
		background: #f7f8fa;
		border-radius: 6px;
	}

	.category-info {
		min-width: 140px;
	}

	.category-name {
		font-weight: 600;
		color: #172b4d;
		margin-bottom: 2px;
	}

	.category-revenue {
		font-size: 13px;
		color: #5e6c84;
	}

	.category-bar-container {
		flex: 1;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.category-bar {
		height: 8px;
		background: linear-gradient(90deg, #00b8d9, #00c7e6);
		border-radius: 4px;
	}

	.category-ratio {
		font-size: 13px;
		font-weight: 600;
		color: #172b4d;
	}

	.category-change {
		font-size: 13px;
		font-weight: 600;
	}

	.category-change.positive {
		color: #00875a;
	}

	.category-change.negative {
		color: #de350b;
	}

	.time-analysis {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.time-slot {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 12px;
		background: #f7f8fa;
		border-radius: 6px;
	}

	.time-label {
		min-width: 80px;
		font-weight: 600;
		color: #172b4d;
	}

	.time-metrics {
		display: flex;
		gap: 24px;
		flex: 1;
	}

	.metric {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.metric-label {
		font-size: 12px;
		color: #5e6c84;
	}

	.metric-value {
		font-size: 13px;
		font-weight: 600;
		color: #172b4d;
	}

	.occupancy-bar {
		width: 60px;
		height: 6px;
		background: #dfe1e6;
		border-radius: 3px;
		overflow: hidden;
	}

	.occupancy-fill {
		height: 100%;
		background: #42526e;
		transition: all 0.3s;
	}

	.occupancy-fill.medium {
		background: #ff8b00;
	}

	.occupancy-fill.high {
		background: #de350b;
	}

	.menu-table {
		width: 100%;
		border-collapse: collapse;
	}

	.menu-table thead tr {
		border-bottom: 2px solid #dfe1e6;
	}

	.menu-table th {
		text-align: left;
		padding: 12px;
		font-size: 12px;
		font-weight: 600;
		color: #5e6c84;
		text-transform: uppercase;
	}

	.menu-table tbody tr {
		border-bottom: 1px solid #f4f5f7;
	}

	.menu-table tbody tr:hover {
		background: #f7f8fa;
	}

	.menu-table td {
		padding: 12px;
		font-size: 14px;
		color: #172b4d;
	}

	.menu-name-cell {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.menu-rank {
		width: 24px;
		height: 24px;
		background: #0052cc;
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 11px;
		font-weight: 600;
	}

	.customer-card {
		grid-column: span 2;
	}

	.customer-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 40px;
	}

	.customer-segment h3,
	.customer-frequency h3 {
		font-size: 16px;
		color: #172b4d;
		margin-bottom: 20px;
	}

	.segment-chart {
		display: flex;
		align-items: center;
		gap: 32px;
	}

	.donut-chart {
		width: 150px;
		height: 150px;
		background: conic-gradient(
			#0052cc 0deg 266deg,
			#ff8b00 266deg 360deg
		);
		border-radius: 50%;
		position: relative;
	}

	.donut-hole {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 90px;
		height: 90px;
		background: white;
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.donut-value {
		font-size: 24px;
		font-weight: 700;
		color: #172b4d;
	}

	.donut-label {
		font-size: 11px;
		color: #5e6c84;
	}

	.segment-legend {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.legend-item {
		display: flex;
		align-items: flex-start;
		gap: 12px;
	}

	.legend-dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		margin-top: 4px;
	}

	.legend-dot.new {
		background: #ff8b00;
	}

	.legend-dot.returning {
		background: #0052cc;
	}

	.legend-label {
		font-weight: 600;
		color: #172b4d;
		margin-bottom: 2px;
	}

	.legend-value {
		font-size: 13px;
		color: #5e6c84;
	}

	.legend-revenue {
		font-size: 12px;
		color: #00875a;
		font-weight: 600;
	}

	.frequency-bars {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.frequency-item {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.frequency-label {
		font-size: 13px;
		font-weight: 600;
		color: #172b4d;
	}

	.frequency-bar-container {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.frequency-bar {
		height: 8px;
		background: linear-gradient(90deg, #6554c0, #8777d9);
		border-radius: 4px;
	}

	.frequency-value {
		font-size: 12px;
		color: #5e6c84;
	}

	@media (max-width: 1024px) {
		.analytics-grid {
			grid-template-columns: 1fr;
		}

		.customer-card {
			grid-column: span 1;
		}

		.customer-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 768px) {
		.page-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 16px;
		}

		.header-actions {
			flex-wrap: wrap;
		}

		.summary-cards {
			grid-template-columns: 1fr;
		}

		.time-metrics {
			flex-direction: column;
			gap: 8px;
		}
	}
</style>