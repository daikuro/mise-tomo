<script lang="ts">
	import { 
		TrendingUp, TrendingDown, Users, ShoppingCart, 
		DollarSign, Clock, AlertTriangle, ChefHat,
		Package, Calendar, Star, ArrowUp, ArrowDown
	} from 'lucide-svelte';
	import { onMount } from 'svelte';

	let currentTime = $state(new Date().toLocaleTimeString('ja-JP'));
	
	onMount(() => {
		const interval = setInterval(() => {
			currentTime = new Date().toLocaleTimeString('ja-JP');
		}, 1000);
		return () => clearInterval(interval);
	});

	const todayStats = [
		{
			label: '本日の売上',
			value: '¥285,400',
			change: '+15.2%',
			trend: 'up',
			icon: DollarSign,
			color: 'primary'
		},
		{
			label: '来客数',
			value: '142',
			subValue: '平均: ¥2,010',
			change: '+8.5%',
			trend: 'up',
			icon: Users,
			color: 'success'
		},
		{
			label: '注文数',
			value: '186',
			subValue: 'テーブル回転率: 2.8',
			change: '+12.3%',
			trend: 'up',
			icon: ShoppingCart,
			color: 'info'
		},
		{
			label: '予約数',
			value: '24',
			subValue: '今夜: 18件',
			change: '+6件',
			trend: 'up',
			icon: Calendar,
			color: 'warning'
		}
	];

	const currentOrders = [
		{ table: 'テーブル3', items: 5, time: '12:45', status: '調理中', amount: '¥4,200' },
		{ table: 'テーブル7', items: 3, time: '12:52', status: '配膳待ち', amount: '¥2,800' },
		{ table: 'カウンター2', items: 2, time: '12:58', status: '注文受付', amount: '¥1,500' },
		{ table: 'テーブル1', items: 4, time: '13:02', status: '調理中', amount: '¥3,600' },
		{ table: '個室A', items: 8, time: '13:05', status: '注文受付', amount: '¥8,200' }
	];

	const popularMenu = [
		{ name: '日替わり定食', orders: 42, revenue: '¥37,800', trend: 'up', change: '+18%' },
		{ name: '唐揚げ定食', orders: 38, revenue: '¥34,200', trend: 'up', change: '+12%' },
		{ name: '刺身盛り合わせ', orders: 28, revenue: '¥39,200', trend: 'down', change: '-5%' },
		{ name: '天ぷら定食', orders: 25, revenue: '¥27,500', trend: 'up', change: '+8%' },
		{ name: '焼き魚定食', orders: 22, revenue: '¥17,600', trend: 'up', change: '+3%' }
	];

	const inventoryAlerts = [
		{ item: 'まぐろ', current: '2.5kg', minimum: '5kg', severity: 'high' },
		{ item: '豚肉', current: '8kg', minimum: '10kg', severity: 'medium' },
		{ item: '玉ねぎ', current: '3kg', minimum: '5kg', severity: 'medium' },
		{ item: 'しょうゆ', current: '1L', minimum: '3L', severity: 'high' }
	];

	const staffOnDuty = [
		{ name: '山田シェフ', role: '料理長', status: 'active', since: '10:00' },
		{ name: '佐藤', role: 'キッチン', status: 'active', since: '10:00' },
		{ name: '鈴木', role: 'ホール', status: 'active', since: '11:00' },
		{ name: '高橋', role: 'ホール', status: 'break', since: '11:00' },
		{ name: '伊藤', role: 'キッチン', status: 'active', since: '12:00' }
	];

	const hourlyRevenue = [
		{ hour: '11時', amount: 32000 },
		{ hour: '12時', amount: 85000 },
		{ hour: '13時', amount: 62000 },
		{ hour: '14時', amount: 28000 },
		{ hour: '15時', amount: 15000 }
	];

	function getStatusClass(status: string) {
		switch (status) {
			case '調理中': return 'status-cooking';
			case '配膳待ち': return 'status-ready';
			case '注文受付': return 'status-new';
			default: return '';
		}
	}

	function getSeverityClass(severity: string) {
		switch (severity) {
			case 'high': return 'severity-high';
			case 'medium': return 'severity-medium';
			case 'low': return 'severity-low';
			default: return '';
		}
	}

	function getStaffStatusClass(status: string) {
		switch (status) {
			case 'active': return 'staff-active';
			case 'break': return 'staff-break';
			default: return '';
		}
	}
