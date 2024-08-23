<script lang="ts">
  import dayjs from 'dayjs';
  import 'dayjs/locale/id';
  import type { ReceiptSetting, Transaction } from '../interfaces';

  dayjs.locale('id');

  export let transaction: Transaction;
  export let receiptSetting: ReceiptSetting | undefined;

  $: remainingAmount = transaction.total - (transaction.advancePaymentAmount || 0);
</script>

<div class="font-semibold mb-2 border-t pt-2">Info Pembayaran</div>
{#if transaction.discount > 0 || transaction.pickupDeliveryFee > 0}
  <div class="mb-1 flex justify-between">
    <span>Subtotal</span>
    <span>{`Rp${transaction.subtotal.toLocaleString('id')}`}</span>
  </div>
  {#if transaction.pickupDeliveryFee > 0}
    <div class="mb-1 flex justify-between">
      <span>Biaya Antar/Jemput</span>
      <span>{`Rp${transaction.pickupDeliveryFee.toLocaleString('id')}`}</span>
    </div>
  {/if}
  {#if transaction.discount > 0}
    <div class="mb-1 flex justify-between">
      <span>Subtotal</span>
      <span>{`-Rp${transaction.discount.toLocaleString('id')}`}</span>
    </div>
  {/if}
{/if}
<div class="mb-1 flex justify-between">
  <span>Total Transaksi</span>
  <span class="font-bold">
    {`Rp${transaction.total.toLocaleString('id')}`}
  </span>
</div>
{#if transaction.advancePaymentDate}
  <div>
    <span class="font-bold">Pembayaran DP</span>
    <span>
      {` - ${transaction.advancePaymentMethod?.name}`}
    </span>
  </div>
  <div class="mb-1 flex justify-between">
    <span class="font-bold">
      {dayjs(transaction.advancePaymentDate).format('DD MMM YYYY')}
    </span>
    <span class="font-bold">
      {`Rp${transaction.advancePaymentAmount?.toLocaleString('id')}`}
    </span>
  </div>
{/if}
{#if transaction.settlementPaymentDate}
  <div>
    <span class="font-bold">Pembayaran Pelunasan</span>
    <span>
      {` - ${transaction.settlementPaymentMethod?.name}`}
    </span>
  </div>
  <div class="mb-1 flex justify-between">
    <span class="font-bold">
      {dayjs(transaction.settlementPaymentDate).format('DD MMM YYYY')}
    </span>
    <span class="font-bold">
      {`Rp${transaction.settlementPaymentAmount?.toLocaleString('id')}`}
    </span>
  </div>
{/if}
{#if transaction.cashChange}
  <div class="mb-1 flex justify-between">
    <span>Jumlah Dibayarkan</span>
    <span>
      {`Rp${transaction.cashPaymentAmount?.toLocaleString('id')}`}
    </span>
  </div>
  <div class="mb-1 flex justify-between">
    <span>Kembali</span>
    <span>
      {`Rp${transaction.cashChange.toLocaleString('id')}`}
    </span>
  </div>
{/if}
{#if !transaction.settlementPaymentMethod && !transaction.isDeposit}
  <div class="mb-1 flex justify-between">
    <span class="font-bold">Sisa Pelunasan</span>
    <span class="font-bold">
      {`-Rp${remainingAmount.toLocaleString('id')}`}
    </span>
  </div>
{/if}
{#if transaction.isDeposit}
  <div class="mb-1 flex justify-between">
    <span class="font-bold">Sisa Saldo Deposit</span>
    <span class="font-bold">
      {`-Rp${transaction.customer.balance.toLocaleString('id')}`}
    </span>
  </div>
{/if}
{#if receiptSetting?.message}
  <p style="text-align: {receiptSetting.messageTextAlign.toLowerCase()};" class="my-4">
    {receiptSetting?.message}
  </p>
{/if}