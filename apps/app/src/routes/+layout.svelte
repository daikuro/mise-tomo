<script lang="ts">
  import '../app.css';
  import { user, authInitialized } from '$lib/stores/auth';
  import { userProfile, fetchUserProfile } from '$lib/stores/userStore';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { Home, Search, MessageSquare, User, LogOut, Briefcase } from 'lucide-svelte';
  import { signOut } from 'firebase/auth';
  import { auth } from '$lib/shared/firebase';
  import { goto } from '$app/navigation';

  let { children } = $props();

  // ユーザー情報の取得
  $effect(() => {
    if ($user && !$userProfile) {
      fetchUserProfile($user);
    }
  });

  async function handleLogout() {
    try {
      await signOut(auth);
      goto('/');
    } catch (error) {
      console.error('ログアウトエラー:', error);
    }
  }
</script>

<svelte:head>
  <title>ミセトモ - 地域で見つかるスキマ時間のお仕事</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
  <!-- ヘッダー -->
  <header class="bg-white shadow-sm border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <a href="/" class="flex items-center space-x-2">
            <Briefcase class="h-8 w-8 text-blue-600" />
            <span class="font-bold text-xl text-gray-900">ミセトモ</span>
          </a>
          <span class="ml-2 text-sm text-gray-500">地域で見つかる、スキマ時間のお仕事</span>
        </div>
        
        <nav class="flex items-center space-x-4">
          {#if $user}
            <a href="/jobs" class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              求人を探す
            </a>
            <a href="/post" class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              求人を投稿
            </a>
            <a href="/profile" class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              プロフィール
            </a>
            <button
              onclick={handleLogout}
              class="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <LogOut class="h-4 w-4 mr-1" />
              ログアウト
            </button>
          {:else}
            <a href="/auth/login" class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              ログイン
            </a>
            <a href="/auth/register" class="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium">
              新規登録
            </a>
          {/if}
        </nav>
      </div>
    </div>
  </header>

  <!-- メインコンテンツ -->
  <main>
    {@render children?.()}
  </main>

  <!-- モバイル用ボトムナビゲーション -->
  {#if $user}
    <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t">
      <div class="flex justify-around py-2">
        <a href="/" class="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600">
          <Home class="h-6 w-6" />
          <span class="text-xs mt-1">ホーム</span>
        </a>
        <a href="/jobs" class="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600">
          <Search class="h-6 w-6" />
          <span class="text-xs mt-1">探す</span>
        </a>
        <a href="/messages" class="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600">
          <MessageSquare class="h-6 w-6" />
          <span class="text-xs mt-1">メッセージ</span>
        </a>
        <a href="/profile" class="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600">
          <User class="h-6 w-6" />
          <span class="text-xs mt-1">プロフィール</span>
        </a>
      </div>
    </nav>
  {/if}
</div>
