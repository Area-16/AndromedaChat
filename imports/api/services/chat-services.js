import chat from './../models/chat'

export const addMessage = ({ user, message, timeframe }) => {
  return new Promise((resolve, reject) => {
    chat.create({
      user,
      message,
      timeframe
    })
      .then((data) => {
        return resolve({ sucess: true })
      })
      .catch((err) => {
        console.error(err)
        return reject({ sucess: false })
      })
  })
}

export const getAllMessages = () => {
  return new Promise((resolve, reject) => {
    chat.find()
      .then((data) => {
        if (!data.length) throw new Error('empty data')
        return resolve(data)
      })
      .catch((err) => {
        return reject(err)
      })
  })
}
