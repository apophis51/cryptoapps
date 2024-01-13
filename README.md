This is a repository is a Firing Range created test out Solidity Blockchain Technologies and ideas. It is not meant to be a full-fledged project, but rather a place to test out new ideas and technologies. 

Some of the Insights Gained from here will be used on our live deployment at [https://malcmind.com](https://github.com/apophis51/next-js-Portfolio)



## Last Updates: 

- Note to self: some of these updates where from a while ago, and I am not sure if they are still relevant. I will need to go through and clean up this file.

### Updates:

- We added experimental server actions to our NextConfig File (which is no longer needed If we upgrade this Nextjs Project. The current versions stabalized serer actions)

- it looks like `app/MetaMask2` and `app/MetaMask` are no longer needed. I will need to go through and clean up this file. It looks like this was previous attempts to develop this code before I deployed it to the live site. On the live site the files are `CryptoPredictions.js` and `GuessTheNumberGame.js`

- it looks like `Gambling3.sol` might be the source of my live abi smart contract file

- it looks like `deployGamblingOptimism3.js` created my ABI file

-it looks like `/home/apophis51/cryptoapps/contracts/Gambling3.sol` is our current good ABI file due to a code line match with my deployed code


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
