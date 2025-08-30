<script lang="ts">
	import { 
		Users, Plus, Calendar, Clock, DollarSign, 
		Mail, Phone, Edit2, MoreVertical, UserCheck,
		UserX, AlertCircle, TrendingUp
	} from 'lucide-svelte';
	import { onMount } from 'svelte';

	let searchQuery = $state('');
	let filterStatus = $state('all');
	let filterRole = $state('all');
	let showAddModal = $state(false);
	let selectedStaff = $state<any>(null);

	// サンプルデータ（実際はFirestoreから取得）
	const staffList = [
		{
			id: 'staff1',
			name: '山田 花子',
			role: 'アルバイト',
			email: 'yamada@example.com',
			phone: '090-1234-5678',
			status: 'active',
			startDate: '2024-01-15',
			hourlyWage: 1200,
			monthlyHours: 120,
			shiftThisWeek: 32,
			nextShift: '1/30 17:00-22:00',
			avatarInitial: '山'
		},
		{
			id: 'staff2',
			name: '佐藤 太郎',
			role: '正社員',
			email: 'sato@example.com',
			phone: '080-9876-5432',
			status: 'active',
			startDate: '2023-04-01',
			monthlySalary: 250000,
			shiftThisWeek: 40,
			nextShift: '1/30 10:00-19:00',
			avatarInitial: '佐'
		},
		{
			id: 'staff3',
			name: '鈴木 美咲',
			role: 'アルバイト',
			email: 'suzuki@example.com',
			phone: '070-2468-1357',
			status: 'active',
			startDate: '2024-02-01',
			hourlyWage: 1100,
			monthlyHours: 80,
			shiftThisWeek: 20,
			nextShift: '1/31 11:00-17:00',
			avatarInitial: '鈴',
			isNew: true // 新規採用フラグ
		},
		{
			id: 'staff4',
			name: '田中 健一',
			role: 'アルバイト',
			email: 'tanaka@example.com',
			phone: '090-1111-2222',
			status: 'inactive',
			startDate: '2023-06-15',
			endDate: '2024-01-20',
			hourlyWage: 1150,
			avatarInitial: '田'
		}
	];

	let filteredStaff = $derived(
		staffList.filter(staff => {
			const matchesSearch = 
				staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				staff.email.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesStatus = filterStatus === 'all' || staff.status === filterStatus;
			const matchesRole = filterRole === 'all' || staff.role === filterRole;
			return matchesSearch && matchesStatus && matchesRole;
		})
	);

	const stats = {
		totalStaff: staffList.filter(s => s.status === 'active').length,
		newThisMonth: staffList.filter(s => s.isNew).length,
		avgHours: 88,
		laborCost: 980000
	};

	function getStatusBadgeClass(status: string) {
		return status === 'active' ? 'badge-active' : 'badge-inactive';
	}

	function getStatusLabel(status: string) {
		return status === 'active' ? '在籍' : '退職';
	}

	function formatCurrency(amount: number) {
		return `¥${amount.toLocaleString()}`;
	}
</script>

