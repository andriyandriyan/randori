<script lang="ts">
  import dayjs from 'dayjs';
  import 'dayjs/locale/id';
  import { onMount } from 'svelte';
  import type { Data, Transaction } from '../interfaces';
  import Modal from './Modal.svelte';
  import PaymentInfo from './PaymentInfo.svelte';
  import TransactionItems from './TransactionItems.svelte';

  dayjs.locale('id');

  export let apiUrl: string;

  let loading = true;
  let data: Data<Transaction>;
  let error: string | null = null;
  onMount(async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id');
      const response = await fetch(`${apiUrl}/transactions/track/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Transaksi tidak ditemukan');
        } else {
          throw new Error('Network response was not ok');
        }
      }
      data = await response.json();
    } catch (err: any) {
      error = err.message;
    } finally {
      loading = false;
    }
  });
  $: transactionStatus = data?.data.transactionStatus;
  $: outlet = data?.data.outlet;
  $: receiptSetting = outlet?.receiptSetting;
</script>

<div class="bg-gray-50 min-h-screen">
  <div class="max-w-sm mx-auto bg-white h-full py-8 px-4">
    {#if loading}
      <div class="flex justify-center items-center h-screen">
        <div class="w-20 h-20 border-8 border-gray-100 border-r-primary-500 rounded-full animate-spin"></div>
      </div>
    {/if}
    {#if data}
      <div class="text-center mb-6">
        <h1 class="font-bold text-xl mb-4">Tracking Laundry</h1>
        {#if !receiptSetting?.hideLogo && receiptSetting?.logo}
           <img
            src={receiptSetting?.logo}
            alt={outlet.name}
            width={100}
            class="mx-auto mb-4"
          />
        {/if}
        <h2 class="font-bold text-lg">{outlet.name}</h2>
        {#if !receiptSetting?.hideAddress}
          <p class="text-gray-600">
            {outlet.address}
          </p>
          <p class="text-gray-600">
            {`${outlet.city.type} ${outlet.city.name}`}
          </p>
          <p class="text-gray-600">
            {outlet.phone.startsWith('628')
              ? outlet.phone.replace('628', '08')
              : outlet.phone}
          </p>
        {/if}
        {#if receiptSetting?.additionalInfo}
          <p class="my-4">
            {receiptSetting.additionalInfo}
          </p>
        {/if}
      </div>
      <div class="font-semibold mb-2">Info Transaksi</div>
      <div class="mb-1 flex justify-between">
        <span class="text-gray-600">Waktu Transaksi</span>
        <span>{dayjs(data.data.createdAt).format('DD MMM YYYY, HH:mm')}</span>
      </div>
      <div class="mb-1 flex justify-between">
        <span class="text-gray-600">No. Transaksi</span>
        <span>{data.data.number}</span>
      </div>
      <div class="mb-1 flex justify-between items-center">
        <span class="text-gray-600">Status Transaksi</span>
        <div>
          <span
            class="text-white font-medium text-xs rounded-sm px-2 py-0.5 {transactionStatus === 'Antrian' || transactionStatus === 'Proses' ? 'bg-yellow-500' : ''} {transactionStatus === 'Siap Diambil' ? 'bg-blue-500' : ''} {transactionStatus === 'Selesai' ? 'bg-green-500' : ''} {transactionStatus === 'Batal' ? 'bg-red-500' : ''}"
          >
            {transactionStatus}
          </span>
        </div>
      </div>
      {#if !receiptSetting?.hideCashierName}
        <div class="mb-1 flex justify-between">
          <span class="text-gray-600">Kasir</span>
          <span>{data.data.user.name}</span>
        </div>
      {/if}
      <div class="mb-1 flex justify-between">
        <span class="text-gray-600">Estimasi Selesai</span>
        <span>{dayjs(data.data.estCompletionDatetime).format('DD MMM YYYY, HH:mm')}</span>
      </div>
      {#if data.data.perfume}
        <div class="mb-1 flex justify-between">
          <span class="text-gray-600">Parfum</span>
          <span>{data.data.perfume?.name}</span>
        </div>
      {/if}
      {#if data.data.pickupDeliveryAddress}
        <div class="mb-1 flex flex-col">
          <span class="text-gray-600">Alamat Antar/Jemput:</span>
          <span class="whitespace-pre-line">{data.data.pickupDeliveryAddress.address}</span>
        </div>
      {/if}
      {#if data.data.note}
        <div class="mb-1 flex flex-col">
          <span class="text-gray-600">Catatan:</span>
          <span class="whitespace-pre-line">{data.data.note}</span>
        </div>
      {/if}
      {#if !receiptSetting?.hideCustomerName}
        <div class="font-semibold mb-2 border-t pt-2">Info Pelanggan</div>
        <div class="mb-1 flex justify-between">
          <span class="text-gray-600">Nama</span>
          <span>{data.data.customer.name}</span>
        </div>
      {/if}
      <TransactionItems
        transactionItems={data.data.transactionItems}
        transactionStatus={transactionStatus}
        receiptSetting={receiptSetting}
      />
      <PaymentInfo transaction={data.data} receiptSetting={receiptSetting} />
    {/if}
    {#if error}
      <div class="flex items-center justify-center h-full">
        <p class="text-red-500 text-center font-semibold text-lg">{error}</p>
      </div>
    {/if}
  </div>
</div>

<Modal />
