# Smart Contract Audit AI Agent

![Logo](./logo.svg)

AI-Powered Smart Contract Auditing Platform. Built for ETHGlobal Agentic Hackaton. Smart Guard AI leverages advanced AI agents system to analyze smart contracts across various blockchain platforms, providing comprehensive security audits through an intuitive web interface.

[Web Application](https://contract-audit-ui-production.up.railway.app/) | [View Demo](/) | [Agent Code](https://github.com/jsmaxi/contract-audit-agent) | [UI Code](https://github.com/jsmaxi/contract-audit-ui)

## Getting Started

```console
cd audit-ui
npm install
npm run dev
```

Environment variables:

EMAIL_USER

EMAIL_APP_PASSWORD

To send email reports via Gmail, add these environment variables. Also, enable 2FA and create a new App Password for use.

SERVER_URL

To call web server, set this environment variable.

## Problem & Solution

Smart contract vulnerabilities can lead to catastrophic losses of user funds. While traditional auditing tools exist, they often focus solely on Solidity and have significant limitations. Smart Guard AI takes a novel approach using a multi-agent AI system to provide more comprehensive and adaptable security analysis.

## Key Features

### Multi-Platform Support
- Multiple smart contract languages supported:
  - Arbitrum Stylus
  - Starknet Cairo
  - Flow Cadence
  - Solidity

### Flexible Input Methods
- Load contracts directly from GitHub URLs
- Upload from local filesystem
- Paste code directly
- Browse pre-defined contract examples

### Advanced AI Analysis
- Pure AI approach using chain of LLM agents
- Specialized security agents for different vulnerability types
- No reliance on traditional static analysis tools
- Custom prompts and context for each agent type

### User Experience
- Intuitive web interface with customization options
- 24/7 AI assistant support
- Comprehensive audit reports with export options (PDF, JSON, Email)
- Historical audit retrieval via Nillion secret vault

## Technology Stack

### Backend
- **Core**: Rust, Cargo
- **Framework**: Actix Web
- **Deployment**: Shuttle Dev
- **Storage**: Nillion Secret Vault

### Frontend
- **Framework**: Next.js
- **Styling**: TailwindCSS
- **Deployment**: Railway

### AI System Architecture
- Multi-Agent Orchestration
- Specialized Security Agents:
  - Code Fixing
  - Format and Deduplication
  - Reentrancy Analysis, Access Control, Logic Verification, other
- Flexible Agent Client with multi-model support

## Future Possibilities
- Multi-contract analysis capabilities
- Enhanced domain-specific AI training
- Custom AI model development
- Block explorer and IDE integrations
- Decentralized agent backend implementation

## What Makes Us Different
While the smart contract security space has existing AI solutions, we believe in the power of diverse approaches. This platform stands out through:
1. Multi-language support beyond just Solidity
2. Pure AI approach without traditional static analysis
3. Decentralized report storage via Nillion
4. Customizable analysis parameters
5. User-centric design focused on accessibility

## Team
JsMaxi
[GitHub](https://github.com/jsmaxi) | [X](https://x.com/jsmaxi666) | [LinkedIn](https://www.linkedin.com/in/j-s-4b489a32b/)

*ETHGlobal Agentic Hackathon 2025. May your smart contracts be safer than ever!*

👉 https://contract-audit-ui-production.up.railway.app/
