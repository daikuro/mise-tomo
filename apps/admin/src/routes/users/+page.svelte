<script lang="ts">
	import { Search, Plus, Edit2, Trash2, MoreVertical, Download, Filter } from 'lucide-svelte';

	let searchQuery = $state('');
	let selectedRole = $state('all');
	let selectedStatus = $state('all');

	const users = [
		{
			id: 1,
			name: '田中太郎',
			email: 'tanaka@example.com',
			role: '管理者',
			status: 'アクティブ',
			lastLogin: '2024-01-28 10:30',
			joinDate: '2023-05-15'
		},
		{
			id: 2,
			name: '佐藤花子',
			email: 'sato@example.com',
			role: 'エディター',
			status: 'アクティブ',
			lastLogin: '2024-01-28 09:15',
			joinDate: '2023-08-20'
		},
		{
			id: 3,
			name: '鈴木一郎',
			email: 'suzuki@example.com',
			role: 'ビューアー',
			status: '無効',
			lastLogin: '2024-01-15 14:20',
			joinDate: '2023-11-10'
		},
		{
			id: 4,
			name: '高橋美咲',
			email: 'takahashi@example.com',
			role: 'エディター',
			status: 'アクティブ',
			lastLogin: '2024-01-27 16:45',
			joinDate: '2023-06-25'
		},
		{
			id: 5,
			name: '伊藤健太',
			email: 'ito@example.com',
			role: 'ビューアー',
			status: '保留中',
			lastLogin: '2024-01-20 11:30',
			joinDate: '2024-01-10'
		}
	];

	let filteredUsers = $derived(users.filter(user => {
		const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
							  user.email.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesRole = selectedRole === 'all' || user.role === selectedRole;
		const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
		return matchesSearch && matchesRole && matchesStatus;
	}));

	function getRoleBadgeClass(role: string) {
		switch (role) {
			case '管理者': return 'badge-danger';
			case 'エディター': return 'badge-warning';
			case 'ビューアー': return 'badge-info';
			default: return '';
		}
	}

	function getStatusBadgeClass(status: string) {
		switch (status) {
			case 'アクティブ': return 'badge-success';
			case '無効': return 'badge-danger';
			case '保留中': return 'badge-warning';
			default: return '';
		}
	}
</script>

<div class="users-page">
	<div class="page-header">
		<div>
			<h1>ユーザー管理</h1>
			<p class="page-description">システムユーザーの管理と権限設定</p>
		</div>
		<div class="header-actions">
			<button class="button button-secondary">
				<Download size={16} />
				エクスポート
			</button>
			<button class="button button-primary">
				<Plus size={16} />
				新規ユーザー
			</button>
		</div>
	</div>

	<div class="card">
		<div class="filters">
			<div class="search-box">
				<Search size={20} class="search-icon" />
				<input
					type="text"
					placeholder="名前やメールアドレスで検索..."
					bind:value={searchQuery}
					class="form-input search-input"
				/>
			</div>
			<div class="filter-group">
				<select bind:value={selectedRole} class="form-input">
					<option value="all">すべての役割</option>
					<option value="管理者">管理者</option>
					<option value="エディター">エディター</option>
					<option value="ビューアー">ビューアー</option>
				</select>
				<select bind:value={selectedStatus} class="form-input">
					<option value="all">すべてのステータス</option>
					<option value="アクティブ">アクティブ</option>
					<option value="無効">無効</option>
					<option value="保留中">保留中</option>
				</select>
				<button class="button button-secondary">
					<Filter size={16} />
					フィルター
				</button>
			</div>
		</div>

		<table class="users-table">
			<thead>
				<tr>
					<th style="width: 40px">
						<input type="checkbox" />
					</th>
					<th>ユーザー</th>
					<th>役割</th>
					<th>ステータス</th>
					<th>最終ログイン</th>
					<th>登録日</th>
					<th style="width: 60px"></th>
				</tr>
			</thead>
			<tbody>
				{#each filteredUsers as user}
					<tr>
						<td>
							<input type="checkbox" />
						</td>
						<td>
							<div class="user-info">
								<div class="user-avatar">
									{user.name.charAt(0)}
								</div>
								<div>
									<div class="user-name">{user.name}</div>
									<div class="user-email">{user.email}</div>
								</div>
							</div>
						</td>
						<td>
							<span class="badge {getRoleBadgeClass(user.role)}">
								{user.role}
							</span>
						</td>
						<td>
							<span class="badge {getStatusBadgeClass(user.status)}">
								{user.status}
							</span>
						</td>
						<td>{user.lastLogin}</td>
						<td>{user.joinDate}</td>
						<td>
							<button class="action-button">
								<MoreVertical size={16} />
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>

		<div class="table-footer">
			<div class="pagination-info">
				{filteredUsers.length} 件中 1-{Math.min(filteredUsers.length, 10)} 件を表示
			</div>
			<div class="pagination">
				<button class="pagination-button" disabled>前へ</button>
				<button class="pagination-button active">1</button>
				<button class="pagination-button">2</button>
				<button class="pagination-button">3</button>
				<button class="pagination-button">次へ</button>
			</div>
		</div>
	</div>
</div>

<style>
	.users-page {
		max-width: 1400px;
		margin: 0 auto;
	}

	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 24px;
	}

	.page-description {
		color: var(--text-secondary);
		margin-top: 4px;
	}

	.header-actions {
		display: flex;
		gap: 12px;
	}

	.filters {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
		gap: 16px;
	}

	.search-box {
		position: relative;
		flex: 1;
		max-width: 400px;
	}

	.search-icon {
		position: absolute;
		left: 12px;
		top: 50%;
		transform: translateY(-50%);
		color: var(--text-subtle);
	}

	.search-input {
		padding-left: 40px;
		width: 100%;
	}

	.filter-group {
		display: flex;
		gap: 12px;
	}

	.users-table {
		width: 100%;
	}

	.user-info {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.user-avatar {
		width: 36px;
		height: 36px;
		background: var(--primary);
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
	}

	.user-name {
		font-weight: 600;
	}

	.user-email {
		font-size: 13px;
		color: var(--text-secondary);
	}

	.action-button {
		background: transparent;
		border: none;
		padding: 4px;
		border-radius: 3px;
		color: var(--text-secondary);
		cursor: pointer;
		transition: all 0.2s;
	}

	.action-button:hover {
		background: var(--surface);
		color: var(--text-primary);
	}

	.table-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16px 0;
		border-top: 1px solid var(--border);
	}

	.pagination-info {
		color: var(--text-secondary);
		font-size: 13px;
	}

	.pagination {
		display: flex;
		gap: 4px;
	}

	.pagination-button {
		padding: 6px 12px;
		background: transparent;
		border: 1px solid var(--border);
		border-radius: 3px;
		color: var(--text-primary);
		font-size: 13px;
		cursor: pointer;
		transition: all 0.2s;
	}

	.pagination-button:hover:not(:disabled) {
		background: var(--surface);
	}

	.pagination-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.pagination-button.active {
		background: var(--primary);
		color: white;
		border-color: var(--primary);
	}

	@media (max-width: 768px) {
		.page-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 16px;
		}

		.filters {
			flex-direction: column;
			align-items: stretch;
		}

		.filter-group {
			flex-wrap: wrap;
		}

		.search-box {
			max-width: none;
		}
	}
</style>