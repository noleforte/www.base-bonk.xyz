module.exports = async (req, res) => {
  try {
    // Добавляем CORS заголовки
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Обрабатываем preflight запросы
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

  const { messages } = req.body;
  console.log('Received messages:', messages);
  console.log('API Key exists:', !!process.env.OPENAI_API_KEY);

  // Проверяем наличие API ключа
  if (!process.env.OPENAI_API_KEY) {
    console.error('OpenAI API key is missing');
    return res.status(200).json({ 
      reply: "Sorry, the AI service is not properly configured. Please contact support." 
    });
  }

  // Проверяем валидность входящих данных
  if (!messages || !Array.isArray(messages)) {
    console.error('Invalid messages format:', messages);
    return res.status(200).json({ 
      reply: "Sorry, there was an error with the message format. Please try again." 
    });
  }

  try {
    const requestBody = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are KUD, a friendly and helpful assistant.' },
        ...(messages || []).map(msg => ({
          role: msg.isUser ? 'user' : 'assistant',
          content: msg.message
        }))
      ]
    };
    console.log('Request body:', JSON.stringify(requestBody, null, 2));

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(requestBody),
      signal: AbortSignal.timeout(30000), // 30 секунд таймаут
    });

    console.log('OpenAI response status:', openaiRes.status);
    const data = await openaiRes.json();
    console.log('OpenAI response data:', JSON.stringify(data, null, 2));

    // Проверяем ошибки OpenAI
    if (openaiRes.status !== 200) {
      if (openaiRes.status === 429) {
        return res.status(200).json({ 
          reply: "Sorry, I'm a bit busy right now! Please try again later or check your OpenAI quota." 
        });
      } else if (data.error) {
        return res.status(200).json({ 
          reply: `Sorry, there was an error: ${data.error.message || 'Unknown error'}` 
        });
      }
    }

    const reply = data.choices?.[0]?.message?.content || 'No answer';
    console.log('Final reply:', reply);

    res.status(200).json({ reply });
  } catch (error) {
    console.error('OpenAI request failed:', error);
    res.status(200).json({ 
      reply: "Sorry, I'm having trouble connecting right now. Please try again later!" 
    });
  }
  } catch (outerError) {
    console.error('Function error:', outerError);
    res.status(500).json({ 
      reply: "Sorry, there was an internal server error. Please try again later!" 
    });
  }
} 