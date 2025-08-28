<script lang="ts">
  import { page } from '$app/stores';
  import { 
    MapPin, Clock, DollarSign, Calendar, Users, 
    Building, CheckCircle, Star, Heart, Share2,
    ChevronLeft, Briefcase, Shield, Award
  } from 'lucide-svelte';
  import { goto } from '$app/navigation';
  
  // 仮のデータ（実際はAPIから取得）
  const jobDetail = {
    id: 1,
    title: 'カフェスタッフ募集',
    company: 'おしゃれカフェ',
    location: '渋谷',
    address: '東京都渋谷区渋谷2-15-1 渋谷クロスタワー 3F',
    hourlyRate: '¥1,200',
    duration: '単発OK',
    rating: 4.5,
    reviewCount: 128,
    category: '飲食・フード',
    workDate: '2024年1月15日〜',
    workTime: '10:00-18:00',
    breakTime: '60分',
    requiredPeople: 5,
    currentApplicants: 12,
    description: `人気のカフェでスタッフを募集しています！
    
    明るく活気のある職場で、一緒に働きませんか？
    カフェ経験がない方でも、丁寧に研修を行いますので安心してご応募ください。
    
    【仕事内容】
    ・ドリンクの調理、提供
    ・レジ業務
    ・店内清掃
    ・お客様対応`,
    requirements: [
      '18歳以上の方（高校生不可）',
      '土日祝日に勤務可能な方歓迎',
      '接客業に興味がある方',
      '明るく元気な対応ができる方'
    ],
    benefits: [
      '交通費全額支給',
      '制服貸与',
      'まかない付き（勤務時間による）',
      '週1日〜OK',
      '未経験者歓迎'
    ],
    images: [
      '/api/placeholder/600/400',
      '/api/placeholder/600/400',
      '/api/placeholder/600/400'
    ],
    companyInfo: {
      name: 'おしゃれカフェ',
      description: '都内に10店舗を展開する人気カフェチェーンです。',
      employees: '300名',
      established: '2015年',
      verified: true
    },
    similarJobs: [
      {
        id: 2,
        title: 'レストランホールスタッフ',
        company: 'イタリアンレストラン',
        location: '新宿',
        hourlyRate: '¥1,300'
      },
      {
        id: 3,
        title: 'ファストフード店スタッフ',
        company: 'バーガーショップ',
        location: '池袋',
        hourlyRate: '¥1,150'
      }
    ]
  };

  let isFavorite = $state(false);
  let showShareModal = $state(false);

  function handleBack() {
    history.back();
  }

  function toggleFavorite() {
    isFavorite = !isFavorite;
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: jobDetail.title,
        text: `${jobDetail.company}の求人情報`,
        url: window.location.href
      });
    } else {
      showShareModal = true;
    }
  }

  function handleApply() {
    goto(`/jobs/${jobDetail.id}/apply`);
  }
</script>

