<script lang="ts">
	import { saveApplication } from '$lib/utils/notifications';
	import { goto } from '$app/navigation';

	let applicantName = $state('');
	let applicantEmail = $state('');
	let message = $state('');
	let isSubmitting = $state(false);
	let submitSuccess = $state(false);

	// サンプルの求人データ（実際はルートパラメータやDBから取得）
	const job = {
		id: 'job123',
		title: 'ホールスタッフ',
		storeId: 'store123',
		storeName: '和食処 さくら'
	};

	async function handleSubmit(event: Event) {
		event.preventDefault();
		
		if (!applicantName || !applicantEmail) {
			alert('必須項目を入力してください');
			return;
		}

		isSubmitting = true;

		try {
			// 応募データを保存し、通知を送信
			const applicationId = await saveApplication({
				jobId: job.id,
				jobTitle: job.title,
				storeId: job.storeId,
				storeName: job.storeName,
				applicantId: `user_${Date.now()}`, // 実際は認証済みユーザーIDを使用
				applicantName,
				applicantEmail,
				message
			});

			submitSuccess = true;
			
			// 3秒後に応募完了ページへ遷移
			setTimeout(() => {
				goto('/jobs/complete');
			}, 3000);
		} catch (error) {
			alert('応募の送信に失敗しました。もう一度お試しください。');
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div class="apply-page">
	<div class="container">
		{#if submitSuccess}
			<div class="success-message">
				<div class="success-icon">✅</div>
				<h2>応募が完了しました！</h2>
				<p>店舗担当者に通知を送信しました。</p>
				<p>返信をお待ちください。</p>
			</div>
		{:else}
			<div class="job-header">
				<h1>応募フォーム</h1>
				<div class="job-info">
					<h2>{job.title}</h2>
					<p>{job.storeName}</p>
				</div>
			</div>

			<form onsubmit={handleSubmit} class="apply-form">
				<div class="form-group">
					<label for="name">
						お名前
						<span class="required">必須</span>
					</label>
					<input 
						type="text" 
						id="name" 
						bind:value={applicantName}
						placeholder="山田 太郎"
						required
						disabled={isSubmitting}
					/>
				</div>

				<div class="form-group">
					<label for="email">
						メールアドレス
						<span class="required">必須</span>
					</label>
					<input 
						type="email" 
						id="email" 
						bind:value={applicantEmail}
						placeholder="example@email.com"
						required
						disabled={isSubmitting}
					/>
				</div>

				<div class="form-group">
					<label for="message">
						メッセージ（任意）
					</label>
					<textarea 
						id="message" 
						bind:value={message}
						placeholder="志望動機や自己PRなど"
						rows="6"
						disabled={isSubmitting}
					></textarea>
				</div>

				<div class="form-notice">
					<p>📢 応募すると、店舗の採用担当者に即座に通知が送信されます。</p>
				</div>

				<div class="form-actions">
					<button 
						type="button" 
						class="button-secondary"
						onclick={() => history.back()}
						disabled={isSubmitting}
					>
						戻る
					</button>
					<button 
						type="submit" 
						class="button-primary"
						disabled={isSubmitting}
					>
						{isSubmitting ? '送信中...' : '応募する'}
					</button>
				</div>
			</form>
		{/if}
	</div>
</div>

<style>
	.apply-page {
		min-height: 100vh;
		background: #f7f8fa;
		padding: 40px 20px;
	}

	.container {
		max-width: 600px;
		margin: 0 auto;
	}

	.success-message {
		background: white;
		padding: 60px 40px;
		border-radius: 12px;
		text-align: center;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.success-icon {
		font-size: 64px;
		margin-bottom: 24px;
	}

	.success-message h2 {
		margin: 0 0 16px 0;
		font-size: 28px;
		color: #172b4d;
	}

	.success-message p {
		margin: 8px 0;
		color: #5e6c84;
		font-size: 16px;
	}

	.job-header {
		background: white;
		padding: 32px;
		border-radius: 12px 12px 0 0;
		border-bottom: 2px solid #dfe1e6;
	}

	.job-header h1 {
		margin: 0 0 20px 0;
		font-size: 24px;
		color: #172b4d;
	}

	.job-info h2 {
		margin: 0 0 8px 0;
		font-size: 20px;
		color: #0052cc;
	}

	.job-info p {
		margin: 0;
		color: #5e6c84;
	}

	.apply-form {
		background: white;
		padding: 32px;
		border-radius: 0 0 12px 12px;
	}

	.form-group {
		margin-bottom: 24px;
	}

	.form-group label {
		display: block;
		margin-bottom: 8px;
		font-size: 14px;
		font-weight: 600;
		color: #172b4d;
	}

	.required {
		margin-left: 4px;
		padding: 2px 6px;
		background: #de350b;
		color: white;
		font-size: 11px;
		font-weight: 500;
		border-radius: 3px;
	}

	.form-group input,
	.form-group textarea {
		width: 100%;
		padding: 10px 12px;
		border: 1px solid #dfe1e6;
		border-radius: 4px;
		font-size: 14px;
		transition: all 0.2s;
	}

	.form-group input:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: #0052cc;
		box-shadow: 0 0 0 3px rgba(0, 82, 204, 0.1);
	}

	.form-group input:disabled,
	.form-group textarea:disabled {
		background: #f4f5f7;
		cursor: not-allowed;
	}

	.form-notice {
		padding: 16px;
		background: #f0f9ff;
		border: 1px solid #b3d4ff;
		border-radius: 6px;
		margin-bottom: 24px;
	}

	.form-notice p {
		margin: 0;
		color: #0052cc;
		font-size: 14px;
		line-height: 1.5;
	}

	.form-actions {
		display: flex;
		gap: 12px;
		justify-content: flex-end;
	}

	.button-secondary,
	.button-primary {
		padding: 10px 24px;
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

	.button-secondary:hover:not(:disabled) {
		background: #f4f5f7;
	}

	.button-primary {
		background: #0052cc;
		border: none;
		color: white;
	}

	.button-primary:hover:not(:disabled) {
		background: #0065ff;
	}

	.button-secondary:disabled,
	.button-primary:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	@media (max-width: 640px) {
		.apply-page {
			padding: 20px 16px;
		}

		.job-header,
		.apply-form {
			padding: 24px 20px;
		}

		.form-actions {
			flex-direction: column;
		}

		.button-secondary,
		.button-primary {
			width: 100%;
		}
	}
</style>