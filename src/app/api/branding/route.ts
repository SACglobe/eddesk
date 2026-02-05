import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { schoolName } = await req.json();

        if (!schoolName) {
            return NextResponse.json({ error: 'School name is required' }, { status: 400 });
        }

        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash',
            generationConfig: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: SchemaType.OBJECT,
                    properties: {
                        motto: { type: SchemaType.STRING },
                        mission: { type: SchemaType.STRING },
                        colors: {
                            type: SchemaType.ARRAY,
                            items: { type: SchemaType.STRING }
                        }
                    },
                    required: ['motto', 'mission', 'colors']
                }
            }
        });

        const result = await model.generateContent(
            `Suggest a creative school motto, a short mission statement (max 2 sentences), and a color palette (3 primary colors in hex) for a school named "${schoolName}".`
        );

        const text = result.response.text();
        const response = JSON.parse(text);
        return NextResponse.json(response);
    } catch (error) {
        console.error('Gemini API Error:', error);
        return NextResponse.json({ error: 'Failed to generate branding' }, { status: 500 });
    }
}
