import { J as store_get, V as attr_class, N as escape_html, T as attr, U as maybe_selected, K as unsubscribe_stores, D as pop, A as push } from "../../../../chunks/index2.js";
import "firebase/auth";
import "../../../../chunks/config.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "../../../../chunks/state.svelte.js";
import { p as page } from "../../../../chunks/stores.js";
import "firebase/firestore";
import { B as Briefcase } from "../../../../chunks/briefcase.js";
import { B as Building } from "../../../../chunks/building.js";
import { U as User } from "../../../../chunks/user.js";
import { M as Mail, L as Lock } from "../../../../chunks/mail.js";
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let email = "";
  let password = "";
  let confirmPassword = "";
  let displayName = "";
  let role = store_get($$store_subs ??= {}, "$page", page).url.searchParams.get("role") || "jobseeker";
  let loading = false;
  let companyName = "";
  let industry = "";
  let location = "";
  $$payload.out.push(`<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"><div class="max-w-md w-full space-y-8"><div><h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">新規アカウント作成</h2> <p class="mt-2 text-center text-sm text-gray-600">または <a href="/auth/login" class="font-medium text-blue-600 hover:text-blue-500">既存のアカウントでログイン</a></p></div> <div class="flex justify-center space-x-4"><button${attr_class(`px-4 py-2 rounded-lg font-medium transition-colors ${role === "jobseeker" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`)}>`);
  Briefcase($$payload, { class: "inline-block mr-2 h-4 w-4" });
  $$payload.out.push(`<!----> 求職者として登録</button> <button${attr_class(`px-4 py-2 rounded-lg font-medium transition-colors ${role === "employer" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`)}>`);
  Building($$payload, { class: "inline-block mr-2 h-4 w-4" });
  $$payload.out.push(`<!----> 雇用主として登録</button></div> <form class="mt-8 space-y-6">`);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> <div class="space-y-4"><div><label for="displayName" class="block text-sm font-medium text-gray-700">${escape_html(role === "employer" ? "担当者名" : "お名前")}</label> <div class="mt-1 relative">`);
  User($$payload, { class: "absolute left-3 top-3 h-5 w-5 text-gray-400" });
  $$payload.out.push(`<!----> <input id="displayName" name="displayName" type="text" required${attr("value", displayName)} class="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"${attr("placeholder", role === "employer" ? "担当者名" : "お名前")}/></div></div> `);
  if (role === "employer") {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<div><label for="companyName" class="block text-sm font-medium text-gray-700">会社名</label> <div class="mt-1 relative">`);
    Building($$payload, { class: "absolute left-3 top-3 h-5 w-5 text-gray-400" });
    $$payload.out.push(`<!----> <input id="companyName" name="companyName" type="text" required${attr("value", companyName)} class="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="会社名"/></div></div> <div><label for="industry" class="block text-sm font-medium text-gray-700">業種</label> <select id="industry" class="mt-1 block w-full px-3 py-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">`);
    $$payload.select_value = industry;
    $$payload.out.push(`<option value=""${maybe_selected($$payload, "")}>選択してください</option><option value="飲食"${maybe_selected($$payload, "飲食")}>飲食</option><option value="小売"${maybe_selected($$payload, "小売")}>小売</option><option value="サービス"${maybe_selected($$payload, "サービス")}>サービス</option><option value="製造"${maybe_selected($$payload, "製造")}>製造</option><option value="IT"${maybe_selected($$payload, "IT")}>IT</option><option value="その他"${maybe_selected($$payload, "その他")}>その他</option>`);
    $$payload.select_value = void 0;
    $$payload.out.push(`</select></div> <div><label for="location" class="block text-sm font-medium text-gray-700">所在地</label> <input id="location" name="location" type="text"${attr("value", location)} class="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="例: 東京都渋谷区"/></div>`);
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> <div><label for="email" class="block text-sm font-medium text-gray-700">メールアドレス</label> <div class="mt-1 relative">`);
  Mail($$payload, { class: "absolute left-3 top-3 h-5 w-5 text-gray-400" });
  $$payload.out.push(`<!----> <input id="email" name="email" type="email" autocomplete="email" required${attr("value", email)} class="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="メールアドレス"/></div></div> <div><label for="password" class="block text-sm font-medium text-gray-700">パスワード</label> <div class="mt-1 relative">`);
  Lock($$payload, { class: "absolute left-3 top-3 h-5 w-5 text-gray-400" });
  $$payload.out.push(`<!----> <input id="password" name="password" type="password" autocomplete="new-password" required${attr("value", password)} class="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="パスワード（6文字以上）"/></div></div> <div><label for="confirmPassword" class="block text-sm font-medium text-gray-700">パスワード（確認）</label> <div class="mt-1 relative">`);
  Lock($$payload, { class: "absolute left-3 top-3 h-5 w-5 text-gray-400" });
  $$payload.out.push(`<!----> <input id="confirmPassword" name="confirmPassword" type="password" autocomplete="new-password" required${attr("value", confirmPassword)} class="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="パスワード（確認）"/></div></div></div> <div><button type="submit"${attr("disabled", loading, true)} class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">${escape_html("アカウント作成")}</button></div> <div class="mt-6"><div class="relative"><div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-300"></div></div> <div class="relative flex justify-center text-sm"><span class="px-2 bg-gray-50 text-gray-500">または</span></div></div> <div class="mt-6"><button type="button"${attr("disabled", loading, true)} class="w-full flex justify-center items-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"><svg class="w-5 h-5 mr-2" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path></svg> Googleで登録</button></div></div></form></div></div>`);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
