<script>
  import { Modals, closeModal } from 'svelte-modals'
</script>

<Modals>
  <div
    slot="backdrop"
    class="backdrop"
    on:click={closeModal}
    role="presentation"
  />
</Modals>

<style>
  .backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0,0,0,0.50);
    z-index: 999;
  }
</style>
