import type { LayoutServerLoad } from './$types'
import { getServerSession } from '@supabase/auth-helpers-sveltekit'

import { PUBLIC_GITHUB_CLIENT_ID } from "$env/static/public"
import { PRIVATE_GITHUB_CLIENT_SECRET } from "$env/static/private"


export const load: LayoutServerLoad = async (event) => {
    return {
        session: await getServerSession(event),
    }
}