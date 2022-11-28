# Development

## Initialization:
### With Docker (Recommended):
- git clone https://github.com/SUFriends/SUFriends
- docker yapsak sarar 

### Local:
#### Install: 
- npm (https://www.npmjs.com/)
- node.js (https://nodejs.org/en/)
- truffle suite (https://trufflesuite.com/)

#### Setup Steps:
1. git clone https://github.com/SUFriends/SUFriends
2. npm install --save-dev ganache 
3. npx ganache --deterministic
3. truffle migrate --network development
4. truffle exec --network development ./scripts/index.js

This is a starter template for [Learn Next.js](https://nextjs.org/learn).