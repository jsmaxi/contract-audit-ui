interface ExampleContract {
  name: string;
  code: string;
}

interface ContractsByLanguage {
  [key: string]: ExampleContract[];
}

export const exampleContracts: ContractsByLanguage = {
  Solidity: [
    {
      name: "Empty Contract",
      code: `Contract {}`,
    },
    {
      name: "Simple Contract",
      code: `// SPDX-License-Identifier: MIT
            pragma solidity ^0.8.0;
            contract BasicNFT {
        }`,
    },
  ],

  Test: [
    {
      name: "Simple Test",
      code: `{ Test1 }`,
    },
    {
      name: "Basic Test",
      code: `TEST2`,
    },
  ],
};