<div class="min-h-screen bg-gray-50">
  <!-- ヘッダー -->
  <header class="bg-white shadow-sm sticky top-0 z-10">
    <div class="max-w-6xl mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <button
          onclick={handleBack}
          class="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft class="h-5 w-5 mr-1" />
          戻る
        </button>
        <div class="flex gap-2">
          <button
            onclick={toggleFavorite}
            class="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="お気に入り"
          >
            <Heart class="h-5 w-5 {isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}" />
          </button>
          <button
            onclick={handleShare}
            class="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="共有"
          >
            <Share2 class="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  </header>

  <div class="max-w-6xl mx-auto px-4 py-6">
    <div class="grid lg:grid-cols-3 gap-6">
      <!-- メインコンテンツ -->
      <div class="lg:col-span-2 space-y-6">
        <!-- 基本情報カード -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="mb-4">
            <span class="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
              {jobDetail.category}
            </span>
          </div>
          
          <h1 class="text-2xl font-bold mb-4">{jobDetail.title}</h1>
          
          <div class="flex items-center gap-4 mb-4">
            <div class="flex items-center">
              <Building class="h-5 w-5 text-gray-500 mr-2" />
              <span class="font-medium">{jobDetail.company}</span>
            </div>
            {#if jobDetail.companyInfo.verified}
              <div class="flex items-center text-green-600">
                <CheckCircle class="h-4 w-4 mr-1" />
                <span class="text-sm">認証済み</span>
              </div>
            {/if}
          </div>

          <div class="flex items-center gap-4 mb-6">
            <div class="flex items-center">
              <Star class="h-5 w-5 text-yellow-500 fill-current" />
              <span class="ml-1 font-medium">{jobDetail.rating}</span>
              <span class="ml-1 text-gray-500 text-sm">({jobDetail.reviewCount}件)</span>
            </div>
          </div>

          <div class="grid sm:grid-cols-2 gap-4">
            <div class="flex items-start">
              <MapPin class="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
              <div>
                <p class="font-medium">{jobDetail.location}</p>
                <p class="text-sm text-gray-600">{jobDetail.address}</p>
              </div>
            </div>
            <div class="flex items-center">
              <DollarSign class="h-5 w-5 text-gray-500 mr-2" />
              <span class="font-medium text-lg text-blue-600">{jobDetail.hourlyRate}</span>
            </div>
            <div class="flex items-center">
              <Calendar class="h-5 w-5 text-gray-500 mr-2" />
              <span>{jobDetail.workDate}</span>
            </div>
            <div class="flex items-center">
              <Clock class="h-5 w-5 text-gray-500 mr-2" />
              <span>{jobDetail.workTime}</span>
            </div>
          </div>
        </div>

        <!-- 仕事内容 -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-bold mb-4">仕事内容</h2>
          <p class="whitespace-pre-line text-gray-700">{jobDetail.description}</p>
        </div>

        <!-- 応募条件 -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-bold mb-4">応募条件</h2>
          <ul class="space-y-2">
            {#each jobDetail.requirements as requirement}
              <li class="flex items-start">
                <CheckCircle class="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span class="text-gray-700">{requirement}</span>
              </li>
            {/each}
          </ul>
        </div>

        <!-- 待遇・福利厚生 -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-bold mb-4">待遇・福利厚生</h2>
          <ul class="space-y-2">
            {#each jobDetail.benefits as benefit}
              <li class="flex items-start">
                <Award class="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span class="text-gray-700">{benefit}</span>
              </li>
            {/each}
          </ul>
        </div>

        <!-- 企業情報 -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-bold mb-4">企業情報</h2>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-gray-600">企業名</span>
              <span class="font-medium">{jobDetail.companyInfo.name}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-600">設立</span>
              <span class="font-medium">{jobDetail.companyInfo.established}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-600">従業員数</span>
              <span class="font-medium">{jobDetail.companyInfo.employees}</span>
            </div>
            <p class="text-gray-700 pt-3 border-t">
              {jobDetail.companyInfo.description}
            </p>
          </div>
        </div>
      </div>

      <!-- サイドバー -->
      <div class="lg:col-span-1">
        <!-- 応募ボタン（固定） -->
        <div class="bg-white rounded-lg shadow-md p-6 sticky top-20">
          <div class="mb-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-gray-600">募集人数</span>
              <span class="font-medium">{jobDetail.requiredPeople}名</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-600">現在の応募者</span>
              <span class="font-medium">{jobDetail.currentApplicants}名</span>
            </div>
          </div>
          
          <button
            onclick={handleApply}
            class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium transition-colors mb-3"
          >
            この求人に応募する
          </button>
          
          <button
            class="w-full border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 font-medium transition-colors"
          >
            企業に質問する
          </button>
          
          <div class="mt-4 p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center text-sm text-gray-600">
              <Shield class="h-4 w-4 mr-2" />
              <span>安心の事前確認制度</span>
            </div>
          </div>
        </div>

        <!-- 類似の求人 -->
        <div class="bg-white rounded-lg shadow-md p-6 mt-6">
          <h3 class="font-bold mb-4">類似の求人</h3>
          <div class="space-y-3">
            {#each jobDetail.similarJobs as job}
              <a
                href={`/jobs/${job.id}`}
                class="block p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h4 class="font-medium text-sm mb-1">{job.title}</h4>
                <p class="text-xs text-gray-600 mb-1">{job.company}</p>
                <div class="flex items-center justify-between">
                  <span class="text-xs text-gray-500">{job.location}</span>
                  <span class="text-sm font-medium text-blue-600">{job.hourlyRate}</span>
                </div>
              </a>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{#if showShareModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg p-6 max-w-md w-full">
      <h3 class="text-lg font-bold mb-4">共有リンク</h3>
      <input
        type="text"
        value={window.location.href}
        readonly
        class="w-full p-2 border rounded mb-4"
      />
      <button
        onclick={() => showShareModal = false}
        class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        閉じる
      </button>
    </div>
  </div>
{/if}