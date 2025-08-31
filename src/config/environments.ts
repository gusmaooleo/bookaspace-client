const environments = {
  url: process.env.NEXT_PUBLIC_API_URL || 'http://192.168.15.22:8080',
  username: process.env.USERNAME || 'myclientid',
  password: process.env.PASSWORD || 'myclientsecret' 
}

export default environments;