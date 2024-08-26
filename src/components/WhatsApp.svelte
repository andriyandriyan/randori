<script lang="ts">
  import { io } from 'socket.io-client';
  import { onMount } from 'svelte';
  import IconCheckCircle from './icons/IconCheckCircle.svelte';
  import IconSquareX from './icons/IconSquareX.svelte';

  export let wsUrl: string;

  type Status = 'AUTHENTICATED' | 'NOT_FOUND';

  interface User {
    phone: string;
    name?: string;
  }

  let loading = true;
  let user: User | null = null;
  let qrcode = '';
  let notFound = false;

  onMount(async () => {
    const socket = io(wsUrl);

    const urlSearchParams = new URLSearchParams(location.search);
    const session = urlSearchParams.get('session');
    if (session) {
      socket.emit('qrcode', { session });

      socket.on('status', (data: { status: Status } & Partial<User>) => {
        if (data.status === 'AUTHENTICATED') {
          user = {
            phone: data.phone!,
            name: data.name,
          };
          qrcode = '';
        } else if (data.status === 'NOT_FOUND') {
          notFound = true;
        }
        loading = false;
      });

      socket.on('qrcode', ({ data }) => {
        if (data) {
          qrcode = data;
        }
        loading = false;
      });
    }
  });
</script>

<h1 class="text-4xl font-bold mb-4">Randori WhatsApp Broadcast</h1>
{#if loading}
  <div class="flex flex-col justify-center items-center h-[calc(100vh-196px)]">
    <div class="w-20 h-20 rounded-full border-8 border-r-primary-500 animate-spin" />
  </div>
{/if}
{#if qrcode}
  <div class="py-8 relative">
    <h2 class="text-2xl font-semibold mb-2">
      Cara menggunakan Randori WhatsApp Broadcast
    </h2>
    <ol class="list-decimal ml-4 mb-8">
      <li>Buka aplikasi <b>WhatsApp</b> di handphone mu</li>
      <li>
        Ketuk <b>&#8942;</b>
        &gt; <b>Perangkat Tertaut</b> &gt; <b>Tautkan Perangkat</b>
      </li>
      <li>Arahkan handphone Anda ke kode QR berikut.</li>
    </ol>
    <div class="flex flex-col justify-center items-center">
      <img src={qrcode} alt="QRCode" width="250" height="250" />
      <p class="text-center">Sistem memerlukan waktu beberapa saat untuk login</p>
    </div>
  </div>
{/if}
{#if user}
  <div class="flex flex-col justify-center items-center py-8">
    <IconCheckCircle />
    <h2 class="text-2xl font-semibold my-4 text-center">
      WhatsApp Berhasil Terhubung
    </h2>
    <div>
      <h3>{`No. Handphone: ${user.phone}`}</h3>
      {#if user.name}
        <h3>{`Nama: ${user.name}`}</h3>
      {/if}
    </div>
  </div>
{/if}

{#if notFound}
  <div class="flex flex-col justify-center items-center py-8">
    <IconSquareX />
    <h2 class="text-2xl font-semibold my-4 text-center">
      WhatsApp Client Tidak Ditemukan
    </h2>
  </div>
{/if}