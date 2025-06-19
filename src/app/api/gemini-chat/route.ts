// app/api/gemini-chat/route.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Gemini AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { message, image, history } = await request.json();

    // Use the latest Gemini models
    const model = genAI.getGenerativeModel({ 
      model: image ? "gemini-1.5-flash" : "gemini-1.5-flash" 
    });

    // Prepare the prompt with relationship context
    const relationshipContext = `You are an AI Love Advisor - a compassionate, wise, and supportive relationship counselor. 
    Your role is to provide thoughtful, empathetic advice about love, dating, and relationships. 
    Always be positive, encouraging, and non-judgmental. Use emojis occasionally to add warmth to your responses.
    If analyzing images of conversations or dating profiles, provide constructive insights.`;

    let prompt = `${relationshipContext}\n\nUser message: ${message}`;

    // Format conversation history for context
    if (history && history.length > 1) {
      const recentHistory = history.slice(-4); // Last 4 messages for context
      const historyText = recentHistory
        .map((msg: any) => `${msg.role}: ${msg.content}`)
        .join('\n');
      prompt = `${relationshipContext}\n\nRecent conversation:\n${historyText}\n\nUser message: ${message}`;
    }

    let result;
    
    if (image) {
      // Process image with text
      const imageParts = [
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: image.split(',')[1] // Remove data:image/jpeg;base64, prefix
          }
        }
      ];
      
      result = await model.generateContent([prompt, ...imageParts]);
    } else {
      // Process text only
      result = await model.generateContent(prompt);
    }

    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again.' },
      { status: 500 }
    );
  }
}