import { jsonMetadata } from "./Demo/jsonMetadata";
import { semanticValidator } from "./validator/2-semanticValidator";

async function test() {
  const result = semanticValidator.validate(jsonMetadata);
  console.log("result====", result);
}

test();