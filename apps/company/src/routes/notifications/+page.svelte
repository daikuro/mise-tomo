<script lang="ts">
	import { Bell, Check, Filter, Calendar, User, Briefcase, AlertCircle, ChevronRight } from 'lucide-svelte';
	import { notifications, getRelativeTime } from '$lib/stores/notificationStore';
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';

	let filterType = $state('all');
	let filterRead = $state('all');
	
	// TODO: 実際のstoreIdは認証情報から取得
	const storeId = 'store123';

	onMount(() => {
		// 通知の監視を開始
		notifications.startListening(storeId);
	});

	onDestroy(() => {
		notifications.stopListening();
	});

	let filteredNotifications = $derived(
		$notifications.filter(n => {
			const matchesType = filterType === 'all' || n.type === filterType;
			const matchesRead = filterRead === 'all' || 
				(filterRead === 'unread' && !n.read) ||
				(filterRead === 'read' && n.read);
			return matchesType && matchesRead;
		})
	);

	async function handleNotificationClick(notification: any) {
		// 既読にする
		if (!notification.read) {
			await notifications.markAsRead(notification.id);
		}
		
		// 該当ページへ遷移
		if (notification.applicationId) {
			goto(`/applications/${notification.applicationId}`);
		}
	}

	async function markAllAsRead() {
		await notifications.markAllAsRead();
	}

	function getNotificationIcon(type: string) {
		switch (type) {
			case 'new_application':
				return User;
			case 'application_update':
				return Briefcase;
			default:
				return AlertCircle;
		}
	}

	function getNotificationColor(type: string) {
		switch (type) {
			case 'new_application':
				return 'blue';
			case 'application_update':
				return 'green';
			default:
				return 'gray';
		}
	}
</script>

<div class="notifications-page">
	<div class="page-header">
		<div>
			<h1>通知</h1>
			<p class="page-description">応募や更新に関する通知を確認</p>
		</div>
		<div class="header-actions">
			{#if filteredNotifications.some(n => !n.read)}
				<button class="button-secondary" onclick={markAllAsRead}>
					<Check size={16} />
					すべて既読にする
				</button>
			{/if}
		</div>
	</div>

	<div class="filters-bar">
		<div class="filter-group">
			<label>種類</label>
			<select bind:value={filterType}>
				<option value="all">すべて</option>
				<option value="new_application">新規応募</option>
				<option value="application_update">応募更新</option>
				<option value="system">システム</option>
			</select>
		</div>
		<div class="filter-group">
			<label>状態</label>
			<select bind:value={filterRead}>
				<option value="all">すべて</option>
				<option value="unread">未読のみ</option>
				<option value="read">既読のみ</option>
			</select>
		</div>
	</div>

	<div class="notifications-list">
		{#if filteredNotifications.length === 0}
			<div class="empty-state">
				<Bell size={48} />
				<h3>通知はありません</h3>
				<p>新しい通知が届くとここに表示されます</p>
			</div>
		{:else}
			{#each filteredNotifications as notification}
				<button
					class="notification-card"
					class:unread={!notification.read}
					onclick={() => handleNotificationClick(notification)}
				>
					<div class="notification-icon {getNotificationColor(notification.type)}">
						<svelte:component this={getNotificationIcon(notification.type)} size={24} />
					</div>
					<div class="notification-content">
						<div class="notification-header">
							<h3>{notification.title}</h3>
							<span class="notification-time">
								<Calendar size={14} />
								{getRelativeTime(notification.createdAt)}
							</span>
						</div>
						<p class="notification-message">{notification.message}</p>
						{#if notification.jobTitle}
							<div class="notification-meta">
								<span class="meta-item">
									<Briefcase size={14} />
									{notification.jobTitle}
								</span>
								{#if notification.applicantName}
									<span class="meta-item">
										<User size={14} />
										{notification.applicantName}
									</span>
								{/if}
							</div>
						{/if}
					</div>
					<div class="notification-action">
						<ChevronRight size={20} />
					</div>
					{#if !notification.read}
						<div class="unread-indicator"></div>
					{/if}
				</button>
			{/each}
		{/if}
	</div>
</div>

<style>
	.notifications-page {
		max-width: 1000px;
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

	.button-secondary {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 8px 16px;
		background: white;
		border: 1px solid #dfe1e6;
		border-radius: 4px;
		color: #42526e;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.button-secondary:hover {
		background: #f4f5f7;
	}

	.filters-bar {
		display: flex;
		gap: 16px;
		padding: 16px;
		background: white;
		border-radius: 8px;
		margin-bottom: 20px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.filter-group {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.filter-group label {
		font-size: 13px;
		font-weight: 600;
		color: #5e6c84;
	}

	.filter-group select {
		padding: 6px 12px;
		border: 1px solid #dfe1e6;
		border-radius: 4px;
		font-size: 14px;
		background: white;
	}

	.notifications-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.empty-state {
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

	.notification-card {
		width: 100%;
		padding: 20px;
		background: white;
		border: 1px solid #dfe1e6;
		border-radius: 8px;
		cursor: pointer;
		display: flex;
		align-items: flex-start;
		gap: 16px;
		text-align: left;
		position: relative;
		transition: all 0.2s;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
	}

	.notification-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.notification-card.unread {
		background: #f0f9ff;
		border-color: #b3d4ff;
	}

	.notification-icon {
		width: 48px;
		height: 48px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.notification-icon.blue {
		background: #deebff;
		color: #0052cc;
	}

	.notification-icon.green {
		background: #e3fcef;
		color: #00875a;
	}

	.notification-icon.gray {
		background: #f4f5f7;
		color: #5e6c84;
	}

	.notification-content {
		flex: 1;
		min-width: 0;
	}

	.notification-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 8px;
	}

	.notification-header h3 {
		margin: 0;
		font-size: 16px;
		font-weight: 600;
		color: #172b4d;
	}

	.notification-time {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 12px;
		color: #97a0af;
		white-space: nowrap;
	}

	.notification-message {
		margin: 0 0 12px 0;
		font-size: 14px;
		color: #5e6c84;
		line-height: 1.5;
	}

	.notification-meta {
		display: flex;
		gap: 16px;
	}

	.meta-item {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 13px;
		color: #42526e;
	}

	.notification-action {
		display: flex;
		align-items: center;
		color: #97a0af;
	}

	.unread-indicator {
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 4px;
		height: 40px;
		background: #0052cc;
		border-radius: 0 2px 2px 0;
	}

	@media (max-width: 768px) {
		.page-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 16px;
		}

		.filters-bar {
			flex-direction: column;
		}

		.filter-group {
			width: 100%;
		}

		.filter-group select {
			flex: 1;
		}

		.notification-card {
			padding: 16px;
		}

		.notification-icon {
			width: 40px;
			height: 40px;
		}
	}
</style>