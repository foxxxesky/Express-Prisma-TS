import jwt from 'jsonwebtoken'

const getToken = (userId: string) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    })
}

export default getToken