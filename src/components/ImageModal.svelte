<script lang="ts">
  interface Props {
    isOpen: boolean;
    close(): void;
    imageUrls: string[];
  }

  const {
    isOpen,
    close,
    imageUrls
  }: Props = $props()

  let index = $state(0);

  const prevImage = () => {
    if (index) {
      index -= 1;
    } else {
      index = imageUrls.length - 1;
    }
  };

  const nextImage = () => {
    if (index < imageUrls.length - 1) {
      index += 1;
    } else {
      index = 0;
    }
  };
</script>

{#if isOpen}
  <div role="dialog" class="modal">
    <div class="contents relative">
      <div class="p-4 border-b relative">
        <h2 class="text-center font-bold text-xl">Foto Laundryan</h2>
        <button
          type="button"
          class="font-bold text-xl absolute top-2 right-2 p-2"
          onclick={close}
        >
          x
      </button>
      </div>
      {#if imageUrls.length > 1}
        <button type="button" class="absolute top-1/2 left-4 z-[2]" onclick={prevImage}>
          <svg  xmlns="http://www.w3.org/2000/svg"  width="32"  height="32"  viewBox="0 0 24 24"  fill="currentColor"  class="text-primary-500"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2a10 10 0 0 1 .324 19.995l-.324 .005l-.324 -.005a10 10 0 0 1 .324 -19.995zm.707 5.293a1 1 0 0 0 -1.414 0l-4 4a1.048 1.048 0 0 0 -.083 .094l-.064 .092l-.052 .098l-.044 .11l-.03 .112l-.017 .126l-.003 .075l.004 .09l.007 .058l.025 .118l.035 .105l.054 .113l.043 .07l.071 .095l.054 .058l4 4l.094 .083a1 1 0 0 0 1.32 -1.497l-2.292 -2.293h5.585l.117 -.007a1 1 0 0 0 -.117 -1.993h-5.586l2.293 -2.293l.083 -.094a1 1 0 0 0 -.083 -1.32z" /></svg>
        </button>
        <button type="button" class="absolute top-1/2 right-4 z-[2]" onclick={nextImage}>
          <svg  xmlns="http://www.w3.org/2000/svg"  width="32"  height="32"  viewBox="0 0 24 24"  fill="currentColor"  class="text-primary-500"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2l.324 .005a10 10 0 1 1 -.648 0l.324 -.005zm.613 5.21a1 1 0 0 0 -1.32 1.497l2.291 2.293h-5.584l-.117 .007a1 1 0 0 0 .117 1.993h5.584l-2.291 2.293l-.083 .094a1 1 0 0 0 1.497 1.32l4 -4l.073 -.082l.064 -.089l.062 -.113l.044 -.11l.03 -.112l.017 -.126l.003 -.075l-.007 -.118l-.029 -.148l-.035 -.105l-.054 -.113l-.071 -.111a1.008 1.008 0 0 0 -.097 -.112l-4 -4z" /></svg>
        </button>
      {/if}
      <div class="p-4 overflow-auto max-h-[80vh] relative">
        <img src={imageUrls[index]} alt="Foto Laundryan" />
      </div>
    </div>
  </div>
{/if}

<style>
  .modal {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;

    /* allow click-through to backdrop */
    pointer-events: none;
  }

  .contents {
    min-width: 240px;
    border-radius: 4px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: auto;
  }
</style>