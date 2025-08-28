<script lang="ts">
  import { Search, MapPin, Clock, Users, TrendingUp, Briefcase, Star, CheckCircle, MessageCircle, DollarSign } from 'lucide-svelte';
  import { goto } from '$app/navigation';

  let searchQuery = $state('');
  let selectedArea = $state('');

  const popularAreas = [
    '渋谷', '新宿', '池袋', '横浜', '大阪', '名古屋', '福岡', '札幌'
  ];

  const jobCategories = [
    { name: '飲食・フード', icon: '🍽️', count: 1234 },
    { name: 'イベントスタッフ', icon: '🎪', count: 856 },
    { name: '軽作業・物流', icon: '📦', count: 923 },
    { name: '販売・接客', icon: '🛍️', count: 678 },
    { name: '事務・データ入力', icon: '💻', count: 445 },
    { name: '清掃・メンテナンス', icon: '🧹', count: 312 }
  ];

  const featuredJobs = [
    {
      id: 1,
      title: 'カフェスタッフ募集',
      company: 'おしゃれカフェ',
      location: '渋谷',
      hourlyRate: '¥1,200',
      duration: '単発OK',
      rating: 4.5
    },
    {
      id: 2,
      title: 'イベント設営スタッフ',
      company: 'イベント企画会社',
      location: '新宿',
      hourlyRate: '¥1,500',
      duration: '3日間',
      rating: 4.8
    },
    {
      id: 3,
      title: '倉庫内軽作業',
      company: '物流センター',
      location: '品川',
      hourlyRate: '¥1,100',
      duration: '週3日〜',
      rating: 4.2
    }
  ];

  function handleSearch() {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedArea) params.set('area', selectedArea);
    goto(`/jobs?${params.toString()}`);
  }
</script>

<div class="relative">
  <!-- ヒーローセクション -->
  <section class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6">
          地域で見つかる、スキマ時間のお仕事
        </h1>
        <p class="text-xl mb-10">
          空いた時間を有効活用。今すぐ働ける仕事を見つけよう
        </p>
        
        <!-- 検索フォーム -->
        <div class="bg-white rounded-lg shadow-xl p-6 max-w-3xl mx-auto">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
              <label class="block text-gray-700 text-sm font-medium mb-2">
                キーワード
              </label>
              <div class="relative">
                <Search class="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  bind:value={searchQuery}
                  placeholder="職種、仕事内容など"
                  class="pl-10 w-full px-4 py-3 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div class="flex-1">
              <label class="block text-gray-700 text-sm font-medium mb-2">
                エリア
              </label>
              <div class="relative">
                <MapPin class="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  bind:value={selectedArea}
                  class="pl-10 w-full px-4 py-3 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="">エリアを選択</option>
                  {#each popularAreas as area}
                    <option value={area}>{area}</option>
                  {/each}
                </select>
              </div>
            </div>
            
            <div class="flex items-end">
              <button
                onclick={handleSearch}
                class="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium transition-colors"
              >
                検索する
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 特徴セクション -->
  <section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-center mb-12">ミセトモの特徴</h2>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-lg shadow-md text-center">
          <CheckCircle class="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 class="text-xl font-semibold mb-2">事前確認安心</h3>
          <p class="text-gray-600">勤務前に職場環境や仕事内容をしっかり確認</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md text-center">
          <MessageCircle class="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 class="text-xl font-semibold mb-2">充実のコミュニケーション</h3>
          <p class="text-gray-600">採用担当者と事前にやり取りでき、不安を解消</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md text-center">
          <Clock class="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 class="text-xl font-semibold mb-2">スピーディーなマッチング</h3>
          <p class="text-gray-600">すぐに働きたい方も安心、迅速なマッチング</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 人気のカテゴリ -->
  <section class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-center mb-12">人気のカテゴリ</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {#each jobCategories as category}
          <a
            href={`/jobs?category=${category.name}`}
            class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow text-center group"
          >
            <div class="text-4xl mb-3">{category.icon}</div>
            <h3 class="font-semibold text-sm mb-1 group-hover:text-blue-600">{category.name}</h3>
            <p class="text-xs text-gray-500">{category.count}件</p>
          </a>
        {/each}
      </div>
    </div>
  </section>

  <!-- 注目の求人 -->
  <section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-center mb-12">注目の求人</h2>
      <div class="grid md:grid-cols-3 gap-6">
        {#each featuredJobs as job}
          <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div class="p-6">
              <div class="flex justify-between items-start mb-4">
                <h3 class="text-lg font-semibold">{job.title}</h3>
                <div class="flex items-center text-yellow-500">
                  <Star class="h-4 w-4 fill-current" />
                  <span class="text-sm ml-1 text-gray-600">{job.rating}</span>
                </div>
              </div>
              <p class="text-gray-600 mb-4">{job.company}</p>
              <div class="space-y-2 text-sm">
                <div class="flex items-center text-gray-600">
                  <MapPin class="h-4 w-4 mr-2" />
                  {job.location}
                </div>
                <div class="flex items-center text-gray-600">
                  <DollarSign class="h-4 w-4 mr-2" />
                  {job.hourlyRate}
                </div>
                <div class="flex items-center text-gray-600">
                  <Clock class="h-4 w-4 mr-2" />
                  {job.duration}
                </div>
              </div>
              <a
                href={`/jobs/${job.id}`}
                class="mt-4 block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
              >
                詳細を見る
              </a>
            </div>
          </div>
        {/each}
      </div>
      <div class="text-center mt-8">
        <a
          href="/jobs"
          class="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
        >
          すべての求人を見る
          <TrendingUp class="ml-2 h-5 w-5" />
        </a>
      </div>
    </div>
  </section>

  <!-- CTAセクション -->
  <section class="bg-blue-600 text-white py-16">
    <div class="max-w-4xl mx-auto text-center px-4">
      <h2 class="text-3xl font-bold mb-4">今すぐ始めよう</h2>
      <p class="text-xl mb-8">
        無料で登録して、あなたにピッタリの仕事を見つけましょう
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="/auth/register?role=jobseeker"
          class="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 font-medium transition-colors"
        >
          <Users class="inline-block mr-2 h-5 w-5" />
          仕事を探す
        </a>
        <a
          href="/auth/register?role=employer"
          class="bg-blue-800 text-white px-8 py-3 rounded-lg hover:bg-blue-900 font-medium transition-colors"
        >
          <Briefcase class="inline-block mr-2 h-5 w-5" />
          求人を掲載する
        </a>
      </div>
    </div>
  </section>
</div>
