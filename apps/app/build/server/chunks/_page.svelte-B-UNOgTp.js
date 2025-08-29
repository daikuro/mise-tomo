import { x as push, a7 as attr, a0 as escape_html, z as pop } from './index2-DiQyyHO4.js';
import 'firebase/auth';
import './config-CqfaKcVN.js';
import '@sveltejs/kit/internal';
import './state.svelte-U1_tYpgR.js';
import { M as Mail, L as Lock } from './mail-D10MoAMK.js';
import 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import './Icon-0ctayEg9.js';

function _page($$payload, $$props) {
  push();
  let email = "";
  let password = "";
  let loading = false;
  $$payload.out.push(`<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"><div class="max-w-md w-full space-y-8"><div><h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">アカウントにログイン</h2> <p class="mt-2 text-center text-sm text-gray-600">または <a href="/auth/register" class="font-medium text-blue-600 hover:text-blue-500">新規アカウントを作成</a></p></div> <form class="mt-8 space-y-6">`);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> <div class="rounded-md shadow-sm"><div><label for="email" class="sr-only">メールアドレス</label> <div class="relative">`);
  Mail($$payload, { class: "absolute left-3 top-3 h-5 w-5 text-gray-400" });
  $$payload.out.push(`<!----> <input id="email" name="email" type="email" autocomplete="email" required${attr("value", email)} class="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="メールアドレス"/></div></div> <div><label for="password" class="sr-only">パスワード</label> <div class="relative">`);
  Lock($$payload, { class: "absolute left-3 top-3 h-5 w-5 text-gray-400" });
  $$payload.out.push(`<!----> <input id="password" name="password" type="password" autocomplete="current-password" required${attr("value", password)} class="appearance-none relative block w-full px-10 py-3 border-t-0 border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="パスワード"/></div></div></div> <div class="flex items-center justify-between"><div class="text-sm"><a href="/auth/forgot-password" class="font-medium text-blue-600 hover:text-blue-500">パスワードをお忘れですか？</a></div></div> <div><button type="submit"${attr("disabled", loading, true)} class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">${escape_html("ログイン")}</button></div> <div class="mt-6"><div class="relative"><div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-300"></div></div> <div class="relative flex justify-center text-sm"><span class="px-2 bg-gray-50 text-gray-500">または</span></div></div> <div class="mt-6"><button type="button"${attr("disabled", loading, true)} class="w-full flex justify-center items-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"><svg class="w-5 h-5 mr-2" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path></svg> Googleでログイン</button></div></div></form></div></div>`);
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-B-UNOgTp.js.map
