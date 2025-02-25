import { useState } from 'react';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAsk = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/ask', {
        params: { url, question },
      });
      setAnswer(response.data.answer);
    } catch (error) {
      setAnswer('Error fetching data. Please check your backend.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>AI-Powered Web Assistant</h2>
      <input
        type="text"
        placeholder="Enter website URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <input
        type="text"
        placeholder="Ask your question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <button
        onClick={handleAsk}
        style={{ padding: '10px 20px', cursor: 'pointer' }}
      >
        Ask AI
      </button>
      {answer && (
        <div
          style={{ marginTop: '20px', padding: '10px', background: '#f1f1f1' }}
        >
          <strong>Answer:</strong> {answer}
        </div>
      )}
    </div>
  );
}

export default App;
