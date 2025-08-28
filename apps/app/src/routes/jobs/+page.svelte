<script lang="ts">
  import { page } from '$app/stores';
  import { Search, MapPin, Clock, DollarSign, Filter, ChevronDown, Star, Calendar, Users, Briefcase, X } from 'lucide-svelte';
  
  let searchQuery = $state($page.url.searchParams.get('q') || '');
  let selectedArea = $state($page.url.searchParams.get('area') || '');
  let selectedCategory = $state($page.url.searchParams.get('category') || '');
  
  let showFilters = $state(false);
  let sortBy = $state('recommended');
  
  // フィルター条件
  let filters = $state({
    jobType: [] as string[],
    schedule: [] as string[],
    hourlyRate: '',
    experience: '',
    features: [] as string[]
  });
  
  const areas = [
    '渋谷', '新宿', '池袋', '横浜', '大阪', '名古屋', '福岡', '札幌',
    '品川', '上野', '秋葉原', '六本木', '銀座', '浅草', '吉祥寺', '立川'
  ];
  
  const categories = [
    '飲食・フード',
    'イベントスタッフ',
    '軽作業・物流',
    '販売・接客',
    '事務・データ入力',
    '清掃・メンテナンス',
    '講師・インストラクター',
    '介護・医療',
    'IT・プログラミング',
    'クリエイティブ'
  ];
  
  // サンプルの求人データ
  const jobs = [
    {
      id: 1,
      title: 'カフェスタッフ募集【未経験歓迎】',
      company: 'おしゃれカフェ渋谷店',
      location: '渋谷',
      category: '飲食・フード',
      hourlyRate: '¥1,200〜1,500',
      schedule: '週2日〜OK',
      duration: '長期（3ヶ月以上）',
      description: 'アットホームな雰囲気のカフェで接客・調理補助のお仕事です。',
      rating: 4.5,
      reviewCount: 23,
      features: ['未経験歓迎', '交通費支給', 'まかない付き', 'シフト自由'],
      urgent: true,
      new: false
    },
    {
      id: 2,
      title: 'イベント設営スタッフ【高時給】',
      company: 'イベント企画会社A',
      location: '新宿',
      category: 'イベントスタッフ',
      hourlyRate: '¥1,500〜2,000',
      schedule: '単発OK',
      duration: '1日〜',
      description: 'コンサートやイベントの設営・撤去作業。体を動かすのが好きな方歓迎！',
      rating: 4.8,
      reviewCount: 45,
      features: ['高時給', '日払いOK', '友達と応募OK', '単発OK'],
      urgent: false,
      new: true
    },
    {
      id: 3,
      title: '倉庫内での仕分け作業',
      company: '物流センターB',
      location: '品川',
      category: '軽作業・物流',
      hourlyRate: '¥1,100〜1,300',
      schedule: '週3日〜',
      duration: '短期（1〜3ヶ月）',
      description: '商品の仕分けや梱包作業。未経験でも始めやすい簡単作業です。',
      rating: 4.2,
      reviewCount: 67,
      features: ['未経験歓迎', '服装自由', '駅チカ', '冷暖房完備'],
      urgent: false,
      new: false
    },
    {
      id: 4,
      title: 'アパレル販売スタッフ',
      company: 'ファッションブランドC',
      location: '池袋',
      category: '販売・接客',
      hourlyRate: '¥1,300〜1,600',
      schedule: '週4日〜',
      duration: '長期（3ヶ月以上）',
      description: '人気ブランドでの接客販売。社員割引あり！',
      rating: 4.6,
      reviewCount: 34,
      features: ['社員割引', '昇給あり', '正社員登用あり', '研修充実'],
      urgent: true,
      new: false
    },
    {
      id: 5,
      title: 'データ入力スタッフ【在宅可】',
      company: 'IT企業D',
      location: 'リモート',
      category: '事務・データ入力',
      hourlyRate: '¥1,000〜1,200',
      schedule: '週2日〜',
      duration: '長期（3ヶ月以上）',
      description: '在宅で簡単なデータ入力作業。自分のペースで働けます。',
      rating: 4.4,
      reviewCount: 89,
      features: ['在宅OK', 'フレックス', '未経験歓迎', 'PC貸与'],
      urgent: false,
      new: true
    }
  ];
  
  // フィルタリングされた求人
  const filteredJobs = $derived(jobs.filter(job => {
    if (searchQuery && !job.title.includes(searchQuery) && !job.description.includes(searchQuery)) {
      return false;
    }
    if (selectedArea && job.location !== selectedArea && job.location !== 'リモート') {
      return false;
    }
    if (selectedCategory && job.category !== selectedCategory) {
      return false;
    }
    return true;
  }));
  
  // ソート
  const sortedJobs = $derived([...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.id - a.id;
      case 'rating':
        return b.rating - a.rating;
      case 'hourlyRate':
        return parseInt(b.hourlyRate.replace(/[^0-9]/g, '')) - parseInt(a.hourlyRate.replace(/[^0-9]/g, ''));
      default:
        return 0;
    }
  }));
  
  function toggleFilter(category: 'jobType' | 'schedule' | 'features', value: string) {
    const index = filters[category].indexOf(value);
    if (index > -1) {
      filters[category].splice(index, 1);
    } else {
      filters[category].push(value);
    }
  }
  
  function clearFilters() {
    filters = {
      jobType: [],
      schedule: [],
      hourlyRate: '',
      experience: '',
      features: []
    };
    searchQuery = '';
    selectedArea = '';
    selectedCategory = '';
  }
