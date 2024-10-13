const environments = {
  url: process.env.API_URL || 'http://localhost:8080',
  username: process.env.USERNAME || 'myclientid',
  password: process.env.PASSWORD || 'myclientsecret' 
}

export default environments;