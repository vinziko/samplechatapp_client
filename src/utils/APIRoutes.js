const host = 'http://localhost:5000'

const registerRoute = `${host}/api/auth/register`
const loginRoute = `${host}/api/auth/login`
const setAvatarsRoute = `${host}/api/auth/setAvatar`
const allUsersRoute = `${host}/api/auth/allusers`
const sendMessageRoute =`${host}/api/messages/addmsg`
const getAllMessagesRoute = `${host}/api/messages/getmsg`

export {registerRoute,loginRoute,setAvatarsRoute,
        allUsersRoute,sendMessageRoute,getAllMessagesRoute,host}


