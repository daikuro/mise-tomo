<script lang="ts">
  import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
  import { auth } from '$lib/shared/firebase';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { Mail, Lock, User, AlertCircle, Building, Briefcase } from 'lucide-svelte';
  import { setDoc, doc } from 'firebase/firestore';
  import { db } from '$lib/shared/firebase';
  
  let email = $state('');
  let password = $state('');
  let confirmPassword = $state('');
  let displayName = $state('');
  let role = $state($page.url.searchParams.get('role') || 'jobseeker');
  let error = $state('');
  let loading = $state(false);

  // 雇用主向けの追加フィールド
  let companyName = $state('');
  let industry = $state('');
  let location = $state('');

  async function handleEmailRegister() {
    loading = true;
    error = '';
    
    // バリデーション
    if (password !== confirmPassword) {
      error = 'パスワードが一致しません';
      loading = false;
      return;
    }

    if (password.length < 6) {
      error = 'パスワードは6文字以上である必要があります';
      loading = false;
      return;
    }

    if (role === 'employer' && !companyName) {
      error = '会社名を入力してください';
      loading = false;
      return;
    }
    
    try {
      // アカウント作成
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // 表示名を更新
      await updateProfile(user, { displayName });
      
      // Firestoreにユーザー情報を保存
      const userProfile: any = {
        uid: user.uid,
        email: user.email,
        displayName,
        role,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      if (role === 'employer') {
        userProfile.employerProfile = {
          companyName,
          industry,
          location,
          description: ''
        };
      } else {
        userProfile.seekerProfile = {
          skills: [],
          experience: '',
          preferredLocations: [],
          availability: 'いつでも可能'
        };
      }

      await setDoc(doc(db, 'users', user.uid), userProfile);
      
      goto('/');
    } catch (err: any) {
      error = getErrorMessage(err.code);
    } finally {
      loading = false;
    }
  }

  async function handleGoogleRegister() {
    loading = true;
    error = '';
    
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      
      // Firestoreにユーザー情報を保存
      const userProfile: any = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || 'ユーザー',
        photoURL: user.photoURL,
        role,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      if (role === 'employer') {
        userProfile.employerProfile = {
          companyName: '',
          industry: '',
          location: '',
          description: ''
        };
      } else {
        userProfile.seekerProfile = {
          skills: [],
          experience: '',
          preferredLocations: [],
          availability: 'いつでも可能'
        };
      }

      await setDoc(doc(db, 'users', user.uid), userProfile);
      
      goto('/');
    } catch (err: any) {
      error = getErrorMessage(err.code);
    } finally {
      loading = false;
    }
  }

  function getErrorMessage(code: string) {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'このメールアドレスは既に使用されています';
      case 'auth/invalid-email':
        return 'メールアドレスの形式が正しくありません';
      case 'auth/weak-password':
        return 'パスワードが弱すぎます';
      default:
        return '登録に失敗しました。もう一度お試しください';
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        新規アカウント作成
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        または
        <a href="/auth/login" class="font-medium text-blue-600 hover:text-blue-500">
          既存のアカウントでログイン
        </a>
      </p>
    </div>

    <!-- ロール選択 -->
    <div class="flex justify-center space-x-4">
      <button
        onclick={() => role = 'jobseeker'}
        class={`px-4 py-2 rounded-lg font-medium transition-colors ${
          role === 'jobseeker' 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        <Briefcase class="inline-block mr-2 h-4 w-4" />
        求職者として登録
      </button>
      <button
        onclick={() => role = 'employer'}
        class={`px-4 py-2 rounded-lg font-medium transition-colors ${
          role === 'employer' 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        <Building class="inline-block mr-2 h-4 w-4" />
        雇用主として登録
      </button>
    </div>
    
    <form class="mt-8 space-y-6" onsubmit={(e) => { e.preventDefault(); handleEmailRegister(); }}>
      {#if error}
        <div class="rounded-md bg-red-50 p-4">
          <div class="flex">
            <AlertCircle class="h-5 w-5 text-red-400" />
            <div class="ml-3">
              <p class="text-sm text-red-800">{error}</p>
            </div>
          </div>
        </div>
      {/if}

      <div class="space-y-4">
        <div>
          <label for="displayName" class="block text-sm font-medium text-gray-700">
            {role === 'employer' ? '担当者名' : 'お名前'}
          </label>
          <div class="mt-1 relative">
            <User class="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              id="displayName"
              name="displayName"
              type="text"
              required
              bind:value={displayName}
              class="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder={role === 'employer' ? '担当者名' : 'お名前'}
            />
          </div>
        </div>

        {#if role === 'employer'}
          <div>
            <label for="companyName" class="block text-sm font-medium text-gray-700">
              会社名
            </label>
            <div class="mt-1 relative">
              <Building class="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                id="companyName"
                name="companyName"
                type="text"
                required
                bind:value={companyName}
                class="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="会社名"
              />
            </div>
          </div>

          <div>
            <label for="industry" class="block text-sm font-medium text-gray-700">
              業種
            </label>
            <select
              id="industry"
              bind:value={industry}
              class="mt-1 block w-full px-3 py-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">選択してください</option>
              <option value="飲食">飲食</option>
              <option value="小売">小売</option>
              <option value="サービス">サービス</option>
              <option value="製造">製造</option>
              <option value="IT">IT</option>
              <option value="その他">その他</option>
            </select>
          </div>

          <div>
            <label for="location" class="block text-sm font-medium text-gray-700">
              所在地
            </label>
            <input
              id="location"
              name="location"
              type="text"
              bind:value={location}
              class="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="例: 東京都渋谷区"
            />
          </div>
        {/if}

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            メールアドレス
          </label>
          <div class="mt-1 relative">
            <Mail class="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              bind:value={email}
              class="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="メールアドレス"
            />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">
            パスワード
          </label>
          <div class="mt-1 relative">
            <Lock class="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="new-password"
              required
              bind:value={password}
              class="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="パスワード（6文字以上）"
            />
          </div>
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
            パスワード（確認）
          </label>
          <div class="mt-1 relative">
            <Lock class="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autocomplete="new-password"
              required
              bind:value={confirmPassword}
              class="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="パスワード（確認）"
            />
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '登録中...' : 'アカウント作成'}
        </button>
      </div>

      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-gray-50 text-gray-500">または</span>
          </div>
        </div>

        <div class="mt-6">
          <button
            type="button"
            onclick={handleGoogleRegister}
            disabled={loading}
            class="w-full flex justify-center items-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Googleで登録
          </button>
        </div>
      </div>
    </form>
  </div>
</div>