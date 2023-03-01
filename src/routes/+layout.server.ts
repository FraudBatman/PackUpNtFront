import type { LayoutServerLoad } from './$types'
import { getServerSession } from '@supabase/auth-helpers-sveltekit'
import { OAuthApp, Octokit } from 'octokit'
import { PUBLIC_GITHUB_CLIENT_ID } from "$env/static/public"
import { PRIVATE_GITHUB_CLIENT_SECRET } from "$env/static/private"

const ghApp = new OAuthApp({
    clientType: "oauth-app",
    clientId: PUBLIC_GITHUB_CLIENT_ID,
    clientSecret: PRIVATE_GITHUB_CLIENT_SECRET
})

ghApp.on("token", async ({ token, octokit }) => {
    const { data } = await octokit.request("GET /user");
    console.log(`Token retrieved for ${data.login}`);
});

export const load: LayoutServerLoad = async (event) => {
    return {
        session: await getServerSession(event),
    }
}