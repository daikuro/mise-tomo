<script lang="ts">
	import { TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, Activity } from 'lucide-svelte';

	const stats = [
		{
			label: '総売上',
			value: '¥1,245,000',
			change: '+12.5%',
			trend: 'up',
			icon: DollarSign
		},
		{
			label: '新規ユーザー',
			value: '456',
			change: '+8.2%',
			trend: 'up',
			icon: Users
		},
		{
			label: '注文数',
			value: '89',
			change: '-3.1%',
			trend: 'down',
			icon: ShoppingCart
		},
		{
			label: 'アクティブ率',
			value: '67.8%',
			change: '+5.4%',
			trend: 'up',
			icon: Activity
		}
	];

	const recentOrders = [
		{ id: '#ORD-1234', customer: '田中太郎', amount: '¥12,500', status: '処理中', date: '2024-01-28' },
		{ id: '#ORD-1233', customer: '佐藤花子', amount: '¥8,900', status: '完了', date: '2024-01-28' },
		{ id: '#ORD-1232', customer: '鈴木一郎', amount: '¥24,300', status: '発送済み', date: '2024-01-27' },
		{ id: '#ORD-1231', customer: '高橋美咲', amount: '¥5,600', status: '完了', date: '2024-01-27' },
		{ id: '#ORD-1230', customer: '伊藤健太', amount: '¥15,800', status: 'キャンセル', date: '2024-01-26' }
	];

	const topProducts = [
		{ name: '商品A', sales: 234, revenue: '¥456,000' },
		{ name: '商品B', sales: 189, revenue: '¥378,000' },
		{ name: '商品C', sales: 156, revenue: '¥234,000' },
		{ name: '商品D', sales: 134, revenue: '¥189,000' },
		{ name: '商品E', sales: 98, revenue: '¥145,000' }
	];

	function getStatusBadgeClass(status: string) {
		switch (status) {
			case '完了': return 'badge-success';
			case '処理中': return 'badge-warning';
			case '発送済み': return 'badge-info';
			case 'キャンセル': return 'badge-danger';
			default: return '';
		}
	}
</script>

<div class="dashboard">
	<h1>ダッシュボード</h1>
	
	<div class="stats-grid">
		{#each stats as stat}
			<div class="stat-card card">
				<div class="stat-header">
					<span class="stat-label">{stat.label}</span>
					<svelte:component this={stat.icon} size={20} class="stat-icon" />
				</div>
				<div class="stat-value">{stat.value}</div>
				<div class="stat-change" class:positive={stat.trend === 'up'} class:negative={stat.trend === 'down'}>
					{#if stat.trend === 'up'}
						<TrendingUp size={16} />
					{:else}
						<TrendingDown size={16} />
					{/if}
					<span>{stat.change}</span>
				</div>
			</div>
		{/each}
	</div>

	<div class="dashboard-grid">
		<div class="dashboard-section">
			<div class="card">
				<div class="card-header">
					<h2>最近の注文</h2>
					<a href="/orders" class="button button-secondary">すべて表示</a>
				</div>
				<table>
					<thead>
						<tr>
							<th>注文ID</th>
							<th>顧客</th>
							<th>金額</th>
							<th>ステータス</th>
							<th>日付</th>
						</tr>
					</thead>
					<tbody>
						{#each recentOrders as order}
							<tr>
								<td><a href="/orders/{order.id}">{order.id}</a></td>
								<td>{order.customer}</td>
								<td>{order.amount}</td>
								<td>
									<span class="badge {getStatusBadgeClass(order.status)}">
										{order.status}
									</span>
								</td>
								<td>{order.date}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>

		<div class="dashboard-section">
			<div class="card">
				<div class="card-header">
					<h2>人気商品</h2>
					<a href="/products" class="button button-secondary">すべて表示</a>
				</div>
				<div class="product-list">
					{#each topProducts as product, i}
						<div class="product-item">
							<div class="product-rank">#{i + 1}</div>
							<div class="product-info">
								<div class="product-name">{product.name}</div>
								<div class="product-stats">
									<span>{product.sales} 販売</span>
									<span>•</span>
									<span>{product.revenue}</span>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<div class="activity-section">
		<div class="card">
			<div class="card-header">
				<h2>売上推移</h2>
				<div class="chart-controls">
					<button class="chart-tab active">日別</button>
					<button class="chart-tab">週別</button>
					<button class="chart-tab">月別</button>
				</div>
			</div>
			<div class="chart-placeholder">
				<div class="chart-mock">
					{#each Array(7) as _, i}
						<div class="chart-bar" style="height: {Math.random() * 60 + 40}%"></div>
					{/each}
				</div>
				<div class="chart-labels">
					{#each ['月', '火', '水', '木', '金', '土', '日'] as day}
						<span>{day}</span>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.dashboard {
		max-width: 1400px;
		margin: 0 auto;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 20px;
		margin-bottom: 32px;
	}

	.stat-card {
		position: relative;
	}

	.stat-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 12px;
	}

	.stat-label {
		color: var(--text-secondary);
		font-size: 13px;
		font-weight: 600;
		text-transform: uppercase;
	}

	.stat-icon {
		color: var(--text-subtle);
	}

	.stat-value {
		font-size: 28px;
		font-weight: 600;
		margin-bottom: 8px;
	}

	.stat-change {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 13px;
		font-weight: 500;
	}

	.stat-change.positive {
		color: var(--success);
	}

	.stat-change.negative {
		color: var(--danger);
	}

	.dashboard-grid {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 20px;
		margin-bottom: 20px;
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
	}

	.card-header h2 {
		margin: 0;
	}

	.product-list {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.product-item {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.product-rank {
		width: 32px;
		height: 32px;
		background: var(--surface);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		color: var(--text-secondary);
	}

	.product-info {
		flex: 1;
	}

	.product-name {
		font-weight: 600;
		margin-bottom: 4px;
	}

	.product-stats {
		font-size: 13px;
		color: var(--text-secondary);
		display: flex;
		gap: 8px;
	}

	.chart-controls {
		display: flex;
		gap: 8px;
	}

	.chart-tab {
		padding: 6px 12px;
		background: transparent;
		border: 1px solid var(--border);
		border-radius: 3px;
		font-size: 13px;
		font-weight: 500;
		color: var(--text-secondary);
		transition: all 0.2s;
	}

	.chart-tab:hover {
		background: var(--surface);
	}

	.chart-tab.active {
		background: var(--primary);
		color: white;
		border-color: var(--primary);
	}

	.chart-placeholder {
		padding: 20px;
	}

	.chart-mock {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		height: 200px;
		margin-bottom: 12px;
		gap: 12px;
	}

	.chart-bar {
		flex: 1;
		background: linear-gradient(to top, var(--primary), #4c9aff);
		border-radius: 3px 3px 0 0;
		transition: all 0.3s;
	}

	.chart-bar:hover {
		opacity: 0.8;
	}

	.chart-labels {
		display: flex;
		justify-content: space-between;
		padding: 0 12px;
		color: var(--text-secondary);
		font-size: 12px;
	}

	@media (max-width: 1024px) {
		.dashboard-grid {
			grid-template-columns: 1fr;
		}
		
		.stats-grid {
			grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		}
	}
</style>
