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
    title:"A Couple",
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
    description:"Staying Conscious",
    icon:"💵",
    range: "$50-$100 per person per day"
  },
  {
    id:2,
    title:"Moderate",
    description:"Keeping costs on average side",
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

export const AI_PROMPT = `Generate Travel Plan for Location: {location}, for {numOfDays} 
days for {numOfPeople} with a {budget} budget, give me Hotels options
list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, 
descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo
Coordinates, ticket Pricing, Time travel each of the location for {numOfDays} days with each 
day plan with best time to visit in JSON format`