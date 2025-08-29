import { E as sanitize_props, F as spread_props, G as slot, S as ensure_array_like, T as attr, U as maybe_selected, N as escape_html, D as pop, A as push } from "../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "../../chunks/state.svelte.js";
import { S as Search } from "../../chunks/search.js";
import { M as Map_pin, C as Clock, S as Star, D as Dollar_sign } from "../../chunks/star.js";
import { C as Circle_check_big } from "../../chunks/circle-check-big.js";
import { I as Icon } from "../../chunks/Icon.js";
import { B as Briefcase } from "../../chunks/briefcase.js";
function Message_circle($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.542.0 - ISC
   *
   * ISC License
   *
   * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   * ---
   *
   * The MIT License (MIT) (for portions derived from Feather)
   *
   * Copyright (c) 2013-2023 Cole Bemis
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   *
   */
  const iconNode = [
    [
      "path",
      {
        "d": "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "message-circle" },
    $$sanitized_props,
    {
      /**
       * @component @name MessageCircle
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMi45OTIgMTYuMzQyYTIgMiAwIDAgMSAuMDk0IDEuMTY3bC0xLjA2NSAzLjI5YTEgMSAwIDAgMCAxLjIzNiAxLjE2OGwzLjQxMy0uOTk4YTIgMiAwIDAgMSAxLjA5OS4wOTIgMTAgMTAgMCAxIDAtNC43NzctNC43MTkiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/message-circle
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$payload2) => {
        $$payload2.out.push(`<!---->`);
        slot($$payload2, $$props, "default", {});
        $$payload2.out.push(`<!---->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Trending_up($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.542.0 - ISC
   *
   * ISC License
   *
   * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   * ---
   *
   * The MIT License (MIT) (for portions derived from Feather)
   *
   * Copyright (c) 2013-2023 Cole Bemis
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   *
   */
  const iconNode = [
    ["path", { "d": "M16 7h6v6" }],
    ["path", { "d": "m22 7-8.5 8.5-5-5L2 17" }]
  ];
  Icon($$payload, spread_props([
    { name: "trending-up" },
    $$sanitized_props,
    {
      /**
       * @component @name TrendingUp
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTYgN2g2djYiIC8+CiAgPHBhdGggZD0ibTIyIDctOC41IDguNS01LTVMMiAxNyIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/trending-up
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$payload2) => {
        $$payload2.out.push(`<!---->`);
        slot($$payload2, $$props, "default", {});
        $$payload2.out.push(`<!---->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Users($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.542.0 - ISC
   *
   * ISC License
   *
   * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   * ---
   *
   * The MIT License (MIT) (for portions derived from Feather)
   *
   * Copyright (c) 2013-2023 Cole Bemis
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   *
   */
  const iconNode = [
    ["path", { "d": "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }],
    ["path", { "d": "M16 3.128a4 4 0 0 1 0 7.744" }],
    ["path", { "d": "M22 21v-2a4 4 0 0 0-3-3.87" }],
    ["circle", { "cx": "9", "cy": "7", "r": "4" }]
  ];
  Icon($$payload, spread_props([
    { name: "users" },
    $$sanitized_props,
    {
      /**
       * @component @name Users
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTYgMjF2LTJhNCA0IDAgMCAwLTQtNEg2YTQgNCAwIDAgMC00IDR2MiIgLz4KICA8cGF0aCBkPSJNMTYgMy4xMjhhNCA0IDAgMCAxIDAgNy43NDQiIC8+CiAgPHBhdGggZD0iTTIyIDIxdi0yYTQgNCAwIDAgMC0zLTMuODciIC8+CiAgPGNpcmNsZSBjeD0iOSIgY3k9IjciIHI9IjQiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/users
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$payload2) => {
        $$payload2.out.push(`<!---->`);
        slot($$payload2, $$props, "default", {});
        $$payload2.out.push(`<!---->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function _page($$payload, $$props) {
  push();
  let searchQuery = "";
  let selectedArea = "";
  const popularAreas = ["渋谷", "新宿", "池袋", "横浜", "大阪", "名古屋", "福岡", "札幌"];
  const jobCategories = [
    { name: "飲食・フード", icon: "🍽️", count: 1234 },
    { name: "イベントスタッフ", icon: "🎪", count: 856 },
    { name: "軽作業・物流", icon: "📦", count: 923 },
    { name: "販売・接客", icon: "🛍️", count: 678 },
    { name: "事務・データ入力", icon: "💻", count: 445 },
    { name: "清掃・メンテナンス", icon: "🧹", count: 312 }
  ];
  const featuredJobs = [
    {
      id: 1,
      title: "カフェスタッフ募集",
      company: "おしゃれカフェ",
      location: "渋谷",
      hourlyRate: "¥1,200",
      duration: "単発OK",
      rating: 4.5
    },
    {
      id: 2,
      title: "イベント設営スタッフ",
      company: "イベント企画会社",
      location: "新宿",
      hourlyRate: "¥1,500",
      duration: "3日間",
      rating: 4.8
    },
    {
      id: 3,
      title: "倉庫内軽作業",
      company: "物流センター",
      location: "品川",
      hourlyRate: "¥1,100",
      duration: "週3日〜",
      rating: 4.2
    }
  ];
  const each_array = ensure_array_like(popularAreas);
  const each_array_1 = ensure_array_like(jobCategories);
  const each_array_2 = ensure_array_like(featuredJobs);
  $$payload.out.push(`<div class="relative"><section class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center"><h1 class="text-4xl md:text-6xl font-bold mb-6">地域で見つかる、スキマ時間のお仕事</h1> <p class="text-xl mb-10">空いた時間を有効活用。今すぐ働ける仕事を見つけよう</p> <div class="bg-white rounded-lg shadow-xl p-6 max-w-3xl mx-auto"><div class="flex flex-col md:flex-row gap-4"><div class="flex-1"><label class="block text-gray-700 text-sm font-medium mb-2">キーワード</label> <div class="relative">`);
  Search($$payload, { class: "absolute left-3 top-3 h-5 w-5 text-gray-400" });
  $$payload.out.push(`<!----> <input type="text"${attr("value", searchQuery)} placeholder="職種、仕事内容など" class="pl-10 w-full px-4 py-3 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"/></div></div> <div class="flex-1"><label class="block text-gray-700 text-sm font-medium mb-2">エリア</label> <div class="relative">`);
  Map_pin($$payload, { class: "absolute left-3 top-3 h-5 w-5 text-gray-400" });
  $$payload.out.push(`<!----> <select class="pl-10 w-full px-4 py-3 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none">`);
  $$payload.select_value = selectedArea;
  $$payload.out.push(`<option value=""${maybe_selected($$payload, "")}>エリアを選択</option><!--[-->`);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let area = each_array[$$index];
    $$payload.out.push(`<option${attr("value", area)}${maybe_selected($$payload, area)}>${escape_html(area)}</option>`);
  }
  $$payload.out.push(`<!--]-->`);
  $$payload.select_value = void 0;
  $$payload.out.push(`</select></div></div> <div class="flex items-end"><button class="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium transition-colors">検索する</button></div></div></div></div></div></section> <section class="py-16 bg-gray-50"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><h2 class="text-3xl font-bold text-center mb-12">ミセトモの特徴</h2> <div class="grid md:grid-cols-3 gap-6"><div class="bg-white p-6 rounded-lg shadow-md text-center">`);
  Circle_check_big($$payload, { class: "h-12 w-12 text-blue-600 mx-auto mb-4" });
  $$payload.out.push(`<!----> <h3 class="text-xl font-semibold mb-2">事前確認安心</h3> <p class="text-gray-600">勤務前に職場環境や仕事内容をしっかり確認</p></div> <div class="bg-white p-6 rounded-lg shadow-md text-center">`);
  Message_circle($$payload, { class: "h-12 w-12 text-blue-600 mx-auto mb-4" });
  $$payload.out.push(`<!----> <h3 class="text-xl font-semibold mb-2">充実のコミュニケーション</h3> <p class="text-gray-600">採用担当者と事前にやり取りでき、不安を解消</p></div> <div class="bg-white p-6 rounded-lg shadow-md text-center">`);
  Clock($$payload, { class: "h-12 w-12 text-blue-600 mx-auto mb-4" });
  $$payload.out.push(`<!----> <h3 class="text-xl font-semibold mb-2">スピーディーなマッチング</h3> <p class="text-gray-600">すぐに働きたい方も安心、迅速なマッチング</p></div></div></div></section> <section class="py-16"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><h2 class="text-3xl font-bold text-center mb-12">人気のカテゴリ</h2> <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"><!--[-->`);
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let category = each_array_1[$$index_1];
    $$payload.out.push(`<a${attr("href", `/jobs?category=${category.name}`)} class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow text-center group"><div class="text-4xl mb-3">${escape_html(category.icon)}</div> <h3 class="font-semibold text-sm mb-1 group-hover:text-blue-600">${escape_html(category.name)}</h3> <p class="text-xs text-gray-500">${escape_html(category.count)}件</p></a>`);
  }
  $$payload.out.push(`<!--]--></div></div></section> <section class="py-16 bg-gray-50"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><h2 class="text-3xl font-bold text-center mb-12">注目の求人</h2> <div class="grid md:grid-cols-3 gap-6"><!--[-->`);
  for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
    let job = each_array_2[$$index_2];
    $$payload.out.push(`<div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"><div class="p-6"><div class="flex justify-between items-start mb-4"><h3 class="text-lg font-semibold">${escape_html(job.title)}</h3> <div class="flex items-center text-yellow-500">`);
    Star($$payload, { class: "h-4 w-4 fill-current" });
    $$payload.out.push(`<!----> <span class="text-sm ml-1 text-gray-600">${escape_html(job.rating)}</span></div></div> <p class="text-gray-600 mb-4">${escape_html(job.company)}</p> <div class="space-y-2 text-sm"><div class="flex items-center text-gray-600">`);
    Map_pin($$payload, { class: "h-4 w-4 mr-2" });
    $$payload.out.push(`<!----> ${escape_html(job.location)}</div> <div class="flex items-center text-gray-600">`);
    Dollar_sign($$payload, { class: "h-4 w-4 mr-2" });
    $$payload.out.push(`<!----> ${escape_html(job.hourlyRate)}</div> <div class="flex items-center text-gray-600">`);
    Clock($$payload, { class: "h-4 w-4 mr-2" });
    $$payload.out.push(`<!----> ${escape_html(job.duration)}</div></div> <a${attr("href", `/jobs/${job.id}`)} class="mt-4 block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">詳細を見る</a></div></div>`);
  }
  $$payload.out.push(`<!--]--></div> <div class="text-center mt-8"><a href="/jobs" class="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">すべての求人を見る `);
  Trending_up($$payload, { class: "ml-2 h-5 w-5" });
  $$payload.out.push(`<!----></a></div></div></section> <section class="bg-blue-600 text-white py-16"><div class="max-w-4xl mx-auto text-center px-4"><h2 class="text-3xl font-bold mb-4">今すぐ始めよう</h2> <p class="text-xl mb-8">無料で登録して、あなたにピッタリの仕事を見つけましょう</p> <div class="flex flex-col sm:flex-row gap-4 justify-center"><a href="/auth/register?role=jobseeker" class="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 font-medium transition-colors">`);
  Users($$payload, { class: "inline-block mr-2 h-5 w-5" });
  $$payload.out.push(`<!----> 仕事を探す</a> <a href="/auth/register?role=employer" class="bg-blue-800 text-white px-8 py-3 rounded-lg hover:bg-blue-900 font-medium transition-colors">`);
  Briefcase($$payload, { class: "inline-block mr-2 h-5 w-5" });
  $$payload.out.push(`<!----> 求人を掲載する</a></div></div></section></div>`);
  pop();
}
export {
  _page as default
};
