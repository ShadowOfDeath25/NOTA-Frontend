import Authentication from "@components/Authentication/Authentication";


function LoginPage() {
    return (
        <Authentication initialStep="login"/>
    );
}

export default LoginPage;