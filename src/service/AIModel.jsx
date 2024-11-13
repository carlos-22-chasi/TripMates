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
          `
          Generate Travel Plan for Location: New York, NY, USA, for 1 
          days for 2 People with a Moderate budget, give me Hotels options
          list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, 
          descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo
          Coordinates, ticket Pricing, Time travel each of the location for 3 days with each 
          day plan with best time to visit in JSON format
          `
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
                "hotelImageUrl": "https://www.thejanenyc.com/wp-content/uploads/2019/06/The-Jane-Hotel-Rooms-2.jpg",
                "geoCoordinates": "40.7373,-74.0063",
                "rating": 4.5,
                "description": "A charming and historic hotel in the West Village with a unique nautical theme. Offers affordable and comfortable rooms, perfect for budget-conscious travelers."
              },
              {
                "hotelName": "The Pod 51",
                "hotelAddress": "230 E 51st St, New York, NY 10022",
                "price": "$120-$200",
                "hotelImageUrl": "https://images.trvl-media.com/media/hotels/1000000/900000/894000/893500/893542/893542_13_b.jpg",
                "geoCoordinates": "40.7584,-73.9738",
                "rating": 4.0,
                "description": "A modern and stylish hotel near Midtown Manhattan. Offers compact but comfortable rooms with sleek design and convenient amenities."
              }
            ],
            "itinerary": [
              {
                "day": 1,
                "plan": [
                  {
                    "placeName": "Central Park",
                    "placeDetails": "A vast urban park in the heart of Manhattan, offering a tranquil escape from the city hustle.",
                    "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Central_Park_2017-03-19.jpg/1280px-Central_Park_2017-03-19.jpg",
                    "geoCoordinates": "40.7829, -73.9654",
                    "ticketPricing": "Free",
                    "rating": 4.8,
                    "timeTravel": "3-4 hours",
                    "bestTime": "Morning to Evening",
                  }
                ],
              }
            ]
          }
          `
        }
      ]
    },
  ],
})