</script>

<div class="min-h-screen bg-gray-50">
  <!-- 検索バー -->
  <div class="bg-white shadow-sm sticky top-0 z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <div class="relative">
            <Search class="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              bind:value={searchQuery}
              placeholder="キーワードで検索"
              class="pl-10 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div class="flex gap-2">
          <div class="relative">
            <MapPin class="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              bind:value={selectedArea}
              class="pl-10 pr-8 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="">全エリア</option>
              {#each areas as area}
                <option value={area}>{area}</option>
              {/each}
            </select>
          </div>
          
          <select
            bind:value={selectedCategory}
            class="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">全カテゴリ</option>
            {#each categories as category}
              <option value={category}>{category}</option>
            {/each}
          </select>
          
          <button
            onclick={() => showFilters = !showFilters}
            class="flex items-center gap-2 px-4 py-3 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter class="h-5 w-5" />
            <span class="hidden md:inline">絞り込み</span>
            <ChevronDown class={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- フィルターパネル -->
  {#if showFilters}
    <div class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <!-- 雇用形態 -->
          <div>
            <h3 class="font-semibold mb-3">雇用形態</h3>
            <div class="space-y-2">
              {#each ['アルバイト', 'パート', '派遣', '業務委託'] as type}
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.jobType.includes(type)}
                    onchange={() => toggleFilter('jobType', type)}
                    class="mr-2 rounded text-blue-600"
                  />
                  <span class="text-sm">{type}</span>
                </label>
              {/each}
            </div>
          </div>
          
          <!-- 勤務日数 -->
          <div>
            <h3 class="font-semibold mb-3">勤務日数</h3>
            <div class="space-y-2">
              {#each ['単発OK', '週1日〜', '週2〜3日', '週4日〜'] as schedule}
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.schedule.includes(schedule)}
                    onchange={() => toggleFilter('schedule', schedule)}
                    class="mr-2 rounded text-blue-600"
                  />
                  <span class="text-sm">{schedule}</span>
                </label>
              {/each}
            </div>
          </div>
          
          <!-- 時給 -->
          <div>
            <h3 class="font-semibold mb-3">時給</h3>
            <select
              bind:value={filters.hourlyRate}
              class="w-full px-3 py-2 border rounded-lg text-sm"
            >
              <option value="">指定なし</option>
              <option value="1000">¥1,000以上</option>
              <option value="1200">¥1,200以上</option>
              <option value="1500">¥1,500以上</option>
              <option value="2000">¥2,000以上</option>
            </select>
          </div>
          
          <!-- 経験 -->
          <div>
            <h3 class="font-semibold mb-3">経験</h3>
            <select
              bind:value={filters.experience}
              class="w-full px-3 py-2 border rounded-lg text-sm"
            >
              <option value="">指定なし</option>
              <option value="none">未経験歓迎</option>
              <option value="some">経験者優遇</option>
              <option value="required">経験必須</option>
            </select>
          </div>
          
          <!-- 特徴 -->
          <div>
            <h3 class="font-semibold mb-3">特徴</h3>
            <div class="space-y-2">
              {#each ['日払いOK', '交通費支給', '服装自由', '在宅OK'] as feature}
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.features.includes(feature)}
                    onchange={() => toggleFilter('features', feature)}
                    class="mr-2 rounded text-blue-600"
                  />
                  <span class="text-sm">{feature}</span>
                </label>
              {/each}
            </div>
          </div>
        </div>
        
        <div class="mt-4 flex justify-end">
          <button
            onclick={clearFilters}
            class="text-sm text-gray-600 hover:text-gray-900"
          >
            条件をクリア
          </button>
        </div>
      </div>
    </div>
  {/if}
  
  <!-- 検索結果 -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- 結果ヘッダー -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold">
          {#if searchQuery || selectedArea || selectedCategory}
            検索結果
          {:else}
            すべての求人
          {/if}
        </h1>
        <p class="text-gray-600 mt-1">
          {sortedJobs.length}件の求人が見つかりました
        </p>
      </div>
      
      <select
        bind:value={sortBy}
        class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      >
        <option value="recommended">おすすめ順</option>
        <option value="newest">新着順</option>
        <option value="rating">評価順</option>
        <option value="hourlyRate">時給順</option>
      </select>
    </div>
    
    <!-- 求人リスト -->
    <div class="space-y-4">
      {#each sortedJobs as job}
        <div class="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <h2 class="text-lg font-semibold">
                    <a href={`/jobs/${job.id}`} class="hover:text-blue-600">
                      {job.title}
                    </a>
                  </h2>
                  {#if job.urgent}
                    <span class="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">急募</span>
                  {/if}
                  {#if job.new}
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">NEW</span>
                  {/if}
                </div>
                
                <div class="flex items-center gap-4 text-gray-600 mb-3">
                  <span class="font-medium">{job.company}</span>
                  <div class="flex items-center">
                    <Star class="h-4 w-4 text-yellow-500 fill-current" />
                    <span class="ml-1 text-sm">{job.rating} ({job.reviewCount}件)</span>
                  </div>
                </div>
                
                <p class="text-gray-700 mb-4">{job.description}</p>
                
                <div class="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                  <div class="flex items-center">
                    <MapPin class="h-4 w-4 mr-1" />
                    {job.location}
                  </div>
                  <div class="flex items-center">
                    <DollarSign class="h-4 w-4 mr-1" />
                    {job.hourlyRate}
                  </div>
                  <div class="flex items-center">
                    <Calendar class="h-4 w-4 mr-1" />
                    {job.schedule}
                  </div>
                  <div class="flex items-center">
                    <Clock class="h-4 w-4 mr-1" />
                    {job.duration}
                  </div>
                  <div class="flex items-center">
                    <Briefcase class="h-4 w-4 mr-1" />
                    {job.category}
                  </div>
                </div>
                
                <div class="flex flex-wrap gap-2">
                  {#each job.features as feature}
                    <span class="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                      {feature}
                    </span>
                  {/each}
                </div>
              </div>
              
              <div class="ml-6 flex flex-col gap-2">
                <a
                  href={`/jobs/${job.id}`}
                  class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
                >
                  詳細を見る
                </a>
                <button class="text-gray-600 hover:text-gray-900 text-sm">
                  お気に入り
                </button>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
    
    {#if sortedJobs.length === 0}
      <div class="text-center py-16">
        <Search class="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-semibold mb-2">該当する求人が見つかりませんでした</h3>
        <p class="text-gray-600 mb-6">検索条件を変更してお試しください</p>
        <button
          onclick={clearFilters}
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          条件をクリア
        </button>
      </div>
    {/if}
    
    {#if sortedJobs.length > 0}
      <!-- ページネーション -->
      <div class="mt-8 flex justify-center">
        <nav class="flex gap-2">
          <button class="px-4 py-2 border rounded hover:bg-gray-50" disabled>
            前へ
          </button>
          <button class="px-4 py-2 bg-blue-600 text-white rounded">1</button>
          <button class="px-4 py-2 border rounded hover:bg-gray-50">2</button>
          <button class="px-4 py-2 border rounded hover:bg-gray-50">3</button>
          <button class="px-4 py-2 border rounded hover:bg-gray-50">
            次へ
          </button>
        </nav>
      </div>
    {/if}
  </div>
</div>