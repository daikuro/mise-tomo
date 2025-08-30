<script lang="ts">
	import { Bell, X, Check, User, Briefcase, AlertCircle } from 'lucide-svelte';
	import { notifications, unreadCount, getRelativeTime } from '$lib/stores/notificationStore';
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';

	let showDropdown = $state(false);
	let dropdownRef: HTMLDivElement;
	
	// TODO: 実際のstoreIdは認証情報から取得
	const storeId = 'store123';

	onMount(() => {
		// 通知の監視を開始
		notifications.startListening(storeId);

		// クリック外で閉じる
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
				showDropdown = false;
			}
		};

		document.addEventListener('click', handleClickOutside);
		
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	onDestroy(() => {
		notifications.stopListening();
	});

	function toggleDropdown(event: MouseEvent) {
		event.stopPropagation();
		showDropdown = !showDropdown;
	}

	async function handleNotificationClick(notification: any) {
		// 既読にする
		await notifications.markAsRead(notification.id);
		
		// 該当ページへ遷移
		if (notification.applicationId) {
			goto(`/applications/${notification.applicationId}`);
		}
		
		showDropdown = false;
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
</script>

<div class="notification-container" bind:this={dropdownRef}>
	<button 
		class="notification-bell"
		onclick={toggleDropdown}
		aria-label="通知"
	>
		<Bell size={20} />
		{#if $unreadCount > 0}
			<span class="badge">{$unreadCount > 99 ? '99+' : $unreadCount}</span>
		{/if}
	</button>

	{#if showDropdown}
		<div class="dropdown">
			<div class="dropdown-header">
				<h3>通知</h3>
				{#if $unreadCount > 0}
					<button 
						class="mark-all-read"
						onclick={markAllAsRead}
					>
						<Check size={16} />
						すべて既読
					</button>
				{/if}
			</div>

			<div class="notifications-list">
				{#if $notifications.length === 0}
					<div class="empty-state">
						<Bell size={32} />
						<p>通知はありません</p>
					</div>
				{:else}
					{#each $notifications.slice(0, 10) as notification}
						<button
							class="notification-item"
							class:unread={!notification.read}
							onclick={() => handleNotificationClick(notification)}
						>
							<div class="notification-icon">
								<svelte:component this={getNotificationIcon(notification.type)} size={20} />
							</div>
							<div class="notification-content">
								<div class="notification-title">
									{notification.title}
								</div>
								<div class="notification-message">
									{notification.message}
								</div>
								<div class="notification-time">
									{getRelativeTime(notification.createdAt)}
								</div>
							</div>
							{#if !notification.read}
								<div class="unread-indicator"></div>
							{/if}
						</button>
					{/each}
				{/if}
			</div>

			{#if $notifications.length > 10}
				<div class="dropdown-footer">
					<a href="/notifications" onclick={() => showDropdown = false}>
						すべての通知を見る
					</a>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.notification-container {
		position: relative;
	}

	.notification-bell {
		position: relative;
		padding: 8px;
		background: none;
		border: none;
		cursor: pointer;
		color: #5e6c84;
		border-radius: 50%;
		transition: all 0.2s;
	}

	.notification-bell:hover {
		background: #f4f5f7;
		color: #172b4d;
	}

	.badge {
		position: absolute;
		top: 4px;
		right: 4px;
		background: #de350b;
		color: white;
		font-size: 10px;
		font-weight: 700;
		padding: 2px 5px;
		border-radius: 10px;
		min-width: 18px;
		text-align: center;
	}

	.dropdown {
		position: absolute;
		top: calc(100% + 8px);
		right: 0;
		width: 380px;
		max-height: 480px;
		background: white;
		border-radius: 8px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		z-index: 1000;
		display: flex;
		flex-direction: column;
		animation: slideDown 0.2s ease-out;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.dropdown-header {
		padding: 16px 20px;
		border-bottom: 1px solid #dfe1e6;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.dropdown-header h3 {
		margin: 0;
		font-size: 16px;
		color: #172b4d;
	}

	.mark-all-read {
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 4px 8px;
		background: none;
		border: none;
		color: #0052cc;
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		border-radius: 4px;
		transition: all 0.2s;
	}

	.mark-all-read:hover {
		background: #deebff;
	}

	.notifications-list {
		flex: 1;
		overflow-y: auto;
		max-height: 360px;
	}

	.empty-state {
		padding: 48px 20px;
		text-align: center;
		color: #5e6c84;
	}

	.empty-state p {
		margin-top: 12px;
		font-size: 14px;
	}

	.notification-item {
		width: 100%;
		padding: 12px 20px;
		background: none;
		border: none;
		border-bottom: 1px solid #f4f5f7;
		cursor: pointer;
		display: flex;
		align-items: flex-start;
		gap: 12px;
		text-align: left;
		position: relative;
		transition: background 0.2s;
	}

	.notification-item:hover {
		background: #f7f8fa;
	}

	.notification-item.unread {
		background: #f0f9ff;
	}

	.notification-item.unread:hover {
		background: #e0f2fe;
	}

	.notification-icon {
		width: 32px;
		height: 32px;
		background: #dfe1e6;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #42526e;
		flex-shrink: 0;
	}

	.notification-item.unread .notification-icon {
		background: #deebff;
		color: #0052cc;
	}

	.notification-content {
		flex: 1;
		min-width: 0;
	}

	.notification-title {
		font-size: 14px;
		font-weight: 600;
		color: #172b4d;
		margin-bottom: 2px;
	}

	.notification-message {
		font-size: 13px;
		color: #5e6c84;
		line-height: 1.4;
		margin-bottom: 4px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.notification-time {
		font-size: 12px;
		color: #97a0af;
	}

	.unread-indicator {
		width: 8px;
		height: 8px;
		background: #0052cc;
		border-radius: 50%;
		flex-shrink: 0;
		margin-top: 6px;
	}

	.dropdown-footer {
		padding: 12px;
		border-top: 1px solid #dfe1e6;
		text-align: center;
	}

	.dropdown-footer a {
		color: #0052cc;
		text-decoration: none;
		font-size: 14px;
		font-weight: 500;
	}

	.dropdown-footer a:hover {
		text-decoration: underline;
	}

	@media (max-width: 480px) {
		.dropdown {
			width: calc(100vw - 32px);
			right: -8px;
		}
	}
</style>