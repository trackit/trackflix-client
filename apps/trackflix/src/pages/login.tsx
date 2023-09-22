import { navigate } from 'gatsby'

const Login = ({ location }) => {
    if (location.state?.redirectTo) navigate(location.state.redirectTo)
    else navigate('/')
    return null
}

export default Login
