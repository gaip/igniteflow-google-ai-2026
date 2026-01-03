
import { generateBio } from './portfolioService.ts';

const testBioGeneration = async () => {
  console.log('Testing AI Bio Generation...');
  try {
    process.env.API_KEY = process.env.GEMINI_API_KEY;
    const bio = await generateBio('- 10 years of experience with AI and machine learning\n- Specializes in natural language processing\n- Enjoys long walks on the beach');
    console.log('Generated Bio:', bio);
  } catch (error) {
    console.error('Bio generation failed:', error);
  }
};

testBioGeneration();
