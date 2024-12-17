export const isEmailVaid = (email:string)=>{
    if(email.length == 0){
        alert('Enter an email!');
        return false;
    } 
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g;
    const isValid = regex.test(email);
    if(!isValid) alert('Enter a valid email!');
    return isValid;
}

export const isPasswordValid = (password: string, passwordConfirm: string)=>{
    if(password != passwordConfirm){
        alert('The Passwords do not match');
        return false;
    }
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isValid = regex.test(password);
    if(!isValid) alert("Your password must be at least 8 characters!");
    return isValid;
}

export const isUsernameValid = (username:string)=>{
    return username.length != 0;
}
