export const SelectTravelesList = [
  {
    id:1,
    title:"Solo",
    description:"A sole traveler exploring",
    icon:"✈️",
    people:'1 Person',
  },
  {
    id:2,
    title:"Couple",
    description:"Two travelers making memories",
    icon:"👥",
    people:'2 People',
  },
  {
    id:3,
    title:"Family",
    description:"Family Adventures",
    icon:"🏡",
    people:'3 to 5 People',
  },
  {
    id:4,
    title:"Party",
    description:"Let the Adventures begin!",
    icon:"🍾",
    people:'6+ People',
  },
]

export const SelectBudgetOptions=[
  {
    id:1,
    title:"Cheap",
    description:"Keeping costs low",
    icon:"💵",
    range: "$50-$100 per person per day"
  },
  {
    id:2,
    title:"Moderate",
    description:"Staying Conscious",
    icon:"💰",
    range: "100-$400 per person per day"

  },
  {
    id:3,
    title:"Luxary",
    description:"Ballin' Out",
    icon:"💲",
    range: "$400+ per person per day"
  },
]

export const AI_PROMPT =  `
            Generate a travel plan in JSON format for the following details:
            
            Location: {location}
            Dates: {startDate} to {endDate}
            Group Size: {numOfPeople}
            Budget: {budget}
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