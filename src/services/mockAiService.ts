export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const PLANT_KNOWLEDGE: Record<string, string[]> = {
  water: [
    "Overwatering is the #1 cause of plant death. Make sure the top 2 inches of soil are dry before watering again.",
    "If leaves are yellowing and limp, it might be overwatered. If they're crispy and brown, it might need more water.",
    "Try bottom-watering your plants! Set the pot in a bowl of water for 30 minutes so it drinks exactly what it needs."
  ],
  light: [
    "Most tropical plants love bright, indirect light. Direct sun can scorch their leaves.",
    "If your plant is stretching or getting 'leggy', it's reaching for more light. Consider moving it closer to a window.",
    "Low light doesn't mean no light! Even snake plants and ZZ plants need some natural light to thrive."
  ],
  monstera: [
    "Monsteras love to climb! Providing a moss pole will help them grow larger leaves with more fenestrations (holes).",
    "Wipe down your Monstera's leaves with a damp cloth every few weeks so it can photosynthesize efficiently.",
    "If your Monstera isn't getting splits in its leaves, it probably needs more bright, indirect light."
  ],
  pothos: [
    "Pothos are incredibly resilient! They can tolerate low light, but their variegation (the white/yellow patterns) will be more prominent in brighter light.",
    "You can easily grow Pothos cuttings in water. Just snip below a node and pop it in a glass!",
    "If your Pothos is looking spindly, give it a trim. It encourages fuller, bushier growth."
  ],
  yellow: [
    "Yellow leaves often mean overwatering, but can also indicate poor drainage or nutrient deficiency. Check the soil moisture first!",
    "Sometimes older leaves turn yellow and drop off naturally as the plant grows. Don't panic if it's just the bottom-most leaves."
  ],
  default: [
    "That's a great question! Every plant is unique. The key to plant care is observation—pay attention to the leaves and soil.",
    "I'd recommend checking the soil moisture and adjusting your lighting. Most plant issues stem from one of those two things.",
    "Nature takes its time. Be patient with your green friends, and they'll reward you with beautiful new growth!",
    "Let me think about that... In the meantime, remember to aerate your soil occasionally with a chopstick to help the roots breathe."
  ]
};

const getResponseForQuery = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  let selectedCategory = 'default';

  for (const key in PLANT_KNOWLEDGE) {
    if (lowerQuery.includes(key)) {
      selectedCategory = key;
      break;
    }
  }

  const options = PLANT_KNOWLEDGE[selectedCategory];
  return options[Math.floor(Math.random() * options.length)];
};

export const simulateAIStream = (
  query: string, 
  onChunk: (chunk: string) => void,
  onComplete: () => void
) => {
  const fullResponse = getResponseForQuery(query);
  const words = fullResponse.split(' ');
  let i = 0;

  const interval = setInterval(() => {
    if (i < words.length) {
      onChunk(words[i] + ' ');
      i++;
    } else {
      clearInterval(interval);
      onComplete();
    }
  }, 100); // 100ms per word simulates streaming
};
