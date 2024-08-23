<script lang="ts">
  import { openModal } from 'svelte-modals';
  import type { ReceiptSetting, TransactionItem, TransactionStatus } from '../interfaces';
  import IconArchive from './icons/IconArchive.svelte';
  import IconDownload from './icons/IconDownload.svelte';
  import IconHanger from './icons/IconHanger.svelte';
  import IconIroning from './icons/IconIroning.svelte';
  import IconMoped from './icons/IconMoped.svelte';
  import IconPhoto from './icons/IconPhoto.svelte';
  import IconWashMachine from './icons/IconWashMachine.svelte';
  import ImageModal from './ImageModal.svelte';

  export let transactionItems: TransactionItem[];
  export let receiptSetting: ReceiptSetting | undefined;
  export let transactionStatus: TransactionStatus;

  const showImages = (imageUrls: string[]) => {
    openModal(ImageModal, { imageUrls });
  };
</script>

<div class="font-semibold mb-2 border-t pt-2">Layanan</div>
{#each transactionItems as item}
  <div class="mb-1 flex justify-between">
    <div class="flex flex-col">
      <span class="font-medium">
        {item.service.name}
        {#if item.service.serviceCategory && receiptSetting?.showServiceCategory}
            {` (${item.service.serviceCategory.name})`}
        {/if}
      </span>
      <span>
        {`${item.quantity} ${item.unit.name} x Rp${item.price.toLocaleString('id')}`}
      </span>
      {#if !receiptSetting?.hideItemDetails && item.itemDetails}
          {`Detail item: ${item.itemDetails}`}
      {/if}
    </div>
    <span class="font-medium">
      {`Rp${item.total.toLocaleString('id')}`}
    </span>
  </div>
  <div class="mb-2 flex items-center">
    {#if transactionStatus === 'Penjemputan'}
        <div class="w-6 h-6 flex items-center justify-center rounded-sm mr-1 bg-primary-500">
          <IconMoped />
        </div>
    {/if}
    <div class="w-6 h-6 flex items-center justify-center rounded-sm mr-1 {transactionStatus !== 'Penjemputan' ? 'bg-primary-500' : 'bg-gray-400'}">
      <IconDownload />
    </div>
    {#each item.processes as process}
      <div class="w-6 h-6 flex items-center justify-center rounded-sm mr-1 {process.processedAt ? 'bg-primary-500' : 'bg-gray-400'}">
        {#if process.process.icon === 'wash-machine'}
          <IconWashMachine />
        {/if}
        {#if process.process.icon === 'hanger-2'}
          <IconHanger />
        {/if}
        {#if process.process.icon === 'ironing'}
          <IconIroning />
        {/if}
      </div>
    {/each}
    <div class="w-6 h-6 flex items-center justify-center rounded-sm mr-1 {item.status === 'Selesai' ? 'bg-primary-500' : 'bg-gray-400'}">
      <IconArchive />
    </div>
    {#if item.images.length}
      <div class="ml-auto">
        <button type="button" class="w-8 h-8 flex items-center justify-center rounded-sm bg-primary-500 relative" on:click={() => showImages(item.images.map(image => image.image))}>
          <span class="absolute -top-1 -right-1 z-[2] bg-red-500 rounded-full px-0.5 min-w-[16px] h-4 flex items-center justify-center border border-white">
            <span class="text-white font-medium text-[10px] leading-[10px]">
              {item.images.length}
            </span>
          </span>
          <IconPhoto />
        </button>
      </div>
    {/if}
  </div>
{/each}