# Weather App Frontend 🌦️  [![Netlify Status](https://api.netlify.com/api/v1/badges/04c8f089-0de1-4778-b889-cdfe93b5aa60/deploy-status)](https://app.netlify.com/sites/weathergetterapp/deploys)
A modern weather application built with React and Vite, utilizing real-time APIs for weather data and location autocomplete.

## How to Use the App?

**Search for Weather in a City**
- Use the search bar to type in a city name. Suggestions will appear as you type, powered by Google’s Places API.
- Select a city from the suggestions or press Enter to fetch the weather data.

**Save Favorite Cities**
- Click on the "Favorite" button to save a city. Saved cities will appear in the "Favorite Cities" dropdown.
- To unfavorite a city, click the "Unfavorite" button.

**View Weather Details**

Once you select or search for a location, the app will display:  
- Current temperature, humidity, wind speed/direction, and dew point.
- Sunrise and sunset times.
- A weather icon based on the current conditions, with nighttime variations.

**Additional Features**
* **Animated Background**: A dynamic, calming animated background featuring calming "firefly" orbs.  
* **Responsive Design**: Fully responsive for mobile, tablet, and desktop views.  
* **User-Friendly Interface**: Intuitive UI for an enjoyable user experience.

### Technologies Used
**Frontend**
- **React**: Core framework for building the app's interface.  
- **Vite**: Blazing fast development environment for modern web apps.  
- **Tailwind CSS**: Provides a clean and responsive design.
- **JavaScript**: For core logic and API integrations.

**APIs**

- **Tomorrow.io**: Provides detailed and real-time weather data.  
- **Google Places API**: Powers the autocomplete functionality for location searches.  
- **Sunrise-Sunset API**: Fetches sunrise and sunset times for accurate weather data.

### How to Run Locally

1. Clone the repository:  
   `git clone https://github.com/davidxv15/weather-frontend.git`  
   `cd weather-frontend`
2. Install dependencies:  
   `npm install`
3. Environment Setup:  
   Create a .env file in the project root with the following variables:  
   `REACT_APP_GOOGLE_PLACES_API_KEY=your_google_places_api_key` 
   `REACT_APP_TOMORROW_API_KEY=your_tomorrow_api_key`
4. Start the app:  
 `npm start`
5. Open the app in your browser:  
`http://localhost:3003`

### Future Features

- **Location-Based Updates**: Automatically detect the user’s location for quick weather updates.  
- **Theme Customization**: Allow users to toggle between light and dark themes.  
- **Music**: Addition of original background lo-fi music on a randomized playlist.  
- **Performance Optimization**: Optimize for faster loads and smoother animations.  

### Deployment
**Netlify**
**Heroku**