</script>

<div class="dashboard">
	<div class="dashboard-header">
		<div class="welcome-section">
			<h1>おはようございます、田中店長</h1>
			<p class="current-date">{new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}</p>
		</div>
		<div class="time-display">
			<Clock size={20} />
			<span>{currentTime}</span>
		</div>
	</div>

	<div class="stats-grid">
		{#each todayStats as stat}
			<div class="stat-card {stat.color}">
				<div class="stat-header">
					<div class="stat-icon">
						<svelte:component this={stat.icon} size={24} />
					</div>
					<div class="stat-change" class:positive={stat.trend === 'up'}>
						{#if stat.trend === 'up'}
							<ArrowUp size={16} />
						{:else}
							<ArrowDown size={16} />
						{/if}
						<span>{stat.change}</span>
					</div>
				</div>
				<div class="stat-value">{stat.value}</div>
				<div class="stat-label">{stat.label}</div>
				{#if stat.subValue}
					<div class="stat-sub">{stat.subValue}</div>
				{/if}
			</div>
		{/each}
	</div>

	<div class="dashboard-grid">
		<div class="card">
			<div class="card-header">
				<h2>
					<ShoppingCart size={20} />
					現在の注文状況
				</h2>
				<button class="button-secondary">すべて表示</button>
			</div>
			<div class="orders-list">
				{#each currentOrders as order}
					<div class="order-item">
						<div class="order-table">{order.table}</div>
						<div class="order-details">
							<div class="order-info">
								<span class="order-items">{order.items}品</span>
								<span class="order-time">{order.time}</span>
							</div>
							<span class="order-status {getStatusClass(order.status)}">{order.status}</span>
						</div>
						<div class="order-amount">{order.amount}</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="card">
			<div class="card-header">
				<h2>
					<ChefHat size={20} />
					人気メニュー TOP5
				</h2>
				<button class="button-secondary">詳細</button>
			</div>
			<div class="menu-list">
				{#each popularMenu as item, i}
					<div class="menu-item">
						<div class="menu-rank">#{i + 1}</div>
						<div class="menu-info">
							<div class="menu-name">{item.name}</div>
							<div class="menu-stats">
								<span>{item.orders}食</span>
								<span class="separator">•</span>
								<span>{item.revenue}</span>
							</div>
						</div>
						<div class="menu-trend" class:positive={item.trend === 'up'}>
							{#if item.trend === 'up'}
								<TrendingUp size={16} />
							{:else}
								<TrendingDown size={16} />
							{/if}
							<span>{item.change}</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<div class="dashboard-grid">
		<div class="card chart-card">
			<div class="card-header">
				<h2>
					<TrendingUp size={20} />
					時間帯別売上
				</h2>
				<div class="chart-legend">
					<span class="legend-item">
						<span class="legend-dot"></span>
						本日
					</span>
					<span class="legend-item">
						<span class="legend-dot secondary"></span>
						先週同曜日
					</span>
				</div>
			</div>
			<div class="revenue-chart">
				<div class="chart-bars">
					{#each hourlyRevenue as hour}
						<div class="chart-column">
							<div class="chart-bar" style="height: {(hour.amount / 100000) * 100}%">
								<span class="bar-value">¥{(hour.amount / 1000).toFixed(0)}k</span>
							</div>
							<div class="chart-label">{hour.hour}</div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<div class="alerts-grid">
			<div class="card alert-card">
				<div class="card-header">
					<h2>
						<AlertTriangle size={20} />
						在庫アラート
					</h2>
					<span class="alert-count">{inventoryAlerts.length}件</span>
				</div>
				<div class="alerts-list">
					{#each inventoryAlerts as alert}
						<div class="alert-item {getSeverityClass(alert.severity)}">
							<Package size={16} />
							<div class="alert-info">
								<div class="alert-name">{alert.item}</div>
								<div class="alert-detail">
									残: {alert.current} / 最小: {alert.minimum}
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="card staff-card">
				<div class="card-header">
					<h2>
						<Users size={20} />
						出勤スタッフ
					</h2>
					<span class="staff-count">{staffOnDuty.length}名</span>
				</div>
				<div class="staff-list">
					{#each staffOnDuty as staff}
						<div class="staff-item">
							<div class="staff-avatar">{staff.name.charAt(0)}</div>
							<div class="staff-info">
								<div class="staff-name">{staff.name}</div>
								<div class="staff-role">{staff.role} • {staff.since}〜</div>
							</div>
							<span class="staff-status {getStaffStatusClass(staff.status)}">
								{staff.status === 'active' ? '勤務中' : '休憩中'}
							</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<div class="quick-actions">
		<h2>クイックアクション</h2>
		<div class="actions-grid">
			<button class="action-button primary">
				<Calendar size={20} />
				予約確認
			</button>
			<button class="action-button success">
				<Package size={20} />
				発注処理
			</button>
			<button class="action-button warning">
				<Users size={20} />
				シフト確認
			</button>
			<button class="action-button info">
				<Star size={20} />
				レビュー確認
			</button>
		</div>
	</div>
</div>

<style>
	.dashboard {
		max-width: 1400px;
		margin: 0 auto;
	}

	.dashboard-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 24px;
	}

	.welcome-section h1 {
		margin: 0 0 8px 0;
		font-size: 28px;
		color: #172b4d;
	}

	.current-date {
		color: #5e6c84;
		font-size: 14px;
	}

	.time-display {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px 16px;
		background: white;
		border-radius: 8px;
		font-size: 18px;
		font-weight: 600;
		color: #172b4d;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 20px;
		margin-bottom: 24px;
	}

	.stat-card {
		background: white;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		position: relative;
		overflow: hidden;
	}

	.stat-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(90deg, #0052cc, #0065ff);
	}

	.stat-card.success::before {
		background: linear-gradient(90deg, #00875a, #00a86b);
	}

	.stat-card.warning::before {
		background: linear-gradient(90deg, #ff8b00, #ffab00);
	}

	.stat-card.info::before {
		background: linear-gradient(90deg, #00b8d9, #00c7e6);
	}

	.stat-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 12px;
	}

	.stat-icon {
		width: 40px;
		height: 40px;
		background: #f4f5f7;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #0052cc;
	}

	.stat-change {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 13px;
		font-weight: 600;
		color: #de350b;
	}

	.stat-change.positive {
		color: #00875a;
	}

	.stat-value {
		font-size: 28px;
		font-weight: 700;
		color: #172b4d;
		margin-bottom: 4px;
	}

	.stat-label {
		font-size: 14px;
		color: #5e6c84;
		font-weight: 500;
	}

	.stat-sub {
		font-size: 12px;
		color: #6b778c;
		margin-top: 4px;
	}

	.dashboard-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
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
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.button-secondary {
		padding: 6px 12px;
		background: #f4f5f7;
		border: 1px solid #dfe1e6;
		border-radius: 4px;
		color: #42526e;
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.button-secondary:hover {
		background: #ebecf0;
	}

	.orders-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.order-item {
		display: flex;
		align-items: center;
		padding: 12px;
		background: #f7f8fa;
		border-radius: 6px;
		transition: all 0.2s;
	}

	.order-item:hover {
		background: #ebecf0;
	}

	.order-table {
		font-weight: 600;
		color: #172b4d;
		min-width: 100px;
	}

	.order-details {
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 16px;
	}

	.order-info {
		display: flex;
		gap: 12px;
		color: #5e6c84;
		font-size: 13px;
	}

	.order-status {
		padding: 4px 8px;
		border-radius: 4px;
		font-size: 12px;
		font-weight: 600;
	}

	.status-cooking {
		background: #fff3cd;
		color: #856404;
	}

	.status-ready {
		background: #d4edda;
		color: #155724;
	}

	.status-new {
		background: #cce5ff;
		color: #004085;
	}

	.order-amount {
		font-weight: 600;
		color: #172b4d;
	}

	.menu-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.menu-item {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 12px;
		background: #f7f8fa;
		border-radius: 6px;
	}

	.menu-rank {
		width: 32px;
		height: 32px;
		background: #0052cc;
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		font-size: 14px;
	}

	.menu-info {
		flex: 1;
	}

	.menu-name {
		font-weight: 600;
		color: #172b4d;
		margin-bottom: 4px;
	}

	.menu-stats {
		font-size: 12px;
		color: #5e6c84;
	}

	.separator {
		margin: 0 6px;
	}

	.menu-trend {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 13px;
		font-weight: 600;
		color: #de350b;
	}

	.menu-trend.positive {
		color: #00875a;
	}

	.chart-card {
		grid-column: span 2;
	}

	.chart-legend {
		display: flex;
		gap: 16px;
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 12px;
		color: #5e6c84;
	}

	.legend-dot {
		width: 8px;
		height: 8px;
		background: #0052cc;
		border-radius: 50%;
	}

	.legend-dot.secondary {
		background: #dfe1e6;
	}

	.revenue-chart {
		height: 250px;
		position: relative;
	}

	.chart-bars {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		height: 100%;
		gap: 20px;
	}

	.chart-column {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
	}

	.chart-bar {
		width: 100%;
		background: linear-gradient(to top, #0052cc, #0065ff);
		border-radius: 4px 4px 0 0;
		position: relative;
		transition: all 0.3s;
	}

	.chart-bar:hover {
		opacity: 0.8;
	}

	.bar-value {
		position: absolute;
		top: -20px;
		left: 50%;
		transform: translateX(-50%);
		font-size: 12px;
		font-weight: 600;
		color: #172b4d;
	}

	.chart-label {
		margin-top: 8px;
		font-size: 12px;
		color: #5e6c84;
	}

	.alerts-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
	}

	.alert-count,
	.staff-count {
		padding: 2px 8px;
		background: #de350b;
		color: white;
		border-radius: 12px;
		font-size: 12px;
		font-weight: 600;
	}

	.staff-count {
		background: #0052cc;
	}

	.alerts-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.alert-item {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 10px;
		border-radius: 6px;
		background: #fff3cd;
		border-left: 3px solid #ffc107;
	}

	.alert-item.severity-high {
		background: #f8d7da;
		border-left-color: #dc3545;
	}

	.alert-item.severity-medium {
		background: #fff3cd;
		border-left-color: #ffc107;
	}

	.alert-info {
		flex: 1;
	}

	.alert-name {
		font-weight: 600;
		color: #172b4d;
		font-size: 14px;
	}

	.alert-detail {
		font-size: 12px;
		color: #5e6c84;
	}

	.staff-list {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.staff-item {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 8px;
		background: #f7f8fa;
		border-radius: 6px;
	}

	.staff-avatar {
		width: 32px;
		height: 32px;
		background: #6554c0;
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		font-size: 14px;
	}

	.staff-info {
		flex: 1;
	}

	.staff-name {
		font-weight: 600;
		color: #172b4d;
		font-size: 14px;
	}

	.staff-role {
		font-size: 12px;
		color: #5e6c84;
	}

	.staff-status {
		padding: 4px 8px;
		border-radius: 4px;
		font-size: 11px;
		font-weight: 600;
	}

	.staff-active {
		background: #d4edda;
		color: #155724;
	}

	.staff-break {
		background: #fff3cd;
		color: #856404;
	}

	.quick-actions {
		margin-top: 24px;
	}

	.quick-actions h2 {
		font-size: 18px;
		color: #172b4d;
		margin-bottom: 16px;
	}

	.actions-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 12px;
	}

	.action-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 12px 20px;
		background: white;
		border: 2px solid #dfe1e6;
		border-radius: 6px;
		font-size: 14px;
		font-weight: 600;
		color: #172b4d;
		cursor: pointer;
		transition: all 0.2s;
	}

	.action-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.action-button.primary {
		border-color: #0052cc;
		color: #0052cc;
	}

	.action-button.primary:hover {
		background: #0052cc;
		color: white;
	}

	.action-button.success {
		border-color: #00875a;
		color: #00875a;
	}

	.action-button.success:hover {
		background: #00875a;
		color: white;
	}

	.action-button.warning {
		border-color: #ff8b00;
		color: #ff8b00;
	}

	.action-button.warning:hover {
		background: #ff8b00;
		color: white;
	}

	.action-button.info {
		border-color: #00b8d9;
		color: #00b8d9;
	}

	.action-button.info:hover {
		background: #00b8d9;
		color: white;
	}

	@media (max-width: 1024px) {
		.dashboard-grid {
			grid-template-columns: 1fr;
		}

		.chart-card {
			grid-column: span 1;
		}

		.alerts-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 768px) {
		.stats-grid {
			grid-template-columns: 1fr;
		}

		.dashboard-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 12px;
		}
	}
</style>