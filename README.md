# Based Bonk Website with AI Chat Bot

This is a static website for Based Bonk with an integrated AI chat bot powered by OpenAI.

## Features

- Responsive design with modern UI
- AI chat bot using OpenAI GPT-3.5-turbo
- Tokenomics section with contract information
- Social media links and exchange listings

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory and add your OpenAI API key:
```
OPENAI_API_KEY=your_openai_api_key_here
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This site is configured for Vercel deployment:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your OpenAI API key as an environment variable in Vercel
4. Deploy!

## AI Chat Bot

The AI chat bot is located between the About and Tokenomics sections. It features:

- Real-time conversation with OpenAI GPT-3.5-turbo
- Message history
- Loading states
- Error handling
- Responsive design matching the site's theme

## API Endpoint

The chat bot uses the `/api/chat` endpoint which:
- Accepts POST requests with message history
- Integrates with OpenAI API
- Handles errors gracefully
- Returns AI responses

## Styling

The chat bot uses the same styling as the tokenomics section:
- Blue background with decorative elements
- White rounded borders
- Consistent typography and spacing
- Responsive design for all screen sizes

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Vercel Serverless Functions
- OpenAI API 