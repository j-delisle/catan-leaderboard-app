import { fail, redirect } from "@sveltejs/kit"
/** @type {import('./$types').Actions} */

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData()
        console.log(formData)

        const email = formData.get('email')
        const p1 = formData.get('password1')
        const p2 = formData.get('password2')

        if (p1 != p2){
            return fail(400, {
                error: true,
                message: 'Passwords do not match',
                email
            })
        }
        return {
            success: true
        }
    }
}