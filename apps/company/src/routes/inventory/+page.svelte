<script lang="ts">
	import { 
		Package, Search, Plus, AlertTriangle, 
		TrendingDown, Filter, Download, Edit2,
		ShoppingCart, Clock, BarChart
	} from 'lucide-svelte';

	let searchQuery = $state('');
	let selectedCategory = $state('all');
	let alertFilter = $state('all');
	let showAddModal = $state(false);

	const categories = [
		{ value: 'all', label: 'すべて' },
		{ value: 'vegetables', label: '野菜' },
		{ value: 'meat', label: '肉類' },
		{ value: 'seafood', label: '魚介類' },
		{ value: 'seasoning', label: '調味料' },
		{ value: 'beverage', label: '飲料' },
		{ value: 'other', label: 'その他' }
	];

	const inventory = [
		{
			id: 1,
			name: 'まぐろ（赤身）',
			category: 'seafood',
			current: 2.5,
			unit: 'kg',
			minimum: 5,
			optimal: 10,
			lastOrder: '2024-01-25',
			supplier: '山田水産',
			unitPrice: 3200,
			status: 'critical'
		},
		{
			id: 2,
			name: '豚肉（ロース）',
			category: 'meat',
			current: 8,
			unit: 'kg',
			minimum: 10,
			optimal: 20,
			lastOrder: '2024-01-26',
			supplier: '田中精肉',
			unitPrice: 1800,
			status: 'warning'
		},
		{
			id: 3,
			name: '玉ねぎ',
			category: 'vegetables',
			current: 15,
			unit: 'kg',
			minimum: 10,
			optimal: 30,
			lastOrder: '2024-01-27',
			supplier: '青果市場',
			unitPrice: 120,
			status: 'good'
		},
		{
			id: 4,
			name: 'しょうゆ',
			category: 'seasoning',
			current: 3,
			unit: 'L',
			minimum: 5,
			optimal: 10,
			lastOrder: '2024-01-20',
			supplier: 'キッコーマン',
			unitPrice: 450,
			status: 'warning'
		},
		{
			id: 5,
			name: '鶏肉（もも）',
			category: 'meat',
			current: 12,
			unit: 'kg',
			minimum: 8,
			optimal: 15,
			lastOrder: '2024-01-27',
			supplier: '田中精肉',
			unitPrice: 980,
			status: 'good'
		},
		{
			id: 6,
			name: 'キャベツ',
			category: 'vegetables',
			current: 8,
			unit: 'kg',
			minimum: 5,
			optimal: 15,
			lastOrder: '2024-01-28',
			supplier: '青果市場',
			unitPrice: 150,
			status: 'good'
		},
		{
			id: 7,
			name: 'ビール',
			category: 'beverage',
			current: 5,
			unit: 'ケース',
			minimum: 10,
			optimal: 20,
			lastOrder: '2024-01-26',
			supplier: 'アサヒビール',
			unitPrice: 3800,
			status: 'critical'
		},
		{
			id: 8,
			name: 'みりん',
			category: 'seasoning',
			current: 4,
			unit: 'L',
			minimum: 3,
			optimal: 8,
			lastOrder: '2024-01-22',
			supplier: '味の素',
			unitPrice: 380,
			status: 'good'
		}
	];

	let filteredInventory = $derived(
		inventory.filter(item => {
			const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
								  item.supplier.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
			const matchesAlert = alertFilter === 'all' || 
								 (alertFilter === 'critical' && item.status === 'critical') ||
								 (alertFilter === 'warning' && item.status === 'warning');
			return matchesSearch && matchesCategory && matchesAlert;
		})
	);

	const orderSuggestions = [
		{ item: 'まぐろ（赤身）', suggested: 10, unit: 'kg', supplier: '山田水産', total: 32000 },
		{ item: '豚肉（ロース）', suggested: 15, unit: 'kg', supplier: '田中精肉', total: 27000 },
		{ item: 'ビール', suggested: 20, unit: 'ケース', supplier: 'アサヒビール', total: 76000 },
		{ item: 'しょうゆ', suggested: 8, unit: 'L', supplier: 'キッコーマン', total: 3600 }
	];

	const wasteReport = [
		{ item: 'レタス', amount: 2.5, unit: 'kg', value: 750, reason: '期限切れ' },
		{ item: 'トマト', amount: 1.8, unit: 'kg', value: 540, reason: '品質劣化' },
		{ item: '牛乳', amount: 3, unit: 'L', value: 600, reason: '期限切れ' }
	];

	function getStatusClass(status: string) {
		switch (status) {
			case 'critical': return 'status-critical';
			case 'warning': return 'status-warning';
			case 'good': return 'status-good';
			default: return '';
		}
	}

	function getStatusLabel(status: string) {
		switch (status) {
			case 'critical': return '要発注';
			case 'warning': return '残少';
			case 'good': return '適正';
			default: return '';
		}
	}

	function getStockPercentage(current: number, optimal: number) {
		return Math.min((current / optimal) * 100, 100);
	}

	function getCategoryLabel(category: string) {
		return categories.find(c => c.value === category)?.label || category;
	}
