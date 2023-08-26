import bcrypt from 'bcrypt'

export const salt = bcrypt.genSaltSync(10)
export const encrypt = (password: string) => bcrypt.hashSync(password, salt)
export const decrypt = (password: string, hash: string) => bcrypt.compareSync(password, hash)
