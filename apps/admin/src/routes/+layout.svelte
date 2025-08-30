<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import {
		LayoutDashboard,
		Users,
		FileText,
		Settings,
		Bell,
		Search,
		User,
		LogOut,
		ChevronDown,
		BarChart3,
		ShoppingBag,
		MessageSquare
	} from 'lucide-svelte';

	let { children } = $props();
	let searchQuery = $state('');
	let userMenuOpen = $state(false);
	let notificationOpen = $state(false);

	const navItems = [
		{ path: '/', label: 'ダッシュボード', icon: LayoutDashboard },
		{ path: '/users', label: 'ユーザー管理', icon: Users },
		{ path: '/products', label: '商品管理', icon: ShoppingBag },
		{ path: '/orders', label: '注文管理', icon: FileText },
		{ path: '/analytics', label: '分析', icon: BarChart3 },
		{ path: '/messages', label: 'メッセージ', icon: MessageSquare },
		{ path: '/settings', label: '設定', icon: Settings }
	];

	let currentPath = $derived($page.url.pathname);
</script>

<div class="layout">
	<aside class="sidebar">
		<div class="sidebar-header">
			<h2 class="logo">管理画面</h2>
		</div>
		<nav class="sidebar-nav">
			{#each navItems as item}
				<a
					href={item.path}
					class="nav-item"
					class:active={currentPath === item.path}
				>
					<svelte:component this={item.icon} size={20} />
					<span>{item.label}</span>
				</a>
			{/each}
		</nav>
	</aside>

	<div class="main-content">
		<header class="header">
			<div class="header-left">
				<div class="search-container">
					<Search size={20} class="search-icon" />
					<input
						type="text"
						placeholder="検索..."
						bind:value={searchQuery}
						class="search-input"
					/>
				</div>
			</div>
			<div class="header-right">
				<button class="header-button notification-button" onclick={() => notificationOpen = !notificationOpen}>
					<Bell size={20} />
					<span class="notification-badge">3</span>
				</button>
				<button class="header-button user-menu" onclick={() => userMenuOpen = !userMenuOpen}>
					<div class="user-avatar">
						<User size={16} />
					</div>
					<span>管理者</span>
					<ChevronDown size={16} />
				</button>
				{#if userMenuOpen}
					<div class="dropdown-menu user-dropdown">
						<a href="/profile" class="dropdown-item">
							<User size={16} />
							プロフィール
						</a>
						<a href="/logout" class="dropdown-item">
							<LogOut size={16} />
							ログアウト
						</a>
					</div>
				{/if}
				{#if notificationOpen}
					<div class="dropdown-menu notification-dropdown">
						<div class="dropdown-header">通知</div>
						<div class="notification-item">
							<div class="notification-content">
								<div class="notification-title">新規ユーザー登録</div>
								<div class="notification-desc">田中太郎さんが登録しました</div>
								<div class="notification-time">5分前</div>
							</div>
						</div>
						<div class="notification-item">
							<div class="notification-content">
								<div class="notification-title">新規注文</div>
								<div class="notification-desc">注文#1234が作成されました</div>
								<div class="notification-time">1時間前</div>
							</div>
						</div>
						<div class="notification-item">
							<div class="notification-content">
								<div class="notification-title">レポート完了</div>
								<div class="notification-desc">月次レポートが生成されました</div>
								<div class="notification-time">3時間前</div>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</header>
		<main class="content">
			{@render children?.()}
		</main>
	</div>
</div>

<style>
	.layout {
		display: flex;
		height: 100vh;
		overflow: hidden;
	}

	.sidebar {
		width: var(--sidebar-width);
		background: var(--text-primary);
		color: white;
		display: flex;
		flex-direction: column;
	}

	.sidebar-header {
		padding: 20px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.logo {
		color: white;
		margin: 0;
		font-size: 18px;
	}

	.sidebar-nav {
		flex: 1;
		padding: 16px 0;
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 20px;
		color: rgba(255, 255, 255, 0.8);
		transition: all 0.2s;
	}

	.nav-item:hover {
		background: rgba(255, 255, 255, 0.1);
		color: white;
		text-decoration: none;
	}

	.nav-item.active {
		background: rgba(255, 255, 255, 0.15);
		color: white;
		border-left: 3px solid white;
		padding-left: 17px;
	}

	.main-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.header {
		height: var(--header-height);
		background: white;
		border-bottom: 1px solid var(--border);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 24px;
		position: relative;
	}

	.header-left {
		flex: 1;
		max-width: 400px;
	}

	.search-container {
		position: relative;
	}

	.search-icon {
		position: absolute;
		left: 12px;
		top: 50%;
		transform: translateY(-50%);
		color: var(--text-subtle);
	}

	.search-input {
		width: 100%;
		padding: 8px 12px 8px 40px;
		border: 2px solid var(--border);
		border-radius: 3px;
		background: var(--surface);
	}

	.search-input:focus {
		outline: none;
		border-color: var(--border-focus);
		background: white;
	}

	.header-right {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.header-button {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px 12px;
		background: transparent;
		border: none;
		color: var(--text-primary);
		border-radius: 3px;
		transition: all 0.2s;
		position: relative;
	}

	.header-button:hover {
		background: var(--surface);
	}

	.notification-button {
		position: relative;
	}

	.notification-badge {
		position: absolute;
		top: 4px;
		right: 4px;
		background: var(--danger);
		color: white;
		font-size: 10px;
		padding: 2px 4px;
		border-radius: 10px;
		min-width: 16px;
		text-align: center;
	}

	.user-avatar {
		width: 28px;
		height: 28px;
		background: var(--primary);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
	}

	.dropdown-menu {
		position: absolute;
		top: calc(100% + 8px);
		right: 24px;
		background: white;
		border: 1px solid var(--border);
		border-radius: 3px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		min-width: 200px;
		z-index: 1000;
	}

	.user-dropdown {
		right: 24px;
	}

	.notification-dropdown {
		right: 80px;
		width: 320px;
	}

	.dropdown-header {
		padding: 12px 16px;
		font-weight: 600;
		border-bottom: 1px solid var(--border);
	}

	.dropdown-item {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 16px;
		color: var(--text-primary);
		transition: all 0.2s;
	}

	.dropdown-item:hover {
		background: var(--surface);
		text-decoration: none;
	}

	.notification-item {
		padding: 12px 16px;
		border-bottom: 1px solid var(--border);
		cursor: pointer;
		transition: all 0.2s;
	}

	.notification-item:hover {
		background: var(--surface);
	}

	.notification-item:last-child {
		border-bottom: none;
	}

	.notification-title {
		font-weight: 600;
		margin-bottom: 4px;
	}

	.notification-desc {
		color: var(--text-secondary);
		font-size: 13px;
		margin-bottom: 4px;
	}

	.notification-time {
		color: var(--text-subtle);
		font-size: 12px;
	}

	.content {
		flex: 1;
		padding: 24px;
		overflow-y: auto;
		background: var(--surface);
	}
</style>
