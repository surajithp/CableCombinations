<script lang="ts">
  import type { Product } from "./models";
  import { VariantGenerator } from "./models";

  let dataText = "";
  let productData: Product;
  let variantNames: Array<string> = [];
  const onGenerate = () => {
    productData = JSON.parse(dataText);
    let variantGenerator = new VariantGenerator();
    variantNames = variantGenerator.generate(productData);
  };
</script>

<div class="m-16">
  <label class="block">
    <span class="text-gray-700">JSON Input</span>
    <textarea
      class="form-textarea mt-1 block w-full p-4"
      rows="3"
      placeholder="Enter JSON input"
      bind:value={dataText}
    />
  </label>

  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
    on:click={onGenerate}
  >
    Generate
  </button>

  <div>
    <p>Total {variantNames.length}</p>
    <ul class="list-decimal">
      {#each variantNames as variantName}
        <li>
          <p>{variantName}</p>
        </li>
      {/each}
    </ul>
  </div>
</div>
