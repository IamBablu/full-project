import { StreamChat } from "stream-chat";
import "dotenv/config"

const apiKey = process.env.STEAM_API_KEY
const apiSecret = process.env.STEAM_API_SECRET

if(!apiKey || !apiSecret){
    console.error("Stream api key or secret is missing");

}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUsers([userData]);
        return userData
    } catch (error) {
        console.error("Error upserting stream user: " ,error)
    }
}

export const generateStreamToken = (userId) => {
    try {
        const userIdStr = userId.toString()
        return streamClient.createToken(userIdStr);
    } catch (error) {
        console.error("Error generate string token: ", error)
    }
};