</script>

<div class="inventory">
	<div class="page-header">
		<div>
			<h1>在庫管理</h1>
			<p class="page-description">食材・備品の在庫状況と発注管理</p>
		</div>
		<div class="header-actions">
			<button class="button-secondary">
				<Download size={16} />
				在庫リスト出力
			</button>
			<button class="button-primary" onclick={() => showAddModal = true}>
				<Plus size={16} />
				在庫追加
			</button>
		</div>
	</div>

	<div class="alert-summary">
		<div class="alert-card critical">
			<AlertTriangle size={20} />
			<div class="alert-content">
				<div class="alert-count">3件</div>
				<div class="alert-label">要発注</div>
			</div>
		</div>
		<div class="alert-card warning">
			<TrendingDown size={20} />
			<div class="alert-content">
				<div class="alert-count">5件</div>
				<div class="alert-label">残少</div>
			</div>
		</div>
		<div class="alert-card info">
			<Package size={20} />
			<div class="alert-content">
				<div class="alert-count">24件</div>
				<div class="alert-label">在庫総数</div>
			</div>
		</div>
		<div class="alert-card waste">
			<BarChart size={20} />
			<div class="alert-content">
				<div class="alert-count">¥1,890</div>
				<div class="alert-label">今週の廃棄</div>
			</div>
		</div>
	</div>

	<div class="inventory-grid">
		<div class="card main-inventory">
			<div class="card-header">
				<h2>在庫一覧</h2>
				<div class="filters">
					<div class="search-box">
						<Search size={18} />
						<input 
							type="text" 
							placeholder="商品名・仕入先で検索"
							bind:value={searchQuery}
						/>
					</div>
					<select bind:value={selectedCategory}>
						{#each categories as category}
							<option value={category.value}>{category.label}</option>
						{/each}
					</select>
					<select bind:value={alertFilter}>
						<option value="all">すべての状態</option>
						<option value="critical">要発注のみ</option>
						<option value="warning">残少のみ</option>
					</select>
				</div>
			</div>

			<div class="inventory-table">
				<table>
					<thead>
						<tr>
							<th>商品名</th>
							<th>カテゴリー</th>
							<th>在庫状況</th>
							<th>現在庫</th>
							<th>最小/適正</th>
							<th>単価</th>
							<th>仕入先</th>
							<th>最終発注</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{#each filteredInventory as item}
							<tr>
								<td class="item-name">{item.name}</td>
								<td>
									<span class="category-badge">{getCategoryLabel(item.category)}</span>
								</td>
								<td>
									<div class="stock-status">
										<div class="stock-bar">
											<div 
												class="stock-fill {getStatusClass(item.status)}"
												style="width: {getStockPercentage(item.current, item.optimal)}%"
											></div>
										</div>
										<span class="status-label {getStatusClass(item.status)}">
											{getStatusLabel(item.status)}
										</span>
									</div>
								</td>
								<td class="quantity">
									<strong>{item.current}</strong> {item.unit}
								</td>
								<td class="thresholds">
									{item.minimum} / {item.optimal} {item.unit}
								</td>
								<td class="price">¥{item.unitPrice.toLocaleString()}</td>
								<td>{item.supplier}</td>
								<td class="date">{item.lastOrder}</td>
								<td>
									<button class="action-button">
										<Edit2 size={16} />
									</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>

		<div class="side-panels">
			<div class="card">
				<div class="card-header">
					<h3>
						<ShoppingCart size={18} />
						発注提案
					</h3>
					<button class="button-small">一括発注</button>
				</div>
				<div class="suggestions-list">
					{#each orderSuggestions as suggestion}
						<div class="suggestion-item">
							<div class="suggestion-info">
								<div class="suggestion-name">{suggestion.item}</div>
								<div class="suggestion-detail">
									{suggestion.suggested} {suggestion.unit} • {suggestion.supplier}
								</div>
							</div>
							<div class="suggestion-action">
								<div class="suggestion-price">¥{suggestion.total.toLocaleString()}</div>
								<button class="order-button">発注</button>
							</div>
						</div>
					{/each}
				</div>
				<div class="suggestions-total">
					<span>合計金額</span>
					<strong>¥138,600</strong>
				</div>
			</div>

			<div class="card">
				<div class="card-header">
					<h3>
						<AlertTriangle size={18} />
						廃棄レポート
					</h3>
					<span class="period-label">今週</span>
				</div>
				<div class="waste-list">
					{#each wasteReport as waste}
						<div class="waste-item">
							<div class="waste-info">
								<div class="waste-name">{waste.item}</div>
								<div class="waste-detail">
									{waste.amount} {waste.unit} • {waste.reason}
								</div>
							</div>
							<div class="waste-value">-¥{waste.value}</div>
						</div>
					{/each}
				</div>
				<div class="waste-summary">
					<div class="summary-row">
						<span>廃棄合計</span>
						<strong class="negative">-¥1,890</strong>
					</div>
					<div class="summary-row">
						<span>前週比</span>
						<span class="positive">-15%改善</span>
					</div>
				</div>
			</div>

			<div class="card">
				<div class="card-header">
					<h3>
						<Clock size={18} />
						発注履歴
					</h3>
				</div>
				<div class="history-list">
					<div class="history-item">
						<div class="history-date">2024-01-28</div>
						<div class="history-detail">
							<div>青果市場</div>
							<div class="history-amount">¥24,500</div>
						</div>
					</div>
					<div class="history-item">
						<div class="history-date">2024-01-27</div>
						<div class="history-detail">
							<div>田中精肉</div>
							<div class="history-amount">¥45,200</div>
						</div>
					</div>
					<div class="history-item">
						<div class="history-date">2024-01-26</div>
						<div class="history-detail">
							<div>山田水産</div>
							<div class="history-amount">¥68,900</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.inventory {
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

	.alert-summary {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 16px;
		margin-bottom: 24px;
	}

	.alert-card {
		background: white;
		padding: 16px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		gap: 12px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.alert-card.critical {
		border-left: 4px solid #de350b;
		color: #de350b;
	}

	.alert-card.warning {
		border-left: 4px solid #ff8b00;
		color: #ff8b00;
	}

	.alert-card.info {
		border-left: 4px solid #0052cc;
		color: #0052cc;
	}

	.alert-card.waste {
		border-left: 4px solid #6554c0;
		color: #6554c0;
	}

	.alert-content {
		flex: 1;
	}

	.alert-count {
		font-size: 20px;
		font-weight: 700;
		color: #172b4d;
	}

	.alert-label {
		font-size: 12px;
		color: #5e6c84;
	}

	.inventory-grid {
		display: grid;
		grid-template-columns: 1fr 380px;
		gap: 20px;
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

	.card-header h3 {
		margin: 0;
		font-size: 16px;
		color: #172b4d;
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.filters {
		display: flex;
		gap: 12px;
	}

	.search-box {
		position: relative;
		display: flex;
		align-items: center;
	}

	.search-box svg {
		position: absolute;
		left: 10px;
		color: #5e6c84;
	}

	.search-box input {
		padding: 6px 12px 6px 36px;
		border: 1px solid #dfe1e6;
		border-radius: 4px;
		font-size: 14px;
		width: 200px;
	}

	select {
		padding: 6px 12px;
		border: 1px solid #dfe1e6;
		border-radius: 4px;
		font-size: 14px;
		background: white;
	}

	.inventory-table {
		overflow-x: auto;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	thead tr {
		border-bottom: 2px solid #dfe1e6;
	}

	th {
		text-align: left;
		padding: 12px;
		font-size: 12px;
		font-weight: 600;
		color: #5e6c84;
		text-transform: uppercase;
	}

	tbody tr {
		border-bottom: 1px solid #f4f5f7;
	}

	tbody tr:hover {
		background: #f7f8fa;
	}

	td {
		padding: 12px;
		font-size: 14px;
		color: #172b4d;
	}

	.item-name {
		font-weight: 600;
	}

	.category-badge {
		padding: 4px 8px;
		background: #f4f5f7;
		border-radius: 4px;
		font-size: 12px;
		color: #42526e;
	}

	.stock-status {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.stock-bar {
		width: 80px;
		height: 6px;
		background: #dfe1e6;
		border-radius: 3px;
		overflow: hidden;
	}

	.stock-fill {
		height: 100%;
		transition: all 0.3s;
	}

	.stock-fill.status-critical {
		background: #de350b;
	}

	.stock-fill.status-warning {
		background: #ff8b00;
	}

	.stock-fill.status-good {
		background: #00875a;
	}

	.status-label {
		font-size: 12px;
		font-weight: 600;
		padding: 2px 6px;
		border-radius: 3px;
	}

	.status-label.status-critical {
		background: #ffebe6;
		color: #de350b;
	}

	.status-label.status-warning {
		background: #fff7e6;
		color: #ff8b00;
	}

	.status-label.status-good {
		background: #e3fcef;
		color: #00875a;
	}

	.quantity strong {
		font-weight: 700;
		color: #172b4d;
	}

	.thresholds {
		color: #5e6c84;
		font-size: 13px;
	}

	.price {
		font-weight: 600;
	}

	.date {
		color: #5e6c84;
		font-size: 13px;
	}

	.action-button {
		background: none;
		border: none;
		padding: 4px;
		color: #5e6c84;
		cursor: pointer;
		transition: all 0.2s;
	}

	.action-button:hover {
		color: #172b4d;
	}

	.side-panels {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.button-small {
		padding: 4px 12px;
		background: #0052cc;
		color: white;
		border: none;
		border-radius: 4px;
		font-size: 12px;
		font-weight: 500;
		cursor: pointer;
	}

	.button-small:hover {
		background: #0065ff;
	}

	.suggestions-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin-bottom: 16px;
	}

	.suggestion-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px;
		background: #f7f8fa;
		border-radius: 6px;
	}

	.suggestion-name {
		font-weight: 600;
		color: #172b4d;
		margin-bottom: 2px;
	}

	.suggestion-detail {
		font-size: 12px;
		color: #5e6c84;
	}

	.suggestion-action {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.suggestion-price {
		font-weight: 600;
		color: #172b4d;
	}

	.order-button {
		padding: 4px 12px;
		background: #00875a;
		color: white;
		border: none;
		border-radius: 4px;
		font-size: 12px;
		font-weight: 500;
		cursor: pointer;
	}

	.order-button:hover {
		background: #00a86b;
	}

	.suggestions-total {
		display: flex;
		justify-content: space-between;
		padding-top: 12px;
		border-top: 1px solid #dfe1e6;
		font-size: 14px;
	}

	.suggestions-total strong {
		font-size: 18px;
		color: #172b4d;
	}

	.period-label {
		padding: 2px 8px;
		background: #f4f5f7;
		border-radius: 4px;
		font-size: 12px;
		color: #5e6c84;
	}

	.waste-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin-bottom: 16px;
	}

	.waste-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px;
		background: #fff3cd;
		border-radius: 6px;
	}

	.waste-name {
		font-weight: 600;
		color: #172b4d;
		margin-bottom: 2px;
	}

	.waste-detail {
		font-size: 12px;
		color: #5e6c84;
	}

	.waste-value {
		font-weight: 600;
		color: #de350b;
	}

	.waste-summary {
		padding-top: 12px;
		border-top: 1px solid #dfe1e6;
	}

	.summary-row {
		display: flex;
		justify-content: space-between;
		margin-bottom: 8px;
		font-size: 14px;
	}

	.summary-row strong {
		font-weight: 700;
	}

	.negative {
		color: #de350b;
	}

	.positive {
		color: #00875a;
	}

	.history-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.history-item {
		padding: 12px;
		background: #f7f8fa;
		border-radius: 6px;
	}

	.history-date {
		font-size: 12px;
		color: #5e6c84;
		margin-bottom: 4px;
	}

	.history-detail {
		display: flex;
		justify-content: space-between;
		font-size: 14px;
		color: #172b4d;
	}

	.history-amount {
		font-weight: 600;
	}

	@media (max-width: 1200px) {
		.inventory-grid {
			grid-template-columns: 1fr;
		}

		.side-panels {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
			gap: 20px;
		}
	}

	@media (max-width: 768px) {
		.page-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 16px;
		}

		.filters {
			flex-direction: column;
			width: 100%;
		}

		.search-box input {
			width: 100%;
		}

		.alert-summary {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>