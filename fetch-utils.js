const SUPABASE_URL = 'https://dhnqrpqiduiavjxubliy.supabase.co';

const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTUwNDkzMiwiZXhwIjoxOTU1MDgwOTMyfQ.qkjn4G9iVR8fq07h5llNRqFChEHuWRxt4DhPuuCdM8I';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function fetchCity() {
    const response = await client
        .from('cities')
        .select()
        .match({ user_id: client.auth.user().id, })
        .single();
    
    return checkError(response); 
}

export async function createDefaultCity() {
    const response = await client
        .from('cities')
        .insert([{
            name: 'Eugene',
            waterfront_id: 1,
            skyline_id: 1,
            castle_id: 1,
            slogans: []
        }])
        .single();
    
    return checkError(response);
}

export async function updateName(newName) {
    const response = await client
        .from('cities')
        .update({ name: newName })
        .match({ user_id: client.auth.user().id })
        .single();
    
    return checkError(response);
}

export async function updateWaterfront(newWaterfront) {
    const response = await client
        .from('cities')
        .update({ waterfront_id: newWaterfront })
        .match({ user_id: client.auth.user().id })
        .single();
    
    return checkError(response);
}

export async function updateSkyline(newSkyline) {
    const response = await client
        .from('cities')
        .update({ skyline_id: newSkyline })
        .match({ user_id: client.auth.user().id })
        .single();
    
    return checkError(response);
}

export async function updateCastle(newCastle) {
    const response = await client
        .from('cities')
        .update({ castle_id: newCastle })
        .match({ user_id: client.auth.user().id })
        .single();
    
    return checkError(response);
}

export async function getUser() {
    return client.auth.session();
}


export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./city');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '/';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}

