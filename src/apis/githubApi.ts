import { StatusCode } from "./utils";

const getUserUrl = "https://api.github.com/users/"

interface GetUserResponse {
    success: boolean,
    userInfo?: UserInfo
}

interface UserInfo {
    login: string,
    avatar_url: string,
    name: string | null,
    company: string,
    location: string | null,
    blog: string,
    twitter_username: string | null,
    followers: number,
    following: number,
    bio: string | null,
    public_repos: number,
    created_at: string
}

export const fetchUserInfo = async (username: string): Promise<GetUserResponse> => {
    try {
        const fetchResult = await fetch(getUserUrl + username);
        if (fetchResult.status == StatusCode.NOT_FOUND) {
            throw Error('User not found');
        } else if (fetchResult.status != StatusCode.OK) {
            throw Error('something went wrong');
        }
        const userInfo: UserInfo = await fetchResult.json();

        return { success: true, userInfo }
    } catch(error) {
        return { success: false }
    }
}