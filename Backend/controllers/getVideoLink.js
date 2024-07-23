import axios from "axios";
export const getVideoLink = async (query) => {
  try {
    query+=" Striver";
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: query,
          key: process.env.YOUTUBE_API_KEY,
          type: "video",
        },
      }
    );
    let url = "https://www.youtube.com/watch?v=";
    url += response.data.items[0].id.videoId;
    return url;
  } catch (error) {
    //console.log(error);
    return "";
  }
};
