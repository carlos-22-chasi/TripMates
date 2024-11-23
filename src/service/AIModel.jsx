import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text:
            `Generate a travel plan in JSON format for the following details:

            Location: New York, NY, USA
            Dates: 2024-11-28 to 2024-11-30
            Group Size: 3 to 5 people
            Budget: $50-$100 per person per day
            The JSON object should include:

            Hotel Options List:
              hotelName: The name of the hotel.
              hotelAddress: The address of the hotel.
              rating: Hotel rating out of 5.
              price: price of Hotel room per day.
              description: A brief description of the hotel.

            Itinerary List:
              At least 3 places to visit per day.
              Each entry should include:
              placeName: The name of the place.
              placeDetails: A brief description of the place.
              ticketPricing: Average Ticket price (if applicable) or note if it's free.
              timeToSpend: Suggested time to spend at the location.
              Include each day's itinerary with the best time to visit the places.

            Return the JSON object.`
        }
      ]
    },
    {
      role: "model",
      parts: [
        {
          text:
            `
          {
            "hotels": [
              {
                "hotelName": "The Jane Hotel",
                "hotelAddress": "113 Jane St, New York, NY 10014",
                "price": "$150-$250",
                "rating": 4.5,
                "description": "A charming and historic hotel in the West Village with a unique nautical theme. Offers affordable and comfortable rooms, perfect for budget-conscious travelers."
              },
              {
                "hotelName": "The Pod 51",
                "hotelAddress": "230 E 51st St, New York, NY 10022",
                "price": "$120-$200",
                "rating": 4.0,
                "description": "A modern and stylish hotel near Midtown Manhattan. Offers compact but comfortable rooms with sleek design and convenient amenities."
              }
            ],
            "itinerary": [
              {
                "date": "2024-11-28",
                "plan": [
                  {
                    "placeName": "Central Park",
                    "placeDetails": "A vast urban park in the heart of Manhattan, offering a tranquil escape from the city hustle.",
                    "ticketPricing": "Free",
                    "rating": 4.8,
                    "timeTravel": "3-4 hours",
                    "bestTime": "Morning to Evening",
                  },
                  {
                    "placeName": "Grand Central Terminal",
                    "placeDetails": "Architectural marvel; explore the station's grandeur.",
                    "ticketPricing": "Free",
                    "rating": 4.5, 
                    "timeTravel": "1-2 hours",
                    "bestTime": "Morning", 
                  },
                  {
                    "placeName": "Metropolitan Museum of Art",
                    "placeDetails": "World-renowned art museum.",
                    "ticketPricing": "Check Met Museum website",
                    "rating": 4.5, 
                    "timeTravel": "3-4 hours"
                    "bestTime": "Afternoon", 

                  },
                ],
              },
              {
                "date": "2024-11-29",
                "plan": [
                  {
                    "placeName": "Statue of Liberty & Ellis Island,
                    "placeDetails": "Iconic landmarks; ferry required",
                    "ticketPricing": "$29",
                    "rating": 4.8,
                    "timeTravel": "2-3 hours",
                    "bestTime": "Morning to Evening",
                  }
                  {
                    "placeName": "One World Observatory",
                    "placeDetails": "Stunning views of NYC from One World Trade Center.",
                    "ticketPricing": "$47",
                    "rating": 4.5, 
                    "timeTravel": "1-2 hours",
                    "bestTime": "Afternoon",
                  },
                  {
                    "placeName": "Financial District",
                    "placeDetails": "Explore Wall Street and the Charging Bull.",
                    "ticketPricing": "Free (except for any specific building tours)",
                    "rating": 4.5, 
                    "timeTravel": "2-3 hours",
                    "bestTime": "Afternoon",
                  },
                ],
              },
              {
                "date": "2024-11-30",
                "plan": [
                  {
                    "placeName": "Brooklyn Bridge",
                    "placeDetails": "Walk or bike across this iconic bridge.",
                    "ticketPricing": "Free",
                    "rating": 4.5,
                    "timeTravel": "1-2 hours",
                    "bestTime": "Morning",
                  },
                  {
                    "placeName": "Brooklyn Bridge Park",
                    "ticketPricing": "Free",
                    "rating": 4.5,
                    "timeTravel": "1-2 hours",
                    "bestTime": "Late Morning/Afternoon",
                  },
                  {
                    "placeName": "Explore DUMBO",
                    "placeDetails": "Trendy neighborhood with art galleries and shops",
                    "ticketPricing": "Varies - Shopping & Food",
                    "rating": 4.5,
                    "timeTravel": "1-2 hours",
                    "bestTime": "Afternoon",
                  }
                ]
              },
            ]
          }
          `
        }
      ]
    },
  ],
})
