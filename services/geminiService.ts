
import { GoogleGenAI, Type } from "@google/genai";
import { SalonData, GeneratedContent } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const contentSchema = {
  type: Type.OBJECT,
  properties: {
    heroHeadline: {
      type: Type.STRING,
      description: "A short, catchy, and elegant headline for the salon's website hero section.",
    },
    heroTagline: {
      type: Type.STRING,
      description: "A welcoming tagline to complement the headline, inviting customers in.",
    },
    aboutUs: {
      type: Type.STRING,
      description: "An expanded, professional 'About Us' section (2-3 paragraphs) based on the user's brief description, highlighting the salon's mission and expertise.",
    },
    services: {
      type: Type.ARRAY,
      description: "A list of services, each with a name and a short, appealing description.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: {
            type: Type.STRING,
            description: "The name of the service."
          },
          description: {
            type: Type.STRING,
            description: "A 1-2 sentence compelling description of the service and its benefits."
          },
        },
        required: ['name', 'description'],
      },
    },
  },
  required: ['heroHeadline', 'heroTagline', 'aboutUs', 'services'],
};

export const generateSalonContent = async (
  salonData: SalonData
): Promise<GeneratedContent> => {
  try {
    const prompt = `
      You are a creative copywriter for luxury beauty salons. Based on the following details, generate compelling website content. The tone should be elegant, welcoming, and professional.

      Salon Name: ${salonData.name}
      Brief About Us: ${salonData.about}
      List of Services: ${salonData.services}
      Contact Info: ${salonData.contact}

      Generate the content strictly following the provided JSON schema. Ensure the service names from the list are used for the service objects.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: contentSchema,
      },
    });

    const jsonText = response.text.trim();
    const generatedContent = JSON.parse(jsonText);

    // Basic validation
    if (!generatedContent.heroHeadline || !generatedContent.services) {
        throw new Error("AI response is missing required fields.");
    }

    return generatedContent as GeneratedContent;
  } catch (error) {
    console.error("Error generating content with Gemini:", error);
    throw new Error("Failed to generate website content. Please check your input and API key.");
  }
};
