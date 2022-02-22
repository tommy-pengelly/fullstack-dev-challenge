import axios from 'axios'
import { API_BASE_URI } from '../API_BASE_URI'

export default async function GET(extension: string) {
    return await axios
        .get(`${API_BASE_URI}${extension}`)
        .then((result) => {
            return result
        })
        .catch((error) => {
            console.log('err', error)
            return error
        })
}
