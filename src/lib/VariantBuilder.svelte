<script lang="ts">
  import { children } from "svelte/internal";

  import type { Product } from "./models";
  import { VariantGenerator } from "./models";
  import Tree from "./Tree.svelte";

  let dataText = "";
  let productData: Product;
  let variantNames: Array<string> = [];
  let data: any = null;
  const onGenerate = () => {
    console.log("=====onGenerate");
    productData = JSON.parse(dataText);
    console.log("=====productData", productData);
    let variantGenerator = new VariantGenerator();
    variantNames = variantGenerator.generate(productData);
    console.log("=====variantNames", variantNames);
    data = variantGenerator.getRoot(productData);
    console.log("=====data", data);
  };
</script>

<div class="m-16">
  <label class="block">
    <span class="text-gray-700">JSON Input</span>
    <textarea
      class="form-textarea mt-1 block w-full p-4"
      rows="3"
      placeholder="Enter JSON input"
      bind:value={dataText} />
  </label>

  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
    on:click={onGenerate}>
    Generate
  </button>

  {#if data}
    <Tree {data} />
  {/if}

  <!-- <div>
    <p>Total {variantNames.length}</p>
    <ul class="list-decimal">
      {#each variantNames as variantName}
        <li>
          <p>{variantName}</p>
        </li>
      {/each}
    </ul>
  </div> -->
</div>
