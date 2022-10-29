const setToken = (accessToken, refreshToken) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

const getToken = () => {
    return {
        accessToken :localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken')
    }
}

const verifyToken = () => {
    const tokens = getToken();

}

export {
    setToken,
    getToken,
    verifyToken
}
