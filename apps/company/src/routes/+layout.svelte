<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import { page } from '$app/stores';
	import { 
		Home, TrendingUp, Package, Users, BookOpen, 
		Calendar, FileText, Settings, Menu, X,
		Clock, AlertCircle, Inbox
	} from 'lucide-svelte';
	import NotificationBell from '$lib/components/NotificationBell.svelte';

	let isSidebarOpen = $state(false);

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();

	const navigation = [
		{ path: '/', label: 'ダッシュボード', icon: Home },
		{ path: '/applications', label: '応募管理', icon: Inbox },
		{ path: '/staff', label: 'スタッフ管理', icon: Users },
		{ path: '/analytics', label: '売上分析', icon: TrendingUp },
		{ path: '/inventory', label: '在庫管理', icon: Package },
		{ path: '/menu', label: 'メニュー管理', icon: BookOpen },
		{ path: '/reservations', label: '予約管理', icon: Calendar },
		{ path: '/reports', label: 'レポート', icon: FileText },
		{ path: '/settings', label: '設定', icon: Settings }
	];
</script>

<div class="layout">
	<aside class="sidebar" class:open={isSidebarOpen}>
		<div class="sidebar-header">
			<div class="logo">
				<span class="logo-icon">🍴</span>
				<span class="logo-text">RestaurantOS</span>
			</div>
			<button class="mobile-close" onclick={() => isSidebarOpen = false}>
				<X size={24} />
			</button>
		</div>
		
		<nav class="sidebar-nav">
			{#each navigation as item}
				<a 
					href={item.path} 
					class="nav-item" 
					class:active={$page.url.pathname === item.path}
					onclick={() => isSidebarOpen = false}
				>
					<svelte:component this={item.icon} size={20} />
					<span>{item.label}</span>
				</a>
			{/each}
		</nav>

		<div class="sidebar-footer">
			<div class="store-info">
				<div class="store-name">和食処 さくら</div>
				<div class="store-status">
					<Clock size={14} />
					<span>営業中</span>
				</div>
			</div>
		</div>
	</aside>

	<div class="main-container">
		<header class="top-header">
			<button class="mobile-menu" onclick={() => isSidebarOpen = true}>
				<Menu size={24} />
			</button>
			
			<div class="header-content">
				<div class="header-left">
					<h2 class="page-title">
						{navigation.find(item => item.path === $page.url.pathname)?.label || 'ダッシュボード'}
					</h2>
				</div>
				
				<div class="header-right">
					<div class="header-alerts">
						<button class="alert-button warning">
							<AlertCircle size={18} />
							<span>在庫アラート: 3件</span>
						</button>
					</div>
					<NotificationBell />
					<div class="user-menu">
						<div class="user-avatar">田</div>
						<div class="user-info">
							<div class="user-name">田中太郎</div>
							<div class="user-role">店長</div>
						</div>
					</div>
				</div>
			</div>
		</header>

		<main class="main-content">
			{@render children()}
		</main>
	</div>
</div>

{#if isSidebarOpen}
	<div class="overlay" onclick={() => isSidebarOpen = false}></div>
{/if}

<style>
	:global(body) {
		margin: 0;
		font-family: system-ui, -apple-system, sans-serif;
		background: #f7f8fa;
	}

	.layout {
		display: flex;
		height: 100vh;
	}

	.sidebar {
		width: 260px;
		background: white;
		border-right: 1px solid #e1e4e8;
		display: flex;
		flex-direction: column;
		transition: transform 0.3s ease;
	}

	.sidebar-header {
		padding: 20px;
		border-bottom: 1px solid #e1e4e8;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 12px;
		font-size: 20px;
		font-weight: 700;
		color: #172b4d;
	}

	.logo-icon {
		font-size: 28px;
	}

	.mobile-close {
		display: none;
		background: none;
		border: none;
		color: #5e6c84;
		cursor: pointer;
	}

	.sidebar-nav {
		flex: 1;
		padding: 16px 12px;
		overflow-y: auto;
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 10px 16px;
		color: #172b4d;
		text-decoration: none;
		border-radius: 6px;
		transition: all 0.2s;
		margin-bottom: 4px;
	}

	.nav-item:hover {
		background: #f4f5f7;
	}

	.nav-item.active {
		background: #e9f2ff;
		color: #0052cc;
		font-weight: 600;
	}

	.sidebar-footer {
		padding: 16px;
		border-top: 1px solid #e1e4e8;
	}

	.store-info {
		padding: 12px;
		background: #f4f5f7;
		border-radius: 6px;
	}

	.store-name {
		font-weight: 600;
		margin-bottom: 4px;
	}

	.store-status {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 13px;
		color: #00875a;
	}

	.main-container {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.top-header {
		background: white;
		border-bottom: 1px solid #e1e4e8;
		padding: 0 24px;
		height: 64px;
		display: flex;
		align-items: center;
	}

	.mobile-menu {
		display: none;
		background: none;
		border: none;
		color: #172b4d;
		cursor: pointer;
		margin-right: 16px;
	}

	.header-content {
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.page-title {
		margin: 0;
		font-size: 24px;
		color: #172b4d;
	}

	.header-right {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.header-alerts {
		display: flex;
		gap: 8px;
	}

	.alert-button {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 6px 12px;
		background: #fff3cd;
		border: 1px solid #ffc107;
		border-radius: 6px;
		color: #856404;
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.alert-button:hover {
		background: #ffc107;
		color: white;
	}

	.notification-button {
		position: relative;
		background: none;
		border: none;
		padding: 8px;
		color: #5e6c84;
		cursor: pointer;
		transition: all 0.2s;
	}

	.notification-button:hover {
		color: #172b4d;
	}

	.notification-badge {
		position: absolute;
		top: 4px;
		right: 4px;
		background: #de350b;
		color: white;
		font-size: 11px;
		font-weight: 600;
		padding: 2px 5px;
		border-radius: 10px;
		min-width: 18px;
		text-align: center;
	}

	.user-menu {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 8px 12px;
		background: #f4f5f7;
		border-radius: 6px;
		cursor: pointer;
	}

	.user-avatar {
		width: 32px;
		height: 32px;
		background: #0052cc;
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
	}

	.user-info {
		display: flex;
		flex-direction: column;
	}

	.user-name {
		font-size: 13px;
		font-weight: 600;
		color: #172b4d;
	}

	.user-role {
		font-size: 11px;
		color: #5e6c84;
	}

	.main-content {
		flex: 1;
		padding: 24px;
		overflow-y: auto;
	}

	.overlay {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.3);
		z-index: 999;
	}

	@media (max-width: 768px) {
		.sidebar {
			position: fixed;
			top: 0;
			left: 0;
			height: 100%;
			z-index: 1000;
			transform: translateX(-100%);
		}

		.sidebar.open {
			transform: translateX(0);
		}

		.mobile-close {
			display: block;
		}

		.mobile-menu {
			display: block;
		}

		.overlay {
			display: block;
		}

		.header-alerts {
			display: none;
		}

		.user-info {
			display: none;
		}
	}
</style>