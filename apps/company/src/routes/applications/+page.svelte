<script lang="ts">
	import { 
		Inbox, User, Calendar, Mail, Phone, FileText,
		CheckCircle, XCircle, Clock, MessageSquare,
		UserPlus, Filter, ChevronRight, Star
	} from 'lucide-svelte';
	import { goto } from '$app/navigation';

	let filterStatus = $state('all');
	let filterJob = $state('all');
	let selectedApplication = $state<any>(null);
	let showHireModal = $state(false);
	let hiringApplication = $state<any>(null);

	// サンプルデータ（実際はFirestoreから取得）
	const applications = [
		{
			id: 'app1',
			applicantName: '鈴木 美咲',
			applicantEmail: 'suzuki@example.com',
			applicantPhone: '070-2468-1357',
			jobTitle: 'ホールスタッフ',
			jobId: 'job1',
			appliedAt: new Date('2024-01-28T10:30:00'),
			status: 'pending',
			message: '接客経験が3年あります。土日も勤務可能です。',
			experience: '飲食店勤務3年',
			availability: '週4日、土日可',
			desiredWage: 1100
		},
		{
			id: 'app2',
			applicantName: '高橋 健太',
			applicantEmail: 'takahashi@example.com',
			applicantPhone: '080-3333-4444',
			jobTitle: 'キッチンスタッフ',
			jobId: 'job2',
			appliedAt: new Date('2024-01-27T15:45:00'),
			status: 'reviewing',
			message: '調理師免許を持っています。',
			experience: '調理師免許あり、経験5年',
			availability: '週5日、フルタイム希望',
			desiredWage: 1400
		},
		{
			id: 'app3',
			applicantName: '山田 太郎',
			applicantEmail: 'yamada.taro@example.com',
			applicantPhone: '090-5555-6666',
			jobTitle: 'ホールスタッフ',
			jobId: 'job1',
			appliedAt: new Date('2024-01-26T09:15:00'),
			status: 'interview_scheduled',
			message: '明るい接客を心がけています。',
			experience: '接客業2年',
			availability: '週3日、平日のみ',
			desiredWage: 1200,
			interviewDate: '2024-01-30 14:00'
		},
		{
			id: 'app4',
			applicantName: '佐藤 花子',
			applicantEmail: 'sato.hanako@example.com',
			applicantPhone: '070-7777-8888',
			jobTitle: 'ホールスタッフ',
			jobId: 'job1',
			appliedAt: new Date('2024-01-25T13:20:00'),
			status: 'hired',
			message: '頑張ります！',
			experience: '未経験',
			availability: '週4日可能',
			desiredWage: 1050,
			hiredDate: '2024-01-28'
		},
		{
			id: 'app5',
			applicantName: '田中 次郎',
			applicantEmail: 'tanaka@example.com',
			applicantPhone: '080-9999-0000',
			jobTitle: 'キッチンスタッフ',
			jobId: 'job2',
			appliedAt: new Date('2024-01-24T11:00:00'),
			status: 'rejected',
			message: '料理が好きです。',
			experience: '飲食店1年',
			availability: '週2日のみ',
			desiredWage: 1000
		}
	];

	// 求人リスト（フィルター用）
	const jobs = [
		{ id: 'job1', title: 'ホールスタッフ' },
		{ id: 'job2', title: 'キッチンスタッフ' }
	];

	let filteredApplications = $derived(
		applications.filter(app => {
			const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
			const matchesJob = filterJob === 'all' || app.jobId === filterJob;
			return matchesStatus && matchesJob;
		})
	);

	// ステータス別の統計
	const stats = $derived({
		pending: applications.filter(a => a.status === 'pending').length,
		reviewing: applications.filter(a => a.status === 'reviewing').length,
		interview: applications.filter(a => a.status === 'interview_scheduled').length,
		total: applications.length
	});

	function getStatusIcon(status: string) {
		switch (status) {
			case 'pending': return Clock;
			case 'reviewing': return FileText;
			case 'interview_scheduled': return Calendar;
			case 'hired': return CheckCircle;
			case 'rejected': return XCircle;
			default: return Clock;
		}
	}

	function getStatusLabel(status: string) {
		switch (status) {
			case 'pending': return '新規応募';
			case 'reviewing': return '選考中';
			case 'interview_scheduled': return '面接予定';
			case 'hired': return '採用済み';
			case 'rejected': return '不採用';
			default: return status;
		}
	}

	function getStatusColor(status: string) {
		switch (status) {
			case 'pending': return 'status-pending';
			case 'reviewing': return 'status-reviewing';
			case 'interview_scheduled': return 'status-interview';
			case 'hired': return 'status-hired';
			case 'rejected': return 'status-rejected';
			default: return '';
		}
	}

	function formatDate(date: Date) {
		return date.toLocaleDateString('ja-JP', {
			month: 'numeric',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function openHireModal(application: any) {
		hiringApplication = application;
		showHireModal = true;
	}

	async function confirmHire() {
		if (!hiringApplication) return;

		// ここで実際の採用処理を実装
		console.log('採用処理:', hiringApplication);
		
		// スタッフ管理ページへ遷移
		goto('/staff');
		
		showHireModal = false;
	}
</script>

<div class="applications-page">
	<div class="page-header">
		<div>
			<h1>応募管理</h1>
			<p class="page-description">求人への応募状況と選考管理</p>
		</div>
	</div>

	<!-- 統計カード -->
	<div class="stats-cards">
		<div class="stat-card">
			<div class="stat-icon orange">
				<Clock size={20} />
			</div>
			<div class="stat-info">
				<div class="stat-value">{stats.pending}</div>
				<div class="stat-label">新規応募</div>
			</div>
		</div>
		<div class="stat-card">
			<div class="stat-icon blue">
				<FileText size={20} />
			</div>
			<div class="stat-info">
				<div class="stat-value">{stats.reviewing}</div>
				<div class="stat-label">選考中</div>
			</div>
		</div>
		<div class="stat-card">
			<div class="stat-icon purple">
				<Calendar size={20} />
			</div>
			<div class="stat-info">
				<div class="stat-value">{stats.interview}</div>
				<div class="stat-label">面接予定</div>
			</div>
		</div>
		<div class="stat-card">
			<div class="stat-icon gray">
				<Inbox size={20} />
			</div>
			<div class="stat-info">
				<div class="stat-value">{stats.total}</div>
				<div class="stat-label">合計</div>
			</div>
		</div>
	</div>

	<!-- フィルター -->
	<div class="filters">
		<select bind:value={filterStatus}>
			<option value="all">すべてのステータス</option>
			<option value="pending">新規応募</option>
			<option value="reviewing">選考中</option>
			<option value="interview_scheduled">面接予定</option>
			<option value="hired">採用済み</option>
			<option value="rejected">不採用</option>
		</select>
		<select bind:value={filterJob}>
			<option value="all">すべての求人</option>
			{#each jobs as job}
				<option value={job.id}>{job.title}</option>
			{/each}
		</select>
	</div>

	<!-- 応募リスト -->
	<div class="applications-list">
		{#each filteredApplications as application}
			<div class="application-card" class:selected={selectedApplication?.id === application.id}>
				<div class="app-header">
					<div class="app-basic">
						<div class="applicant-avatar">
							{application.applicantName.charAt(0)}
						</div>
						<div class="app-info">
							<h3 class="applicant-name">
								{application.applicantName}
								{#if application.status === 'pending'}
									<span class="new-badge">NEW</span>
								{/if}
							</h3>
							<div class="job-title">{application.jobTitle}</div>
							<div class="applied-date">
								応募日時: {formatDate(application.appliedAt)}
							</div>
						</div>
					</div>
					<div class="status-badge {getStatusColor(application.status)}">
						<svelte:component this={getStatusIcon(application.status)} size={14} />
						{getStatusLabel(application.status)}
					</div>
				</div>

				<div class="app-content">
					<div class="contact-info">
						<div class="contact-item">
							<Mail size={14} />
							{application.applicantEmail}
						</div>
						<div class="contact-item">
							<Phone size={14} />
							{application.applicantPhone}
						</div>
					</div>

					{#if application.message}
						<div class="message-section">
							<h4>
								<MessageSquare size={14} />
								応募メッセージ
							</h4>
							<p>{application.message}</p>
						</div>
					{/if}

					<div class="details-grid">
						<div class="detail">
							<span class="detail-label">経験</span>
							<span class="detail-value">{application.experience}</span>
						</div>
						<div class="detail">
							<span class="detail-label">勤務可能日</span>
							<span class="detail-value">{application.availability}</span>
						</div>
						<div class="detail">
							<span class="detail-label">希望時給</span>
							<span class="detail-value">¥{application.desiredWage}</span>
						</div>
					</div>

					{#if application.interviewDate}
						<div class="interview-info">
							<Calendar size={14} />
							面接予定: {application.interviewDate}
						</div>
					{/if}

					{#if application.hiredDate}
						<div class="hire-info">
							<CheckCircle size={14} />
							採用日: {application.hiredDate}
						</div>
					{/if}
				</div>

				<div class="app-actions">
					{#if application.status === 'pending' || application.status === 'reviewing'}
						<button class="btn-secondary">
							<Calendar size={14} />
							面接設定
						</button>
						<button class="btn-primary" onclick={() => openHireModal(application)}>
							<UserPlus size={14} />
							採用する
						</button>
						<button class="btn-danger">
							<XCircle size={14} />
							不採用
						</button>
					{:else if application.status === 'interview_scheduled'}
						<button class="btn-primary" onclick={() => openHireModal(application)}>
							<UserPlus size={14} />
							採用する
						</button>
						<button class="btn-danger">
							<XCircle size={14} />
							不採用
						</button>
					{:else if application.status === 'hired'}
						<button class="btn-success" onclick={() => goto('/staff')}>
							<User size={14} />
							スタッフ情報を見る
						</button>
					{/if}
				</div>
			</div>
		{/each}

		{#if filteredApplications.length === 0}
			<div class="empty-state">
				<Inbox size={48} />
				<h3>応募がありません</h3>
				<p>新しい応募が届くとここに表示されます</p>
			</div>
		{/if}
	</div>
</div>

<!-- 採用確認モーダル -->
{#if showHireModal && hiringApplication}
	<div class="modal-overlay" onclick={() => showHireModal = false}>
		<div class="modal" onclick={(e) => e.stopPropagation()}>
			<div class="modal-header">
				<h2>採用確認</h2>
			</div>
			<div class="modal-body">
				<div class="hire-confirm-info">
					<p><strong>{hiringApplication.applicantName}</strong>さんを採用しますか？</p>
					<div class="hire-details">
						<div>求人: {hiringApplication.jobTitle}</div>
						<div>希望時給: ¥{hiringApplication.desiredWage}</div>
						<div>勤務可能: {hiringApplication.availability}</div>
					</div>
				</div>
				<div class="hire-note">
					<Star size={16} />
					採用すると自動的にスタッフ管理に追加されます
				</div>
			</div>
			<div class="modal-footer">
				<button class="btn-cancel" onclick={() => showHireModal = false}>
					キャンセル
				</button>
				<button class="btn-confirm" onclick={confirmHire}>
					採用を確定
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.applications-page {
		max-width: 1200px;
		margin: 0 auto;
	}

	.page-header {
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

	.stats-cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 16px;
		margin-bottom: 24px;
	}

	.stat-card {
		background: white;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.stat-icon {
		width: 40px;
		height: 40px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
	}

	.stat-icon.orange {
		background: linear-gradient(135deg, #ff8b00, #ffab00);
	}

	.stat-icon.blue {
		background: linear-gradient(135deg, #0052cc, #0065ff);
	}

	.stat-icon.purple {
		background: linear-gradient(135deg, #6554c0, #8777d9);
	}

	.stat-icon.gray {
		background: linear-gradient(135deg, #5e6c84, #97a0af);
	}

	.stat-value {
		font-size: 24px;
		font-weight: 700;
		color: #172b4d;
	}

	.stat-label {
		font-size: 13px;
		color: #5e6c84;
	}

	.filters {
		display: flex;
		gap: 12px;
		margin-bottom: 20px;
	}

	.filters select {
		padding: 8px 12px;
		border: 1px solid #dfe1e6;
		border-radius: 4px;
		font-size: 14px;
		background: white;
	}

	.applications-list {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.application-card {
		background: white;
		border-radius: 8px;
		padding: 24px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		transition: all 0.2s;
	}

	.application-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
	}

	.app-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 20px;
	}

	.app-basic {
		display: flex;
		gap: 12px;
	}

	.applicant-avatar {
		width: 48px;
		height: 48px;
		background: #0052cc;
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		font-size: 18px;
	}

	.applicant-name {
		margin: 0 0 4px 0;
		font-size: 18px;
		font-weight: 600;
		color: #172b4d;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.new-badge {
		padding: 2px 6px;
		background: #ff5630;
		color: white;
		font-size: 10px;
		font-weight: 700;
		border-radius: 3px;
		text-transform: uppercase;
	}

	.job-title {
		font-size: 14px;
		color: #0052cc;
		margin-bottom: 4px;
	}

	.applied-date {
		font-size: 12px;
		color: #97a0af;
	}

	.status-badge {
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 6px 12px;
		border-radius: 12px;
		font-size: 12px;
		font-weight: 600;
	}

	.status-pending {
		background: #fff7e6;
		color: #ff8b00;
	}

	.status-reviewing {
		background: #deebff;
		color: #0052cc;
	}

	.status-interview {
		background: #efe2fe;
		color: #6554c0;
	}

	.status-hired {
		background: #e3fcef;
		color: #00875a;
	}

	.status-rejected {
		background: #ffebe6;
		color: #de350b;
	}

	.contact-info {
		display: flex;
		gap: 16px;
		margin-bottom: 16px;
	}

	.contact-item {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 13px;
		color: #5e6c84;
	}

	.message-section {
		background: #f7f8fa;
		padding: 12px;
		border-radius: 6px;
		margin-bottom: 16px;
	}

	.message-section h4 {
		margin: 0 0 8px 0;
		font-size: 13px;
		font-weight: 600;
		color: #5e6c84;
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.message-section p {
		margin: 0;
		font-size: 14px;
		color: #172b4d;
		line-height: 1.5;
	}

	.details-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 12px;
		margin-bottom: 16px;
	}

	.detail {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.detail-label {
		font-size: 12px;
		color: #5e6c84;
		font-weight: 600;
	}

	.detail-value {
		font-size: 14px;
		color: #172b4d;
	}

	.interview-info,
	.hire-info {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 8px 12px;
		background: #f0f9ff;
		border: 1px solid #b3d4ff;
		border-radius: 6px;
		font-size: 13px;
		color: #0052cc;
		margin-bottom: 16px;
	}

	.hire-info {
		background: #e3fcef;
		border-color: #abf5d1;
		color: #00875a;
	}

	.app-actions {
		display: flex;
		gap: 8px;
		padding-top: 16px;
		border-top: 1px solid #f4f5f7;
	}

	.btn-secondary,
	.btn-primary,
	.btn-danger,
	.btn-success {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 8px 16px;
		border-radius: 4px;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
		border: none;
	}

	.btn-secondary {
		background: white;
		border: 1px solid #dfe1e6;
		color: #42526e;
	}

	.btn-secondary:hover {
		background: #f4f5f7;
	}

	.btn-primary {
		background: #0052cc;
		color: white;
	}

	.btn-primary:hover {
		background: #0065ff;
	}

	.btn-danger {
		background: white;
		border: 1px solid #ffebe6;
		color: #de350b;
	}

	.btn-danger:hover {
		background: #ffebe6;
	}

	.btn-success {
		background: #00875a;
		color: white;
	}

	.btn-success:hover {
		background: #00a86b;
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

	/* モーダル */
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	.modal {
		background: white;
		border-radius: 8px;
		width: 480px;
		max-width: 90%;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
	}

	.modal-header {
		padding: 20px 24px;
		border-bottom: 1px solid #dfe1e6;
	}

	.modal-header h2 {
		margin: 0;
		font-size: 20px;
		color: #172b4d;
	}

	.modal-body {
		padding: 24px;
	}

	.hire-confirm-info p {
		margin: 0 0 16px 0;
		font-size: 16px;
		color: #172b4d;
	}

	.hire-details {
		background: #f7f8fa;
		padding: 12px;
		border-radius: 6px;
		font-size: 14px;
		color: #5e6c84;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.hire-note {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-top: 16px;
		padding: 12px;
		background: #f0f9ff;
		border: 1px solid #b3d4ff;
		border-radius: 6px;
		font-size: 13px;
		color: #0052cc;
	}

	.modal-footer {
		padding: 16px 24px;
		border-top: 1px solid #dfe1e6;
		display: flex;
		justify-content: flex-end;
		gap: 12px;
	}

	.btn-cancel,
	.btn-confirm {
		padding: 8px 20px;
		border-radius: 4px;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
		border: none;
	}

	.btn-cancel {
		background: white;
		border: 1px solid #dfe1e6;
		color: #42526e;
	}

	.btn-cancel:hover {
		background: #f4f5f7;
	}

	.btn-confirm {
		background: #00875a;
		color: white;
	}

	.btn-confirm:hover {
		background: #00a86b;
	}

	@media (max-width: 768px) {
		.stats-cards {
			grid-template-columns: 1fr 1fr;
		}

		.filters {
			flex-direction: column;
		}

		.filters select {
			width: 100%;
		}

		.contact-info {
			flex-direction: column;
		}

		.details-grid {
			grid-template-columns: 1fr;
		}

		.app-actions {
			flex-wrap: wrap;
		}
	}
</style>