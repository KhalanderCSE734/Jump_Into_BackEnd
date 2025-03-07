const sessionIdToSUserMap = new Map();

const setUser = (id,user)=>{
    sessionIdToSUserMap.set(id,user);
}

const getUser = (id)=>{
    console.log(sessionIdToSUserMap);
    return sessionIdToSUserMap.get(id);
}

module.exports = {
    setUser,
    getUser
}