<div class="staff-page">
	<div class="page-header">
		<div>
			<h1>スタッフ管理</h1>
			<p class="page-description">従業員情報とシフト管理</p>
		</div>
		<div class="header-actions">
			<button class="button-secondary">
				<Calendar size={16} />
				シフト表
			</button>
			<button class="button-primary" onclick={() => showAddModal = true}>
				<Plus size={16} />
				スタッフ追加
			</button>
		</div>
	</div>

	<!-- 統計カード -->
	<div class="stats-grid">
		<div class="stat-card">
			<div class="stat-icon blue">
				<Users size={24} />
			</div>
			<div class="stat-content">
				<div class="stat-label">在籍スタッフ</div>
				<div class="stat-value">{stats.totalStaff}名</div>
				<div class="stat-change positive">
					<TrendingUp size={14} />
					今月 +{stats.newThisMonth}名
				</div>
			</div>
		</div>

		<div class="stat-card">
			<div class="stat-icon green">
				<UserCheck size={24} />
			</div>
			<div class="stat-content">
				<div class="stat-label">新規採用</div>
				<div class="stat-value">{stats.newThisMonth}名</div>
				<div class="stat-sublabel">今月の採用</div>
			</div>
		</div>

		<div class="stat-card">
			<div class="stat-icon purple">
				<Clock size={24} />
			</div>
			<div class="stat-content">
				<div class="stat-label">平均労働時間</div>
				<div class="stat-value">{stats.avgHours}時間</div>
				<div class="stat-sublabel">月間平均</div>
			</div>
		</div>

		<div class="stat-card">
			<div class="stat-icon orange">
				<DollarSign size={24} />
			</div>
			<div class="stat-content">
				<div class="stat-label">人件費</div>
				<div class="stat-value">{formatCurrency(stats.laborCost)}</div>
				<div class="stat-sublabel">今月の概算</div>
			</div>
		</div>
	</div>

	<!-- フィルター -->
	<div class="filters-bar">
		<div class="search-box">
			<input 
				type="text" 
				placeholder="名前・メールで検索"
				bind:value={searchQuery}
			/>
		</div>
		<select bind:value={filterStatus}>
			<option value="all">すべての状態</option>
			<option value="active">在籍中</option>
			<option value="inactive">退職済み</option>
		</select>
		<select bind:value={filterRole}>
			<option value="all">すべての雇用形態</option>
			<option value="正社員">正社員</option>
			<option value="アルバイト">アルバイト</option>
		</select>
	</div>

	<!-- スタッフリスト -->
	<div class="staff-list">
		{#each filteredStaff as staff}
			<div class="staff-card" class:new={staff.isNew}>
				{#if staff.isNew}
					<div class="new-badge">NEW</div>
				{/if}
				
				<div class="staff-header">
					<div class="staff-basic">
						<div class="avatar" style="background: {staff.status === 'active' ? '#0052cc' : '#97a0af'}">
							{staff.avatarInitial}
						</div>
						<div class="staff-info">
							<div class="staff-name">
								{staff.name}
								<span class="badge {getStatusBadgeClass(staff.status)}">
									{getStatusLabel(staff.status)}
								</span>
							</div>
							<div class="staff-role">{staff.role}</div>
							<div class="staff-meta">
								入社: {staff.startDate}
								{#if staff.endDate}
									| 退社: {staff.endDate}
								{/if}
							</div>
						</div>
					</div>
					<button class="action-menu">
						<MoreVertical size={20} />
					</button>
				</div>

				<div class="staff-details">
					<div class="detail-item">
						<Mail size={16} />
						<span>{staff.email}</span>
					</div>
					<div class="detail-item">
						<Phone size={16} />
						<span>{staff.phone}</span>
					</div>
					{#if staff.status === 'active'}
						<div class="detail-item">
							<Calendar size={16} />
							<span>次回: {staff.nextShift || '未定'}</span>
						</div>
						<div class="detail-item">
							<Clock size={16} />
							<span>今週: {staff.shiftThisWeek}時間</span>
						</div>
					{/if}
				</div>

				{#if staff.status === 'active'}
					<div class="staff-footer">
						<div class="wage-info">
							{#if staff.hourlyWage}
								<span class="wage-label">時給</span>
								<span class="wage-value">{formatCurrency(staff.hourlyWage)}</span>
								<span class="wage-hours">({staff.monthlyHours}h/月)</span>
							{:else if staff.monthlySalary}
								<span class="wage-label">月給</span>
								<span class="wage-value">{formatCurrency(staff.monthlySalary)}</span>
							{/if}
						</div>
						<div class="staff-actions">
							<button class="btn-icon" title="編集">
								<Edit2 size={16} />
							</button>
							<button class="btn-icon" title="シフト">
								<Calendar size={16} />
							</button>
						</div>
					</div>
				{/if}
			</div>
		{/each}

		{#if filteredStaff.length === 0}
			<div class="empty-state">
				<Users size={48} />
				<h3>スタッフが見つかりません</h3>
				<p>検索条件を変更するか、新しいスタッフを追加してください</p>
			</div>
		{/if}
	</div>
</div>

<style>
	.staff-page {
		max-width: 1200px;
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

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 16px;
		margin-bottom: 24px;
	}

	.stat-card {
		background: white;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		display: flex;
		gap: 16px;
	}

	.stat-icon {
		width: 48px;
		height: 48px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
	}

	.stat-icon.blue {
		background: linear-gradient(135deg, #0052cc, #0065ff);
	}

	.stat-icon.green {
		background: linear-gradient(135deg, #00875a, #00a86b);
	}

	.stat-icon.purple {
		background: linear-gradient(135deg, #6554c0, #8777d9);
	}

	.stat-icon.orange {
		background: linear-gradient(135deg, #ff8b00, #ffab00);
	}

	.stat-content {
		flex: 1;
	}

	.stat-label {
		font-size: 13px;
		color: #5e6c84;
		margin-bottom: 4px;
	}

	.stat-value {
		font-size: 24px;
		font-weight: 700;
		color: #172b4d;
		margin-bottom: 4px;
	}

	.stat-change {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 12px;
		font-weight: 600;
	}

	.stat-change.positive {
		color: #00875a;
	}

	.stat-sublabel {
		font-size: 12px;
		color: #97a0af;
	}

	.filters-bar {
		display: flex;
		gap: 12px;
		margin-bottom: 20px;
	}

	.search-box {
		flex: 1;
	}

	.search-box input {
		width: 100%;
		padding: 8px 12px;
		border: 1px solid #dfe1e6;
		border-radius: 4px;
		font-size: 14px;
	}

	select {
		padding: 8px 12px;
		border: 1px solid #dfe1e6;
		border-radius: 4px;
		font-size: 14px;
		background: white;
	}

	.staff-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
		gap: 16px;
	}

	.staff-card {
		background: white;
		border-radius: 8px;
		padding: 20px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		position: relative;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.staff-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
	}

	.staff-card.new {
		border: 2px solid #00875a;
	}

	.new-badge {
		position: absolute;
		top: -8px;
		right: 16px;
		background: #00875a;
		color: white;
		padding: 4px 12px;
		border-radius: 12px;
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
	}

	.staff-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 16px;
	}

	.staff-basic {
		display: flex;
		gap: 12px;
	}

	.avatar {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-weight: 600;
		font-size: 18px;
	}

	.staff-info {
		flex: 1;
	}

	.staff-name {
		font-size: 16px;
		font-weight: 600;
		color: #172b4d;
		margin-bottom: 2px;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.badge {
		padding: 2px 6px;
		border-radius: 3px;
		font-size: 10px;
		font-weight: 600;
		text-transform: uppercase;
	}

	.badge-active {
		background: #e3fcef;
		color: #00875a;
	}

	.badge-inactive {
		background: #f4f5f7;
		color: #97a0af;
	}

	.staff-role {
		font-size: 14px;
		color: #5e6c84;
		margin-bottom: 4px;
	}

	.staff-meta {
		font-size: 12px;
		color: #97a0af;
	}

	.action-menu {
		background: none;
		border: none;
		padding: 4px;
		color: #5e6c84;
		cursor: pointer;
		border-radius: 4px;
		transition: all 0.2s;
	}

	.action-menu:hover {
		background: #f4f5f7;
		color: #172b4d;
	}

	.staff-details {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 12px 0;
		border-top: 1px solid #f4f5f7;
		border-bottom: 1px solid #f4f5f7;
	}

	.detail-item {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 13px;
		color: #5e6c84;
	}

	.staff-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 12px;
	}

	.wage-info {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.wage-label {
		font-size: 12px;
		color: #5e6c84;
	}

	.wage-value {
		font-size: 16px;
		font-weight: 600;
		color: #172b4d;
	}

	.wage-hours {
		font-size: 12px;
		color: #97a0af;
	}

	.staff-actions {
		display: flex;
		gap: 8px;
	}

	.btn-icon {
		padding: 6px;
		background: none;
		border: 1px solid #dfe1e6;
		border-radius: 4px;
		color: #5e6c84;
		cursor: pointer;
		transition: all 0.2s;
	}

	.btn-icon:hover {
		background: #f4f5f7;
		color: #172b4d;
	}

	.empty-state {
		grid-column: 1 / -1;
		padding: 60px 20px;
		text-align: center;
		color: #5e6c84;
		background: white;
		border-radius: 8px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.empty-state h3 {
		margin: 16px 0 8px 0;
		font-size: 20px;
		color: #172b4d;
	}

	.empty-state p {
		margin: 0;
		font-size: 14px;
	}

	@media (max-width: 768px) {
		.page-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 16px;
		}

		.stats-grid {
			grid-template-columns: 1fr 1fr;
		}

		.filters-bar {
			flex-direction: column;
		}

		.staff-list {
			grid-template-columns: 1fr;
		}
	}
</style>