<script>
  import { Modals } from 'svelte-modals'
</script>

<Modals>
  {#snippet backdrop({ close })}
    <div class="backdrop" role="presentation" onclick={() => close()}></div>
  {/snippet}
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
